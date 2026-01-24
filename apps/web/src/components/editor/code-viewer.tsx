"use client";

import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Share2, Terminal, Code as CodeIcon, FileJson, Database } from "lucide-react";
import { toast } from "sonner";
import {
  generateFormComponent,
  generateAuthConfig,
  generateAuthClient,
  generatePrismaSchema,
  generateDrizzleSchema,
  generatePrismaClient,
  generateDrizzleClient,
} from "@/registry/default/lib/form-generator";
import type { FormField as FormFieldType, FormStep } from "@/lib/form-templates";
import type { OAuthProvider } from "@/lib/oauth-providers-config";
import type { DatabaseAdapter, Framework } from "@/registry/default/lib/form-generator";

interface CodeViewerProps {
  formName: string;
  formDescription: string;
  fields: FormFieldType[];
  steps?: FormStep[];
  oauthProviders: OAuthProvider[];
  databaseAdapter: DatabaseAdapter;
  framework: Framework;
  isAuthEnabled: boolean;
  publishedId: string | null;
  isPublishing: boolean;
  handlePublish: () => void;
  setFramework: (framework: Framework) => void;
  setDatabaseAdapter: (adapter: DatabaseAdapter) => void;
}

export function CodeViewer({
  formName,
  formDescription,
  fields,
  steps,
  oauthProviders,
  databaseAdapter,
  framework,
  isAuthEnabled,
  publishedId,
  isPublishing,
  handlePublish,
  setFramework,
  setDatabaseAdapter,
}: CodeViewerProps) {

  // Memoize generated code to prevent re-calculations on every render
  const generatedCode = useMemo(() => {
    return generateFormComponent({
      formName,
      formDescription,
      fields,
      steps,
      oauthProviders: isAuthEnabled ? oauthProviders : [],
      framework,
    });
  }, [formName, formDescription, fields, steps, oauthProviders, isAuthEnabled, framework]);

  const authConfigCode = useMemo(() => {
    if (!isAuthEnabled) return "";
    const hasEmail = fields.some(f => f.name === 'email' || f.inputType === 'email');
    const hasPassword = fields.some(f => f.name === 'password' || f.inputType === 'password');
    const hasEmailPassword = hasEmail && hasPassword;

    return generateAuthConfig({
      oauthProviders,
      hasEmailPassword,
      databaseAdapter,
      framework,
    });
  }, [fields, oauthProviders, databaseAdapter, isAuthEnabled, framework]);

  // Generate installation instructions
  const generateInstallationInstructions = (packageManager: 'pnpm' | 'npm' | 'yarn' | 'bun') => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';
    let dependencyUrl = `${baseUrl}/r/base-form.json`;

    if (publishedId) {
      dependencyUrl = `${baseUrl}/api/r/${publishedId}.json?framework=${framework}`;
    } else {
      const fieldNames = fields.map(f => f.name).sort().join(',');
      const templates: Record<string, string> = {
        'agreeToTerms,confirmPassword,email,fullName,password': 'signup-form',
        'email,password': 'login-form',
      };
      const templateName = templates[fieldNames];
      if (templateName) {
        dependencyUrl = `${baseUrl}/r/${templateName}.json`;
      }
    }

    const command = packageManager === 'npm' ? 'npx' : packageManager === 'pnpm' ? 'pnpx' : packageManager === 'bun' ? 'bunx' : 'yarn dlx';
    return `${command} shadcn@latest add ${dependencyUrl} -y`;
  };

  return (
    <div className="w-full max-w-4xl h-fit flex flex-col overflow-y-auto no-scrollbar">
      <div className="bg-background rounded-lg border flex-1 overflow-hidden flex flex-col">
        {/* Top Section: Quick Install */}
        <div className="p-6 border-b bg-muted/10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Quick Install
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Run this command to add the form to your project.
              </p>
            </div>
            
            {!publishedId && (
              <div className="flex flex-col items-end gap-2">
                 <Button onClick={handlePublish} disabled={isPublishing} size="sm">
                  {isPublishing ? "Publishing..." : "Publish & Get CLI Command"}
                </Button>
                <p className="text-xs text-muted-foreground">Publish to generate unique install command</p>
              </div>
            )}
          </div>

          {publishedId && (
            <Tabs defaultValue="pnpm" className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-4 mb-3 h-9">
              <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              <TabsTrigger value="npm">npm</TabsTrigger>
              <TabsTrigger value="yarn">yarn</TabsTrigger>
              <TabsTrigger value="bun">bun</TabsTrigger>
            </TabsList>
            {['pnpm', 'npm', 'yarn', 'bun'].map((pm) => (
              <TabsContent key={pm} value={pm} className="mt-0">
                <div className="relative group rounded-md border bg-black text-white font-mono text-sm shadow-sm">
                  <div className="p-4 overflow-x-auto whitespace-nowrap">
                    {generateInstallationInstructions(pm as any)}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-2 h-8 w-8 text-white/70 hover:text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
                    onClick={() => {
                      navigator.clipboard.writeText(generateInstallationInstructions(pm as any));
                      toast.success("Command copied!");
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          )}

          <div className="flex flex-col gap-4 mt-6">
            <h4 className="font-semibold text-sm">Configuration</h4>
            
            <div className="flex gap-8">
              <div className="flex-1 space-y-2">
                <h5 className="text-xs font-medium text-muted-foreground uppercase">Framework</h5>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={framework === "next" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFramework("next")}
                    className="h-8"
                  >
                    Next.js
                  </Button>
                  <Button
                    variant={framework === "react" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFramework("react")}
                    className="h-8"
                  >
                    Vite / React
                  </Button>
                  <Button
                    variant={framework === "tanstack" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFramework("tanstack")}
                    className="h-8"
                  >
                    TanStack
                  </Button>
                  <Button
                    variant={framework === "remix" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFramework("remix")}
                    className="h-8"
                  >
                    Remix
                  </Button>
                </div>
              </div>

              {isAuthEnabled && (
                <div className="flex-1 space-y-2">
                  <h5 className="text-xs font-medium text-muted-foreground uppercase">Database Adapter</h5>
                  <div className="flex gap-2">
                    <Button
                      variant={databaseAdapter === "drizzle" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDatabaseAdapter("drizzle")}
                      className="h-8"
                    >
                      Drizzle
                    </Button>
                    <Button
                      variant={databaseAdapter === "prisma" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDatabaseAdapter("prisma")}
                      className="h-8"
                    >
                      Prisma
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Manual Integration (Code Viewer) */}
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs defaultValue="component" className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between border-b px-4 bg-muted/30 shrink-0">
              <TabsList className="bg-transparent p-0 h-12 gap-2">
                <TabsTrigger value="component" className="data-[state=active]:bg-background data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary h-full px-4 gap-2">
                  <CodeIcon className="h-4 w-4" /> Component
                </TabsTrigger>
                {isAuthEnabled && (
                  <TabsTrigger value="auth" className="data-[state=active]:bg-background data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary h-full px-4 gap-2">
                    <Database className="h-4 w-4" /> Auth & DB
                  </TabsTrigger>
                )}
              </TabsList>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  const code = document.querySelector('[data-state="active"][role="tabpanel"] pre')?.textContent;
                  if (code) {
                    navigator.clipboard.writeText(code);
                    toast.success("Code copied!");
                  }
                }}
              >
                <span className="text-xs">Copy Code</span>
              </Button>
            </div>

            <TabsContent value="component" className="flex-1 overflow-auto m-0 data-[state=active]:flex data-[state=active]:flex-col h-[600px]">
              <CodeBlock code={generatedCode} language="tsx" className="font-mono text-sm h-full" />
            </TabsContent>

            {isAuthEnabled && (
              <TabsContent value="auth" className="flex-1 overflow-auto p-4 m-0 data-[state=active]:flex data-[state=active]:flex-col">
                <div className="space-y-8 max-w-3xl mx-auto">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <FileJson className="h-4 w-4" /> Better Auth Configuration
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      The following configuration will be created at <code className="bg-muted px-1 py-0.5 rounded">lib/auth.ts</code>
                    </p>
                    <CodeBlock code={authConfigCode} language="typescript" className="font-mono text-sm border rounded-md" />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Auth Client Setup</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Client utilities will be created at <code className="bg-muted px-1 py-0.5 rounded">lib/auth-client.ts</code>
                    </p>
                    <CodeBlock code={generateAuthClient(framework)} language="typescript" className="font-mono text-sm border rounded-md" />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Database Schema ({databaseAdapter === "prisma" ? "Prisma" : "Drizzle"})</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {databaseAdapter === "prisma"
                        ? "Add this schema to your prisma/schema.prisma file"
                        : "Create this file at db/schema.ts"}
                    </p>
                    <CodeBlock
                      code={databaseAdapter === "prisma" ? generatePrismaSchema() : generateDrizzleSchema()}
                      language="typescript"
                      className="font-mono text-sm border rounded-md"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Database Client Setup</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {databaseAdapter === "prisma"
                        ? "Create this file at lib/prisma.ts"
                        : "Create this file at db/index.ts"}
                    </p>
                    <CodeBlock
                      code={databaseAdapter === "prisma" ? generatePrismaClient() : generateDrizzleClient(framework)}
                      language="typescript"
                      className="font-mono text-sm border rounded-md"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Environment Variables</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add these to your <code className="bg-muted px-1 py-0.5 rounded">.env.local</code> file
                    </p>
                    <CodeBlock
                      code={`# App URL
${framework === 'next' ? 'NEXT_PUBLIC_APP_URL' : 'VITE_APP_URL'}=http://localhost:3000

# Database connection
${framework === 'react' ? 'VITE_' : ''}DATABASE_URL=postgresql://user:password@localhost:5432/dbname
${oauthProviders.map(p => `
# ${p.charAt(0).toUpperCase() + p.slice(1)} OAuth
${framework === 'next' || framework === 'remix' ? '' : 'VITE_'}${p.toUpperCase()}_CLIENT_ID=your_${p}_client_id
${framework === 'next' || framework === 'remix' ? '' : 'VITE_'}${p.toUpperCase()}_CLIENT_SECRET=your_${p}_client_secret`).join('')}`}
                      language="bash"
                      className="font-mono text-sm border rounded-md"
                    />
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
