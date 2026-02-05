"use client";

import type { FormTemplate } from "@/lib/form-templates";
import { useFormEditor } from "@/hooks/use-form-editor";
import { EditorSidebar } from "@/components/editor/editor-sidebar";
import { FormPreview } from "@/components/editor/form-preview";
import { WelcomeModal } from "@/components/editor/welcome-modal";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";

const CodeViewer = dynamic(() => import("@/components/editor/code-viewer").then((mod) => mod.CodeViewer), {
  loading: () => <Loader />,
  ssr: false,
});
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Eye, Code, Menu } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { contactFormTemplate } from "@/registry/default/templates";

interface FormEditorProps {
  initialTemplate?: FormTemplate;
}

export function FormEditor({ initialTemplate }: FormEditorProps) {
  const {
    formName, setFormName, formDescription, setFormDescription, fields, steps, setFields,
    isMultiStep, toggleMultiStep, addStep, removeStep, updateStep, activeStepIndex,
    setActiveStepIndex, oauthProviders, setOauthProviders, databaseAdapter,
    setDatabaseAdapter, framework, setFramework, selectedFieldIndex,
    setSelectedFieldIndex, selectedField, activeTab, setActiveTab,
    publishedId, isPublishing, updateField, addField, removeField, moveField,
    toggleOAuth, setIsPublishing, setPublishedId, resetForm,
    authPlugins, toggleAuthPlugin, enableBetterAuth, setEnableBetterAuth,
    themeConfig, updateThemeConfig, formLibrary, setFormLibrary
  } = useFormEditor({ initialTemplate });

  const isAuthEnabled = enableBetterAuth;

  // Welcome modal handlers
  const handleTryTemplate = () => {
    // Load the contact form template
    setFormName(contactFormTemplate.name);
    setFormDescription(contactFormTemplate.description);
    setFields(contactFormTemplate.fields || []);
    setOauthProviders(contactFormTemplate.oauthProviders || []);
    toast.success("Contact form template loaded!");
  };

  const handleStartFromScratch = () => {
    // Reset to empty form
    resetForm();
  };


  const sidebarProps = {
    formName, setFormName, formDescription, setFormDescription, isMultiStep,
    toggleMultiStep, steps, activeStepIndex, setActiveStepIndex, addStep,
    removeStep, updateStep, fields, selectedField, selectedFieldIndex,
    setSelectedFieldIndex, updateField, addField, oauthProviders, toggleOAuth,
    databaseAdapter, setDatabaseAdapter, framework, setFramework,
    isAuthEnabled, resetForm,
    authPlugins, toggleAuthPlugin,
    enableBetterAuth, setEnableBetterAuth,
    themeConfig, updateThemeConfig,
    formLibrary, setFormLibrary
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';
    const { generateFormComponent } = await import("@/registry/default/lib/form-generator");

    try {
      const code = generateFormComponent({
        formName, formDescription, fields, steps,
        oauthProviders: isAuthEnabled ? oauthProviders : [],
        isAuthEnabled,
        formLibrary,
      });

      const response = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName, description: formDescription, code,
          config: { fields, steps, oauthProviders, databaseAdapter, framework, plugins: authPlugins },
          dependencies: [`${baseUrl}/r/base-form.json`],
        }),
      });

      if (!response.ok) throw new Error("Failed to publish");
      const data = await response.json();
      setPublishedId(data.id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish form");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Welcome Modal */}
      <WelcomeModal 
        onTryTemplate={handleTryTemplate}
        onStartFromScratch={handleStartFromScratch}
      />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <EditorSidebar {...sidebarProps} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-muted/20">
        {/* Header - REMOVED per user request */}
        {/* <header className="border-b bg-background h-14 flex items-center justify-between px-4 shrink-0">
          ... (removed content)
        </header> */}

        {/* Workspace */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center relative">
          
          {/* Floating Mobile Menu & Tabs - Integrated directly into workspace */}
          <div className="absolute top-4 left-4 z-20 lg:hidden">
             <Sheet>
                <SheetTrigger>
                  <Button variant="outline" size="icon" className="h-10 w-10 bg-background shadow-sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-80">
                  <EditorSidebar {...sidebarProps} />
                </SheetContent>
              </Sheet>
          </div>

          <div className="absolute top-4 right-4 z-20 flex gap-2">
             <Button variant="outline" size="sm" onClick={() => (window.location.href = "/")} className="h-10 bg-background shadow-sm px-4">
               Exit
             </Button>
          </div>

          <div className="w-full max-w-4xl flex flex-col items-center">
            
            {/* Centered Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-[400px] mb-6 z-10">
                <TabsList className="grid w-full grid-cols-2 h-10 shadow-sm bg-background border">
                  <TabsTrigger value="preview" className="flex gap-2">
                    <Eye className="h-4 w-4" /> 
                    <span>Preview</span>
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex gap-2">
                    <Code className="h-4 w-4" /> 
                    <span>Integrate</span>
                  </TabsTrigger>
                </TabsList>
            </Tabs>

            {activeTab === "preview" ? (
              <div className="w-full flex justify-center py-4">
                <FormPreview
                  formName={formName}
                  formDescription={formDescription}
                  fields={fields}
                  steps={steps}
                  selectedFieldIndex={selectedFieldIndex}
                  setSelectedFieldIndex={setSelectedFieldIndex}
                  moveField={moveField}
                  removeField={removeField}
                  oauthProviders={oauthProviders}
                  toggleOAuth={toggleOAuth}
                  authPlugins={authPlugins}
                  toggleAuthPlugin={toggleAuthPlugin}
                  themeConfig={themeConfig}
                />
              </div>
            ) : (
              <div className="w-full">
                <CodeViewer
                  formName={formName}
                  formDescription={formDescription}
                  fields={fields}
                  steps={steps}
                  oauthProviders={oauthProviders}
                  databaseAdapter={databaseAdapter}
                  framework={framework}
                  isAuthEnabled={isAuthEnabled}
                  publishedId={publishedId}
                  isPublishing={isPublishing}
                   handlePublish={handlePublish}
                   setFramework={setFramework}
                   setDatabaseAdapter={setDatabaseAdapter}
                   authPlugins={authPlugins}
                   themeConfig={themeConfig}
                   formLibrary={formLibrary}
                 />
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
