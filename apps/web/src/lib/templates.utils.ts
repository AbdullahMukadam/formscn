import { CATEGORY_PATTERNS } from "@/constants/template";
import type { FormTemplate, FormField, FormStep } from "@/lib/form-templates";
import type { CategorizedTemplate, TemplateCategory } from "@/types/templates";


export function getTemplateCategory(templateName: string): TemplateCategory {
  const nameLower = templateName.toLowerCase();
  
  for (const [category, patterns] of Object.entries(CATEGORY_PATTERNS)) {
    if (category === "all") continue;
    
    if (patterns.some(pattern => nameLower.includes(pattern))) {
      return category as TemplateCategory;
    }
  }
  
  return "contact"; // default fallback
}

export function calculateFieldCount(template: FormTemplate): number {
  if (template.steps?.length) {
    return template.steps.reduce(
      (acc, step) => acc + (step.fields?.length || 0), 
      0
    );
  }
  
  return template.fields?.length || 0;
}


export function detectShadcnComponents(template: FormTemplate): string[] {
  const components = new Set<string>(["button", "form", "card"]);
  
  const fields = template.fields || [];
  
  fields.forEach((field: FormField) => {
    switch (field.type) {
      case "input":
        components.add("input");
        if (field.inputType === "email") components.add("input");
        if (field.inputType === "password") components.add("input");
        break;
      case "textarea":
        components.add("textarea");
        break;
      case "select":
        components.add("select");
        break;
      case "checkbox":
        components.add("checkbox");
        break;
      case "radio":
        components.add("radio-group");
        break;
      case "date":
        components.add("calendar");
        components.add("popover");
        break;
    }
    
    // Check uiType for additional components
    if (field.uiType === "phone") {
      components.add("phone-input");
    }
  });
  
  return Array.from(components);
}


export function filterTemplates(
  templates: FormTemplate[],
  searchQuery: string,
  category: TemplateCategory
): CategorizedTemplate[] {
  const query = searchQuery.toLowerCase().trim();
  
  return templates
    .map((template): CategorizedTemplate => ({
      ...template,
      category: getTemplateCategory(template.name),
      stats: {
        fieldCount: calculateFieldCount(template),
        isWizard: !!template.steps?.length,
        components: detectShadcnComponents(template),
      },
    }))
    .filter((template) => {
      // Category filter
      if (category !== "all" && template.category !== category) {
        return false;
      }
      
      // Search filter
      if (query) {
        const nameMatch = template.name.toLowerCase().includes(query);
        const descMatch = template.description.toLowerCase().includes(query);
        
        if (!nameMatch && !descMatch) {
          return false;
        }
      }
      
      return true;
    });
}
