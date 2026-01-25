"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown, Trash2, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { OAUTH_PROVIDERS } from "@/lib/oauth-providers-config";
import type { FormField as FormFieldType, FormStep } from "@/lib/form-templates";
import type { OAuthProvider } from "@/lib/oauth-providers-config";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface FormPreviewProps {
  formName: string;
  formDescription: string;
  fields: FormFieldType[];
  steps?: FormStep[];
  selectedFieldIndex: number | null;
  setSelectedFieldIndex: (index: number | null) => void;
  moveField: (index: number, direction: "up" | "down") => void;
  removeField: (index: number) => void;
  oauthProviders: OAuthProvider[];
  toggleOAuth: (provider: OAuthProvider) => void;
}

export function FormPreview({
  formName,
  formDescription,
  fields: allFields,
  steps,
  selectedFieldIndex,
  setSelectedFieldIndex,
  moveField,
  removeField,
  oauthProviders,
  toggleOAuth,
}: FormPreviewProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const hasSteps = !!(steps && steps.length > 0);

  // Reset current step if it becomes invalid (e.g. step removed)
  useEffect(() => {
    if (hasSteps && steps && currentStep >= steps.length) {
      setCurrentStep(0);
    }
  }, [steps, hasSteps, currentStep]);

  const stepFields = useMemo(() => {
    if (!hasSteps || !steps) return allFields;

    // Safety check: ensure the current step exists
    if (!steps[currentStep]) return [];

    return steps[currentStep].fields;
  }, [hasSteps, steps, currentStep, allFields]);

  const visibleFields = hasSteps ? stepFields : allFields;

  const formSchema = useMemo(() => {
    const shape: Record<string, any> = {};

    // Ensure allFields is defined and is an array
    if (Array.isArray(allFields)) {
      allFields.forEach((field) => {
        if (!field || !field.name) return;

        let validation: z.ZodTypeAny;

        switch (field.type) {
          case "checkbox":
            validation = z.boolean();
            if (field.required) {
              validation = (validation as z.ZodBoolean).refine((v) => v === true, {
                message: "Required",
              });
            } else {
              validation = (validation as z.ZodBoolean).optional();
            }
            break;

          case "date":
            validation = z.date();
            if (field.required) {
              validation = (validation as z.ZodDate).min(new Date("1900-01-01"), "Required");
            } else {
              validation = (validation as z.ZodDate).optional();
            }
            break;

          case "file":
            // Validate FileList with size and type checks
            validation = z.any(); // Start with any to allow custom refinements on the FileList object
            
            if (field.required) {
               validation = validation.refine((files: any) => files?.length > 0, "Required");
            } else {
               validation = validation.optional();
            }

            validation = validation
              .refine((files: any) => {
                return !files || files.length === 0 || files[0].size <= 5242880;
              }, "Max 5MB")
              .refine((files: any) => {
                return !files || files.length === 0 || ["image/png", "image/jpeg", "image/gif", "image/webp"].includes(files[0].type);
              }, "Only .jpg, .png, .gif and .webp");
            break;

          case "input":
          case "textarea":
          case "select":
          case "radio":
          default:
            validation = z.string();
            if (field.type === "input" && field.inputType === "email") {
              validation = (validation as z.ZodString).email();
            }

            if (field.required) {
              validation = (validation as z.ZodString).min(1, "Required");
            } else {
              validation = (validation as z.ZodString).optional().or(z.literal(""));
            }
            break;
        }

        shape[field.name] = validation;
      });

      return z.object(shape);
    }
  }, [allFields])

  const form = useForm({
    resolver: formSchema ? zodResolver(formSchema) : undefined,
    mode: "onChange",
    shouldUnregister: false,
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    toast.success("Form submitted successfully! (Check console)");
  };

  const nextStep = async () => {
    if (!steps) return;
    const currentStepFields = steps[currentStep].fields.map(f => f.name);
    const output = await form.trigger(currentStepFields as any);
    if (output) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Card className="w-full max-w-sm h-fit animate-in fade-in-50">
      <CardHeader className=" space-y-2">
        <CardTitle>{formName}</CardTitle>
        <CardDescription>{formDescription}</CardDescription>

        {hasSteps && steps && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="font-medium">
                {steps[currentStep].title}
              </span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          {visibleFields.length === 0 && !hasSteps && (
            <div className="text-center py-10 border-2 border-dashed rounded-lg text-muted-foreground">
              <p>No fields added yet.</p>
              <p className="text-sm">Use the sidebar to add fields.</p>
            </div>
          )}

          {/* Render Fields */}
          <div className={cn("space-y-4", hasSteps && "min-h-[200px]")}>
            <AnimatePresence mode="popLayout" initial={false}>
            {visibleFields.map((field, index) => {
              // Safety check for invalid fields
              if (!field || !field.name) return null;

              // If steps are used, index is relative to the step. Otherwise it's global.
              const fieldIndex = hasSteps ? index : allFields.findIndex(f => f.name === field.name);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  key={field.name}
                  className={`group relative p-2 -mx-2 rounded-md hover:bg-muted/50 transition-colors border-2 ${selectedFieldIndex === fieldIndex ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setSelectedFieldIndex(fieldIndex)}
                >
                  {/* Actions (Visible on Hover) */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <div className="flex items-center gap-1 bg-background shadow-md border rounded-md p-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              disabled={fieldIndex === 0}
                              onClick={(e) => { e.stopPropagation(); moveField(fieldIndex, "up"); }}
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Move Up</p></TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              disabled={fieldIndex === (hasSteps ? visibleFields.length : allFields.length) - 1}
                              onClick={(e) => { e.stopPropagation(); moveField(fieldIndex, "down"); }}
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Move Down</p></TooltipContent>
                        </Tooltip>

                        <div className="w-[1px] h-4 bg-border mx-0.5" />

                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={(e) => { e.stopPropagation(); removeField(fieldIndex); }}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Remove Field</p></TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </motion.div>

                  {/* Field Rendering */}
                  {field.type === "input" && (
                    <div className="space-y-2">
                      <Label>{field.label}{field.required && " *"}</Label>
                      <Input
                        placeholder={field.placeholder}
                        {...form.register(field.name)}
                      />
                      {form.formState.errors[field.name] && (
                        <p className="text-xs text-destructive">{form.formState.errors[field.name]?.message as string}</p>
                      )}
                      {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
                    </div>
                  )}

                  {field.type === "textarea" && (
                    <div className="space-y-2">
                      <Label>{field.label}{field.required && " *"}</Label>
                      <Textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder={field.placeholder}
                        {...form.register(field.name)}
                      />
                      {form.formState.errors[field.name] && (
                        <p className="text-xs text-destructive">{form.formState.errors[field.name]?.message as string}</p>
                      )}
                    </div>
                  )}

                  {field.type === "checkbox" && (
                    <div className="flex items-center space-x-2 py-2">
                      <Controller
                        control={form.control}
                        name={field.name}
                        render={({ field: f }) => (
                          <Checkbox
                            id={field.name}
                            checked={!!f.value}
                            onCheckedChange={f.onChange}
                          />
                        )}
                      />
                      <Label htmlFor={field.name}>{field.label}</Label>
                      {form.formState.errors[field.name] && (
                        <p className="text-xs text-destructive ml-2">{form.formState.errors[field.name]?.message as string}</p>
                      )}
                    </div>
                  )}

                  {field.type === "select" && (
                    <div className="space-y-2">
                      <Label>{field.label}{field.required && " *"}</Label>
                      <Controller
                        control={form.control}
                        name={field.name}
                        render={({ field: f }) => (
                          <Select onValueChange={f.onChange} defaultValue={f.value}>
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder || "Select an option..."} />
                            </SelectTrigger>
                            <SelectContent>
                              {(field.options || []).map((opt, idx) => (
                                <SelectItem key={idx} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {form.formState.errors[field.name] && (
                        <p className="text-xs text-destructive">{form.formState.errors[field.name]?.message as string}</p>
                      )}
                      {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
                    </div>
                  )}

                  {field.type === "radio" && (
                    <div className="space-y-2">
                      <Label>{field.label}{field.required && " *"}</Label>
                      <Controller
                        control={form.control}
                        name={field.name}
                        render={({ field: f }) => (
                          <RadioGroup onValueChange={f.onChange} defaultValue={f.value}>
                            {(field.options || []).map((opt, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt.value} id={`${field.name}-${opt.value}`} />
                                <Label htmlFor={`${field.name}-${opt.value}`}>{opt.label}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                      />
                      {form.formState.errors[field.name] && (
                        <p className="text-xs text-destructive">{form.formState.errors[field.name]?.message as string}</p>
                      )}
                      {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
                    </div>
                  )}

                  {field.type === "date" && (
                    <div className="space-y-2 flex flex-col">
                      <Label>{field.label}{field.required && " *"}</Label>
                      <Controller
                        control={form.control}
                        name={field.name}
                        render={({ field: f }) => (
                          <Popover>
                            <PopoverTrigger>
                              <Button
                                type="button"
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !f.value && "text-muted-foreground"
                                )}
                              >
                                {f.value instanceof Date ? (
                                  format(f.value, "PPP")
                                ) : (
                                  <span>{field.placeholder || "Pick a date"}</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={f.value instanceof Date ? f.value : undefined}
                                onSelect={f.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                      {form.formState.errors[field.name] && (
                        <p className="text-xs text-destructive">{form.formState.errors[field.name]?.message as string}</p>
                      )}
                      {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
                    </div>
                  )}

                  {field.type === "file" && (
                    <div className="space-y-2">
                      <Label>{field.label}{field.required && " *"}</Label>
                      <Input
                        type="file"
                        accept={field.accept}
                        {...form.register(field.name)}
                      />
                      {form.formState.errors[field.name] && (
                        <p className="text-xs text-destructive">{form.formState.errors[field.name]?.message as string}</p>
                      )}
                      {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
                    </div>
                  )}
                </motion.div>
              );
            })}
            </AnimatePresence>
          </div>

          {hasSteps && steps ? (
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={cn(currentStep === 0 && "invisible")}
              >
                Back
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="button" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
              )}
            </div>
          ) : (
            <Button type="button" className="w-full mt-4">Submit</Button>
          )}

          {/* OAuth Preview */}
          {!hasSteps && oauthProviders.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className={`grid grid-cols-${oauthProviders.length} gap-4`}>
                {oauthProviders.map(providerId => {
                  const provider = OAUTH_PROVIDERS.find(p => p.id === providerId);
                  if (!provider) return null;
                  const Icon = provider.icon;

                  return (
                    <div key={providerId} className="relative group">
                      <Button variant="outline" className="w-full">
                        {provider.iconSvg ? (
                          <span
                            className="contents"
                            dangerouslySetInnerHTML={{ __html: provider.iconSvg }}
                          />
                        ) : (
                          <Icon className="mr-2 h-4 w-4" />
                        )}
                        {provider.name}
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        onClick={() => toggleOAuth(providerId)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
