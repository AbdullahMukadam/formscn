import type { FormField } from "@/registry/default/types";

/**
 * Check if this is a signup form (has password + confirmPassword or name field)
 */
function isSignupForm(fields: FormField[]): boolean {
  const hasEmail = fields.some(f => f.name === "email" || f.inputType === "email");
  const hasPassword = fields.some(f => f.name === "password" || f.inputType === "password");
  const hasConfirmPassword = fields.some(f => f.name === "confirmPassword");
  const hasName = fields.some(f => ["name", "fullName", "firstName", "username"].includes(f.name));
  return hasEmail && hasPassword && (hasConfirmPassword || hasName);
}

/**
 * Check if this is a login form (has email + password but not signup)
 */
function isLoginForm(fields: FormField[]): boolean {
  const hasEmail = fields.some(f => f.name === "email" || f.inputType === "email");
  const hasPassword = fields.some(f => f.name === "password" || f.inputType === "password");
  return hasEmail && hasPassword && !isSignupForm(fields);
}

/**
 * Check if this is an auth form (login or signup)
 */
function isAuthForm(fields: FormField[]): boolean {
  return isLoginForm(fields) || isSignupForm(fields);
}

/**
 * Generate Zod schema definition
 */
export function generateZodSchema(fields: FormField[]): string {
  const isAuth = isAuthForm(fields);
  const isSignup = isSignupForm(fields);
  const hasConfirmPassword = fields.some(f => f.name === "confirmPassword");

  const schemaFields = fields.map((field) => {
    let validation = "z.any()";

    switch (field.type) {
      case "checkbox":
        validation = `z.boolean()`;
        if (field.required) {
          validation += `.refine((val) => val === true, { message: "You must agree to ${field.label.toLowerCase()}" })`;
        } else {
          validation += `.default(false)`;
        }
        break;
      
      case "select":
      case "radio":
        const enumValues = (field.options || []).map(opt => `"${opt.value}"`).join(', ');
        validation = `z.enum([${enumValues}])`;
        if (!field.required) validation += `.optional()`;
        break;

      case "date":
        validation = `z.date()`;
        if (field.required) {
          validation += `.min(new Date("1900-01-01"), { message: "${field.label} is required" })`;
        } else {
          validation += `.optional()`;
        }
        break;

      case "file":
        validation = `z.instanceof(FileList)`;
        if (field.required) {
          validation += `.refine((files) => files?.length > 0, "${field.label} is required")`;
        } else {
          validation += `.optional()`;
        }
        
        // Add detailed validation (Max 5MB, Images only)
        validation += `
    .refine((files) => {
      return !files || files.length === 0 || files[0].size <= 5242880;
    }, "Max file size is 5MB")
    .refine((files) => {
      return !files || files.length === 0 || ["image/png", "image/jpeg", "image/gif", "image/webp"].includes(files[0].type);
    }, "Only .jpg, .png, .gif and .webp formats are supported")`;
        break;

      case "input":
      case "textarea":
      default:
        validation = `z.string()`;
        
        // Email validation
        if (field.type === "input" && field.inputType === "email") {
          validation += `.email("Invalid email address")`;
        }
        
        // Password validation - min 8 chars for auth forms
        if (field.type === "input" && (field.name === "password" || field.inputType === "password")) {
          if (isAuth && field.name === "password") {
            validation += `.min(8, "Password must be at least 8 characters")`;
          } else if (field.required) {
            validation += `.min(1, "${field.label} is required")`;
          }
        } else if (field.required) {
          validation += `.min(1, "${field.label} is required")`;
        } else {
          validation += `.optional().or(z.literal(""))`;
        }
        break;
    }
    return `  ${field.name}: ${validation},`;
  }).join('\n');

  // Add password confirmation refine for signup forms
  let refineClause = "";
  if (isSignup && hasConfirmPassword) {
    refineClause = `.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})`;
  }

  return `
const formSchema = z.object({
${schemaFields}
})${refineClause};

type FormValues = z.infer<typeof formSchema>;`;
}
