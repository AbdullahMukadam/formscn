"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
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
import { ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { OAUTH_PROVIDERS } from "@/lib/oauth-providers-config";
import type { FormField as FormFieldType } from "@/lib/form-templates";
import type { OAuthProvider } from "@/lib/oauth-providers-config";

interface FormPreviewProps {
  formName: string;
  formDescription: string;
  fields: FormFieldType[];
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
  fields,
  selectedFieldIndex,
  setSelectedFieldIndex,
  moveField,
  removeField,
  oauthProviders,
  toggleOAuth,
}: FormPreviewProps) {
  
  const formSchema = useMemo(() => {
    const shape: Record<string, any> = {};
    fields.forEach((field) => {
      if (field.type === "input") {
        let validation = z.string();
        if (field.inputType === "email") validation = validation.email();
        if (field.required) validation = validation.min(1, "Required");
        else validation = validation.optional().or(z.literal(""));
        shape[field.name] = validation;
      } else if (field.type === "textarea") {
        let validation = z.string();
        if (field.required) validation = validation.min(1, "Required");
        else validation = validation.optional().or(z.literal(""));
        shape[field.name] = validation;
      } else if (field.type === "checkbox") {
        let validation = z.boolean();
        if (field.required) validation = validation.refine((v) => v === true, "Required");
        else validation = validation.optional();
        shape[field.name] = validation;
      } else if (field.type === "select" || field.type === "radio") {
        let validation = z.string();
        if (field.required) validation = validation.min(1, "Required");
        else validation = validation.optional().or(z.literal(""));
        shape[field.name] = validation;
      } else {
        shape[field.name] = z.any();
      }
    });
    return z.object(shape);
  }, [fields]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  // Reset form when fields change
  useEffect(() => {
    form.reset({});
  }, [fields, form]);

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    toast.success("Form submitted successfully! (Check console)");
  };

  return (
    <Card className="w-full max-w-sm h-fit animate-in fade-in-50">
      <CardHeader className=" space-y-2">
        <CardTitle>{formName}</CardTitle>
        <CardDescription>{formDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-2" onSubmit={form.handleSubmit(onSubmit)}>
          {fields.length === 0 && (
            <div className="text-center py-10 border-2 border-dashed rounded-lg text-muted-foreground">
              <p>No fields added yet.</p>
              <p className="text-sm">Use the sidebar to add fields.</p>
            </div>
          )}

          {fields.map((field, index) => (
            <div
              key={index}
              className={`group relative p-2 -mx-2 rounded-md hover:bg-muted/50 transition-colors border-2 ${selectedFieldIndex === index ? 'border-primary' : 'border-transparent'}`}
              onClick={() => setSelectedFieldIndex(index)}
            >
              {/* Actions (Visible on Hover) */}
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
                <div className="flex items-center gap-1 bg-background shadow-md border rounded-md p-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          disabled={index === 0}
                          onClick={(e) => { e.stopPropagation(); moveField(index, "up"); }}
                        >
                          <ArrowUp className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Move Up</p></TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          disabled={index === fields.length - 1}
                          onClick={(e) => { e.stopPropagation(); moveField(index, "down"); }}
                        >
                          <ArrowDown className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Move Down</p></TooltipContent>
                    </Tooltip>

                    <div className="w-[1px] h-4 bg-border mx-0.5" />

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={(e) => { e.stopPropagation(); removeField(index); }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Remove Field</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Field Rendering */}
              {field.type === "input" && (
                <div className="space-y-2 pointer-events-none">
                  <Label>{field.label}{field.required && " *"}</Label>
                  <Input placeholder={field.placeholder} />
                  {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
                </div>
              )}

              {field.type === "textarea" && (
                <div className="space-y-2 pointer-events-none">
                  <Label>{field.label}{field.required && " *"}</Label>
                  <Textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder={field.placeholder} />
                </div>
              )}

              {field.type === "checkbox" && (
                <div className="flex items-center space-x-2 pointer-events-none py-2">
                  <Checkbox id={field.name} />
                  <Label htmlFor={field.name}>{field.label}</Label>
                </div>
              )}

              {field.type === "select" && (
                <div className="space-y-2 pointer-events-none">
                  <Label>{field.label}{field.required && " *"}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder || "Select an option..."} />
                    </SelectTrigger>
                    <SelectContent>
                      {(field.options || []).map((opt, idx) => (
                        <SelectItem key={idx} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
                </div>
              )}

              {field.type === "radio" && (
                <div className="space-y-2 pointer-events-none">
                  <Label>{field.label}{field.required && " *"}</Label>
                  <RadioGroup>
                    {(field.options || []).map((opt, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <RadioGroupItem value={opt.value} id={`${field.name}-${opt.value}`} />
                        <Label htmlFor={`${field.name}-${opt.value}`}>{opt.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
                </div>
              )}
            </div>
          ))}

          <Button type="button" className="w-full pointer-events-none">Submit</Button>

          {/* OAuth Preview */}
          {oauthProviders.length > 0 && (
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
                      <Button variant="outline" className="w-full pointer-events-none">
                        <Icon className="mr-2 h-4 w-4" />
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
