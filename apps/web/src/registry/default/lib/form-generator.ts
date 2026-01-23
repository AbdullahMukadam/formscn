import * as z from "zod";
import { OAUTH_PROVIDERS, type OAuthProvider } from "@/lib/oauth-providers-config";

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: "authentication" | "contact" | "ecommerce" | "survey" | "profile";
  schema: z.ZodObject<any>;
  defaultValues: Record<string, any>;
  fields: FormField[];
  oauthProviders?: OAuthProvider[];
}

export interface FormField {
  type: "input" | "textarea" | "select" | "checkbox" | "radio";
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  inputType?: "text" | "email" | "password" | "tel" | "url" | "number";
}

export type { OAuthProvider } from "@/lib/oauth-providers-config";
export type DatabaseAdapter = "drizzle" | "prisma";
export type Framework = "next" | "react" | "tanstack" | "remix";

/**
 * Generate a complete form component with Better Auth integration
 */
export function generateFormComponent(config: {
  formName: string;
  formDescription: string;
  fields: FormField[];
  oauthProviders: OAuthProvider[];
  framework?: Framework;
}): string {
  const { formName, formDescription, fields, oauthProviders, framework = "next" } = config;
  
  const hasOAuth = oauthProviders.length > 0;
  
  // Framework specific directive
  const directive = (framework === "next" || framework === "tanstack") ? '"use client";\n\n' : "";

  // Generate imports
  const oauthIcons = oauthProviders
    .map(id => OAUTH_PROVIDERS.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)
    .filter(p => !p.iconSvg) // Only import icons that aren't custom SVG
    .map(p => p.icon.name)
    .filter((name, index, self) => self.indexOf(name) === index) // Remove duplicates
    .join(', ');

  const hasSelect = fields.some(f => f.type === "select");
  const hasCheckbox = fields.some(f => f.type === "checkbox");
  const hasTextarea = fields.some(f => f.type === "textarea");
  const hasRadio = fields.some(f => f.type === "radio");

  // Auth Detection
  const hasEmail = fields.some(f => f.name === "email" || f.inputType === "email");
  const hasPassword = fields.some(f => f.name === "password" || f.inputType === "password");
  const hasConfirmPassword = fields.some(f => f.name === "confirmPassword");
  
  const isLogin = hasEmail && hasPassword && !hasConfirmPassword;
  const isSignup = hasEmail && hasPassword && hasConfirmPassword;
  const isAuth = isLogin || isSignup || hasOAuth;

  let imports = `${directive}import { useForm${(hasSelect || hasCheckbox || hasRadio) ? ", Controller" : ""} } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";`;

  if (hasTextarea) {
    imports += `\nimport { Textarea } from "@/components/ui/textarea";`;
  }
  
  if (hasSelect) {
    imports += `\nimport {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";`;
  }

  if (hasCheckbox) {
    imports += `\nimport { Checkbox } from "@/components/ui/checkbox";`;
  }

  if (hasRadio) {
    imports += `\nimport { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";`;
  }

  // Auth Imports
  if (isAuth) {
    const authImports = [];
    if (isLogin || hasOAuth) authImports.push("signIn");
    if (isSignup) authImports.push("signUp");
    
    imports += `\nimport { ${authImports.join(", ")} } from "@/lib/auth-client";`;
    
    if (hasOAuth && oauthIcons) {
      imports += `\nimport { ${oauthIcons} } from "lucide-react";`;
    }
  }

  // Generate Zod schema
  const schemaFields = fields.map((field) => {
    if (field.type === "input") {
      let validation = `z.string()`;
      if (field.inputType === "email") validation += `.email("Invalid email address")`;
      if (field.required) validation += `.min(1, "${field.label} is required")`;
      else validation += `.optional().or(z.literal(""))`;
      return `  ${field.name}: ${validation},`;
    }
    if (field.type === "textarea") {
      let validation = `z.string()`;
      if (field.required) validation += `.min(1, "${field.label} is required")`;
      else validation += `.optional().or(z.literal(""))`;
      return `  ${field.name}: ${validation},`;
    }
    if (field.type === "checkbox") {
      let validation = `z.boolean()`;
      if (field.required) validation += `.refine((val) => val === true, { message: "You must agree to ${field.label}" })`;
      else validation += `.default(false)`;
      return `  ${field.name}: ${validation},`;
    }
    if (field.type === "select" || field.type === "radio") {
      const enumValues = (field.options || []).map(opt => `"${opt.value}"`).join(', ');
      let validation = `z.enum([${enumValues}])`;
      if (!field.required) validation += `.optional()`;
      return `  ${field.name}: ${validation},`;
    }
    return `  ${field.name}: z.any(),`;
  }).join('\n');

  const schema = `

const formSchema = z.object({
${schemaFields}
});

type FormValues = z.infer<typeof formSchema>;`;

  // Generate component
  const componentName = formName.replace(/\s+/g, '') + 'Form';
  const defaultValues = fields.map(f => `      ${f.name}: ${f.type === "checkbox" ? "false" : '""'},`).join('\n');
  
  let submitLogic = `    console.log("Form submitted:", data);
    toast.success("Form submitted successfully!");`;

  if (isLogin) {
    submitLogic = `    await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/dashboard",
      fetchOptions: {
        onResponse: () => {
          // toast.loading("Logging in...");
        },
        onRequest: () => {
          toast.loading("Logging in...");
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Logged in successfully!");
        },
        onError: (ctx) => {
          toast.dismiss();
          toast.error(ctx.error.message);
        },
      },
    });`;
  } else if (isSignup) {
    // Find name field (fullName, name, etc)
    const nameField = fields.find(f => f.name.toLowerCase().includes('name'))?.name || 'name';
    
    submitLogic = `    await signUp.email({
      email: data.email,
      password: data.password,
      name: data.${nameField},
      callbackURL: "/dashboard",
      fetchOptions: {
        onResponse: () => {
          // toast.loading("Creating account...");
        },
        onRequest: () => {
          toast.loading("Creating account...");
        },
        onSuccess: () => {
          toast.dismiss();
          toast.success("Account created successfully!");
        },
        onError: (ctx) => {
          toast.dismiss();
          toast.error(ctx.error.message);
        },
      },
    });`;
  }

  const formFields = fields.map((field) => {
    const errorDisplay = `{form.formState.errors.${field.name} && (
            <p className="text-sm text-destructive">{form.formState.errors.${field.name}.message}</p>
          )}`;
    const descriptionDisplay = field.description ? `\n          <p className="text-sm text-muted-foreground">${field.description}</p>` : "";

    if (field.type === "input") {
      return `          <div className="space-y-2">
            <Label htmlFor="${field.name}">${field.label}</Label>
            <Input
              id="${field.name}"
              type="${field.inputType || "text"}"
              placeholder="${field.placeholder || ""}"
              {...form.register("${field.name}")}
            />
            ${errorDisplay}${descriptionDisplay}
          </div>`;
    }
    if (field.type === "textarea") {
      return `          <div className="space-y-2">
            <Label htmlFor="${field.name}">${field.label}</Label>
            <Textarea
              id="${field.name}"
              placeholder="${field.placeholder || ""}"
              {...form.register("${field.name}")}
            />
            ${errorDisplay}${descriptionDisplay}
          </div>`;
    }
    if (field.type === "select") {
      return `          <div className="space-y-2">
            <Label htmlFor="${field.name}">${field.label}</Label>
            <Controller
              control={form.control}
              name="${field.name}"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="${field.name}">
                    <SelectValue placeholder="${field.placeholder || "Select an option"}" />
                  </SelectTrigger>
                  <SelectContent>
                    ${(field.options || []).map(opt => `<SelectItem value="${opt.value}">${opt.label}</SelectItem>`).join('\n                    ')}
                  </SelectContent>
                </Select>
              )}
            />
            ${errorDisplay}${descriptionDisplay}
          </div>`;
    }
    if (field.type === "radio") {
      return `          <div className="space-y-2">
            <Label>${field.label}</Label>
            <Controller
              control={form.control}
              name="${field.name}"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  ${(field.options || []).map(opt => `<div className="flex items-center space-x-2">
                    <RadioGroupItem value="${opt.value}" id="${field.name}-${opt.value}" />
                    <Label htmlFor="${field.name}-${opt.value}">${opt.label}</Label>
                  </div>`).join('\n                  ')}
                </RadioGroup>
              )}
            />
            ${errorDisplay}${descriptionDisplay}
          </div>`;
    }
    if (field.type === "checkbox") {
      return `          <div className="flex items-center space-x-2">
            <Controller
              control={form.control}
              name="${field.name}"
              render={({ field }) => (
                <Checkbox
                  id="${field.name}"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="${field.name}" className="font-normal">
              ${field.label}
            </Label>
            ${errorDisplay}
          </div>`;
    }
    return `          {/* ${field.type} field for ${field.name} */}`;
  }).join('\n\n');

  const oauthButtons = oauthProviders.map(providerId => {
    const provider = OAUTH_PROVIDERS.find(p => p.id === providerId);
    if (!provider) return '';

    const iconComponent = provider.iconSvg || `<${provider.icon.name} className="mr-2 h-4 w-4" />`;

    return `          <Button
            variant="outline"
            onClick={() => signIn.social({ provider: "${provider.betterAuthId}" })}
          >
            ${iconComponent}
            ${provider.name}
          </Button>`;
  }).filter(Boolean).join('\n');

  const component = `
export function ${componentName}() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
${defaultValues}
    },
  });

  const onSubmit = async (data: FormValues) => {
${submitLogic}
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>${formName}</CardTitle>
        <CardDescription>${formDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
${formFields}

          <Button type="submit" className="w-full">Submit</Button>
        </form>${hasOAuth ? `

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-${oauthProviders.length} gap-4">
${oauthButtons}
        </div>` : ''}
      </CardContent>
    </Card>
  );
}`;

  return `${imports}${schema}${component}`;
}

