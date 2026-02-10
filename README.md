# FormSCN

**The Visual Form Builder for shadcn/ui.**

FormSCN is the fastest way to build production-ready forms for shadcn/ui. Design forms visually with drag-and-drop, see live preview, and export clean TypeScript code. Supports both **React Hook Form** and **TanStack Form** with full Zod validation.

## Features

- **Visual Form Builder** - Drag-and-drop editor with live preview
- **20+ Templates** - Auth, Contact, E-commerce, Multi-step Wizards, and more
- **Dual Form Library Support** - Toggle between React Hook Form and TanStack Form
- **Multi-Step Forms** - Built-in wizard support with state management
- **Schema Import** - Paste your Zod schema and auto-generate forms
- **Smart Components** - Phone inputs with country flags, email validation, etc.
- **CLI Integration** - Install forms via `npx shadcn add`
- **Type-Safe** - Full TypeScript with auto-generated Zod schemas
- **Optional Auth** - Better Auth integration when you need it (OAuth, 2FA, Passkeys)
- **Framework Agnostic Output** - Next.js, Vite, Remix, TanStack Start

## Quick Start

### Option 1: Visual Builder (Recommended)

1. Visit [formscn.space/editor](https://formscn.space/editor)
2. Choose a template or start from scratch
3. Customize fields, validation, and theme
4. Toggle between React Hook Form / TanStack Form
5. Click **"Publish"** to get your installation command

### Option 2: Import from Schema

Paste your existing Zod schema and instantly get a working form:

```typescript
z.object({
  email: z.string().email(),
  phone: z.string(),
  message: z.string().min(10)
})
```

### Option 3: CLI Installation

Install any template directly:

```bash
# Authentication, confirm the url throught builder
npx shadcn@latest add https://formscn.space/r/login-form.json
npx shadcn@latest add https://formscn.space/r/signup-form.json
npx shadcn@latest add https://formscn.space/r/password-reset.json

# Contact & Forms
npx shadcn@latest add https://formscn.space/r/contact-form.json
npx shadcn@latest add https://formscn.space/r/support-ticket.json

# Multi-Step Wizards
npx shadcn@latest add https://formscn.space/r/onboarding-wizard.json
npx shadcn@latest add https://formscn.space/r/detailed-application.json
```

## Available Templates

### Authentication (6 templates)
- Login Form
- Signup Form
- Password Reset
- Change Password
- Two-Factor Setup
- Passkey Management

### Contact & Support (7 templates)
- Contact Form
- Support Ticket
- Feedback Form
- Booking Request
- Waitlist
- Newsletter
- Event Registration

### Profile & Settings (2 templates)
- Profile Settings
- Address Form

### E-commerce (1 template)
- Checkout Form

### Multi-Step Wizards (2 templates)
- Onboarding Wizard
- Detailed Application

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui + Base UI
- **Form Libraries**: React Hook Form + TanStack Form
- **Validation**: Zod
- **Phone Input**: react-phone-number-input + libphonenumber-js
- **Animations**: Framer Motion
- **Monorepo**: Turborepo + pnpm
- **Package Manager**: pnpm 10

## Architecture

FormSCN uses a scalable, class-based architecture:

```
├── hooks/form-editor/
│   ├── form-editor.ts      # Core state management class
│   ├── types.ts            # TypeScript interfaces
│   └── index.ts            # React hook wrapper
├── components/editor/
│   ├── form-editor.tsx     # Main component
│   ├── editor-sidebar.tsx  # Field configuration
│   ├── form-preview.tsx    # Live preview
│   └── form-header.tsx     # Navigation
└── lib/
    ├── schema-string-parser.ts  # Zod schema import
    └── templates/
```

## 🗺️ Roadmap

- [x] Visual form builder with live preview
- [x] Multi-step form wizard support
- [x] React Hook Form + TanStack Form support
- [x] 20+ production templates
- [x] Schema import from Zod
- [x] Phone input with international support
- [x] Scalable class-based architecture
- [ ] Conditional field logic
- [ ] AI-powered form generation
- [ ] Collaborative editing
- [ ] Version history

## Contributing

We love contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for:

- Setting up the development environment
- Adding new templates
- Code style guidelines
- Submitting PRs

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ❤️ for the shadcn/ui community.
