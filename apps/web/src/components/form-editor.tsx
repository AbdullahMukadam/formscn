"use client";

import type { FormTemplate } from "@/lib/form-templates";
import { useFormEditor } from "@/hooks/use-form-editor";
import { EditorSidebar } from "@/components/editor/editor-sidebar";
import { FormPreview } from "@/components/editor/form-preview";
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

interface FormEditorProps {
  initialTemplate?: FormTemplate;
}

export function FormEditor({ initialTemplate }: FormEditorProps) {
  const {
    formName, setFormName, formDescription, setFormDescription, fields, steps,
    isMultiStep, toggleMultiStep, addStep, removeStep, updateStep, activeStepIndex,
    setActiveStepIndex, oauthProviders, setOauthProviders, databaseAdapter,
    setDatabaseAdapter, framework, setFramework, selectedFieldIndex,
    setSelectedFieldIndex, selectedField, activeTab, setActiveTab,
    publishedId, isPublishing, updateField, addField, removeField, moveField,
    toggleOAuth, setIsPublishing, setPublishedId, resetForm,
    authPlugins, toggleAuthPlugin
  } = useFormEditor({ initialTemplate });

  const isAuthEnabled = oauthProviders.length > 0 || 
    fields.some(f => f.name === 'password' || f.inputType === 'password') ||
    Object.values(authPlugins).some(Boolean);

  const sidebarProps = {
    formName, setFormName, formDescription, setFormDescription, isMultiStep,
    toggleMultiStep, steps, activeStepIndex, setActiveStepIndex, addStep,
    removeStep, updateStep, fields, selectedField, selectedFieldIndex,
    setSelectedFieldIndex, updateField, addField, oauthProviders, toggleOAuth,
    databaseAdapter, setDatabaseAdapter, framework, setFramework,
    isAuthEnabled, resetForm,
    authPlugins, toggleAuthPlugin
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';
    const { generateFormComponent } = await import("@/registry/default/lib/form-generator");

    try {
      const code = generateFormComponent({
        formName, formDescription, fields, steps,
        oauthProviders: isAuthEnabled ? oauthProviders : [],
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
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <EditorSidebar {...sidebarProps} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-muted/20">
        {/* Header */}
        <header className="border-b bg-background h-14 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Mobile Sidebar Trigger */}
            <div className="lg:hidden shrink-0">
              <Sheet>
                <SheetTrigger>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-80">
                  <EditorSidebar {...sidebarProps} />
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="flex-1 lg:flex-none flex justify-center lg:justify-start min-w-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-[280px] sm:max-w-[400px]">
                <TabsList className="grid w-full grid-cols-2 h-9">
                  <TabsTrigger value="preview" className="flex gap-2 text-[11px] sm:text-xs md:text-sm px-1 sm:px-4">
                    <Eye className="h-3.5 w-3.5 shrink-0" /> 
                    <span className="truncate">Preview</span>
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex gap-2 text-[11px] sm:text-xs md:text-sm px-1 sm:px-4">
                    <Code className="h-3.5 w-3.5 shrink-0" /> 
                    <span className="truncate">Integrate</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/")} className="text-xs sm:text-sm px-2 sm:px-3 h-9">
              Exit
            </Button>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center">
          <div className="w-full max-w-4xl flex justify-center">
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
                 />
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