/**
 * Generate Better Auth configuration
 */
export function generateAuthConfig(config: {
  oauthProviders: OAuthProvider[];
  hasEmailPassword: boolean;
  databaseAdapter?: DatabaseAdapter;
  framework?: Framework;
}): string {
  const { oauthProviders, hasEmailPassword, databaseAdapter = "drizzle", framework = "next" } = config;
  
  let envPrefix = "process.env.";
  let envSuffix = "!";

  if (framework === "react" || framework === "tanstack") {
    envPrefix = "import.meta.env.VITE_";
    envSuffix = "";
  } else if (framework === "remix") {
    envPrefix = "process.env."; // Remix server-side usually standard process.env
    envSuffix = "!"; // Remix client-side depends on how they expose envs, but for auth config (server), it's standard
  }

  const socialProviders = oauthProviders.map(provider => {
    return `    ${provider}: {
      clientId: ${envPrefix}${provider.toUpperCase()}_CLIENT_ID${envSuffix},
      clientSecret: ${envPrefix}${provider.toUpperCase()}_CLIENT_SECRET${envSuffix},
    },`;
  }).join('\n');

  if (databaseAdapter === "prisma") {
    return `import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma"; // Import your Prisma client

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // Options: "postgresql", "mysql", "sqlite"
  }),${hasEmailPassword ? `
  emailAndPassword: {
    enabled: true,
  },` : ''}${oauthProviders.length > 0 ? `
  socialProviders: {
${socialProviders}
  },` : ''}
});`;
  }

  // Default to Drizzle
  return `import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // Import your Drizzle database instance

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // Options: "pg", "mysql", "sqlite"
  }),${hasEmailPassword ? `
  emailAndPassword: {
    enabled: true,
  },` : ''}${oauthProviders.length > 0 ? `
  socialProviders: {
${socialProviders}
  },` : ''}
});`;
}

