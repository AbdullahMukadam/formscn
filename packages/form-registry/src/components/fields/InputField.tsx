import { Input, Label } from "@formscn/ui";
import type { ChangeEvent } from "react";
import type { FieldComponentProps } from "../../types";

export function InputField({
  field,
  value,
  onChange,
  onBlur,
  error,
}: FieldComponentProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={field.name} className="text-xs font-medium">
        {field.label}
        {field.required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      
      <Input
        id={field.name}
        name={field.name}
        type={field.inputType || "text"}
        value={(value as string) || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={field.placeholder}
        className={error ? "border-destructive focus-visible:ring-destructive" : ""}
        aria-invalid={!!error}
        aria-describedby={error ? `${field.name}-error` : undefined}
      />
      
      {field.description && !error && (
        <p className="text-muted-foreground text-[11px]">{field.description}</p>
      )}
      
      {error && (
        <p id={`${field.name}-error`} className="text-destructive text-[11px] font-medium flex items-center gap-1">
          <span className="inline-block">•</span>
          {error}
        </p>
      )}
    </div>
  );
}
