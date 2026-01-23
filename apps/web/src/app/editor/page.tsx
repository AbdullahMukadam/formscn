"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { formTemplates } from "@/lib/form-templates";
import { FormEditor } from "@/components/form-editor";

function EditorContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");

  const template = templateId
    ? formTemplates.find((t) => t.id === templateId)
    : null;

  return <FormEditor initialTemplate={template || undefined} />;
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading editor...</div>}>
      <EditorContent />
    </Suspense>
  );
}
