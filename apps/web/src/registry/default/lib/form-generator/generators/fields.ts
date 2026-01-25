import type { FormField } from "@/registry/default/types";

/**
 * Generate JSX for form fields
 */
export function generateFormFields(fields: FormField[]): string {
  return fields.map((field) => {
    const errorDisplay = `{form.formState.errors.${field.name} && (
            <p className="text-sm text-destructive">{form.formState.errors.${field.name}.message}</p>
          )}`;
    
    // For password fields in auth forms, add description hint
    const isPasswordField = field.name === "password" && field.inputType === "password";
    const passwordHint = isPasswordField ? `\n            <p className="text-sm text-muted-foreground">Must be at least 8 characters</p>` : "";
    
    const descriptionDisplay = field.description 
      ? `\n            <p className="text-sm text-muted-foreground">${field.description}</p>` 
      : "";

    if (field.type === "input") {
      return `          <div className="space-y-2">
            <Label htmlFor="${field.name}">${field.label}</Label>
            <Input
              id="${field.name}"
              type="${field.inputType || "text"}"
              placeholder="${field.placeholder || ""}"
              {...form.register("${field.name}")}
            />
            ${errorDisplay}${isPasswordField ? passwordHint : descriptionDisplay}
          </div>`;
    }
    if (field.type === "textarea") {
      return `          <div className="space-y-2">
            <Label htmlFor="${field.name}">${field.label}</Label>
            <Textarea
              id="${field.name}"
              placeholder="${field.placeholder || ""}"
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
                    <Label htmlFor="${field.name}-${opt.value}">${opt.label}</Label>
                  </div>`).join('\n                  ')}
                </RadioGroup>
              )}
            />
            ${errorDisplay}${descriptionDisplay}
          </div>`;
    }
    // Checkbox - error OUTSIDE the flex container per reference
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
              <Label htmlFor="${field.name}" className="font-normal">
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
                  <PopoverTrigger asChild>
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
