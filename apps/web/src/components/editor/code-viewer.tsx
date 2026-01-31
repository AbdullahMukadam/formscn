"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { Share2, Terminal, Code as CodeIcon, FileJson, Database, CheckCircle2, Copy, AlertCircle, Sparkles } from "lucide-react";
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
import type { DatabaseAdapter, Framework, AuthPluginsConfig } from "@/registry/default/lib/form-generator";
import { getAuthChecklist } from "@/lib/auth-checklist-config";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import type { ThemeConfig } from "@/lib/appearance-config";

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
  authPlugins: AuthPluginsConfig;
  themeConfig?: ThemeConfig;
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
  authPlugins,
  themeConfig,
}: CodeViewerProps) {
  const [packageManager, setPackageManager] = useState<'pnpm' | 'npm' | 'yarn' | 'bun'>('pnpm');

  const generatedCode = useMemo(() => {
    return generateFormComponent({
      formName,
      formDescription,
      fields,
      steps,
      oauthProviders: isAuthEnabled ? oauthProviders : [],
      framework,
      isAuthEnabled,
      themeConfig,
    });
  }, [formName, formDescription, fields, steps, oauthProviders, isAuthEnabled, framework, themeConfig]);

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
      plugins: authPlugins,
    });
  }, [fields, oauthProviders, databaseAdapter, isAuthEnabled, framework, authPlugins]);

  const checklist = useMemo(() => {
    return getAuthChecklist(authPlugins, databaseAdapter);
  }, [authPlugins, databaseAdapter]);

  const warnings = useMemo(() => {
    const list: string[] = [];
    const hasEmail = fields.some(f => f.name === 'email' || f.inputType === 'email');
    const hasUsername = fields.some(f => f.name === 'username');

    if (authPlugins.magicLink && !hasEmail) {
      list.push("Magic Link enabled but no Email field found in form.");
    }
    if (authPlugins.username && !hasUsername) {
      list.push("Username Auth enabled but no Username field found in form.");
    }
    return list;
  }, [authPlugins, fields]);

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
    <div className="w-full max-w-4xl h-full flex flex-col overflow-hidden bg-background rounded-xl border shadow-sm">
      
      {/* Top Bar: Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b bg-muted/20 gap-4">
        <div className="flex items-center gap-2">
           <div className="p-2 bg-primary/10 rounded-md text-primary">
              <Terminal className="h-5 w-5" />
           </div>
           <div>
              <h3 className="font-semibold text-sm">Integration</h3>
              <p className="text-xs text-muted-foreground">Get your form code</p>
           </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Framework Selector */}
          <div className="flex items-center border rounded-md p-1 bg-background shadow-sm">
            <Button
              variant={framework === "next" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFramework("next")}
              className="h-7 text-xs px-2"
            >
              Next.js
            </Button>
            <Button
              variant={framework === "react" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFramework("react")}
              className="h-7 text-xs px-2"
            >
              Vite
            </Button>
            <Button
              variant={framework === "tanstack" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFramework("tanstack")}
              className="h-7 text-xs px-2"
            >
              TanStack
            </Button>
             <Button
              variant={framework === "remix" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFramework("remix")}
              className="h-7 text-xs px-2"
            >
              Remix
            </Button>
          </div>

          {isAuthEnabled && (
             <div className="flex items-center border rounded-md p-1 bg-background shadow-sm">
                <Button
                  variant={databaseAdapter === "drizzle" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setDatabaseAdapter("drizzle")}
                  className="h-7 text-xs px-2"
                >
                  Drizzle
                </Button>
                <Button
                  variant={databaseAdapter === "prisma" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setDatabaseAdapter("prisma")}
                  className="h-7 text-xs px-2"
                >
                  Prisma
                </Button>
             </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
         {/* Quick Install Banner (If published or template matches) */}
         <div className="bg-muted/30 border-b px-6 py-4">
            <div className="flex items-center justify-between mb-3">
               <h4 className="text-sm font-medium flex items-center gap-2">
                 <Sparkles className="h-4 w-4 text-amber-500" /> 
                 Quick Install with shadcn/ui
               </h4>
               {!publishedId && (
                  <Button onClick={handlePublish} disabled={isPublishing} size="sm" className="h-7 text-xs">
                     {isPublishing ? "Publishing..." : "Generate Unique Command"}
                  </Button>
               )}
            </div>

            {publishedId && (
               <>
                  <div className="relative group rounded-lg border bg-zinc-950 text-zinc-50 font-mono text-sm shadow-sm overflow-hidden">
                     <div className="p-3 pl-4 overflow-x-auto whitespace-nowrap pr-12">
                        <span className="text-zinc-500 mr-2">$</span>
                        {generateInstallationInstructions(packageManager)}
                     </div>
                     <Button
                        size="icon"
                        variant="ghost"
                        className="absolute right-1 top-1 h-8 w-8 text-zinc-400 hover:text-zinc-50 hover:bg-white/10"
                        onClick={() => {
                           navigator.clipboard.writeText(generateInstallationInstructions(packageManager));
                           toast.success("Command copied!");
                        }}
                     >
                        <Copy className="h-4 w-4" />
                     </Button>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                     {['pnpm', 'npm', 'yarn', 'bun'].map((pm) => (
                        <button 
                           key={pm}
                           onClick={() => setPackageManager(pm as any)}
                           className={cn(
                              "cursor-pointer hover:text-foreground transition-colors",
                              packageManager === pm && "text-foreground font-medium underline underline-offset-4"
                           )}
                        >
                           {pm}
                        </button>
                     ))}
                  </div>
               </>
            )}
         </div>

         {/* Main Code View */}
         <Tabs defaultValue="component" className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between border-b px-2 bg-background shrink-0">
               <TabsList className="bg-transparent h-10 w-full justify-start gap-2 p-0">
                  <TabsTrigger value="component" className="data-[state=active]:bg-muted/50 data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary h-full px-4 gap-2 text-xs">
                     <CodeIcon className="h-3.5 w-3.5" /> Component
                  </TabsTrigger>
                  {isAuthEnabled && (
                     <>
                        <TabsTrigger value="auth" className="data-[state=active]:bg-muted/50 data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary h-full px-4 gap-2 text-xs">
                           <Database className="h-3.5 w-3.5" /> Auth & DB
                        </TabsTrigger>
                        <TabsTrigger value="checklist" className="data-[state=active]:bg-muted/50 data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-primary h-full px-4 gap-2 text-xs">
                           <CheckCircle2 className="h-3.5 w-3.5" /> Setup Guide
                        </TabsTrigger>
                     </>
                  )}
               </TabsList>
               <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 text-xs gap-1.5 mr-2"
                  onClick={() => {
                     const code = document.querySelector('[data-state="active"][role="tabpanel"] pre')?.textContent;
                     if (code) {
                        navigator.clipboard.writeText(code);
                        toast.success("Code copied!");
                     }
                  }}
               >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
               </Button>
            </div>

            <TabsContent value="component" className="flex-1 overflow-auto m-0 data-[state=active]:flex data-[state=active]:flex-col">
               <CodeBlock code={generatedCode} language="tsx" className="font-mono text-sm h-full" />
            </TabsContent>

            {isAuthEnabled && (
               <TabsContent value="auth" className="flex-1 overflow-auto p-4 m-0 data-[state=active]:flex data-[state=active]:flex-col bg-muted/5">
                  <div className="space-y-8 max-w-4xl mx-auto w-full pb-10">
                     {warnings.length > 0 && (
                        <div className="space-y-3">
                           {warnings.map((warning, idx) => (
                              <Alert key={idx} variant="destructive">
                                 <AlertCircle className="h-4 w-4" />
                                 <AlertTitle>Requirement Missing</AlertTitle>
                                 <AlertDescription>{warning}</AlertDescription>
                              </Alert>
                           ))}
                        </div>
                     )}

                     <Section title="Better Auth Configuration" description="lib/auth.ts" icon={FileJson}>
                        <CodeBlock code={authConfigCode} language="typescript" className="font-mono text-sm border rounded-md" />
                     </Section>

                     <Section title="Auth Client Setup" description="lib/auth-client.ts">
                        <CodeBlock code={generateAuthClient(framework, authPlugins)} language="typescript" className="font-mono text-sm border rounded-md" />
                     </Section>

                     <Section 
                        title={`Database Schema (${databaseAdapter === "prisma" ? "Prisma" : "Drizzle"})`}
                        description={databaseAdapter === "prisma" ? "prisma/schema.prisma" : "db/schema.ts"}
                     >
                        <CodeBlock
                           code={databaseAdapter === "prisma" ? generatePrismaSchema() : generateDrizzleSchema()}
                           language="typescript"
                           className="font-mono text-sm border rounded-md"
                        />
                     </Section>

                     <Section 
                        title="Database Client Setup"
                        description={databaseAdapter === "prisma" ? "lib/prisma.ts" : "db/index.ts"}
                     >
                        <CodeBlock
                           code={databaseAdapter === "prisma" ? generatePrismaClient() : generateDrizzleClient(framework)}
                           language="typescript"
                           className="font-mono text-sm border rounded-md"
                        />
                     </Section>

                     <Section title="Environment Variables" description=".env.local">
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
                     </Section>
                  </div>
               </TabsContent>
            )}

            {isAuthEnabled && (
               <TabsContent value="checklist" className="flex-1 overflow-auto p-6 m-0 data-[state=active]:flex data-[state=active]:flex-col bg-muted/5">
                  <div className="max-w-2xl mx-auto w-full space-y-6 pb-10">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-500/10 text-blue-500 rounded-full">
                           <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                           <h3 className="text-lg font-semibold">Post-Installation Guide</h3>
                           <p className="text-sm text-muted-foreground">Follow these steps to finish setting up your authentication.</p>
                        </div>
                     </div>
                     
                     <div className="space-y-4">
                        {checklist.map((item, idx) => (
                           <div key={item.id} className="flex gap-4 p-5 border rounded-xl bg-background shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                 {idx + 1}
                              </div>
                              <div className="flex-1 space-y-2">
                                 <h4 className="font-semibold text-sm leading-none flex items-center gap-2">
                                    {item.title}
                                 </h4>
                                 <p className="text-sm text-muted-foreground leading-relaxed">
                                    {item.description}
                                 </p>
                                 {item.command && (
                                    <div className="mt-3 relative">
                                       <code className="block p-2.5 pl-3 bg-muted/50 rounded-md border text-xs font-mono whitespace-nowrap overflow-hidden text-ellipsis pr-10">
                                          {item.command}
                                       </code>
                                       <Button
                                          variant="ghost"
                                          size="icon"
                                          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                                          onClick={() => {
                                             navigator.clipboard.writeText(item.command!);
                                             toast.success("Command copied!");
                                          }}
                                       >
                                          <Copy className="h-3.5 w-3.5" />
                                       </Button>
                                    </div>
                                 )}
                              </div>
                           </div>
                        ))}
                     </div>

                     <Alert className="bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle className="font-semibold">You're all set!</AlertTitle>
                        <AlertDescription className="text-xs opacity-90">
                           Once these steps are completed, your Better Auth integration will be fully functional.
                        </AlertDescription>
                     </Alert>
                  </div>
               </TabsContent>
            )}
         </Tabs>
      </div>
    </div>
  );
}

function Section({ title, description, children, icon: Icon }: { title: string, description?: string, children: React.ReactNode, icon?: any }) {
   return (
      <div className="space-y-3">
         <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm flex items-center gap-2">
               {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
               {title}
            </h4>
            {description && (
               <code className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground border">
                  {description}
               </code>
            )}
         </div>
         {children}
      </div>
   );
}
