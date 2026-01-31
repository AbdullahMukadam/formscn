import type { FormField } from "@/registry/default/types";

/**
 * Generate JSX for form fields with production-ready features
 */
export function generateFormFields(fields: FormField[]): string {
  return fields.map((field) => {
    const errorDisplay = `{form.formState.errors.${field.name} && (
            <p className="text-sm text-destructive">{form.formState.errors.${field.name}.message}</p>
          )}`;
    
    // Enhanced password field detection
    const isPasswordField = field.name === "password" && field.inputType === "password";
    const isConfirmPassword = field.name === "confirmPassword" && field.inputType === "password";
    const isAnyPasswordField = isPasswordField || isConfirmPassword;
    
    const passwordHint = isPasswordField ? `\n            <p className="text-sm text-muted-foreground">Must be at least 8 characters</p>` : "";
    
    const descriptionDisplay = field.description 
      ? `\n            <p className="text-sm text-muted-foreground">${field.description}</p>` 
      : "";

    if (field.type === "input") {
      // Enhanced password field with show/hide toggle
      if (isAnyPasswordField) {
        return `          <div className="space-y-2">
            ${isPasswordField ? `<div className="flex items-center justify-between">
              <Label htmlFor="${field.name}">${field.label}</Label>
              <a
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </a>
            </div>` : `<Label htmlFor="${field.name}">${field.label}</Label>`}
            <div className="relative">
              <Input
                id="${field.name}"
                type={showPassword ? "text" : "password"}
                placeholder="${field.placeholder || "••••••••"}"
                autoComplete="${isPasswordField ? "current-password" : "new-password"}"
                className="pr-10"
                {...form.register("${field.name}")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            ${isPasswordField ? `
            {/* Password strength indicator - only for signup */}
            {showStrengthIndicator && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Password strength:</span>
                  <span className={cn("text-xs font-medium capitalize", getPasswordStrengthColor(passwordStrength))}>
                    {passwordStrength}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-300 rounded-full",
                      getPasswordStrengthStyles(passwordStrength)
                    )}
                  />
                </div>
              </div>
            )}` : ''}
            ${errorDisplay}${isPasswordField ? passwordHint : descriptionDisplay}
          </div>`;
      }

      // Enhanced email field with autocomplete
      const isEmailField = field.inputType === "email" || field.name === "email";
      const autoComplete = isEmailField ? 'autoComplete="email"' : 
                          field.inputType === "tel" ? 'autoComplete="tel"' :
                          field.inputType === "url" ? 'autoComplete="url"' : '';

      return `          <div className="space-y-2">
            <Label htmlFor="${field.name}">${field.label}</Label>
            <Input
              id="${field.name}"
              type="${field.inputType || "text"}"
              placeholder="${field.placeholder || ""}"
              ${autoComplete}
              {...form.register("${field.name}")}
            />
            ${errorDisplay}${descriptionDisplay}
          </div>`;
    }
    
    if (field.type === "textarea") {
      return `          <div className="space-y-2">
            <Label htmlFor="${field.name}">${field.label}</Label>
            <Textarea
              id="${field.name}"
              placeholder="${field.placeholder || ""}"
              rows={4}
              {...form.register("${field.name}")}
            />
            ${errorDisplay}${descriptionDisplay}
          </div>`;
    }
    
    if (field.type === "select") {
      return `          <div className="space-y-2">
            <Label htmlFor="${field.name}">${field.label}</Label>
            <Controller
              control={form.control}
              name="${field.name}"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="${field.name}">
                    <SelectValue placeholder="${field.placeholder || "Select an option"}" />
                  </SelectTrigger>
                  <SelectContent>
                    ${(field.options || []).map(opt => `<SelectItem value="${opt.value}">${opt.label}</SelectItem>`).join('\n                    ')}
                  </SelectContent>
                </Select>
              )}
            />
            ${errorDisplay}${descriptionDisplay}
          </div>`;
    }
    
    if (field.type === "radio") {
      return `          <div className="space-y-2">
            <Label>${field.label}</Label>
            <Controller
              control={form.control}
              name="${field.name}"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  ${(field.options || []).map(opt => `<div className="flex items-center space-x-2">
                    <RadioGroupItem value="${opt.value}" id="${field.name}-${opt.value}" />
                    <Label htmlFor="${field.name}-${opt.value}" className="font-normal cursor-pointer">${opt.label}</Label>
                  </div>`).join('\n                  ')}
                </RadioGroup>
              )}
            />
            ${errorDisplay}${descriptionDisplay}
          </div>`;
    }
    
    if (field.type === "checkbox") {
      return `          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Controller
                control={form.control}
                name="${field.name}"
                render={({ field }) => (
                  <Checkbox
                    id="${field.name}"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="${field.name}" className="font-normal cursor-pointer">
                ${field.label}
              </Label>
            </div>
            ${errorDisplay}
          </div>`;
    }
    
    if (field.type === "date") {
      return `          <div className="space-y-2 flex flex-col">
            <Label>${field.label}</Label>
            <Controller
              control={form.control}
              name="${field.name}"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>${field.placeholder || "Pick a date"}</span>
                      )}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto opacity-50"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            ${errorDisplay}${descriptionDisplay}
          </div>`;
    }
    
    return `          {/* ${field.type} field for ${field.name} */}`;
  }).join('\n\n');
}
