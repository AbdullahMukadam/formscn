import type { FormField } from "@/registry/default/types";

/**
 * Parse a Zod schema string and extract form fields
 * Handles complex schemas with multi-line definitions, arrays, and nested validations
 */
export function parseZodSchemaString(schemaString: string): FormField[] {
  const fields: FormField[] = [];

  // Step 1: Clean up the input but preserve structure
  const cleanSchema = schemaString
    .replace(/\/\/.*$/gm, "") // Remove single line comments
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
    .trim();

  // Step 2: Extract the content inside z.object({...})
  // This regex handles nested braces by counting them
  const objectMatch = extractObjectContent(cleanSchema);
  
  if (!objectMatch) {
    throw new Error("Could not find z.object(...) in schema. Make sure your schema starts with z.object({");
  }

  // Step 3: Parse individual fields
  const fieldEntries = parseFieldEntriesImproved(objectMatch);

  for (const { name, definition } of fieldEntries) {
    const field = parseFieldDefinitionImproved(name, definition);
    if (field) {
      fields.push(field);
    }
  }

  return fields;
}

/**
 * Extract content inside z.object({...}) handling nested braces
 */
function extractObjectContent(schema: string): string | null {
  const startIdx = schema.indexOf("z.object");
  if (startIdx === -1) return null;

  // Find the opening brace after z.object
  let braceStart = schema.indexOf("(", startIdx);
  if (braceStart === -1) return null;
  
  // Skip whitespace and find the opening {
  let i = braceStart + 1;
  while (i < schema.length && /\s/.test(schema[i])) i++;
  if (schema[i] !== "{") return null;
  
  // Now count braces to find the matching close brace
  let braceCount = 1;
  let contentStart = i + 1;
  i++;
  
  while (i < schema.length && braceCount > 0) {
    if (schema[i] === "{" && schema[i-1] !== "$") braceCount++;
    else if (schema[i] === "}" && schema[i-1] !== "$") braceCount--;
    i++;
  }
  
  if (braceCount !== 0) return null;
  
  return schema.substring(contentStart, i - 1);
}

/**
 * Parse individual field entries - handles multi-line and complex definitions
 */
function parseFieldEntriesImproved(content: string): Array<{ name: string; definition: string }> {
  const entries: Array<{ name: string; definition: string }> = [];
  
  // Split by commas, but be careful about commas inside strings or objects
  const lines = content.split(",");
  let currentEntry = "";
  let braceDepth = 0;
  let parenDepth = 0;
  let inString = false;
  let stringChar = "";
  
  for (const line of lines) {
    currentEntry += (currentEntry ? "," : "") + line;
    
    // Track depth
    for (const char of line) {
      if (!inString) {
        if (char === '"' || char === "'" || char === "`") {
          inString = true;
          stringChar = char;
        } else if (char === "{") {
          braceDepth++;
        } else if (char === "}") {
          braceDepth--;
        } else if (char === "(") {
          parenDepth++;
        } else if (char === ")") {
          parenDepth--;
        }
      } else {
        if (char === stringChar) {
          inString = false;
        }
      }
    }
    
    // If we're back to root level, this entry is complete
    if (braceDepth === 0 && parenDepth === 0 && !inString) {
      const trimmed = currentEntry.trim();
      if (trimmed) {
        // Extract field name and definition
        const colonIdx = trimmed.indexOf(":");
        if (colonIdx !== -1) {
          const name = trimmed.substring(0, colonIdx).trim();
          const definition = trimmed.substring(colonIdx + 1).trim();
          if (name && definition) {
            entries.push({ name, definition });
          }
        }
      }
      currentEntry = "";
    }
  }
  
  return entries;
}

/**
 * Parse a single field definition and create FormField
 */
function parseFieldDefinitionImproved(name: string, definition: string): FormField | null {
  const defLower = definition.toLowerCase();
  
  // Check for optional
  const isOptional = definition.includes(".optional()");
  const isRequired = !isOptional;

  // Determine base type from definition
  let baseType: string;
  let uiType: string;
  
  if (defLower.includes("z.array")) {
    baseType = "array";
    uiType = inferArrayUIType(name, definition);
  } else if (defLower.includes("z.number")) {
    baseType = "number";
    uiType = "number";
  } else if (defLower.includes("z.boolean")) {
    baseType = "boolean";
    uiType = "checkbox";
  } else if (defLower.includes("z.date")) {
    baseType = "date";
    uiType = "date";
  } else if (defLower.includes("z.enum")) {
    baseType = "enum";
    uiType = "select";
  } else if (defLower.includes("z.string")) {
    baseType = "string";
    uiType = inferStringUIType(name, definition);
  } else {
    // Default fallback
    baseType = "string";
    uiType = inferUITypeFromName(name);
  }

  const field: FormField = {
    type: mapUITypeToFieldType(uiType),
    name,
    label: formatLabel(name),
    required: isRequired,
    inputType: mapUITypeToInputType(uiType),
    uiType,
    uiConfig: {},
    placeholder: generatePlaceholder(name, uiType),
  };

  // Extract and apply validation info
  applyValidationInfo(field, definition);

  // Handle special types
  if (uiType === "phone") {
    field.uiConfig = { country: "US" as const };
  }

  if (uiType === "textarea") {
    const maxMatch = definition.match(/\.max\s*\(\s*(\d+)\s*\)/);
    if (maxMatch) {
      const max = parseInt(maxMatch[1]);
      field.uiConfig = { rows: max > 500 ? 8 : 4 };
    } else {
      field.uiConfig = { rows: 4 };
    }
  }

  // Handle enum types
  if (baseType === "enum") {
    parseEnumOptions(field, definition);
  }

  // Handle arrays (for now, treat as multi-select or tags)
  if (baseType === "array") {
    field.type = "select";
    field.options = [{ label: "Item 1", value: "item1" }]; // Placeholder
  }

  return field;
}

