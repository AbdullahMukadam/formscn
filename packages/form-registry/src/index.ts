/**
 * Form Registry - Runtime form registry for rendering forms from Zod schemas
 * 
 * @example
 * import { Form } from "form-registry";
 * import { z } from "zod";
 * 
 * const schema = z.object({
 *   name: z.string().min(1),
 *   email: z.string().email(),
 * });
 * 
 * function App() {
 *   return (
 *     <Form
 *       schema={schema}
 *       title="Contact Form"
 *       onSubmit={(values) => console.log(values)}
 *     />
 *   );
 * }
 */

// Main Form component
export { Form } from "./components/Form";

// Convert Zod schema to field configuration
export { zodSchemaToFields } from "./resolvers/zod";

// Field components (for custom field rendering)
export { InputField } from "./components/fields/InputField";
export { TextareaField } from "./components/fields/TextareaField";
export { SelectField } from "./components/fields/SelectField";
export { CheckboxField } from "./components/fields/CheckboxField";
export { SwitchField } from "./components/fields/SwitchField";
export { RadioGroupField } from "./components/fields/RadioGroupField";
export { DateField } from "./components/fields/DateField";

// Types
export type {
  /** Field type (input, textarea, select, checkbox, etc.) */
  FieldType,
  /** Input type (text, email, password, tel, etc.) */
  InputType,
  /** Form field configuration */
  FormField,
  /** Field validation rules */
  FieldValidation,
  /** UI configuration for field rendering */
  UIConfig,
  /** Props passed to field components */
  FieldComponentProps,
  /** Custom field component type */
  FieldComponent,
  /** Registry for custom field components */
  ComponentRegistry,
  /** Zod schema metadata */
  ZodFieldMeta,
  /** Validation error type */
  ValidationError,
  /** Form errors map */
  FormErrors,
} from "./types";
