import type { Framework, AuthPluginsConfig } from "../types";

/**
 * Get the base URL environment variable for framework
 */
function getBaseUrlEnvVar(framework: Framework): string {
  switch (framework) {
    case "next":
      return 'process.env.NEXT_PUBLIC_APP_URL';
    case "react":
      return 'import.meta.env.VITE_APP_URL';
    case "tanstack":
      return 'import.meta.env.VITE_APP_URL';
    case "remix":
      // Modern Remix uses Vite
      return 'import.meta.env.VITE_APP_URL';
    default:
      return 'process.env.NEXT_PUBLIC_APP_URL';
  }
}

/**
 * Get the default port for framework
 */
function getDefaultPort(framework: Framework): string {
  switch (framework) {
    case "next":
      return "3000";
    case "react":
      return "5173"; // Vite default
    case "tanstack":
      return "3000";
    case "remix":
      return "5173"; // Remix with Vite
    default:
      return "3000";
  }
}

/**
 * Get display name for framework
 */
function getFrameworkDisplayName(framework: Framework): string {
  switch (framework) {
    case "next":
      return "Next.js";
    case "react":
      return "React (Vite)";
    case "tanstack":
      return "TanStack Start";
    case "remix":
      return "Remix";
    default:
      return "React";
  }
}

/**
 * Generate auth client helper - framework specific
 */
export function generateAuthClient(framework: Framework = "next", plugins: AuthPluginsConfig = {}): string {
  const envVar = getBaseUrlEnvVar(framework);
  const defaultPort = getDefaultPort(framework);
  
  // Add "use client" directive for Next.js and TanStack
  const directive = (framework === "next" || framework === "tanstack") 
    ? '"use client";\n\n' 
    : "";

  // Plugin Imports & Instances
  const pluginImports: string[] = [];
  const pluginInstances: string[] = [];

  if (plugins.twoFactor) {
    pluginImports.push('import { twoFactorClient } from "better-auth/client/plugins";');
    pluginInstances.push('    twoFactorClient(),');
  }
  if (plugins.organization) {
    pluginImports.push('import { organizationClient } from "better-auth/client/plugins";');
    pluginInstances.push('    organizationClient(),');
  }
  if (plugins.passkey) {
    pluginImports.push('import { passkeyClient } from "better-auth/client/plugins";');
    pluginInstances.push('    passkeyClient(),');
  }
  if (plugins.magicLink) {
    pluginImports.push('import { magicLinkClient } from "better-auth/client/plugins";');
    pluginInstances.push('    magicLinkClient(),');
  }
  if (plugins.admin) {
    pluginImports.push('import { adminClient } from "better-auth/client/plugins";');
    pluginInstances.push('    adminClient(),');
  }

  const pluginSection = pluginInstances.length > 0
    ? `,\n  plugins: [\n${pluginInstances.join('\n')}\n  ]`
    : "";

  return `${directive}import { createAuthClient } from "better-auth/react";
${pluginImports.join('\n')}

/**
 * Better Auth client for ${getFrameworkDisplayName(framework)}
 */
export const authClient = createAuthClient({
  baseURL: ${envVar} ?? "http://localhost:${defaultPort}"${pluginSection}
});

// Export individual methods for convenience
export const { 
  signIn,
  signOut, 
  signUp, 
  useSession,
  getSession,
} = authClient;

/**
 * Type-safe session hook
 * Returns the current user session or null if not authenticated
 */
export function useAuthSession() {
  const session = useSession();
  return {
    user: session.data?.user ?? null,
    session: session.data?.session ?? null,
    isLoading: session.isPending,
    isAuthenticated: !!session.data?.user,
    error: session.error,
  };
}`;
}
