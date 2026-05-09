import { Switch, Label } from "@formscn/ui";
import type { FieldComponentProps } from "../../types";

export function SwitchField({
  field,
  value,
  onChange,
  onBlur,
  error,
}: FieldComponentProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={field.name} className="text-xs font-medium">
          {field.label}
          {field.required && <span className="text-destructive ml-0.5">*</span>}
        </Label>
        <Switch
          id={field.name}
          name={field.name}
          checked={!!value}
          onCheckedChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? `${field.name}-error` : undefined}
        />
      </div>
      
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
