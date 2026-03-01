import {
  Label,
  RadioGroup,
  RadioGroupItem,
} from "formscn-ui";
import type { FieldComponentProps } from "../../types";

export function RadioGroupField({
  field,
  value,
  onChange,
  onBlur,
  error,
}: FieldComponentProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">
        {field.label}
        {field.required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      
      <RadioGroup
        value={(value as string) || ""}
        onValueChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${field.name}-error` : undefined}
        className="gap-2"
      >
        {field.options?.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
            <Label
              htmlFor={`${field.name}-${option.value}`}
              className="text-xs font-normal cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
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
