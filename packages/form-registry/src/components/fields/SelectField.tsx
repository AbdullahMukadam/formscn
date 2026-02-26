import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@formscn/ui";
import type { FieldComponentProps } from "../../types";

export function SelectField({
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
      
      <Select
        value={(value as string) || ""}
        onValueChange={onChange}
        onOpenChange={(open) => {
          if (!open) onBlur();
        }}
      >
        <SelectTrigger
          id={field.name}
          className={error ? "border-destructive" : ""}
          aria-invalid={!!error}
          aria-describedby={error ? `${field.name}-error` : undefined}
        >
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {field.options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
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
