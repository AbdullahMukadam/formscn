# FormsCN

**The Visual Form Builder for shadcn/ui.**

FormsCN is the fastest way to build production-ready forms for shadcn/ui. Design forms visually with drag-and-drop, see live preview, and export clean TypeScript code. Supports both **React Hook Form** and **TanStack Form** with full Zod validation.

## Features

- **Visual Form Builder** - Drag-and-drop editor with live preview at `/editor`
- **Schema Import** - Paste your Zod schema and auto-generate forms
- **Dual Form Library** - Toggle between React Hook Form and TanStack Form
- **Multi-Step Forms** - Built-in wizard support with state management
- **Better Auth Integration** - OAuth, 2FA, Passkeys support
- **CLI Integration** - Install any template via shadcn CLI
- **Type-Safe** - Full TypeScript with auto-generated Zod schemas
- **22 Templates** - Auth, Contact, E-commerce, Multi-step Wizards

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Frontend (Next.js 16)                          │
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Editor    │  │  Templates  │  │   Docs      │  │   Demo / Preview    │ │
│  │  /editor    │  │ /templates  │  │   /docs     │  │  /demo/form-registry│ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│         │                │                │                  │               │
│         └────────────────┴────────────────┴──────────────────┘               │
│                                    │                                        │
└────────────────────────────────────┼────────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API Layer (Next.js Route Handlers)            │
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────┐ │
│  │  /api/publish   │    │  /api/r/[id]    │    │  /api/search            │ │
│  │  POST           │    │  GET            │    │  GET                    │ │
│  │                 │    │                 │    │                         │ │
│  │ • Save Form     │    │ • Get Form      │    │ • Get Search Docs       │ │
│  │ • Generate ID   │    │ • Generate Code │    │ • Index MDX Files       │ │
│  │ • Store Config  │    │ • Auth Config    │    │                         │ │
│  └────────┬────────┘    └────────┬────────┘    └────────────┬────────────┘ │
└───────────┼──────────────────────┼──────────────────────────┼───────────────┘
            │                      │                          │
            ▼                      ▼                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Storage Layer (Multi-Tier)                       │
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────────┐ │
│  │   Redis Cache   │    │  Neon DB       │    │   Vercel Blob           │ │
│  │  (Upstash)      │    │  (PostgreSQL)  │    │                         │ │
│  │                 │    │                 │    │                         │ │
│  │ • Hot Data      │    │ • Metadata      │    │ • Form Code Storage     │ │
│  │ • 24h TTL       │    │ • Config JSON  │    │ • Public Access         │ │
│  │ • Fast Lookup   │    │ • Expiry       │    │                         │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────────────┘ │
│                                 │                                            │
│                                 ▼                                            │
│                      ┌──────────────────┐                                   │
│                      │   Local JSON     │                                   │
│                      │  (forms-db.json) │                                   │
│                      │                  │                                   │
│                      │ • Dev Fallback   │                                   │
│                      │ • File Storage   │                                   │
│                      └──────────────────┘                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## API Reference

### POST /api/publish

Publish a form and generate a shareable ID.

**Request Body:**
```json
{
  "name": "Login Form",
  "description": "Simple email and password login",
  "code": "export function LoginForm() { ... }",
  "config": {
    "fields": [...],
    "oauthProviders": ["google", "github"],
    "databaseAdapter": "drizzle",
    "framework": "next",
    "plugins": {}
  },
  "dependencies": ["https://formscn.space/r/base-form.json"]
}
```

**Response:**
```json
{
  "id": "abc123xyz"
}
```

**Usage:** `npx shadcn@latest add https://formscn.space/r/abc123xyz.json`

---

### GET /api/r/[id]

Retrieve a published form as a shadcn registry JSON.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `framework` | string | Target framework: `next`, `react`, `remix`, `tanstack` |

**Response:**
```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "login-form",
  "title": "Login Form",
  "description": "Simple email and password login",
  "type": "registry:block",
  "files": [
    {
      "path": "components/forms/login-form.tsx",
      "content": "...",
      "type": "registry:block"
    }
  ],
  "registryDependencies": ["https://formscn.space/r/auth-client.json"],
  "dependencies": ["react-hook-form", "zod", "better-auth"]
}
```

---

### GET /api/search

Get searchable documentation index for the search dialog.

**Response:**
```json
[
  {
    "slug": "getting-started",
    "title": "Getting Started",
    "description": "Learn how to use FormsCN",
    "content": "...",
    "sections": [
      {
        "heading": "Installation",
        "slug": "installation",
        "content": "..."
      }
    ],
    "url": "/docs/getting-started"
  }
]
```

---

### GET /api/cron/cleanup

Cleanup expired forms (runs periodically).

**Response:**
```json
{
  "count": 5
}
```

## Quick Start

### Option 1: Visual Builder (Recommended)

1. Run the development server:
   ```bash
   pnpm dev
   ```
