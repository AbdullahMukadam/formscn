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
import { Eye, Code, Share2 } from "lucide-react";
import { toast } from "sonner";

interface FormEditorProps {
  initialTemplate?: FormTemplate;
}

export function FormEditor({ initialTemplate }: FormEditorProps) {
  const {
    // State
    formName,
    setFormName,
    formDescription,
    setFormDescription,
    fields,
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
    isPublishing,

    // Actions
    updateField,
    addField,
    removeField,
    moveField,
    toggleOAuth,
    setIsPublishing,
    setPublishedId,
    resetForm,
  } = useFormEditor({ initialTemplate });

  const isAuthEnabled = oauthProviders.length > 0 || fields.some(f => f.name === 'password' || f.inputType === 'password');

  const handlePublish = async () => {
    setIsPublishing(true);
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';
    const { generateFormComponent } = await import("@/registry/default/lib/form-generator");

    try {
      const code = generateFormComponent({
        formName,
        formDescription,
        fields,
        steps,
        oauthProviders: isAuthEnabled ? oauthProviders : [],
      });

      const response = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          description: formDescription,
          code,
          config: {
            fields,
            steps,
            oauthProviders,
            databaseAdapter,
            framework,
          },
          dependencies: [`${baseUrl}/r/base-form.json`],
        }),
      });

      if (!response.ok) throw new Error("Failed to publish");

      const data = await response.json();
      setPublishedId(data.id);
      // toast.success("Form published! CLI command updated."); 
      // Toast is handled in the UI usually, but we can do it here if we imported toast
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish form");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Settings & Fields */}
      <EditorSidebar
        formName={formName}
        setFormName={setFormName}
        formDescription={formDescription}
        setFormDescription={setFormDescription}
        fields={fields}
        selectedField={selectedField}
        selectedFieldIndex={selectedFieldIndex}
        setSelectedFieldIndex={setSelectedFieldIndex}
        updateField={updateField}
        addField={addField}
        oauthProviders={oauthProviders}
        toggleOAuth={toggleOAuth}
        databaseAdapter={databaseAdapter}
        setDatabaseAdapter={setDatabaseAdapter}
        framework={framework}
        setFramework={setFramework}
        isAuthEnabled={isAuthEnabled}
        resetForm={resetForm}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-muted/20">
        {/* Header */}
        <header className="border-b bg-background h-14 flex items-center justify-between px-4 shrink-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
            <TabsList>
              <TabsTrigger value="preview" className="flex gap-2"><Eye className="h-4 w-4" /> Preview</TabsTrigger>
              <TabsTrigger value="code" className="flex gap-2"><Code className="h-4 w-4" /> Integrate</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/")}>
              Exit
            </Button>
          </div>
        </header>

        {/* Workspace */}
        <div className="flex-1 overflow-auto p-8 flex justify-center">
          {activeTab === "preview" ? (
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
            />
          ) : (
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
            />
          )}
        </div>
      </main>
    </div>
  );
}
