"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Calendar,
} from "formscn-ui";
import { cn } from "formscn-ui";
import type { FieldComponentProps } from "../../types";

export function DateField({
  field,
  value,
  onChange,
  onBlur,
  error,
}: FieldComponentProps) {
  const [open, setOpen] = useState(false);

  // Convert value to Date object
  const dateValue = value instanceof Date ? value : undefined;

  const handleSelect = (date: Date | undefined) => {
    onChange(date || null);
    setOpen(false);
    onBlur();
  };

  return (
    <div className="space-y-1.5">
      <Label htmlFor={field.name} className="text-xs font-medium">
        {field.label}
        {field.required && <span className="text-destructive ml-0.5">*</span>}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            id={field.name}
            type="button"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-9 px-2.5",
              !dateValue && "text-muted-foreground",
              error && "border-destructive"
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
            {dateValue ? format(dateValue, "PPP") : field.placeholder || "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>

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
