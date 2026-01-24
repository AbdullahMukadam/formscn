import fs from "fs";
import path from "path";

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

// In a serverless environment like Vercel, the filesystem is ephemeral.
// This means forms saved here will persist only for the duration of the container/deployment.
// This is acceptable as per user requirements.
const STORAGE_FILE = path.join(process.cwd(), "forms-db.json");

function getForms(): Map<string, PublishedForm> {
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

function saveForms(forms: Map<string, PublishedForm>) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(Array.from(forms.entries()), null, 2));
  } catch (e) {
    console.error("Failed to save forms to local storage", e);
  }
}

// Global cache to avoid excessive reads during the same process lifetime
const cache = getForms();

export async function saveForm(form: Omit<PublishedForm, "createdAt">) {
  const fullForm = { ...form, createdAt: Date.now() };
  cache.set(form.id, fullForm);
  saveForms(cache);
  return form.id;
}

export async function getForm(id: string) {
  // Check memory cache first
  if (cache.has(id)) {
    return cache.get(id);
  }
  
  // Try reading from disk (in case another process wrote it)
  const forms = getForms();
  return forms.get(id);
}
