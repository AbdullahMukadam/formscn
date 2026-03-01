import { Label, Textarea } from "formscn-ui";
import type { FieldComponentProps } from "../../types";

export function TextareaField({
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
      
      <Textarea
        id={field.name}
        name={field.name}
        value={(value as string) || ""}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={field.placeholder}
        rows={field.uiConfig?.rows || 4}
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
