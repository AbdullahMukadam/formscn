import * as z from "zod";
import { type OAuthProvider } from "@/lib/oauth-providers-config";

export interface FormField {
  type: "input" | "textarea" | "select" | "checkbox" | "radio";
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  inputType?: "text" | "email" | "password" | "tel" | "url" | "number" | "date";
}

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: "authentication" | "contact" | "ecommerce" | "survey" | "profile" | "booking";
  schema: z.ZodObject<any>;
  defaultValues: Record<string, any>;
  fields: FormField[];
  oauthProviders?: OAuthProvider[];
}
