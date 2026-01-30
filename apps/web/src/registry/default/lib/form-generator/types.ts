import type { FormField, FormStep } from "@/registry/default/types";
import type { OAuthProvider } from "@/lib/oauth-providers-config";

export type { OAuthProvider } from "@/lib/oauth-providers-config";
export type DatabaseAdapter = "drizzle" | "prisma";
export type Framework = "next" | "react" | "tanstack" | "remix";

export interface GenerateImportsConfig {
  framework: Framework;
  fields: FormField[];
  oauthProviders: OAuthProvider[];
  isAuth: boolean;
  isLogin: boolean;
  isSignup: boolean;
  hasOAuth: boolean;
  hasSteps: boolean;
}

export interface GenerateSubmitLogicConfig {
  isLogin: boolean;
  isSignup: boolean;
  fields: FormField[];
  framework?: Framework;
}

export interface GenerateFormComponentConfig {
  formName: string;
  formDescription: string;
  fields: FormField[];
  oauthProviders: OAuthProvider[];
  framework?: Framework;
  steps?: FormStep[];
  isAuthEnabled?: boolean;
}

export interface AuthPluginsConfig {
  twoFactor?: boolean;
  magicLink?: boolean;
  organization?: boolean;
  passkey?: boolean;
  username?: boolean;
  admin?: boolean;
}

export interface GenerateAuthConfigOptions {
  oauthProviders: OAuthProvider[];
  hasEmailPassword: boolean;
  databaseAdapter?: DatabaseAdapter;
  framework?: Framework;
  plugins?: AuthPluginsConfig;
}
