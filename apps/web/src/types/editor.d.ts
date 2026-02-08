import type { FormTemplate, FormField, FormStep } from "@/registry/default/types";
import type { OAuthProvider } from "@/lib/oauth-providers-config";
import type { AuthPluginsConfig } from "@/registry/default/lib/form-generator/types";
import type { ThemeConfig } from "@/lib/appearance-config";


export interface FormEditorState {
  // Metadata
  formName: string;
  formDescription: string;
  
  // Structure
  fields: FormField[];
  steps: FormStep[];
  activeStepIndex: number;
  
  // Auth
  oauthProviders: OAuthProvider[];
  authPlugins: AuthPluginsConfig;
  enableBetterAuth: boolean;
  
  // Config
  themeConfig: ThemeConfig;
  formLibrary: "rhf" | "tanstack";
  
  // UI State
  selectedFieldIndex: number | null;
  activeTab: string;
  publishedId: string | null;
  isPublishing: boolean;
  setActiveTab : (tab: string) => void
  setActiveStep: (index: number) => void;

}


export interface FormFieldActions {
  addField: (type: FormField["type"], inputType?: string) => void;
  removeField: (index: number) => void;
  updateField: (index: number, updates: Partial<FormField>) => void;
  moveField: (index: number, direction: "up" | "down") => void;
  selectField: (index: number | null) => void;
  setFields: (fields: FormField[]) => void
}

export interface FormStepActions {
  toggleMultiStep: (enabled: boolean) => void;
  addStep: () => void;
  removeStep: (index: number) => void;
  updateStep: (index: number, updates: Partial<FormStep>) => void;
  setActiveStep: (index: number) => void;
  setActiveStepIndex: (index: number) => void;
}

export interface FormAuthActions {
  toggleOAuth: (provider: OAuthProvider) => void;
  toggleAuthPlugin: (plugin: keyof AuthPluginsConfig) => void;
  setEnableBetterAuth: (enabled: boolean) => void;
}

export interface FormMetadataActions {
  setFormName: (name: string) => void;
  setFormDescription: (description: string) => void;
  resetForm: () => void;
}

export interface FormConfigActions {
  setThemeConfig: (config: ThemeConfig) => void;
  updateThemeConfig: (updates: Partial<ThemeConfig>) => void;
  setFormLibrary: (library: "rhf" | "tanstack") => void;
}

export interface FormPublishActions {
  setPublishedId: (id: string | null) => void;
  setIsPublishing: (isPublishing: boolean) => void;
  clearPublishedState: () => void;
}


export interface FormEditorGetters {
  isMultiStep: boolean;
  selectedField: FormField | null;
  currentFields: FormField[];
  hasChanges: boolean;
}

export interface FormEditorInstance extends 
  FormEditorState,
  FormFieldActions,
  FormStepActions,
  FormAuthActions,
  FormMetadataActions,
  FormConfigActions,
  FormPublishActions,
  FormEditorGetters {}


export interface FormEditorOptions {
  initialTemplate?: FormTemplate;
  onFieldChange?: () => void;
  onPublishStateChange?: () => void;
}

export interface FieldCreationConfig {
  type: FormField["type"];
  inputType?: string;
  defaultLabel?: string;
  defaultPlaceholder?: string;
}
