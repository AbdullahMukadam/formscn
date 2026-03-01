import type { ReactNode } from "react";
import type { ZodTypeAny, z } from "zod";

// ============================================================================
// Field Types
// ============================================================================

export type FieldType =
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "switch"
  | "radio"
  | "date"
  | "number"
  | "file";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "url"
  | "number"
  | "date";

// ============================================================================
// Field Configuration
// ============================================================================

export interface FormField {
  name: string;
  type: FieldType;
  label: string;
  required: boolean;
  placeholder?: string;
  description?: string;
  inputType?: InputType;
  options?: Array<{ label: string; value: string }>;
  accept?: string;
  validation?: FieldValidation;
  uiConfig?: UIConfig;
}

export interface FieldValidation {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  email?: boolean;
  url?: boolean;
}

export interface UIConfig {
  rows?: number;
  country?: string;
  icon?: string;
  accept?: string;
}

// ============================================================================
// Form Props
// ============================================================================

export interface FormProps<T extends ZodTypeAny> {
  schema: T;
  onSubmit: (values: z.infer<T>) => void | Promise<void>;
  defaultValues?: Partial<z.infer<T>>;
  className?: string;
  children?: ReactNode;
}

export interface CardFeildProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

// ============================================================================
// Component Registry
// ============================================================================

export interface FieldComponentProps {
  field: FormField;
  value: unknown;
  onChange: (value: unknown) => void;
  onBlur: () => void;
  error?: string;
}

export type FieldComponent = (props: FieldComponentProps) => ReactNode;

export interface ComponentRegistry {
  input: FieldComponent;
  textarea: FieldComponent;
  select: FieldComponent;
  checkbox: FieldComponent;
  switch: FieldComponent;
  radio: FieldComponent;
  date: FieldComponent;
  number: FieldComponent;
  file: FieldComponent;
  card: FieldComponent;
}

// ============================================================================
// Zod Meta Support
// ============================================================================

export interface ZodFieldMeta {
  label?: string;
  placeholder?: string;
  description?: string;
  inputType?: InputType;
  rows?: number;
  country?: string;
  icon?: string;
}

// ============================================================================
// Validation
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
}

export type FormErrors = Record<string, string>;
