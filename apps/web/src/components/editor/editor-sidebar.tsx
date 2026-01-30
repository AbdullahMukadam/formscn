"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowUp,
  Plus,
  Settings,
  Box,
  Layout,
  Trash2,
  FilePlus,
  Layers,
  Palette,
  Shield,
  Type
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FORM_FIELD_TYPES } from "@/lib/form-fields-config";
import { OAUTH_PROVIDERS } from "@/lib/oauth-providers-config";
import type { FormStep, FormField as FormFieldType } from "@/lib/form-templates";
import type { OAuthProvider } from "@/lib/oauth-providers-config";
import type { DatabaseAdapter, Framework, AuthPluginsConfig } from "@/registry/default/lib/form-generator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AnimatePresence, motion } from "framer-motion";
import type { ThemeConfig } from "@/lib/appearance-config";
import { AppearanceSelector } from "./appearance-selector";

interface EditorSidebarProps {
  // Form Meta
  formName: string;
  setFormName: (name: string) => void;
  formDescription: string;
  setFormDescription: (desc: string) => void;

  // Appearance
  themeConfig: ThemeConfig;
  updateThemeConfig: (updates: Partial<ThemeConfig>) => void;

  // Steps
  isMultiStep: boolean;
  toggleMultiStep: (enabled: boolean) => void;
  steps: FormStep[];
  activeStepIndex: number;
  setActiveStepIndex: (index: number) => void;
  addStep: () => void;
  removeStep: (index: number) => void;
  updateStep: (index: number, updates: Partial<FormStep>) => void;

  // Fields
  fields: FormFieldType[];
  selectedField: FormFieldType | null;
  selectedFieldIndex: number | null;
  setSelectedFieldIndex: (index: number | null) => void;
  updateField: (index: number, updates: Partial<FormFieldType>) => void;
  addField: (type: FormFieldType["type"], inputType?: string) => void;

  // OAuth
  oauthProviders: OAuthProvider[];
  toggleOAuth: (provider: OAuthProvider) => void;
  databaseAdapter: DatabaseAdapter;
  setDatabaseAdapter: (adapter: DatabaseAdapter) => void;
  framework: Framework;
  setFramework: (framework: Framework) => void;

  // Auth Plugins
  authPlugins: AuthPluginsConfig;
  toggleAuthPlugin: (plugin: keyof AuthPluginsConfig) => void;

  // Helpers
  isAuthEnabled: boolean;
  enableBetterAuth: boolean;
  setEnableBetterAuth: (enabled: boolean) => void;
  resetForm: () => void;
}

