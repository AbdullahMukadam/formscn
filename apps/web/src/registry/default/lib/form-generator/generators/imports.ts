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
  const needsController = hasSelect || hasCheckbox || hasRadio || hasDate;

  // Build React imports
  const reactImports: string[] = [];
  if (hasSteps) reactImports.push("useState");
  
  // Build imports string
  let imports = directive;
  
  // React imports (if any)
  if (reactImports.length > 0) {
    imports += `import { ${reactImports.join(", ")} } from "react";\n`;
  }
  
  // React Hook Form
  imports += `import { useForm${needsController ? ", Controller" : ""} type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";`;

  // UI Components
  imports += `
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";`;

  // Multi-step specific imports
  if (hasSteps) {
    imports += `
import { cn } from "@/lib/utils";
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
      imports += `\nimport { cn } from "@/lib/utils";`;
    }
  }

  // Auth Imports
  if (isAuth) {
    const authImports: string[] = [];
    if (isLogin || hasOAuth) authImports.push("signIn");
    if (isSignup) authImports.push("signUp");
    
    imports += `\nimport { ${authImports.join(", ")} } from "@/lib/auth-client";`;
  }

  return imports;
}
