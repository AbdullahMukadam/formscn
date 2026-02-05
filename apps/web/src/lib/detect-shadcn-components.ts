/**
 * Detects which shadcn/ui components are used in generated form code
 * Returns array of component names needed for installation
 */

export interface ShadcnComponent {
  name: string;
  importPath: string;
  required: boolean;
}

const SHADCN_COMPONENT_MAP: Record<string, ShadcnComponent> = {
  Button: { name: "button", importPath: "@/components/ui/button", required: true },
  Input: { name: "input", importPath: "@/components/ui/input", required: false },
  Label: { name: "label", importPath: "@/components/ui/label", required: false },
  Form: { name: "form", importPath: "@/components/ui/form", required: true },
  Card: { name: "card", importPath: "@/components/ui/card", required: true },
  Select: { name: "select", importPath: "@/components/ui/select", required: false },
  Checkbox: { name: "checkbox", importPath: "@/components/ui/checkbox", required: false },
  RadioGroup: { name: "radio-group", importPath: "@/components/ui/radio-group", required: false },
  Textarea: { name: "textarea", importPath: "@/components/ui/textarea", required: false },
  Calendar: { name: "calendar", importPath: "@/components/ui/calendar", required: false },
  Popover: { name: "popover", importPath: "@/components/ui/popover", required: false },
  Progress: { name: "progress", importPath: "@/components/ui/progress", required: false },
};

/**
 * Analyzes code string and returns list of shadcn components used
 */
export function detectShadcnComponents(code: string): string[] {
  const components = new Set<string>();
  
  // Always include base components
  components.add("button");
  components.add("card");
  components.add("form");
  
  // Detect other components by checking if they appear in imports or JSX
  Object.entries(SHADCN_COMPONENT_MAP).forEach(([componentName, config]) => {
    // Skip already added required components
    if (config.required) return;
    
    // Check if component is imported or used in JSX
    const importRegex = new RegExp(`from ["']${config.importPath}["']`);
    const jsxRegex = new RegExp(`<${componentName}[\\s>]`);
    
    if (importRegex.test(code) || jsxRegex.test(code)) {
      components.add(config.name);
    }
  });
  
  return Array.from(components).sort();
}

/**
 * Generates the shadcn CLI installation command
 */
export function generateInstallCommand(components: string[]): string {
  const componentList = components.join(" ");
  return `npx shadcn@latest add ${componentList}`;
}

/**
 * Gets friendly description of what each component does
 */
export function getComponentDescription(componentName: string): string {
  const descriptions: Record<string, string> = {
    button: "Interactive buttons and actions",
    input: "Text input fields",
    label: "Form field labels",
    form: "Form wrapper and field components",
    card: "Container with header and content",
    select: "Dropdown selection fields",
    checkbox: "Checkboxes for boolean inputs",
    "radio-group": "Radio button groups",
    textarea: "Multi-line text input",
    calendar: "Date picker calendar",
    popover: "Floating popover container",
    progress: "Progress bars for multi-step forms",
  };
  
  return descriptions[componentName] || "shadcn/ui component";
}