/**
 * Infer UI type for string fields based on validation
 */
function inferStringUIType(name: string, definition: string): string {
  const nameLower = name.toLowerCase();
  const defLower = definition.toLowerCase();

  // Check for specific validation patterns first
  if (defLower.includes(".email(")) return "email";
  if (defLower.includes(".url(")) return "url";
  
  // Check field name patterns
  if (nameLower.includes("email")) return "email";
  if (nameLower.includes("phone") || nameLower.includes("tel") || nameLower.includes("mobile")) return "phone";
  if (nameLower.includes("password") || nameLower.includes("pass")) return "password";
  if (nameLower.includes("url") || nameLower.includes("website") || nameLower.includes("link")) return "url";
  
  // Check for textarea indicators
  if (nameLower.includes("message") || nameLower.includes("bio") || nameLower.includes("description") || 
      nameLower.includes("comment") || nameLower.includes("letter") || nameLower.includes("note")) {
    return "textarea";
  }
  
  // Check if min/max suggests textarea
  const maxMatch = definition.match(/\.max\s*\(\s*(\d+)\s*\)/);
  if (maxMatch && parseInt(maxMatch[1]) >= 200) {
    return "textarea";
  }

  return "text";
}

/**
 * Infer UI type for array fields
 */
function inferArrayUIType(name: string, definition: string): string {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes("skill") || nameLower.includes("tag") || nameLower.includes("category")) {
    return "select"; // Multi-select for skills/tags
  }
  
  return "select";
}

/**
 * Infer UI type from field name only (fallback)
 */
function inferUITypeFromName(name: string): string {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes("email")) return "email";
  if (nameLower.includes("phone") || nameLower.includes("tel")) return "phone";
  if (nameLower.includes("password")) return "password";
  if (nameLower.includes("url") || nameLower.includes("website")) return "url";
  if (nameLower.includes("message") || nameLower.includes("description")) return "textarea";
  if (nameLower.includes("date")) return "date";
  if (nameLower.includes("file")) return "file";
  
  return "text";
}

/**
 * Extract and apply validation information to field
 */
function applyValidationInfo(field: FormField, definition: string) {
  const validations: string[] = [];
  
  // Extract min validation
  const minMatch = definition.match(/\.min\s*\(\s*(\d+)(?:\s*,\s*["']([^"']+)["'])?\s*\)/);
  if (minMatch) {
    const min = minMatch[1];
    const message = minMatch[2];
    if (field.type === "input" || field.type === "textarea") {
      validations.push(`Min ${min} chars`);
    }
  }
  
  // Extract max validation
  const maxMatch = definition.match(/\.max\s*\(\s*(\d+)(?:\s*,\s*["']([^"']+)["'])?\s*\)/);
  if (maxMatch) {
    const max = maxMatch[1];
    validations.push(`Max ${max} chars`);
  }
  
  // Extract regex pattern info
  const regexMatch = definition.match(/\.regex\s*\(\s*\/(.+?)\//);
  if (regexMatch) {
    validations.push("Must match pattern");
  }
  
  if (validations.length > 0) {
    field.description = validations.join(" • ");
  }
}

/**
 * Parse enum options from definition
 */
function parseEnumOptions(field: FormField, definition: string) {
  const enumMatch = definition.match(/z\.enum\s*\(\s*\[([\s\S]*?)\]\s*\)/);
  if (enumMatch) {
    const content = enumMatch[1];
    // Extract quoted strings
    const values: string[] = [];
    const quoteRegex = /["']([^"']+)["']/g;
    let match;
    while ((match = quoteRegex.exec(content)) !== null) {
      values.push(match[1]);
    }
    
    field.options = values.map((v) => ({
      label: formatLabel(v),
      value: v,
    }));
  }
}

/**
 * Generate a placeholder based on field name and type
 */
function generatePlaceholder(name: string, uiType: string): string {
  const placeholders: Record<string, string> = {
    email: "you@example.com",
    phone: "+1 (555) 000-0000",
    password: "Enter password...",
    url: "https://example.com",
    textarea: "Enter your message...",
    date: "Select a date...",
    number: "0",
  };
  
  return placeholders[uiType] || `Enter ${formatLabel(name).toLowerCase()}...`;
}

/**
 * Map UI type to field type
 */
function mapUITypeToFieldType(uiType: string): FormField["type"] {
  const mapping: Record<string, FormField["type"]> = {
    phone: "input",
    email: "input",
    password: "input",
    url: "input",
    text: "input",
    number: "input",
    textarea: "textarea",
    select: "select",
    radio: "radio",
    checkbox: "checkbox",
    date: "date",
    file: "file",
  };
  
  return mapping[uiType] || "input";
}

/**
 * Map UI type to input type attribute
 */
function mapUITypeToInputType(uiType: string): FormField["inputType"] | undefined {
  const mapping: Record<string, FormField["inputType"]> = {
    phone: "tel",
    email: "email",
    password: "password",
    url: "url",
    text: "text",
    number: "number",
    date: "date",
  };
  
  return mapping[uiType];
}

/**
 * Format a field name into a readable label
 */
function formatLabel(name: string): string {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}
