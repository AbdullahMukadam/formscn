import type { LucideIcon } from "lucide-react";
import type { FormField, FormStep } from "@/registry/default/types";
import type { OAuthProvider } from "@/lib/oauth-providers-config";
import type { AuthPluginsConfig } from "@/registry/default/lib/form-generator";
import type z from "zod";


export type TemplateCategory = "all" | "auth" | "contact" | "ecommerce" | "profile";

export interface CategoryConfig {
  label: string;
  icon: LucideIcon;
  description?: string;
}

export type CategoriesMap = Record<TemplateCategory, CategoryConfig>;

export interface TemplateStats {
  fieldCount: number;
  isWizard: boolean;
  components: string[];
}

export interface CategorizedTemplate {
  id: string;
  name: string;
  description: string;
  schema: z.ZodObject<any>;
  defaultValues: Record<string, any>;
  fields?: FormField[];
  steps?: FormStep[];
  oauthProviders?: OAuthProvider[];
  authPlugins?: AuthPluginsConfig;
  category: TemplateCategory;
  stats: TemplateStats;
}

// Category detection patterns
export const CATEGORY_PATTERNS: Record<TemplateCategory, string[]> = {
  auth: ["login", "signup", "auth", "password", "factor", "passkey"],
  profile: ["profile", "settings", "organization"],
  ecommerce: ["checkout", "payment", "ecommerce"],
  contact: ["contact", "newsletter", "feedback", "support", "application", "booking", "event", "waitlist", "address"],
  all: [],
};
