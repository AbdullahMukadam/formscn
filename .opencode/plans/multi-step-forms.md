# Implementation Plan: Multi-Step Forms

## 1. Type Definitions (`apps/web/src/registry/default/types.ts`)
Update `FormTemplate` to include `steps?: FormStep[]`.

```typescript
export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface FormTemplate {
  // ... existing props
  steps?: FormStep[];
}
```

## 2. Generator Logic (`apps/web/src/registry/default/lib/form-generator.ts`)
Refactor `generateFormComponent` to support steps:
*   State: `const [step, setStep] = useState(0)`
*   Validation: Validate only current step fields before next.
*   UI: Stepper indicator, conditional rendering of fields.
*   Navigation: Back/Next/Submit buttons.

## 3. Form Preview (`apps/web/src/components/editor/form-preview.tsx`)
Update preview to simulate multi-step navigation.

## 4. New Templates
Create:
*   `onboarding-wizard.ts`
*   `detailed-application.ts`

## 5. Registry & Build
*   Generate components.
*   Update `registry.json`.
*   Build registry.