2. Open [http://localhost:3001/editor](http://localhost:3001/editor)
3. Choose a template or start from scratch
4. Customize fields, validation, and theme
5. Toggle between React Hook Form / TanStack Form
6. Click **Publish** to get your installation command

### Option 2: CLI Installation

Install any template directly:

```bash
# Authentication
npx shadcn@latest add https://formscn.space/r/login-form.json
npx shadcn@latest add https://formscn.space/r/signup-form.json
npx shadcn@latest add https://formscn.space/r/password-reset.json

# Contact & Forms
npx shadcn@latest add https://formscn.space/r/contact-form.json
npx shadcn@latest add https://formscn.space/r/support-ticket.json

# Multi-Step Wizards
npx shadcn@latest add https://formscn.space/r/onboarding-wizard.json
npx shadcn@latest add https://formscn.space/r/detailed-application.json

# E-commerce
npx shadcn@latest add https://formscn.space/r/ecommerce-checkout.json
```

### Option 3: Import from Schema

In the editor, click "Import Schema" and paste your Zod schema:

```typescript
z.object({
  email: z.string().email(),
  phone: z.string(),
  message: z.string().min(10)
})
```

## Available Templates (22 total)

### Authentication (8)
- Login Form, Signup Form, Password Reset, Change Password
- Two-Factor Setup, Organization Invite, Passkey Management, Profile Settings

### Contact & Support (7)
- Contact Form, Support Ticket, Feedback Form, Booking Request
- Waitlist, Newsletter, Event Registration

### Profile & Settings (1)
- Address Form

### E-commerce (1)
- Checkout Form

### Multi-Step Wizards (2)
- Onboarding Wizard, Detailed Application

### Jobs (1)
- Job Application

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui + Base UI
- **Form Libraries**: React Hook Form + TanStack Form
- **Validation**: Zod
- **Auth**: Better Auth
- **Database**: Neon (PostgreSQL) + Drizzle ORM
- **Cache**: Upstash Redis
- **Storage**: Vercel Blob
- **Animations**: Framer Motion
- **Monorepo**: Turborepo + pnpm

## Project Structure

```
formcn/
├── apps/
│   └── web/                    # Next.js 16 web application
│       ├── src/
│       │   ├── app/           # App router pages
│       │   │   ├── editor/    # Visual form builder
│       │   │   ├── templates/ # Template gallery
│       │   │   ├── docs/      # Documentation
│       │   │   ├── demo/      # Demo pages
│       │   │   └── api/      # API routes
│       │   ├── components/   # React components
│       │   │   ├── editor/    # Visual form builder components
│       │   │   └── ui/        # shadcn/ui components
│       │   ├── hooks/         # React hooks (useFormEditor)
│       │   ├── lib/           # Utilities
│       │   │   ├── form-editor/     # FormEditor class
│       │   │   ├── form-storage.ts   # Multi-tier storage
│       │   │   ├── search.ts         # MDX search index
│       │   │   └── form-generator.ts # Code generation
│       │   └── registry/      # Templates and form generator
│       └── public/r/          # Registry JSON files for CLI
├── packages/
│   ├── ui/                    # @formscn/ui - Component library
│   ├── form-registry/         # Runtime form registry (Storybook)
│   └── env/                   # Environment configuration
└── turbo.json                 # Turborepo configuration
```

## Architecture Details

### FormEditor Class

The core state management using class-based architecture:

```
lib/form-editor/form-editor.ts
├── createInitialState()     # Initialize from template
├── getState()               # Get current state snapshot
├── subscribe()              # Subscribe to state changes
├── setState()               # Update state and notify
├── getGetters()             # Computed properties
├── addField()               # Add field to form
├── removeField()            # Remove field
├── updateField()            # Update field properties
├── toggleMultiStep()        # Enable/disable wizard mode
├── toggleOAuth()            # Enable OAuth providers
└── setFormLibrary()         # Switch RHF / TanStack
```

### React Integration

```
hooks/use-form-editor.ts
├── useSyncExternalStore()   # Bridge class to React
├── memoized state           # Immutable state for re-renders
├── bound actions           # Pre-bound action handlers
└── FormEditor Instance     # Combined state + actions
```

### Multi-Tier Storage

```
form-storage.ts
├── Tier 1: Memory Cache     # Fastest, in-process Map
├── Tier 2: Redis            # Upstash, 24h TTL
├── Tier 3: Neon DB         # PostgreSQL, metadata + fallback
├── Tier 4: Vercel Blob      # Large code storage
└── Tier 5: Local JSON       # Development fallback
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
pnpm install
```

### Development

```bash
# Run all apps in development
pnpm dev

# Run only the web app (port 3001)
pnpm --filter web dev

# Run only UI package
pnpm --filter formscn-ui dev

# Run form-registry Storybook
pnpm --filter form-registry storybook
```

### Build

```bash
pnpm build
```

### Available Scripts

- `pnpm dev` - Run all apps in development
- `pnpm build` - Build all packages and apps
- `pnpm check-types` - Check TypeScript types
- `pnpm --filter web registry:build` - Build the CLI registry

## Environment Variables

Create `.env` in `apps/web/`:

```env
# Database
DATABASE_URL=your-neon-connection-string

# Auth
BETTER_AUTH_SECRET=your-secret-key

# Storage (optional)
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# Cache (optional)
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm check-types` and `pnpm build`
5. Submit a PR

## License

MIT

---

Built with ❤️ for the shadcn/ui community.