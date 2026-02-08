
import type { LucideIcon } from "lucide-react";
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