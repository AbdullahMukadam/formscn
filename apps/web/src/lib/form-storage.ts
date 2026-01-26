import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import { put, del } from "@vercel/blob";
import { db } from "@/db";
import { publishedForms } from "@/db/schema/forms";
import { eq, lt } from "drizzle-orm";

import type { FormField, FormStep } from "@/lib/form-templates";
import type { OAuthProvider } from "@/lib/oauth-providers-config";
import type { DatabaseAdapter, Framework } from "@/registry/default/lib/form-generator";

export interface PublishedFormConfig {
  fields: FormField[];
  steps?: FormStep[];
  oauthProviders: OAuthProvider[];
  databaseAdapter: DatabaseAdapter;
  framework: Framework;
}

export interface PublishedForm {
  id: string;
  name: string;
  description: string;
  code: string;
  config: PublishedFormConfig;
  dependencies: string[];
  createdAt: number;
  expiresAt?: number;
}

// TTL: 24 hours
const TTL_SECONDS = 24 * 60 * 60;
const TTL_MS = TTL_SECONDS * 1000;

const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

const STORAGE_FILE = path.join(process.cwd(), "forms-db.json");
const memoryCache = new Map<string, PublishedForm>();

/**
 * Optimized saving logic with failover
 */
export async function saveForm(form: Omit<PublishedForm, "createdAt" | "expiresAt">) {
  const now = Date.now();
  const expiresAt = now + TTL_MS;
  const fullForm: PublishedForm = { ...form, createdAt: now, expiresAt };

  let blobUrl: string | null = null;
  let codeForDb: string | null = null;

  // 1. Try Vercel Blob first (Primary for code)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { url } = await put(`forms/${form.id}.tsx`, form.code, {
        access: 'public',
        addRandomSuffix: false,
      });
      blobUrl = url;
    } catch (e) {
      console.error("Vercel Blob save failed, falling back to DB storage for code", e);
      codeForDb = form.code; // Failover: store code in DB if Blob fails
    }
  } else {
    codeForDb = form.code; // No blob token, must store in DB
  }

  // 2. Neon DB (Primary for Metadata + Fallback for Code)
  if (process.env.DATABASE_URL) {
    try {
      await db.insert(publishedForms).values({
        id: form.id,
        name: form.name,
        description: form.description,
        code: codeForDb,
        blobUrl: blobUrl,
        config: form.config,
        dependencies: form.dependencies,
        expiresAt: new Date(expiresAt),
      }).onConflictDoUpdate({
        target: publishedForms.id,
        set: {
          name: form.name,
          description: form.description,
          code: codeForDb,
          blobUrl: blobUrl,
          config: form.config,
          expiresAt: new Date(expiresAt),
        }
      });
    } catch (e) {
      console.error("Neon DB save failed", e);
    }
  }

  // 3. Redis (Hot Cache - always stores everything for 24h)
  if (redis) {
    try {
      await redis.set(`form:${form.id}`, fullForm, { ex: TTL_SECONDS });
    } catch (e) {
      console.error("Redis cache update failed", e);
    }
  }

  // 4. Local Dev Fallback
  if (process.env.NODE_ENV !== "production") {
    try {
      const data = fs.existsSync(STORAGE_FILE) ? JSON.parse(fs.readFileSync(STORAGE_FILE, "utf-8")) : [];
      const forms = new Map(data);
      forms.set(form.id, fullForm);
      fs.writeFileSync(STORAGE_FILE, JSON.stringify(Array.from(forms.entries()), null, 2));
    } catch (e) {}
  }

  memoryCache.set(form.id, fullForm);
  return form.id;
}

/**
 * Optimized retrieval logic with auto-healing cache
 */
export async function getForm(id: string): Promise<PublishedForm | undefined | null> {
  // Tier 1: Memory Cache (Fastest)
  if (memoryCache.has(id)) {
    const form = memoryCache.get(id);
    if (form && form.expiresAt && form.expiresAt > Date.now()) return form;
  }

  // Tier 2: Redis (Hot Cache)
  if (redis) {
    try {
      const form = await redis.get<PublishedForm>(`form:${id}`);
      if (form) return form;
    } catch (e) {}
  }

  // Tier 3: Neon DB + Vercel Blob
  if (process.env.DATABASE_URL) {
    try {
      const results = await db.select().from(publishedForms).where(eq(publishedForms.id, id)).limit(1);
      if (results.length > 0) {
        const row = results[0];
        if (row.expiresAt.getTime() < Date.now()) return null;

        let code = row.code;

        // If code isn't in DB, fetch from Blob
        if (!code && row.blobUrl) {
          try {
            const response = await fetch(row.blobUrl);
            if (response.ok) {
              code = await response.text();
            }
          } catch (e) {
            console.error("Failed to fetch code from Vercel Blob", e);
          }
        }

        if (code) {
          const fullForm: PublishedForm = {
            id: row.id,
            name: row.name,
            description: row.description || "",
            code: code,
            config: row.config as any,
            dependencies: row.dependencies as any,
            createdAt: row.createdAt.getTime(),
            expiresAt: row.expiresAt.getTime(),
          };

          // Auto-heal Redis cache
          if (redis) {
            const remainingTtl = Math.floor((row.expiresAt.getTime() - Date.now()) / 1000);
            if (remainingTtl > 0) {
              await redis.set(`form:${id}`, fullForm, { ex: remainingTtl });
            }
          }

          return fullForm;
        }
      }
    } catch (e) {}
  }

  return null;
}

export async function cleanupExpiredForms() {
  if (!process.env.DATABASE_URL) return;

  try {
    const now = new Date();
    const expired = await db.select().from(publishedForms).where(lt(publishedForms.expiresAt, now));
    
    for (const form of expired) {
      if (form.blobUrl && process.env.BLOB_READ_WRITE_TOKEN) {
        try {
          await del(form.blobUrl);
        } catch (e) {
          console.error(`Failed to delete blob for ${form.id}`, e);
        }
      }
    }

    await db.delete(publishedForms).where(lt(publishedForms.expiresAt, now));
    return { count: expired.length };
  } catch (e) {
    console.error("Cleanup failed", e);
    throw e;
  }
}
