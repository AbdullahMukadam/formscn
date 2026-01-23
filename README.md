# Formcn - Form Components for React

**Formcn** is an open-source, shadcn/ui-inspired form component library with a visual builder. Build forms faster with pre-built components and templates.

## Features

- 🎨 **Visual Form Builder** - Customize forms with an intuitive editor
- 📦 **Pre-built Templates** - Signup, login, contact forms, and more
- 🔧 **CLI Installation** - Install components via `shadcn` CLI
- ✨ **React Hook Form + Zod** - Built-in validation and type safety
- 🎯 **TypeScript First** - Full type safety
- 🌙 **Dark Mode** - Automatic theme support
- 📋 **Code Export** - Copy production-ready code or install via CLI

## Quick Start

### 1. Browse Templates

Visit [http://localhost:3001](http://localhost:3001) to browse pre-built form templates.

### 2. Open in Builder

Click "Open in Builder" on any template to customize it in the visual editor.

### 3. Export Your Form

Choose from two export options:
- **Code Tab**: Copy the generated React component code
- **CLI Tab**: Follow instructions to install via shadcn CLI

## Development

This is a Turborepo monorepo with the following structure:

```
formcn/
├── apps/
│   └── web/              # Next.js app (builder + registry)
│       ├── src/
│       │   ├── app/      # Pages
│       │   ├── components/ # UI components
│       │   ├── registry/  # Form component source
│       │   │   └── default/
│       │   │       ├── ui/     # Form components
│       │   │       ├── lib/    # Utilities
│       │   │       └── hooks/  # Custom hooks
│       │   └── lib/      # Helpers
│       └── public/r/     # Built registry files
└── packages/
    ├── config/           # Shared configs
    └── env/              # Environment variables
```

### Running Locally

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build registry
cd apps/web
pnpm registry:build
```

## Available Components

### Form Inputs
- `form-input` - Enhanced input with validation
- `form-textarea` - Text area with auto-resize

### Hooks
- `use-form-persistence` - LocalStorage form persistence
- `use-form-progress` - Track form completion
- `use-field-dependencies` - Conditional field logic

### Utilities
- `form-utils` - Helper functions

## Form Templates

1. **Signup Form** - User registration with validation
2. **Login Form** - Email and password authentication
3. **Contact Form** - Name, email, subject, and message
4. **Newsletter Form** - Email subscription with frequency selector

## Using Components in Your Project

### 1. Configure Registry

Add to your `components.json`:

```json
{
  "registries": {
    "@formcn": "http://localhost:3001/r/{name}.json"
  }
}
```

### 2. Install Components

```bash
pnpx shadcn@latest add @formcn/form-input
pnpx shadcn@latest add @formcn/use-form-persistence
```

### 3. Use in Your Forms

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormInput } from "@/components/formcn/form-input";

const schema = z.object({
  email: z.string().email(),
});

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <FormInput
      control={form.control}
      name="email"
      label="Email"
      required
    />
  );
}
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Forms**: React Hook Form + Zod
- **UI Components**: shadcn/ui
- **Monorepo**: Turborepo
- **Package Manager**: pnpm

## Roadmap

- [x] Registry system with shadcn CLI integration
- [x] Core form components (Input, Textarea)
- [x] Form templates (Signup, Login, Contact, Newsletter)
- [x] Visual form builder with live preview
- [x] Code export with tabs (Code, CLI)
- [ ] More form components (Select, Checkbox, Radio, Switch)
- [ ] Multi-step form wizard
- [ ] Conditional field logic component
- [ ] Field array (dynamic repeating fields)
- [ ] File upload component
- [ ] Advanced validation patterns
- [ ] Form analytics
- [ ] AI-powered form generation

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