export function EditorSidebar({
  formName,
  setFormName,
  formDescription,
  setFormDescription,
  isMultiStep,
  toggleMultiStep,
  steps,
  activeStepIndex,
  setActiveStepIndex,
  addStep,
  removeStep,
  updateStep,
  selectedField,
  selectedFieldIndex,
  setSelectedFieldIndex,
  updateField,
  addField,
  oauthProviders,
  toggleOAuth,
  databaseAdapter,
  setDatabaseAdapter,
  framework,
  setFramework,
  authPlugins,
  toggleAuthPlugin,
  isAuthEnabled,
  enableBetterAuth,
  setEnableBetterAuth,
  resetForm,
  themeConfig,
  updateThemeConfig,
}: EditorSidebarProps) {

  const fieldTypes = useMemo(() => ({
    basic: FORM_FIELD_TYPES.filter(f => f.enabled && f.category === "basic"),
    selection: FORM_FIELD_TYPES.filter(f => f.enabled && f.category === "selection"),
    advanced: FORM_FIELD_TYPES.filter(f => f.enabled && f.category === "advanced"),
  }), []);

  // -- Edit Field View --
  if (selectedField && selectedFieldIndex !== null) {
    return (
      <aside className="w-full lg:w-80 border-r bg-background flex flex-col h-full overflow-y-auto">
        <div className="p-4 border-b flex items-center gap-2 bg-background sticky top-0 z-10">
          <Button variant="ghost" size="sm" className="-ml-2" onClick={() => setSelectedFieldIndex(null)}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <span className="font-semibold text-sm ml-auto">Edit Field</span>
        </div>
        
        <div className="p-4 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Label</Label>
              <Input
                value={selectedField.label}
                onChange={(e) => updateField(selectedFieldIndex, { label: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Name (Key)</Label>
              <Input
                value={selectedField.name}
                onChange={(e) => updateField(selectedFieldIndex, { name: e.target.value })}
                className="font-mono text-xs"
              />
            </div>

            {selectedField.type !== "checkbox" && (
              <div className="space-y-2">
                <Label>Placeholder</Label>
                <Input
                  value={selectedField.placeholder || ""}
                  onChange={(e) => updateField(selectedFieldIndex, { placeholder: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={selectedField.description || ""}
                onChange={(e) => updateField(selectedFieldIndex, { description: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <Label>Required</Label>
              <Switch
                checked={selectedField.required}
                onCheckedChange={(c) => updateField(selectedFieldIndex, { required: c })}
              />
            </div>
            
            <Separator />

            {selectedField.type === "input" && (
              <div className="space-y-2">
                <Label>Input Type</Label>
                <Select
                  value={selectedField.inputType}
                  onValueChange={(e) => updateField(selectedFieldIndex, { inputType: e as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="password">Password</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="tel">Telephone</SelectItem>
                      <SelectItem value="url">URL</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}

            {(selectedField.type === "select" || selectedField.type === "radio") && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Options</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => {
                      const newOptions = [
                        ...(selectedField.options || []),
                        { label: `Option ${(selectedField.options?.length || 0) + 1}`, value: `option${(selectedField.options?.length || 0) + 1}` }
                      ];
                      updateField(selectedFieldIndex, { options: newOptions });
                    }}
                  >
                    <Plus className="mr-1 h-3 w-3" /> Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {(selectedField.options || []).map((option, optIdx) => (
                    <div key={optIdx} className="flex gap-2 items-center">
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        <Input
                          placeholder="Label"
                          value={option.label}
                          className="h-8 text-xs"
                          onChange={(e) => {
                            const newOptions = [...(selectedField.options || [])];
                            newOptions[optIdx] = { ...option, label: e.target.value };
                            updateField(selectedFieldIndex, { options: newOptions });
                          }}
                        />
                        <Input
                          placeholder="Value"
                          value={option.value}
                          className="h-8 text-xs font-mono"
                          onChange={(e) => {
                            const newOptions = [...(selectedField.options || [])];
                            newOptions[optIdx] = { ...option, value: e.target.value };
                            updateField(selectedFieldIndex, { options: newOptions });
                          }}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                        onClick={() => {
                          const newOptions = [...(selectedField.options || [])];
                          newOptions.splice(optIdx, 1);
                          updateField(selectedFieldIndex, { options: newOptions });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {(selectedField.options || []).length === 0 && (
                    <p className="text-xs text-muted-foreground text-center py-2">No options added</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    );
  }

  // -- Main Editor View --
  return (
    <aside className="w-full lg:w-80 border-r bg-background flex flex-col h-full">
      {/* Header */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-background shrink-0">
        <div className="flex items-center gap-2 font-semibold">
          <Layout className="h-5 w-5" />
          <span>Form Builder</span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="ghost" size="icon" title="New Form">
              <FilePlus className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create New Form?</AlertDialogTitle>
              <AlertDialogDescription>
                This will clear your current form and all unsaved changes will be lost.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={resetForm}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <Accordion defaultValue={["fields"]} className="w-full">
          
          {/* Section: Fields */}
          <AccordionItem value="fields">
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Box className="h-4 w-4" />
                <span>Form Fields</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-1">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Basic</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {fieldTypes.basic.map((fieldConfig, idx) => (
                      <FieldButton 
                        key={idx} 
                        config={fieldConfig} 
                        onClick={(type, inputType) => addField(type, inputType)} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Selection</Label>
                  <div className="grid grid-cols-2 gap-2">
                     {fieldTypes.selection.map((fieldConfig, idx) => (
                      <FieldButton 
                        key={idx} 
                        config={fieldConfig} 
                        onClick={(type, inputType) => addField(type, inputType)} 
                      />
                    ))}
                  </div>
                </div>

                 <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Advanced</Label>
                  <div className="grid grid-cols-2 gap-2">
                     {fieldTypes.advanced.map((fieldConfig, idx) => (
                      <FieldButton 
                        key={idx} 
                        config={fieldConfig} 
                        onClick={(type, inputType) => addField(type, inputType)} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Section: Settings */}
          <AccordionItem value="settings">
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Settings className="h-4 w-4" />
                <span>Form Settings</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-1 space-y-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">Form Title</Label>
                  <Input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="h-8"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Description</Label>
                  <Input
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="h-8"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-3">
                <div className="space-y-0.5">
                  <Label className="text-sm">Multi-step Form</Label>
                  <p className="text-[10px] text-muted-foreground">Split form into steps</p>
                </div>
                <Switch
                  checked={isMultiStep}
                  onCheckedChange={toggleMultiStep}
                />
              </div>

              {isMultiStep && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase">Steps</Label>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={addStep}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`p-2 rounded-md border text-sm cursor-pointer transition-colors group ${activeStepIndex === index ? "bg-accent border-primary" : "hover:bg-muted/50"
                          }`}
                        onClick={() => {
                          setActiveStepIndex(index);
                          setSelectedFieldIndex(null);
                        }}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-medium text-xs">Step {index + 1}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeStep(index);
                            }}
                            disabled={steps.length <= 1}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <Input
                          value={step.title}
                          onChange={(e) => updateStep(index, { title: e.target.value })}
                          className="h-7 text-xs mb-1"
                          placeholder="Step Title"
                          onClick={(e) => e.stopPropagation()} // Prevent stepping when editing title
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Section: Appearance */}
          <AccordionItem value="appearance">
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Palette className="h-4 w-4" />
                <span>Appearance</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-1">
              <AppearanceSelector config={themeConfig} onUpdate={updateThemeConfig} />
            </AccordionContent>
          </AccordionItem>

          {/* Section: Auth */}
          <AccordionItem value="auth">
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Shield className="h-4 w-4" />
                <span>Authentication</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-sm">Better Auth</Label>
                  <p className="text-[10px] text-muted-foreground">Enable auth features</p>
                </div>
                <Switch
                  checked={enableBetterAuth}
                  onCheckedChange={setEnableBetterAuth}
                />
              </div>

              <AnimatePresence>
                {enableBetterAuth && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden space-y-4"
                  >
                    <Separator />
                    
                    <div className="space-y-2">
                       <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Providers</Label>
                       <div className="space-y-2">
                        {OAUTH_PROVIDERS.filter(p => p.enabled).map((provider) => (
                          <div key={provider.id} className="flex items-center justify-between border rounded-md p-2">
                             <div className="flex items-center gap-2">
                                <span
                                  className="flex h-4 w-4 items-center justify-center [&>svg]:!m-0 [&>svg]:h-full [&>svg]:w-full"
                                  dangerouslySetInnerHTML={{ __html: provider.iconSvg }}
                                />
                                <span className="text-sm">{provider.name}</span>
                             </div>
                             <Switch
                                checked={oauthProviders.includes(provider.id)}
                                onCheckedChange={() => toggleOAuth(provider.id)}
                                className="scale-75 origin-right"
                              />
                          </div>
                        ))}
                       </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Plugins</Label>
                      <div className="space-y-1">
                        {[
                          { id: "twoFactor", name: "Two-Factor (2FA)" },
                          { id: "magicLink", name: "Magic Link" },
                          { id: "passkey", name: "Passkeys" },
                          { id: "username", name: "Username Auth" },
                          { id: "organization", name: "Organizations" },
                          { id: "admin", name: "Admin Dashboard" },
                        ].map((plugin) => (
                           <div key={plugin.id} className="flex items-center justify-between py-1">
                             <Label htmlFor={`${plugin.id}-plugin`} className="text-sm font-normal cursor-pointer">
                               {plugin.name}
                             </Label>
                             <Switch
                               id={`${plugin.id}-plugin`}
                               checked={!!authPlugins[plugin.id as keyof AuthPluginsConfig]}
                               onCheckedChange={() => toggleAuthPlugin(plugin.id as keyof AuthPluginsConfig)}
                               className="scale-75 origin-right"
                             />
                           </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AccordionContent>
          </AccordionItem>
          
        </Accordion>
      </div>
    </aside>
  );
}

function FieldButton({ config, onClick }: { config: any, onClick: (type: any, inputType?: string) => void }) {
  const Icon = config.icon;
  // Map config types to FormField types
  let actualType: FormFieldType["type"] = config.type as any;
  if (config.type === "input" || config.type === "number" || (config.type === "date" && config.name === "Date Input") || config.type === "switch") {
    actualType = "input";
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="justify-start h-9 px-3"
      onClick={() => onClick(actualType, config.inputType)}
    >
      <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
      <span className="truncate">{config.name}</span>
    </Button>
  );
}
