"use client";

import { useState, useCallback } from "react";
import type { FormTemplate } from "@/lib/form-templates";
import { EditorSidebar } from "@/components/editor/editor-sidebar";
import { WelcomeModal } from "@/components/editor/welcome-modal";
import { SchemaImportSidebar } from "@/components/editor/schema-import-sidebar";
import { FormHeader } from "@/components/editor/form-header";
import { FormWorkspace } from "@/components/editor/form-workspace";
import type { FormField } from "@/registry/default/types";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
import { useFormEditor } from "@/hooks/use-form-editor";

const CodeViewer = dynamic(
  () => import("@/components/editor/code-viewer").then((mod) => mod.CodeViewer),
  { loading: () => <Loader />, ssr: false }
);

interface FormEditorProps {
  initialTemplate?: FormTemplate;
}

export function FormEditor({ initialTemplate }: FormEditorProps) {
  const editor = useFormEditor({ initialTemplate });
  const [showSchemaImport, setShowSchemaImport] = useState(false);

  const handleSchemaImport = useCallback((importedFields: FormField[]) => {
    editor.setFields(importedFields);
    toast.success(`Imported ${importedFields.length} fields from schema`);
  }, [editor]);

  const handlePublish = useCallback(async () => {
    editor.setIsPublishing(true);
    
    try {
      const baseUrl = typeof window !== "undefined" 
        ? window.location.origin 
        : "http://localhost:3001";
      
      const { generateFormComponent } = await import("@/registry/default/lib/form-generator");
      
      const code = generateFormComponent({
        formName: editor.formName,
        formDescription: editor.formDescription,
        fields: editor.fields,
        steps: editor.steps,
        oauthProviders: editor.enableBetterAuth ? editor.oauthProviders : [],
        isAuthEnabled: editor.enableBetterAuth,
        formLibrary: editor.formLibrary,
      });

      const response = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editor.formName,
          description: editor.formDescription,
          code,
          config: {
            fields: editor.fields,
            steps: editor.steps,
            oauthProviders: editor.oauthProviders,
            databaseAdapter: "drizzle",
            framework: "next",
            plugins: editor.authPlugins,
          },
          dependencies: [`${baseUrl}/r/base-form.json`],
        }),
      });

      if (!response.ok) throw new Error("Failed to publish");
      
      const data = await response.json();
      editor.setPublishedId(data.id);
      toast.success("Form published successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish form");
    } finally {
      editor.setIsPublishing(false);
    }
  }, [editor]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <WelcomeModal
        onTryTemplate={() => {
          editor.setFormName("Contact Form");
          editor.setFormDescription("A simple contact form");
          editor.resetForm();
        }}
        onStartFromScratch={editor.resetForm}
      />

      <EditorSidebar 
        editor={editor}
        className="hidden lg:block"
      />

      <main className="flex-1 flex flex-col h-full min-w-0 bg-muted/20">
        <FormHeader
          showSchemaImport={showSchemaImport}
          onToggleSchemaImport={() => setShowSchemaImport(!showSchemaImport)}
          activeTab={editor.activeTab}
          onTabChange={editor.setActiveTab}
        />

        <FormWorkspace
          editor={editor}
          codeViewer={
            <CodeViewer
              editor={editor}
              onPublish={handlePublish}
            />
          }
        />
      </main>

      {showSchemaImport && (
        <SchemaImportSidebar onSchemaImport={handleSchemaImport} />
      )}
    </div>
  );
}
