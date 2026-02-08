import { toast } from "sonner";
import type { FormField, FormStep, FormTemplate } from "@/registry/default/types";
import type { OAuthProvider } from "@/lib/oauth-providers-config";
import type { AuthPluginsConfig } from "@/registry/default/lib/form-generator/types";
import type { ThemeConfig } from "@/lib/appearance-config";
import type {
  FormEditorState,
  FormEditorOptions,
  FormEditorGetters
} from "@/types/editor";

function createInitialState(template?: FormTemplate): FormEditorState {
  const fields = template?.fields?.length
    ? template.fields
    : template?.steps?.flatMap(s => s.fields) ?? [];

  return {
    formName: template?.name ?? "My New Form",
    formDescription: template?.description ?? "A custom form created with FormSCN",
    fields,
    steps: template?.steps ?? [],
    activeStepIndex: 0,
    oauthProviders: template?.oauthProviders ?? [],
    authPlugins: template?.authPlugins ?? {},
    enableBetterAuth: Boolean(
      template?.oauthProviders?.length ||
      Object.keys(template?.authPlugins ?? {}).length
    ),
    themeConfig: { color: "zinc", font: "default", radius: "0.5" },
    formLibrary: "rhf",
    selectedFieldIndex: null,
    activeTab: "preview",
    publishedId: null,
    isPublishing: false,
    setActiveTab: () => {},
    setActiveStep: ()=> {}
  };
}

export class FormEditor {
  private state: FormEditorState;
  private cachedSnapshot: FormEditorState;
  private options: FormEditorOptions;
  private listeners: Set<() => void> = new Set();

  constructor(options: FormEditorOptions = {}) {
    this.options = options;
    this.state = createInitialState(options.initialTemplate);
    this.cachedSnapshot = this.state;
  }

