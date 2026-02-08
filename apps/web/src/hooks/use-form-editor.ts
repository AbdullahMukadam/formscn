"use client";

import { useSyncExternalStore, useCallback, useMemo } from "react";
import { FormEditor } from "@/lib/form-editor/form-editor";
import type { FormEditorOptions, FormEditorInstance } from "@/types/editor";


export function useFormEditor(options: FormEditorOptions = {}): FormEditorInstance {
  const editor = useMemo(() => new FormEditor(options), []);
  const state = useSyncExternalStore(
    useCallback((callback) => editor.subscribe(callback), [editor]),
    useCallback(() => editor.getState(), [editor]),
    useCallback(() => editor.getState(), [editor])
  );

  // Get computed getters
  const getters = useMemo(() => editor.getGetters(), [state, editor]);
  const actions = useMemo(() => ({
    // Metadata
    setFormName: editor.setFormName.bind(editor),
    setFormDescription: editor.setFormDescription.bind(editor),
    resetForm: editor.resetForm.bind(editor),

    // Fields
    addField: editor.addField.bind(editor),
    removeField: editor.removeField.bind(editor),
    updateField: editor.updateField.bind(editor),
    moveField: editor.moveField.bind(editor),
    selectField: editor.selectField.bind(editor),
    setSelectedFieldIndex: editor.selectField.bind(editor),

    // Steps
    toggleMultiStep: editor.toggleMultiStep.bind(editor),
    addStep: editor.addStep.bind(editor),
    removeStep: editor.removeStep.bind(editor),
    updateStep: editor.updateStep.bind(editor),
    setActiveStepIndex: editor.setActiveStep.bind(editor),

    // Auth
    toggleOAuth: editor.toggleOAuth.bind(editor),
    toggleAuthPlugin: editor.toggleAuthPlugin.bind(editor),
    setEnableBetterAuth: editor.setEnableBetterAuth.bind(editor),

    // Config
    setThemeConfig: editor.setThemeConfig.bind(editor),
    updateThemeConfig: editor.updateThemeConfig.bind(editor),
    setFormLibrary: editor.setFormLibrary.bind(editor),

    // Publish
    setPublishedId: editor.setPublishedId.bind(editor),
    setIsPublishing: editor.setIsPublishing.bind(editor),
    clearPublishedState: editor.clearPublishedState.bind(editor),

    // UI
    setActiveTab: editor.setActiveTab.bind(editor),

    // Direct setters for compatibility
    setFields: (fields: typeof state.fields) => {
      editor["setState"]({ fields });
    },
    setSteps: (steps: typeof state.steps) => {
      editor["setState"]({ steps });
    },
    setOauthProviders: (oauthProviders: typeof state.oauthProviders) => {
      editor["setState"]({ oauthProviders });
    },
    setAuthPlugins: (authPlugins: typeof state.authPlugins) => {
      editor["setState"]({ authPlugins });
    },
  }), [editor]);

  // Combine everything into the instance interface
  return useMemo(() => ({
    ...state,
    ...getters,
    ...actions,
  }), [state, getters, actions]);
}

export { FormEditor } from "@/lib/form-editor/form-editor";
export type * from "@/types/editor";
