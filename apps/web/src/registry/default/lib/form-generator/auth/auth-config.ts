import type { OAuthProvider } from "@/lib/oauth-providers-config";
import type { DatabaseAdapter, Framework } from "../types";

/**
 * Get the environment variable access pattern for framework
 * Server-side auth config uses process.env for all frameworks
 */
function getEnvAccess(framework: Framework): { prefix: string; suffix: string } {
  // Auth config runs on the server, so we use process.env for all frameworks
  // The secret keys should never be exposed to the client
  return { 
    prefix: "process.env.", 
    suffix: "!" 
  };
}

/**
 * Get the framework-specific file path comment
 */
function getFilePath(framework: Framework): string {
  switch (framework) {
    case "next":
      return "lib/auth.ts";
    case "remix":
      return "app/lib/auth.server.ts";
    case "tanstack":
      return "app/lib/auth.ts";
    case "react":
      return "src/lib/auth.ts"; // For backend/API
    default:
      return "lib/auth.ts";
  }
}

/**
 * Generate Better Auth server configuration
 */
export function generateAuthConfig(config: {
  oauthProviders: OAuthProvider[];
  hasEmailPassword: boolean;
  databaseAdapter?: DatabaseAdapter;
  framework?: Framework;
}): string {
  const { oauthProviders, hasEmailPassword, databaseAdapter = "drizzle", framework = "next" } = config;
  
  const { prefix, suffix } = getEnvAccess(framework);
  const filePath = getFilePath(framework);

  const socialProviders = oauthProviders.map(provider => {
    return `    ${provider}: {
      clientId: ${prefix}${provider.toUpperCase()}_CLIENT_ID${suffix},
      clientSecret: ${prefix}${provider.toUpperCase()}_CLIENT_SECRET${suffix},
    },`;
  }).join('\n');

  const commonConfig = `${hasEmailPassword ? `
  emailAndPassword: {
    enabled: true,
    // Optional: Configure password requirements
    // minPasswordLength: 8,
    // requireEmailVerification: true,
  },` : ''}${oauthProviders.length > 0 ? `
  socialProviders: {
${socialProviders}
  },` : ''}
  // Optional: Configure session
  // session: {
  //   expiresIn: 60 * 60 * 24 * 7, // 7 days
  //   updateAge: 60 * 60 * 24, // 1 day
  // },`;

  if (databaseAdapter === "prisma") {
    return `// ${filePath}
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // "postgresql" | "mysql" | "sqlite"
  }),${commonConfig}
});

// Export type for use in API routes
export type Auth = typeof auth;`;
  }

  // Default to Drizzle
  return `// ${filePath}
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // "pg" | "mysql" | "sqlite"
  }),${commonConfig}
});

// Export type for use in API routes
export type Auth = typeof auth;`;
}
