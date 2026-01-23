import fs from "fs";
import path from "path";

import type { FormField } from "@/lib/form-templates";
import type { OAuthProvider } from "@/lib/oauth-providers-config";
import type { DatabaseAdapter, Framework } from "@/registry/default/lib/form-generator";

export interface PublishedFormConfig {
  fields: FormField[];
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
  fs.writeFileSync(STORAGE_FILE, JSON.stringify(Array.from(forms.entries()), null, 2));
}

// Global cache to avoid excessive reads
const cache = getForms();

export function saveForm(form: Omit<PublishedForm, "createdAt">) {
  const fullForm = { ...form, createdAt: Date.now() };
  cache.set(form.id, fullForm);
  saveForms(cache);
  return form.id;
}

export function getForm(id: string) {
  // Always refresh from disk in dev? No, cache is fine if we are the only writer.
  // But if we want to be safe:
  return cache.get(id);
}
