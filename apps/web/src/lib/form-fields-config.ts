import { 
  Type, 
  AlignLeft, 
  CheckSquare, 
  List,
  Calendar,
  Hash,
  Link as LinkIcon,
  Phone,
  AtSign,
  type LucideIcon 
} from "lucide-react";

export type FormFieldType = 
  | "input" 
  | "textarea" 
  | "select" 
  | "checkbox" 
  | "radio"
  | "date"
  | "number"
  | "switch";

export type InputFieldType = 
  | "text" 
  | "email" 
  | "password" 
  | "tel" 
  | "url" 
  | "number"
  | "date"
  | "time"
  | "datetime-local";

export interface FormFieldConfig {
  type: FormFieldType;
  name: string;
  label: string;
  icon: LucideIcon;
  description: string;
  defaultPlaceholder?: string;
  inputType?: InputFieldType; // For input fields
  supportsOptions?: boolean; // For select, radio
  supportsValidation?: boolean;
  category: "basic" | "advanced" | "selection";
  enabled: boolean;
}

export const FORM_FIELD_TYPES: FormFieldConfig[] = [
  // Basic Fields
  {
    type: "input",
    name: "Text Input",
    label: "Text Input",
    icon: Type,
    description: "Single-line text input",
    inputType: "text",
    defaultPlaceholder: "Enter text...",
    supportsValidation: true,
    category: "basic",
    enabled: true,
  },
  {
    type: "input",
    name: "Email Input",
    label: "Email",
    icon: AtSign,
    description: "Email address input with validation",
    inputType: "email",
    defaultPlaceholder: "email@example.com",
    supportsValidation: true,
    category: "basic",
    enabled: true,
  },
  {
    type: "input",
    name: "Password Input",
    label: "Password",
    icon: Type,
    description: "Password input field",
    inputType: "password",
    defaultPlaceholder: "Enter password...",
    supportsValidation: true,
    category: "basic",
    enabled: true,
  },
  {
    type: "input",
    name: "Phone Input",
    label: "Phone",
    icon: Phone,
    description: "Phone number input",
    inputType: "tel",
    defaultPlaceholder: "+1 (555) 000-0000",
    supportsValidation: true,
    category: "basic",
    enabled: true,
  },
  {
    type: "input",
    name: "URL Input",
    label: "URL",
    icon: LinkIcon,
    description: "Website URL input",
    inputType: "url",
    defaultPlaceholder: "https://example.com",
    supportsValidation: true,
    category: "basic",
    enabled: true,
  },
  {
    type: "textarea",
    name: "Textarea",
    label: "Textarea",
    icon: AlignLeft,
    description: "Multi-line text input",
    defaultPlaceholder: "Enter your message...",
    supportsValidation: true,
    category: "basic",
    enabled: true,
  },
  
  // Advanced Fields
  {
    type: "input",
    name: "Number Input",
    label: "Number",
    icon: Hash,
    description: "Numeric input field",
    inputType: "number",
    defaultPlaceholder: "0",
    supportsValidation: true,
    category: "advanced",
    enabled: true,
  },
  {
    type: "input",
    name: "Date Input",
    label: "Date",
    icon: Calendar,
    description: "Date picker input",
    inputType: "date",
    supportsValidation: true,
    category: "advanced",
    enabled: true,
  },
  {
    type: "date",
    name: "Calendar",
    label: "Calendar",
    icon: Calendar,
    description: "Date picker with calendar component",
    supportsValidation: true,
    category: "advanced",
    enabled: true,
  },
  
  // Selection Fields
  {
    type: "checkbox",
    name: "Checkbox",
    label: "Checkbox",
    icon: CheckSquare,
    description: "Single checkbox for boolean values",
    supportsValidation: true,
    category: "selection",
    enabled: true,
  },
  {
    type: "select",
    name: " Dropdown",
    label: "Select",
    icon: List,
    description: "Dropdown selection menu",
    defaultPlaceholder: "Select an option...",
    supportsOptions: true,
    supportsValidation: true,
    category: "selection",
    enabled: true,
  },
  {
    type: "radio",
    name: "Radio Group",
    label: "Radio",
    icon: CheckSquare,
    description: "Radio button group for single selection",
    supportsOptions: true,
    supportsValidation: true,
    category: "selection",
    enabled: true,
  },
];

/**
 * Get enabled form field types
 */
export const getEnabledFormFieldTypes = () => 
  FORM_FIELD_TYPES.filter(f => f.enabled);

/**
 * Get form field types by category
 */
export const getFormFieldTypesByCategory = (category: "basic" | "advanced" | "selection") => 
  FORM_FIELD_TYPES.filter(f => f.category === category && f.enabled);

/**
 * Get form field config by type
 */
export const getFormFieldConfig = (type: FormFieldType) => 
  FORM_FIELD_TYPES.find(f => f.type === type);

/**
 * Get form field icon
 */
export const getFormFieldIcon = (type: FormFieldType) => {
  const field = getFormFieldConfig(type);
  return field?.icon;
};
