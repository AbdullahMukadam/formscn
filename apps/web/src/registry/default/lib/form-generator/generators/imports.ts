import type { GenerateImportsConfig, Framework } from "../types";

/**
 * Get the client directive for framework
 */
function getClientDirective(framework: Framework): string {
  // Next.js and TanStack Start require "use client" for client components
  if (framework === "next" || framework === "tanstack") {
    return '"use client";\n\n';
  }
  return "";
}

/**
 * Get the navigation import for framework
 */
/**
 * Generate imports for the form component
 */
export function generateImports(config: GenerateImportsConfig): string {
  const { framework, fields, isAuth, isLogin, isSignup, hasOAuth, hasSteps } = config;
  
  const directive = getClientDirective(framework);

const hasSelect = fields.some(f => f.type === "select");
  const hasCheckbox = fields.some(f => f.type === "checkbox");
  const hasTextarea = fields.some(f => f.type === "textarea");
  const hasRadio = fields.some(f => f.type === "radio");
  const hasDate = fields.some(f => f.type === "date");
  const hasFile = fields.some(f => f.type === "file");
  const hasPhone = fields.some(f => f.uiType === "phone");
  const hasSwitch = fields.some(f => f.type === "switch");
  const hasNumber = fields.some(f => f.type === "number");
  const needsController = hasSelect || hasCheckbox || hasRadio || hasDate || hasPhone || hasSwitch;

  const hasPassword = fields.some(f => f.name === "password" || f.inputType === "password");

  // Build React imports
  const reactImports: string[] = [];
  if (hasSteps || hasPassword || isSignup) reactImports.push("useState");
  reactImports.push("useEffect");
  
  // Build imports string
  let imports = directive;
  
  // React imports (if any)
  if (reactImports.length > 0) {
    imports += `import { ${Array.from(new Set(reactImports)).join(", ")} } from "react";\n`;
  }
  
  // React Hook Form
  imports += `import { useForm${needsController ? ", Controller" : ""}, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";`;

  // UI Components
  imports += `
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { cn } from "@/lib/utils";`;

  // Multi-step specific imports
  if (hasSteps) {
    imports += `
import { Progress } from "@/components/ui/progress";`;
  }

  // Textarea
  if (hasTextarea) {
    imports += `\nimport { Textarea } from "@/components/ui/textarea";`;
  }
  
  // Select
  if (hasSelect) {
    imports += `
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";`;
  }

// Checkbox
  if (hasCheckbox) {
    imports += `\nimport { Checkbox } from "@/components/ui/checkbox";`;
  }

  // Switch
  if (hasSwitch) {
    imports += `\nimport { Switch } from "@/components/ui/switch";`;
  }

  // Radio
  if (hasRadio) {
    imports += `\nimport { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";`;
  }

  // Date picker
  if (hasDate) {
    imports += `
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";`;
    // Add cn if not already added by hasSteps
    if (!hasSteps) {
      imports += `
import { cn } from "@/lib/utils";`;
    }
  }
  
  // Phone input
  if (hasPhone) {
    imports += `
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js";
import "react-phone-number-input/style.css";`;
  }

  // Auth Imports
  if (isAuth || hasOAuth) {
    const authImports: string[] = [];
    if (isLogin || hasOAuth) authImports.push("signIn");
    if (isSignup) authImports.push("signUp");
    
    imports += `\nimport { ${authImports.join(", ")} } from "@/lib/auth-client";`;
  }

  return imports;
}
