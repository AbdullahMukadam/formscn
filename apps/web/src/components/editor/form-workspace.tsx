
import { FormPreview } from "@/components/editor/form-preview";
import { cn } from "@/lib/utils";
import type { FormEditorInstance } from "@/types/editor";
import type { ReactNode } from "react";

interface FormWorkspaceProps {
  editor: FormEditorInstance;
  codeViewer: ReactNode;
  className?: string;
}

export function FormWorkspace({
  editor,
  codeViewer,
  className,
}: FormWorkspaceProps) {
  const isPreview = editor.activeTab === "preview";

  return (
    <div className={cn("flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center relative", className)}>
      <div className="w-full max-w-4xl flex flex-col items-center">
        {isPreview ? (
          <div className="w-full flex justify-center py-4">
            <FormPreview
              formName={editor.formName}
              formDescription={editor.formDescription}
              fields={editor.fields}
              steps={editor.steps}
              selectedFieldIndex={editor.selectedFieldIndex}
              setSelectedFieldIndex={editor.selectField}
              moveField={editor.moveField}
              removeField={editor.removeField}
              oauthProviders={editor.oauthProviders}
              toggleOAuth={editor.toggleOAuth}
              authPlugins={editor.authPlugins}
              toggleAuthPlugin={editor.toggleAuthPlugin}
              themeConfig={editor.themeConfig}
            />
          </div>
        ) : (
          <div className="w-full">
            {codeViewer}
          </div>
        )}
      </div>
    </div>
  );
}
