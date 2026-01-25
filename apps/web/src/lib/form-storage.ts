import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";

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
}

// Initialize Redis if env vars are present
const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

const STORAGE_FILE = path.join(process.cwd(), "forms-db.json");

// In-memory fallback for when neither Redis nor FileSystem is available/writable
const memoryCache = new Map<string, PublishedForm>();

function getLocalForms(): Map<string, PublishedForm> {
  try {
    if (!fs.existsSync(STORAGE_FILE)) {
      return new Map();
    }
    const data = fs.readFileSync(STORAGE_FILE, "utf-8");
    return new Map(JSON.parse(data));
  } catch (e) {
    return new Map();
  }
}

function saveLocalForms(forms: Map<string, PublishedForm>) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(Array.from(forms.entries()), null, 2));
  } catch (e) {
    console.error("Failed to save forms to local storage", e);
  }
}

export async function saveForm(form: Omit<PublishedForm, "createdAt">) {
  const fullForm = { ...form, createdAt: Date.now() };

  // 1. Redis (Production/Serverless)
  if (redis) {
    try {
      await redis.set(`form:${form.id}`, fullForm);
      return form.id;
    } catch (e) {
      console.error("Redis save failed", e);
    }
  }

  // 2. File System (Development only)
  if (process.env.NODE_ENV !== "production") {
    const forms = getLocalForms();
    forms.set(form.id, fullForm);
    saveLocalForms(forms);
    return form.id;
  }

  // 3. In-Memory (Production fallback without Redis)
  // Prevents EROFS crashes, but data is transient.
  console.warn("Storage warning: Using in-memory storage. Data will be lost on server restart. Configure UPSTASH_REDIS_REST_URL to persist data.");
  memoryCache.set(form.id, fullForm);
  return form.id;
}

export async function getForm(id: string): Promise<PublishedForm | undefined | null> {
  // 1. Redis
  if (redis) {
    try {
      const form = await redis.get<PublishedForm>(`form:${id}`);
      if (form) return form;
    } catch (e) {
      console.error("Redis get failed", e);
    }
  }

  // 2. File System (Dev)
  if (process.env.NODE_ENV !== "production") {
     const forms = getLocalForms();
     if (forms.has(id)) return forms.get(id);
  }

  // 3. In-Memory
  return memoryCache.get(id);
}
