# FormsCN

**FormsCN** is an open-source, shadcn/ui-inspired form builder and registry. Build production-ready forms in seconds with our visual editor, or install pre-built templates via CLI.

## Features

-  **Visual Form Builder** - Drag-and-drop editor with live preview
-  **Rich Templates** - 10+ templates including Auth, Multi-step Wizards, and E-commerce
-  **Multi-Step Forms** - Built-in support for wizard-style flows with state management
-  **CLI Integration** - Install forms directly into your codebase with `shadcn add`
-  **Type-Safe** - Full TypeScript support with React Hook Form and Zod
-  **Authentication** - Integrated with Better Auth (OAuth, Email/Pass)
-  **Database Ready** - Generates schemas for Prisma and Drizzle
-  **Dark Mode** - Automatic theme support

## Quick Start

### 1. Visual Builder (Recommended)

1.  Visit the [Visual Builder](https://formscn.space/editor).
2.  Choose a template or start from scratch.
3.  Customize fields, validation, and authentication settings.
4.  Click **"Publish"** to get your unique installation command.

### 2. CLI Installation

You can install any standard template directly:

```bash
# Install a login form
npx shadcn@latest add https://formscn.space/r/login-form.json

# Install a multi-step onboarding wizard
npx shadcn@latest add https://formscn.space/r/onboarding-wizard-form.json
```

## Available Templates

### Authentication
- **Login Form** (`login-form`)
- **Signup Form** (`signup-form`)

### Multi-Step Wizards
- **Onboarding Wizard** (`onboarding-wizard-form`)
- **Detailed Application** (`detailed-application-form`)

### E-commerce
- **Checkout Form** (`ecommerce-checkout-form`)

### Contact & Support
- **Contact Form** (`contact-form`)
- **Support Ticket** (`support-ticket-form`)
- **Booking Request** (`booking-request-form`)
- **Waitlist** (`waitlist-form`)

### Surveys
- **Feedback Form** (`feedback-form`)
- **Event Registration** (`event-registration-form`)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **UI Components**: shadcn/ui
- **Auth**: Better Auth
- **Monorepo**: Turborepo

## Roadmap

- [x] Registry system with shadcn CLI integration
- [x] Visual form builder with live preview
- [x] Multi-step form wizard support
- [x] Auth & Database integration (Prisma/Drizzle)
- [ ] Conditional field logic
- [ ] Drag-and-drop step reordering
- [ ] AI-powered form generation

    
## Contributing

We love contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to get started with setting up the project and adding new templates.

## License

MIT
