"use client";

import * as React from "react";
import PhoneInput, { type Country } from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js";
import { cn } from "@/lib/utils";
import { Label } from "./label";

import "react-phone-number-input/style.css";

export interface PhoneInputFieldProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  defaultCountry?: Country;
  className?: string;
}

export function PhoneInputField({
  value,
  onChange,
  label,
  placeholder = "Enter phone number",
  error,
  description,
  disabled = false,
  required = false,
  defaultCountry = "US",
  className,
}: PhoneInputFieldProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className={cn(error && "text-destructive")}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}
      
      <div className="relative">
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry={defaultCountry}
          value={value}
          onChange={(value) => onChange?.(value as string | undefined)}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
            "border-input focus-visible:border-ring focus-visible:ring-ring/50",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-1",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
            "aria-invalid:border-destructive",
            error && "border-destructive",
            isFocused && !error && "ring-1 ring-ring",
            "[&_.PhoneInputCountry]:bg-transparent",
            "[&_.PhoneInputCountrySelect]:h-9",
            "[&_.PhoneInputCountrySelect]:px-2",
            "[&_.PhoneInputCountrySelect]:border-r",
            "[&_.PhoneInputCountrySelect]:border-input",
            "[&_.PhoneInputInput]:flex-1",
            "[&_.PhoneInputInput]:bg-transparent",
            "[&_.PhoneInputInput]:outline-none",
            "[&_.PhoneInputInput]:placeholder:text-muted-foreground",
          )}
        />
      </div>

      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}

// Import z for the schema helper
import * as z from "zod";

/**
 * Zod validation helper for phone numbers
 */
export const phoneSchema = (message = "Invalid phone number") =>
  z.string().refine(
    (value) => !value || isValidPhoneNumber(value),
    message
  );