/**
 * Generate auth client helper
 */
export function generateAuthClient(framework: Framework = "next"): string {
  let envVar = 'process.env.NEXT_PUBLIC_APP_URL';
  
  if (framework === "react" || framework === "tanstack") {
    envVar = 'import.meta.env.VITE_APP_URL';
  } else if (framework === "remix") {
    // Remix client often uses window.ENV or just root loader data, but here we assume a standard setup or public env
    // Better Auth client in Remix might often point to a full URL if separate, or relative.
    // Let's assume standard VITE_ convention if they use Vite-Remix, or process.env if they use Classic Remix?
    // Modern Remix uses Vite. So usually import.meta.env.VITE_ or just /api/auth
    envVar = 'import.meta.env.VITE_APP_URL'; 
  }

  return `import { createAuthClient } from "better-auth/react";

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: ${envVar} || "http://localhost:3000",
});`;
}

/**
 * Generate Prisma schema for Better Auth
 */
export function generatePrismaSchema(): string {
  return `// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or "mysql", "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified Boolean   @default(false)
  name          String?
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  accounts      Account[]
  sessions      Session[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  
  @@unique([identifier, token])
}`;
}

/**
 * Generate Drizzle schema for Better Auth
 */
export function generateDrizzleSchema(): string {
  return `// db/schema.ts
import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  name: text("name"),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  sessionToken: text("sessionToken").notNull().unique(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
});

export const verificationToken = pgTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull().unique(),
  expires: timestamp("expires").notNull(),
});`;
}

/**
 * Generate Prisma client setup
 */
export function generatePrismaClient(): string {
  return `// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;`;
}

/**
 * Generate Drizzle client setup
 */
export function generateDrizzleClient(framework: Framework = "next"): string {
  let envVar = 'process.env.DATABASE_URL!';
  
  if (framework === "react" || framework === "tanstack" || framework === "remix") {
    // Client-side DB access isn't safe, but Drizzle client file is usually server-side.
    // React/Vite/TanStack Start (server functions) use Vite envs or standard process.env depending on runtime.
    // For TanStack Start (server), it's process.env or import.meta.env
    // Let's stick to process.env for Server-Side code (DB connection) which is safer assumption for backend.
    // Except Vite which might use import.meta.env
    if (framework === "react") {
       // React SPA shouldn't have DB connection code client-side. Warning? 
       // But we generate it anyway for the 'backend' part.
       envVar = 'process.env.DATABASE_URL!';
    } else {
       // TanStack Start / Remix (Server)
       envVar = 'process.env.DATABASE_URL!';
    }
  }

  return `// db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = ${envVar};
const client = postgres(connectionString);

export const db = drizzle(client, { schema });`;
}
