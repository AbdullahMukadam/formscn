# FormSCN Registry

A comprehensive form building registry for React applications with Better Auth integration.

## Quick Start

### Install Complete Form (Recommended)

Install everything you need with a single command:

```bash
pnpx shadcn@latest add @formcn/complete-form
```

This single command installs:
- ✅ Form components (`form-input`, `form-utils`)
- ✅ Better Auth configuration (`auth.ts`)
- ✅ Auth client utilities (`auth-client.ts`)
- ✅ All required dependencies (`better-auth`, `zod`, `react-hook-form`, etc.)

### What Gets Installed

#### File Structure
```
your-project/
├── components/
│   └── formcn/
│       ├── form-input.tsx
│       └── form-utils.ts
└── lib/
    ├── auth.ts           # Better Auth server config
    └── auth-client.ts    # Better Auth client utilities
```

#### Dependencies
```json
{
  "dependencies": {
    "better-auth": "^latest",
    "react-hook-form": "^latest",
    "@hookform/resolvers": "^latest",
    "zod": "^latest",
    "lucide-react": "^latest",
    "sonner": "^latest"
  }
}
```

## Configuration

### 1. Database Setup

The auth configuration requires a database connection. Update `lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // Import your Drizzle instance

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
```

### 2. Environment Variables

Add to your `.env.local`:

```env
# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# GitHub OAuth (if using GitHub auth)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth (if using Google auth)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 3. Use in Your Application

```tsx
import { MyForm } from "@/components/my-form";
import { useSession } from "@/lib/auth-client";

export default function Page() {
  const { data: session } = useSession();
  
  return (
    <div>
      {session ? (
        <p>Welcome, {session.user.email}</p>
      ) : (
        <MyForm />
      )}
    </div>
  );
}
```

## Individual Component Installation

You can also install components individually:

```bash
# Form components only
pnpx shadcn@latest add @formcn/form-input

# Better Auth setup only
pnpx shadcn@latest add @formcn/auth-config

# Auth client only
pnpx shadcn@latest add @formcn/auth-client

# Form utilities
pnpx shadcn@latest add @formcn/form-utils

# Hooks
pnpx shadcn@latest add @formcn/use-form-persistence
pnpx shadcn@latest add @formcn/use-form-progress
pnpx shadcn@latest add @formcn/use-field-dependencies
```

## Form Builder

Use our visual form builder at [https://formscn.dev/editor](https://formscn.dev/editor) to:

1. **Design Forms Visually** - Drag and drop fields, configure properties
2. **Configure OAuth** - Enable GitHub, Google, and other providers
3. **Export Code** - Get production-ready code with Better Auth integration
4. **One-Click Install** - Copy a single CLI command to install everything

## Features

- ✨ **Type-Safe Forms** - Full TypeScript and Zod validation
- 🔐 **Built-in Auth** - Better Auth integration out of the box
- 🎨 **Customizable** - Built on shadcn/ui components
- ♿ **Accessible** - WCAG compliant with Radix UI primitives
- 📦 **Tree-Shakeable** - Only bundle what you use
- 🚀 **Production Ready** - Battle-tested patterns and best practices

## Registry Structure

```json
{
  "name": "formcn",
  "homepage": "https://formscn.dev",
  "items": [
    {
      "name": "complete-form",
      "type": "registry:block",
      "description": "Complete form with Better Auth - everything in one command"
    },
    {
      "name": "form-input",
      "type": "registry:ui",
      "description": "Enhanced input with React Hook Form integration"
    },
    {
      "name": "auth-config",
      "type": "registry:lib",
      "description": "Better Auth server configuration"
    },
    {
      "name": "auth-client",
      "type": "registry:lib",
      "description": "Better Auth React client utilities"
    }
  ]
}
```

## Contributing

Visit [https://github.com/formcn/formcn](https://github.com/formcn/formcn) to contribute.

## License

MIT
