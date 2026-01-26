import { ShieldCheck, Database, Key, Mail, Users, Terminal } from "lucide-react";
import type { AuthPluginsConfig, DatabaseAdapter } from "@/registry/default/lib/form-generator";

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  command?: string;
}

export function getAuthChecklist(
  plugins: AuthPluginsConfig,
  databaseAdapter: DatabaseAdapter
): ChecklistItem[] {
  const checklist: ChecklistItem[] = [
    {
      id: "secret",
      title: "Generate Auth Secret",
      description: "Generate a secure secret key for your application encryption.",
      icon: Key,
      command: "npx better-auth secret",
    },
    {
      id: "env",
      title: "Setup Environment Variables",
      description: "Add BETTER_AUTH_SECRET and BETTER_AUTH_URL to your .env file.",
      icon: Terminal,
    },
  ];

  if (plugins.organization || plugins.twoFactor || plugins.passkey) {
    checklist.push({
      id: "schema",
      title: "Sync Database Schema",
      description: `Generate and apply the required tables for ${Object.keys(plugins).filter(k => plugins[k as keyof AuthPluginsConfig]).join(", ")}.`,
      icon: Database,
      command: `npx @better-auth/cli ${databaseAdapter === 'prisma' ? 'generate' : 'migrate'}`,
    });
  }

  if (plugins.magicLink) {
    checklist.push({
      id: "email",
      title: "Configure Email Provider",
      description: "Magic links require an email provider (Resend, SendGrid, etc.) to be configured in your auth server.",
      icon: Mail,
    });
  }

  if (plugins.organization) {
    checklist.push({
      id: "org-logic",
      title: "Add Organization Middleware",
      description: "Protect routes that require organization context.",
      icon: Users,
    });
  }

  return checklist;
}
