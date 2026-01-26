import { NextResponse } from "next/server";
import { getForm } from "@/lib/form-storage";
import {
  generateAuthConfig,
  generatePrismaSchema,
  generateDrizzleSchema,
  generatePrismaClient,
  generateDrizzleClient,
  generateAuthClient,
} from "@/registry/default/lib/form-generator";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the params object
  const { id: rawId } = await params;
  // Strip .json extension if present
  const id = rawId.replace(/\.json$/, "");
  
  const { searchParams } = new URL(request.url);
  const queryFramework = searchParams.get("framework");

  const form = await getForm(id);

  if (!form) {
    return NextResponse.json({ error: "Form not found" }, { status: 404 });
  }

  // Use the framework from query param if available, otherwise fallback to form config or default
  const effectiveFramework = (queryFramework as any) || form.config?.framework || "next";


  // Determine dependencies based on the form's complexity
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const registryDependencies = [`${baseUrl}/r/base-form.json`];
  const dependencies = [
    "react-hook-form", 
    "@hookform/resolvers", 
    "zod", 
    "sonner"
  ];

  // Add framework-specific router dependencies for auth forms
  const isAuthForm = form.config?.fields?.some(
    (f: any) => f.name === 'password' || f.inputType === 'password'
  );
  
  if (isAuthForm) {
    switch (effectiveFramework) {
      case "react":
        dependencies.push("react-router-dom");
        break;
      case "tanstack":
        dependencies.push("@tanstack/react-router");
        break;
      case "remix":
        // @remix-run/react is built-in, no extra dependency needed
        break;
      case "next":
      default:
        // next/navigation is built-in, no extra dependency needed
        break;
    }
  }

  const files = [
    {
      path: `components/forms/${form.name.toLowerCase().replace(/\s+/g, "-")}.tsx`,
      content: form.code,
      type: "registry:block",
      target: `components/forms/${form.name.toLowerCase().replace(/\s+/g, "-")}.tsx`,
    },
  ];

  // If we have config metadata, generate the extra files
  if (form.config) {
    const { fields, oauthProviders, databaseAdapter, framework } = form.config;
    const hasAuth = oauthProviders.length > 0 || fields.some(f => f.name === 'password' || f.inputType === 'password');

    if (hasAuth) {     
      const hasEmailPassword = fields.some(f => f.name === 'password' || f.inputType === 'password');
      const plugins = (form.config as any).plugins || {};

      // 0. Generate Auth Client (Dynamic)
      files.push({
        path: "lib/auth-client.ts",
        content: generateAuthClient(effectiveFramework, plugins),
        type: "registry:lib",
        target: "lib/auth-client.ts",
      });

      // 1. Generate Auth Config
      files.push({
        path: "lib/auth.ts",
        content: generateAuthConfig({ 
          oauthProviders, 
          hasEmailPassword, 
          databaseAdapter, 
          framework: effectiveFramework,
          plugins
        }),
        type: "registry:lib",
        target: "lib/auth.ts",
      });

      // 2. Generate DB Schema
      if (databaseAdapter === "prisma") {
        files.push({
          path: "prisma/schema.prisma",
          content: generatePrismaSchema(),
          type: "registry:lib",
          target: "prisma/schema.prisma",
        });
        files.push({
          path: "lib/prisma.ts",
          content: generatePrismaClient(),
          type: "registry:lib",
          target: "lib/prisma.ts",
        });
        dependencies.push("better-auth", "@prisma/client");
      } else {
        files.push({
          path: "db/schema.ts",
          content: generateDrizzleSchema(),
          type: "registry:lib",
          target: "db/schema.ts",
        });
        files.push({
          path: "db/index.ts",
          content: generateDrizzleClient(effectiveFramework),
          type: "registry:lib",
          target: "db/index.ts",
        });
        dependencies.push("better-auth", "drizzle-orm", "postgres");
      }
    }
  }

  // Construct the Registry JSON response
  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: form.name.toLowerCase().replace(/\s+/g, "-"),
    type: "registry:block",
    title: form.name,
    description: form.description,
    files,
    registryDependencies,
    dependencies,
  };

  return NextResponse.json(registryItem);
}
