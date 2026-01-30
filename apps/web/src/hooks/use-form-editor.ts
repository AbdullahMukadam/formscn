"use client";

import { useState } from "react";
import type { FormTemplate, FormField as FormFieldType, FormStep } from "@/lib/form-templates";
import type { OAuthProvider } from "@/lib/oauth-providers-config";
import type { DatabaseAdapter, Framework, AuthPluginsConfig } from "@/registry/default/lib/form-generator";
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

  // Helper to determine if we are in multi-step mode
  const isMultiStep = steps.length > 0;
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // State for OAuth
  const [oauthProviders, setOauthProviders] = useState<OAuthProvider[]>(initialTemplate?.oauthProviders || []);

  // State for database adapter & framework
  const [databaseAdapter, _setDatabaseAdapter] = useState<DatabaseAdapter>("drizzle");
  const [framework, _setFramework] = useState<Framework>("next");
  const [authPlugins, setAuthPlugins] = useState<AuthPluginsConfig>(initialTemplate?.authPlugins || {});
  
  // Master Switch for Better Auth
  const [enableBetterAuth, setEnableBetterAuth] = useState(
    !!initialTemplate?.oauthProviders?.length || 
    !!Object.keys(initialTemplate?.authPlugins || {}).length ||
    false
  );

  const setDatabaseAdapter = (adapter: DatabaseAdapter) => {
    _setDatabaseAdapter(adapter);
    if (publishedId) {
       setPublishedId(null);
       toast.info("Framework/Adapter changed. Please regenerate the CLI command.");
    }
  };

  const setFramework = (fw: Framework) => {
    _setFramework(fw);
    if (publishedId) {
       setPublishedId(null);
       toast.info("Framework/Adapter changed. Please regenerate the CLI command.");
    }
  };


  // State for UI
  const [selectedFieldIndex, setSelectedFieldIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("preview");
  const [publishedId, setPublishedId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const selectedField = selectedFieldIndex !== null 
    ? (isMultiStep ? steps[activeStepIndex]?.fields[selectedFieldIndex] : fields[selectedFieldIndex]) 
    : null;

  // Actions
  const toggleMultiStep = (enabled: boolean) => {
    if (enabled) {
      // Switch to multi-step: Move all fields to Step 1
      const firstStep: FormStep = {
        id: "step_1",
        title: "Step 1",
        description: "First step of the form",
        fields: [...fields]
      };
      setSteps([firstStep]);
      setFields([]); // Clear flat fields as we now use steps
    } else {
      // Switch to single-step: Flatten all steps fields
      const allFields = steps.flatMap(s => s.fields);
      setFields(allFields);
      setSteps([]);
    }
    setPublishedId(null);
  };

  const addStep = () => {
    const newStep: FormStep = {
      id: `step_${steps.length + 1}`,
      title: `Step ${steps.length + 1}`,
      description: "",
      fields: []
    };
    setSteps([...steps, newStep]);
    setActiveStepIndex(steps.length);
  };

  const removeStep = (index: number) => {
    if (steps.length <= 1) return; // Don't remove the last step if in multi-step mode
    const newSteps = [...steps];
    
    const fieldsToMove = newSteps[index].fields;
    if (index > 0) {
      newSteps[index - 1].fields.push(...fieldsToMove);
    } else if (newSteps.length > 1) {
      newSteps[1].fields.unshift(...fieldsToMove);
    }

    newSteps.splice(index, 1);
    setSteps(newSteps);
    if (activeStepIndex >= index && activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  const updateStep = (index: number, updates: Partial<FormStep>) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], ...updates };
    setSteps(newSteps);
  };

  const updateField = (index: number, updates: Partial<FormFieldType>) => {
    if (isMultiStep) {
      const newSteps = [...steps];
      const step = newSteps[activeStepIndex];
      if (step && step.fields[index]) {
        step.fields[index] = { ...step.fields[index], ...updates };
        setSteps(newSteps);
      }
    } else {
      const newFields = [...fields];
      newFields[index] = { ...newFields[index], ...updates };
      setFields(newFields);
    }
    setPublishedId(null);
  };

  const addField = (type: FormFieldType["type"], inputType?: string) => {
    const baseName = `field_${Date.now()}`;
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

    if (isMultiStep) {
      const newSteps = [...steps];
      if (!newSteps[activeStepIndex]) return;
      newSteps[activeStepIndex].fields.push(newField);
      setSteps(newSteps);
      setSelectedFieldIndex(newSteps[activeStepIndex].fields.length - 1);
    } else {
      setFields([...fields, newField]);
      setSelectedFieldIndex(fields.length);
    }
    setPublishedId(null);
    toast.success(`Added ${type} field`);
  };

  const removeField = (index: number) => {
    if (isMultiStep) {
      const newSteps = [...steps];
      if (!newSteps[activeStepIndex]) return;
      newSteps[activeStepIndex].fields.splice(index, 1);
      setSteps(newSteps);
      if (selectedFieldIndex === index) setSelectedFieldIndex(null);
      if (selectedFieldIndex !== null && selectedFieldIndex > index) setSelectedFieldIndex(selectedFieldIndex - 1);
    } else {
      const newFields = [...fields];
      newFields.splice(index, 1);
      setFields(newFields);
      if (selectedFieldIndex === index) setSelectedFieldIndex(null);
      if (selectedFieldIndex !== null && selectedFieldIndex > index) setSelectedFieldIndex(selectedFieldIndex - 1);
    }
    setPublishedId(null);
    toast.success("Field removed");
  };

  const moveField = (index: number, direction: "up" | "down") => {
    if (isMultiStep) {
      const newSteps = [...steps];
      const currentFields = newSteps[activeStepIndex].fields;
      if (
        (direction === "up" && index === 0) ||
        (direction === "down" && index === currentFields.length - 1)
      ) return;

      const targetIndex = direction === "up" ? index - 1 : index + 1;
      [currentFields[index], currentFields[targetIndex]] = [currentFields[targetIndex], currentFields[index]];
      setSteps(newSteps);
    } else {
      if (
        (direction === "up" && index === 0) ||
        (direction === "down" && index === fields.length - 1)
      ) return;
  
      const newFields = [...fields];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
      setFields(newFields);
    }
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

  const toggleAuthPlugin = (plugin: keyof AuthPluginsConfig) => {
    setAuthPlugins((prev) => ({
      ...prev,
      [plugin]: !prev[plugin]
    }));
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
    setSteps,
    isMultiStep,
    activeStepIndex,
    setActiveStepIndex,
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

    authPlugins,
    setAuthPlugins,
    toggleAuthPlugin,
    enableBetterAuth,
    setEnableBetterAuth,

    // Actions
    updateField,
    addField,
    removeField,
    moveField,
    toggleOAuth,
    resetForm,
    toggleMultiStep,
    addStep,
    removeStep,
    updateStep,
  };
}
