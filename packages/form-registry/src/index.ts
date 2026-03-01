// ============================================================================
// Form Registry - Runtime form rendering from Zod schemas
// ============================================================================

export { Form } from "./components/Form";
export { zodSchemaToFields } from "./resolvers/zod";

// Field components
export { InputField } from "./components/fields/InputField";
export { TextareaField } from "./components/fields/TextareaField";
export { SelectField } from "./components/fields/SelectField";
export { CheckboxField } from "./components/fields/CheckboxField";
export { SwitchField } from "./components/fields/SwitchField";
export { RadioGroupField } from "./components/fields/RadioGroupField";
export { DateField } from "./components/fields/DateField";

// Types
export type {
  FieldType,
  InputType,
  FormField,
  FieldValidation,
  UIConfig,
  FieldComponentProps,
  FieldComponent,
  ComponentRegistry,
  ZodFieldMeta,
  ValidationError,
  FormErrors,
} from "./types";