  getState(): FormEditorState {
    return this.cachedSnapshot;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  private setState(updates: Partial<FormEditorState>) {
    this.state = { ...this.state, ...updates };
    // Create new cached snapshot only when state actually changes
    this.cachedSnapshot = { ...this.state };
    this.notify();
  }

  getGetters(): FormEditorGetters {
    return {
      isMultiStep: this.state.steps.length > 0,
      selectedField: this.getSelectedField(),
      currentFields: this.getCurrentFields(),
      hasChanges: this.state.publishedId !== null,
    };
  }

  private getSelectedField(): FormField | null {
    if (this.state.selectedFieldIndex === null) return null;

    const fields = this.getCurrentFields();
    return fields[this.state.selectedFieldIndex] ?? null;
  }

  private getCurrentFields(): FormField[] {
    if (this.state.steps.length > 0) {
      return this.state.steps[this.state.activeStepIndex]?.fields ?? [];
    }
    return this.state.fields;
  }

  setFormName(name: string) {
    this.setState({ formName: name });
  }

  setFormDescription(description: string) {
    this.setState({ formDescription: description });
  }

  resetForm() {
    this.setState(createInitialState());
    toast.success("New form created");
  }

  addField(type: FormField["type"], inputType?: string) {
    const newField = this.createField(type, inputType);
    const currentFields = this.getCurrentFields();
    const newFields = [...currentFields, newField];

    if (this.state.steps.length > 0) {
      const newSteps = [...this.state.steps];
      newSteps[this.state.activeStepIndex] = {
        ...newSteps[this.state.activeStepIndex],
        fields: newFields,
      };
      this.setState({
        steps: newSteps,
        selectedFieldIndex: newFields.length - 1,
        publishedId: null,
      });
    } else {
      this.setState({
        fields: newFields,
        selectedFieldIndex: newFields.length - 1,
        publishedId: null,
      });
    }

    toast.success(`Added ${type} field`);
  }

  removeField(index: number) {
    const currentFields = this.getCurrentFields();
    const newFields = currentFields.filter((_, i) => i !== index);

    if (this.state.steps.length > 0) {
      const newSteps = [...this.state.steps];
      newSteps[this.state.activeStepIndex] = {
        ...newSteps[this.state.activeStepIndex],
        fields: newFields,
      };
      this.setState({ steps: newSteps });
    } else {
      this.setState({ fields: newFields });
    }

    // Update selection
    if (this.state.selectedFieldIndex === index) {
      this.setState({ selectedFieldIndex: null });
    } else if (this.state.selectedFieldIndex !== null && this.state.selectedFieldIndex > index) {
      this.setState({ selectedFieldIndex: this.state.selectedFieldIndex - 1 });
    }

    this.setState({ publishedId: null });
    toast.success("Field removed");
  }

  updateField(index: number, updates: Partial<FormField>) {
    if (this.state.steps.length > 0) {
      const newSteps = [...this.state.steps];
      const step = newSteps[this.state.activeStepIndex];
      if (step?.fields[index]) {
        step.fields[index] = { ...step.fields[index], ...updates };
        this.setState({ steps: newSteps, publishedId: null });
      }
    } else {
      const newFields = [...this.state.fields];
      if (newFields[index]) {
        newFields[index] = { ...newFields[index], ...updates };
        this.setState({ fields: newFields, publishedId: null });
      }
    }
  }

  moveField(index: number, direction: "up" | "down") {
    const currentFields = this.getCurrentFields();
    const isAtBoundary =
      (direction === "up" && index === 0) ||
      (direction === "down" && index === currentFields.length - 1);

    if (isAtBoundary) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const newFields = [...currentFields];
    [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];

    if (this.state.steps.length > 0) {
      const newSteps = [...this.state.steps];
      newSteps[this.state.activeStepIndex] = {
        ...newSteps[this.state.activeStepIndex],
        fields: newFields,
      };
      this.setState({ steps: newSteps, publishedId: null });
    } else {
      this.setState({ fields: newFields, publishedId: null });
    }
  }

  selectField(index: number | null) {
    this.setState({ selectedFieldIndex: index });
  }

  private createField(type: FormField["type"], inputType?: string): FormField {
    const baseName = `field_${Date.now()}`;

    const uiType = this.inferUIType(type, inputType);

    return {
      type,
      name: baseName,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      placeholder: "Enter value...",
      required: false,
      inputType: type === "input" ? (inputType as FormField["inputType"] ?? "text") : undefined,
      uiType,
      uiConfig: uiType === "phone" ? { country: "US" as const } : undefined,
      options: (type === "select" || type === "radio")
        ? [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
        ]
        : undefined,
    };
  }

  private inferUIType(type: FormField["type"], inputType?: string): string | undefined {
    if (type !== "input") return undefined;

    switch (inputType) {
      case "tel": return "phone";
      case "email": return "email";
      case "url": return "url";
      case "password": return "password";
      default: return undefined;
    }
  }

  toggleMultiStep(enabled: boolean) {
    if (enabled) {
      const firstStep: FormStep = {
        id: "step_1",
        title: "Step 1",
        description: "First step of the form",
        fields: [...this.state.fields],
      };
      this.setState({
        steps: [firstStep],
        fields: [],
        publishedId: null,
      });
    } else {
      const allFields = this.state.steps.flatMap(s => s.fields);
      this.setState({
        fields: allFields,
        steps: [],
        activeStepIndex: 0,
        publishedId: null,
      });
    }
  }

  addStep() {
    const newStep: FormStep = {
      id: `step_${this.state.steps.length + 1}`,
      title: `Step ${this.state.steps.length + 1}`,
      description: "",
      fields: [],
    };
    this.setState({
      steps: [...this.state.steps, newStep],
      activeStepIndex: this.state.steps.length,
      publishedId: null,
    });
  }

  removeStep(index: number) {
    if (this.state.steps.length <= 1) return;

    const newSteps = [...this.state.steps];
    const fieldsToMove = newSteps[index].fields;

    // Move fields to adjacent step
    if (index > 0) {
      newSteps[index - 1].fields.push(...fieldsToMove);
    } else if (newSteps.length > 1) {
      newSteps[1].fields.unshift(...fieldsToMove);
    }

    newSteps.splice(index, 1);

    const newActiveIndex =
      this.state.activeStepIndex >= index && this.state.activeStepIndex > 0
        ? this.state.activeStepIndex - 1
        : this.state.activeStepIndex;

    this.setState({
      steps: newSteps,
      activeStepIndex: newActiveIndex,
      publishedId: null,
    });
  }

  updateStep(index: number, updates: Partial<FormStep>) {
    const newSteps = [...this.state.steps];
    newSteps[index] = { ...newSteps[index], ...updates };
    this.setState({ steps: newSteps });
  }

  setActiveStep(index: number) {
    this.setState({ activeStepIndex: index });
  }

  toggleOAuth(provider: OAuthProvider) {
    const newProviders = this.state.oauthProviders.includes(provider)
      ? this.state.oauthProviders.filter(p => p !== provider)
      : [...this.state.oauthProviders, provider];

    this.setState({
      oauthProviders: newProviders,
      publishedId: null,
    });
  }

  toggleAuthPlugin(plugin: keyof AuthPluginsConfig) {
    this.setState({
      authPlugins: {
        ...this.state.authPlugins,
        [plugin]: !this.state.authPlugins[plugin]
      },
      publishedId: null,
    });
  }

  setEnableBetterAuth(enabled: boolean) {
    this.setState({ enableBetterAuth: enabled });
  }

  setThemeConfig(config: ThemeConfig) {
    this.setState({ themeConfig: config, publishedId: null });
  }

  updateThemeConfig(updates: Partial<ThemeConfig>) {
    this.setState({
      themeConfig: { ...this.state.themeConfig, ...updates },
      publishedId: null,
    });
  }

  setFormLibrary(library: "rhf" | "tanstack") {
    this.setState({ formLibrary: library, publishedId: null });
  }

  setPublishedId(id: string | null) {
    this.setState({ publishedId: id });
  }

  setIsPublishing(isPublishing: boolean) {
    this.setState({ isPublishing });
  }

  clearPublishedState() {
    this.setState({ publishedId: null });
  }

  setActiveTab(tab: string) {
    this.setState({ activeTab: tab });
  }
}
