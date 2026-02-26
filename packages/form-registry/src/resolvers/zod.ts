import { z } from "zod";
import type { FormField, FieldType, InputType, ZodFieldMeta } from "../types";

export class ZodSchemaConverter {
  toFields(schema: z.ZodObject<any>): FormField[] {
    return Object.entries(schema.shape).map(([name, zodType]) =>
      this.#parseField(name, zodType as z.ZodTypeAny)
    );
  }

  // ─── Field Parsing ───────────────────────────────────────────────────────

  #parseField(name: string, zodType: z.ZodTypeAny): FormField {
    const { innerType, isOptional } = this.#unwrap(zodType);
    const meta       = this.#extractMeta(innerType, name);
    const type       = this.#inferFieldType(innerType, meta);
    const inputType  = this.#inferInputType(innerType, meta);
    const validation = this.#extractValidation(innerType);
    const options    = this.#extractOptions(innerType);

    return {
      name,
      type,
      label:       meta.label ?? this.#formatLabel(name),
      required:    !isOptional,
      placeholder: meta.placeholder,
      description: meta.description,
      inputType,
      options,
      validation,
      uiConfig: {
        rows:    meta.rows,
        country: meta.country,
        icon:    meta.icon,
      },
    };
  }

  #unwrap(zodType: z.ZodTypeAny): { innerType: z.ZodTypeAny; isOptional: boolean } {
    let innerType  = zodType;
    let isOptional = false;

    if (this.#typeName(innerType) === "ZodOptional") {
      innerType  = this.#def(innerType).innerType ?? (innerType as any).innerType?.();
      isOptional = true;
    }

    if (this.#typeName(innerType) === "ZodDefault") {
      innerType = this.#def(innerType).innerType ?? (innerType as any).innerType?.();
    }

    return { innerType, isOptional };
  }

  // ─── Meta ────────────────────────────────────────────────────────────────

  #extractMeta(zodType: z.ZodTypeAny, name: string): ZodFieldMeta {
    const meta: ZodFieldMeta = {};
    const { description } = this.#def(zodType);

    if (description) {
      try {
        Object.assign(meta, JSON.parse(description));
      } catch {
        meta.description = description;
      }
    }

    meta.label ??= this.#formatLabel(name);
    return meta;
  }

  // ─── Type Inference ──────────────────────────────────────────────────────

  #inferFieldType(zodType: z.ZodTypeAny, meta: ZodFieldMeta): FieldType {
    switch (this.#typeName(zodType)) {
      case "ZodBoolean":    return "checkbox";
      case "ZodDate":       return "date";
      case "ZodEnum":
      case "ZodNativeEnum": return "select";
      case "ZodNumber":     return "number";
      case "ZodString": {
        const label = meta.label?.toLowerCase() ?? "";
        const isTextarea =
          label.includes("message") ||
          label.includes("description") ||
          label.includes("bio");
        return isTextarea ? "textarea" : "input";
      }
      default: return "input";
    }
  }

  #inferInputType(zodType: z.ZodTypeAny, meta: ZodFieldMeta): InputType | undefined {
    if (meta.inputType) return meta.inputType as InputType;

    const typeName = this.#typeName(zodType);

    if (typeName === "ZodNumber") return "number";

    if (typeName === "ZodString") {
      const checks: Array<{ kind: string }> = this.#def(zodType).checks ?? [];
      for (const check of checks) {
        if (check.kind === "email") return "email";
        if (check.kind === "url")   return "url";
      }

      const label = meta.label?.toLowerCase() ?? "";
      if (label.includes("email"))                               return "email";
      if (label.includes("password"))                            return "password";
      if (label.includes("phone") || label.includes("tel"))     return "tel";
      if (label.includes("url")   || label.includes("website")) return "url";
    }

    return "text";
  }

  // ─── Validation ──────────────────────────────────────────────────────────

  #extractValidation(zodType: z.ZodTypeAny): Record<string, unknown> {
    const typeName = this.#typeName(zodType);
    const checks: Array<{ kind: string; value?: unknown; regex?: RegExp }> =
      this.#def(zodType).checks ?? [];
    const validation: Record<string, unknown> = {};

    if (typeName === "ZodString") {
      for (const check of checks) {
        if (check.kind === "min")   validation.minLength = check.value;
        if (check.kind === "max")   validation.maxLength = check.value;
        if (check.kind === "email") validation.email = true;
        if (check.kind === "url")   validation.url = true;
        if (check.kind === "regex") validation.pattern = (check.regex as RegExp).source;
      }
    }

    if (typeName === "ZodNumber") {
      for (const check of checks) {
        if (check.kind === "min") validation.min = check.value;
        if (check.kind === "max") validation.max = check.value;
      }
    }

    return validation;
  }

  // ─── Options ─────────────────────────────────────────────────────────────

  #extractOptions(zodType: z.ZodTypeAny): Array<{ label: string; value: string }> | undefined {
    const typeName = this.#typeName(zodType);
    const def = this.#def(zodType);

    if (typeName === "ZodEnum") {
      // Handle both Zod v3 and v4 structure
      const values = def.values ?? (zodType as any).options ?? (zodType as any)._def?.values ?? (zodType as any)._def?.options;
      
      if (!values || !Array.isArray(values)) {
        console.warn("ZodEnum values not found for:", zodType);
        return undefined;
      }
      
      return (values as string[]).map((value) => ({
        label: this.#formatLabel(value),
        value,
      }));
    }

    if (typeName === "ZodNativeEnum") {
      const enumObj: Record<string, unknown> = def.values ?? (zodType as any).enum ?? {};
      
      if (!enumObj || typeof enumObj !== 'object') {
        console.warn("ZodNativeEnum values not found for:", zodType);
        return undefined;
      }
      
      return Object.keys(enumObj)
        .filter((key) => typeof enumObj[key] === "string")
        .map((value) => ({ label: this.#formatLabel(value), value }));
    }

    return undefined;
  }

  // ─── Utilities ───────────────────────────────────────────────────────────

  #typeName(zodType: z.ZodTypeAny): string {
    if (!zodType) return "";
    
    const anyType = zodType as any;
    return (
      anyType.typeName ??
      anyType._def?.typeName ??
      anyType.constructor?.name ??
      ""
    );
  }

  #def(zodType: z.ZodTypeAny): Record<string, any> {
    if (!zodType) return {};
    return (zodType as any)._def ?? {};
  }

  #formatLabel(name: string): string {
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }
}

// (backward-compatible)

const defaultConverter = new ZodSchemaConverter();

export function zodSchemaToFields(schema: z.ZodObject<any>): FormField[] {
  return defaultConverter.toFields(schema);
}