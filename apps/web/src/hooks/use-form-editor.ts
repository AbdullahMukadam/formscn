"use client";

import { useState } from "react";
import type { FormTemplate, FormField as FormFieldType, FormStep } from "@/lib/form-templates";
import type { OAuthProvider } from "@/lib/oauth-providers-config";
import type { DatabaseAdapter, Framework } from "@/registry/default/lib/form-generator";
import { toast } from "sonner";

interface UseFormEditorProps {
  initialTemplate?: FormTemplate;
}

export function useFormEditor({ initialTemplate }: UseFormEditorProps = {}) {
  // State for form metadata
  const [formName, setFormName] = useState(initialTemplate?.name || "My New Form");
  const [formDescription, setFormDescription] = useState(initialTemplate?.description || "A custom form created with FormSCN");

  // State for steps and fields
  const [steps, setSteps] = useState<FormStep[]>(initialTemplate?.steps || []);
  
  // Initialize fields: if steps exist, flatten them. Otherwise use fields.
  const initialFields = initialTemplate?.fields?.length 
    ? initialTemplate.fields 
    : (initialTemplate?.steps ? initialTemplate.steps.flatMap(s => s.fields) : []);

  const [fields, setFields] = useState<FormFieldType[]>(initialFields);

  // State for OAuth
  const [oauthProviders, setOauthProviders] = useState<OAuthProvider[]>(initialTemplate?.oauthProviders || []);


  // State for database adapter & framework
  const [databaseAdapter, setDatabaseAdapter] = useState<DatabaseAdapter>("drizzle");
  const [framework, setFramework] = useState<Framework>("next");

  // State for UI
  const [selectedFieldIndex, setSelectedFieldIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("preview");
  const [publishedId, setPublishedId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const selectedField = selectedFieldIndex !== null ? fields[selectedFieldIndex] : null;

  // Actions
  const updateField = (index: number, updates: Partial<FormFieldType>) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], ...updates };
    setFields(newFields);
    setPublishedId(null);
  };

  const addField = (type: FormFieldType["type"], inputType?: string) => {
    const baseName = `field_${fields.length + 1}`;
    const newField: FormFieldType = {
      type,
      name: baseName,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      placeholder: "Enter value...",
      required: false,
      inputType: type === "input" ? (inputType as any || "text") : undefined,
      options: (type === "select" || type === "radio") ? [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
      ] : undefined,
    };
    setFields([...fields, newField]);
    setSelectedFieldIndex(fields.length);
    setPublishedId(null);
    toast.success(`Added ${type} field`);
  };

  const removeField = (index: number) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
    if (selectedFieldIndex === index) setSelectedFieldIndex(null);
    if (selectedFieldIndex !== null && selectedFieldIndex > index) setSelectedFieldIndex(selectedFieldIndex - 1);
    setPublishedId(null);
    toast.success("Field removed");
  };

  const moveField = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === fields.length - 1)
    ) {
      return;
    }

    const newFields = [...fields];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
    setFields(newFields);
    setPublishedId(null);
  };

  const toggleOAuth = (provider: OAuthProvider) => {
    setOauthProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider]
    );
    setPublishedId(null);
  };

  const resetForm = () => {
    setFormName("My New Form");
    setFormDescription("A custom form created with FormSCN");
    setFields([]);
    setOauthProviders([]);
    setPublishedId(null);
    setSelectedFieldIndex(null);
    toast.success("New form created");
  };

  return {
    // State
    formName,
    setFormName,
    formDescription,
    setFormDescription,
    fields,
    setFields,
    steps,
    oauthProviders,
    setOauthProviders,
    databaseAdapter,
    setDatabaseAdapter,
    framework,
    setFramework,
    selectedFieldIndex,
    setSelectedFieldIndex,
    selectedField,
    activeTab,
    setActiveTab,
    publishedId,
    setPublishedId,
    isPublishing,
    setIsPublishing,

    // Actions
    updateField,
    addField,
    removeField,
    moveField,
    toggleOAuth,
    resetForm,
  };
}
