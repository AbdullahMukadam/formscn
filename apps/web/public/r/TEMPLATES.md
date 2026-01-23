# FormSCN Template Installation Guide

## Available Form Templates

### Authentication Forms

#### Signup Form
User registration with email, password, and terms acceptance.

**Install:**
```bash
pnpx shadcn@latest add @formscn/signup-form
```

**Features:**
- Full Name field
- Email validation
- Password with confirmation
- Terms and conditions checkbox
- Complete Zod validation

---

#### Login Form
Simple email and password login.

**Install:**
```bash
pnpx shadcn@latest add @formscn/login-form
```

**Features:**
- Email validation
- Password field
- Remember me checkbox
- Clean, minimal design

---

### Contact Forms

#### Contact Form
Contact form with name, email, subject, and message.

**Install:**
```bash
pnpx shadcn@latest add @formscn/contact-form
```

**Features:**
- Name and email fields
- Subject line
- Message textarea
- Full validation

---

## Usage

After installation, import and use in your app:

```tsx
import { SignupForm } from "@/components/forms/signup-form";
import { LoginForm } from "@/components/forms/login-form";
import { ContactForm } from "@/components/forms/contact-form";

export default function Page() {
  return (
    <div className="container mx-auto py-10">
      <SignupForm />
    </div>
  );
}
```

## Package Manager Options

All templates support all package managers:

```bash
# pnpm
pnpx shadcn@latest add @formscn/signup-form

# npm
npx shadcn@latest add @formscn/signup-form

# yarn
yarn dlx shadcn@latest add @formscn/signup-form

# bun
bunx shadcn@latest add @formscn/signup-form
```
