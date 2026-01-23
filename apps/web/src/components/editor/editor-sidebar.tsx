"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUp,
  Plus,
  Settings,
  Box,
  Layout,
  Trash2,
  FilePlus,
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
import { FORM_FIELD_TYPES } from "@/lib/form-fields-config";
import { OAUTH_PROVIDERS } from "@/lib/oauth-providers-config";
import type { FormField as FormFieldType } from "@/lib/form-templates";
import type { OAuthProvider } from "@/lib/oauth-providers-config";
import type { DatabaseAdapter, Framework } from "@/registry/default/lib/form-generator";

interface EditorSidebarProps {
  // Form Meta
  formName: string;
  setFormName: (name: string) => void;
  formDescription: string;
  setFormDescription: (desc: string) => void;
  
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
  
  // Helpers
  isAuthEnabled: boolean;
  resetForm: () => void;
}

export function EditorSidebar({
  formName,
  setFormName,
  formDescription,
  setFormDescription,
  selectedField,
  selectedFieldIndex,
  setSelectedFieldIndex,
  updateField,
  addField,
  oauthProviders,
  toggleOAuth,
  // These props might still be passed but unused in UI now, 
  // or we can keep them for state lifting if needed elsewhere
  // but for now we just don't render controls for them here.
  databaseAdapter,
  setDatabaseAdapter,
  framework,
  setFramework,
  isAuthEnabled,
  resetForm,
}: EditorSidebarProps) {
  
  const fieldTypes = useMemo(() => ({
    basic: FORM_FIELD_TYPES.filter(f => f.enabled && f.category === "basic"),
    advanced: FORM_FIELD_TYPES.filter(f => f.enabled && f.category === "advanced"),
    selection: FORM_FIELD_TYPES.filter(f => f.enabled && f.category === "selection"),
  }), []);

  if (selectedField && selectedFieldIndex !== null) {
    return (
      <aside className="w-80 border-r bg-muted/10 flex flex-col h-full overflow-y-auto">
        <div className="p-4 border-b flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setSelectedFieldIndex(null)}>
            <ArrowUp className="h-4 w-4 -rotate-90" />
          </Button>
          <span className="font-semibold">Edit Field</span>
        </div>
        <div className="p-4 space-y-4">
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

          <div className="flex items-center justify-between pt-2">
            <Label>Required</Label>
            <Switch
              checked={selectedField.required}
              onCheckedChange={(c) => updateField(selectedFieldIndex, { required: c })}
            />
          </div>

          {selectedField.type === "input" && (
            <div className="space-y-2 pt-2">
              <Label>Input Type</Label>
              <select
                className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={selectedField.inputType}
                onChange={(e) => updateField(selectedFieldIndex, { inputType: e.target.value as any })}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="password">Password</option>
                <option value="number">Number</option>
                <option value="tel">Tel</option>
                <option value="url">URL</option>
              </select>
            </div>
          )}

          {(selectedField.type === "select" || selectedField.type === "radio") && (
            <div className="space-y-2 pt-2">
              <Label>Options</Label>
              <div className="space-y-2">
                {(selectedField.options || []).map((option, optIdx) => (
                  <div key={optIdx} className="flex gap-2">
                    <Input
                      placeholder="Label"
                      value={option.label}
                      onChange={(e) => {
                        const newOptions = [...(selectedField.options || [])];
                        newOptions[optIdx] = { ...option, label: e.target.value };
                        updateField(selectedFieldIndex, { options: newOptions });
                      }}
                    />
                    <Input
                      placeholder="Value"
                      value={option.value}
                      onChange={(e) => {
                        const newOptions = [...(selectedField.options || [])];
                        newOptions[optIdx] = { ...option, value: e.target.value };
                        updateField(selectedFieldIndex, { options: newOptions });
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newOptions = [
                      ...(selectedField.options || []),
                      { label: `Option ${(selectedField.options?.length || 0) + 1}`, value: `option${(selectedField.options?.length || 0) + 1}` }
                    ];
                    updateField(selectedFieldIndex, { options: newOptions });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Option
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 border-r bg-muted/10 flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Layout className="h-5 w-5" />
            <span>Form Builder</span>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" title="Create New Form">
                <FilePlus className="h-4 w-4 mr-2" />
                New Form
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Create New Form?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will clear your current form and all unsaved changes will be lost. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetForm}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <p className="text-xs text-muted-foreground">Customize your form structure</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Section: Form Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Settings className="h-4 w-4" /> Form Settings
          </h3>
          <div className="space-y-2">
            <Label htmlFor="formName">Form Title</Label>
            <Input
              id="formName"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="formDesc">Description</Label>
            <Input
              id="formDesc"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </div>
        </div>

        <Separator />

        {/* Section: Add Fields */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Fields
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(fieldTypes).flat().map((fieldConfig, idx) => {
              const Icon = fieldConfig.icon;
              // Map config types to FormField types
              const actualType: FormFieldType["type"] =
                fieldConfig.type === "number" || fieldConfig.type === "date" || fieldConfig.type === "switch"
                  ? "input"
                  : fieldConfig.type;
              
              return (
                <Button
                  key={`${fieldConfig.type}-${fieldConfig.inputType || fieldConfig.name}-${idx}`}
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => addField(actualType, fieldConfig.inputType)}
                >
                  <Icon className="mr-2 h-4 w-4" /> {fieldConfig.name}
                </Button>
              );
            })}
          </div>
        </div>

        <Separator />

          {/* Section: OAuth */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Box className="h-4 w-4" /> OAuth Providers
            </h3>
            <div className="space-y-3">
              {OAUTH_PROVIDERS.filter(p => p.enabled).map((provider) => {
                const Icon = provider.icon;
                return (
                  <div key={provider.id} className="flex items-center justify-between">
                    <Label htmlFor={`${provider.id}-auth`} className="flex items-center gap-2 cursor-pointer">
                      <Icon className="h-4 w-4" /> {provider.name}
                    </Label>
                    <Switch
                      id={`${provider.id}-auth`}
                      checked={oauthProviders.includes(provider.id)}
                      onCheckedChange={() => toggleOAuth(provider.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </aside>
  );
}
