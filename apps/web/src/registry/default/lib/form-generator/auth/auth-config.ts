import type { OAuthProvider } from "@/lib/oauth-providers-config";
import type { DatabaseAdapter, Framework, AuthPluginsConfig } from "../types";

/**
 * Get the environment variable access pattern for framework
 * Server-side auth config uses process.env for all frameworks
 */
function getEnvAccess(framework: Framework): { prefix: string; suffix: string } {
  switch (framework) {
    case "next":
    case "remix":
      return { 
        prefix: "process.env.", 
        suffix: "!" 
      };
    case "tanstack":
    case "react":
      // Vite-based frameworks usually use import.meta.env
      return { 
        prefix: "import.meta.env.", 
        suffix: "" 
      };
    default:
      return { 
        prefix: "process.env.", 
        suffix: "!" 
      };
  }
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
  plugins?: AuthPluginsConfig;
}): string {
  const { oauthProviders, hasEmailPassword, databaseAdapter = "drizzle", framework = "next", plugins = {} } = config;
  
  const { prefix, suffix } = getEnvAccess(framework);
  const filePath = getFilePath(framework);

  const socialProviders = oauthProviders.map(provider => {
    return `    ${provider}: {
      clientId: ${prefix}${provider.toUpperCase()}_CLIENT_ID${suffix},
      clientSecret: ${prefix}${provider.toUpperCase()}_CLIENT_SECRET${suffix},
    },`;
  }).join('\n');

  // Plugin Imports
  const pluginImports: string[] = [];
  const pluginInstances: string[] = [];

  if (plugins.twoFactor) {
    pluginImports.push('import { twoFactor } from "better-auth/plugins/two-factor";');
    pluginInstances.push('    twoFactor(),');
  }
  if (plugins.magicLink) {
    pluginImports.push('import { magicLink } from "better-auth/plugins/magic-link";');
    pluginInstances.push('    magicLink(),');
  }
  if (plugins.organization) {
    pluginImports.push('import { organization } from "better-auth/plugins/organization";');
    pluginInstances.push('    organization(),');
  }
  if (plugins.passkey) {
    pluginImports.push('import { passkey } from "better-auth/plugins/passkey";');
    pluginInstances.push('    passkey(),');
  }
  if (plugins.username) {
    pluginImports.push('import { username } from "better-auth/plugins/username";');
    pluginInstances.push('    username(),');
  }
  if (plugins.admin) {
    pluginImports.push('import { admin } from "better-auth/plugins/admin";');
    pluginInstances.push('    admin(),');
  }

  const pluginSection = pluginInstances.length > 0 
    ? `\n  plugins: [\n${pluginInstances.join('\n')}\n  ],`
    : "";

  const commonConfig = `${hasEmailPassword ? `
  emailAndPassword: {
    enabled: true,
  },` : ''}${oauthProviders.length > 0 ? `
  socialProviders: {
${socialProviders}
  },` : ''}${pluginSection}
  // Optional: Configure session
  // session: {
  //   expiresIn: 60 * 60 * 24 * 7, // 7 days
  //   updateAge: 60 * 60 * 24, // 1 day
  // },`;

  const adapterImport = databaseAdapter === "prisma" 
    ? 'import { prismaAdapter } from "better-auth/adapters/prisma";\nimport { prisma } from "@/lib/prisma";'
    : 'import { drizzleAdapter } from "better-auth/adapters/drizzle";\nimport { db } from "@/db";';

  const adapterConfig = databaseAdapter === "prisma"
    ? `database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),`
    : `database: drizzleAdapter(db, {
    provider: "pg",
  }),`;

  return `// ${filePath}
import { betterAuth } from "better-auth";
${adapterImport}
${pluginImports.join('\n')}

export const auth = betterAuth({
  ${adapterConfig}${commonConfig}
});

export type Auth = typeof auth;`;
}
