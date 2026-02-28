import { Checkbox, Label } from "formscn-ui";
import type { FieldComponentProps } from "../../types";

export function CheckboxField({
  field,
  value,
  onChange,
  onBlur,
  error,
}: FieldComponentProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-start gap-2">
        <Checkbox
          id={field.name}
          name={field.name}
          checked={!!value}
          onCheckedChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? `${field.name}-error` : undefined}
        />
        <Label
          htmlFor={field.name}
          className="text-xs font-normal leading-tight cursor-pointer"
        >
          {field.label}
          {field.required && <span className="text-destructive ml-0.5">*</span>}
        </Label>
      </div>
      
      {field.description && !error && (
        <p className="text-muted-foreground text-[11px] pl-6">{field.description}</p>
      )}
      
      {error && (
        <p id={`${field.name}-error`} className="text-destructive text-[11px] pl-6 font-medium flex items-center gap-1">
          <span className="inline-block">•</span>
          {error}
        </p>
      )}
    </div>
  );
}
