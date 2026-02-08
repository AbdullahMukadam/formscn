"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FileCode, Upload, AlertCircle, Check } from "lucide-react";
import { parseZodSchemaString } from "@/lib/schema-string-parser";
import type { FormField } from "@/registry/default/types";

interface SchemaImportSidebarProps {
  onSchemaImport: (fields: FormField[]) => void;
}

export function SchemaImportSidebar({ onSchemaImport }: SchemaImportSidebarProps) {
  const [schemaInput, setSchemaInput] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [parsedPreview, setParsedPreview] = useState<FormField[] | null>(null);

  const handleParse = async () => {
    if (!schemaInput.trim()) {
      toast.error("Please enter a schema");
      return;
    }

    setIsParsing(true);
    setParseError(null);

    try {
      const fields = parseZodSchemaString(schemaInput);
      
      if (fields.length === 0) {
        setParseError("No fields found in schema. Make sure it's a valid z.object() schema.");
        return;
      }

      setParsedPreview(fields);
      toast.success(`Parsed ${fields.length} fields successfully!`);
    } catch (error) {
      setParseError(error instanceof Error ? error.message : "Failed to parse schema");
      toast.error("Failed to parse schema");
    } finally {
      setIsParsing(false);
    }
  };

  const handleImport = () => {
    if (!parsedPreview || parsedPreview.length === 0) {
      toast.error("Please parse the schema first");
      return;
    }

    onSchemaImport(parsedPreview);
    toast.success(`Imported ${parsedPreview.length} fields!`);
    
    // Reset
    setSchemaInput("");
    setParsedPreview(null);
    setParseError(null);
  };

  const loadExample = () => {
    const example = `z.object({
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().min(10),
  priority: z.enum(["low", "medium", "high"]),
  newsletter: z.boolean().default(false),
})`;
    setSchemaInput(example);
    setParseError(null);
    setParsedPreview(null);
  };

  return (
    <div className="w-80 border-l bg-muted/30 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-background">
        <div className="flex items-center gap-2 mb-1">
          <FileCode className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Import from Schema</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Paste your Zod schema to auto-generate form fields
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Schema Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Zod Schema</Label>
            <button
              onClick={loadExample}
              className="text-xs text-primary hover:underline"
            >
              Load Example
            </button>
          </div>
          <Textarea
            value={schemaInput}
            onChange={(e) => {
              setSchemaInput(e.target.value);
              setParseError(null);
              setParsedPreview(null);
            }}
            placeholder={`Paste your schema here...

Example:
z.object({
  email: z.string().email(),
  phone: z.string(),
})`}
            className="font-mono text-xs min-h-[200px] resize-none"
          />
        </div>

        {/* Parse Button */}
        <Button
          onClick={handleParse}
          disabled={isParsing || !schemaInput.trim()}
          className="w-full"
          variant="secondary"
        >
          {isParsing ? (
            "Parsing..."
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Parse Schema
            </>
          )}
        </Button>

        {/* Error Display */}
        {parseError && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-xs text-destructive">{parseError}</p>
            </div>
          </div>
        )}

        {/* Preview */}
        {parsedPreview && parsedPreview.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <Check className="h-4 w-4" />
              <span>Parsed {parsedPreview.length} fields</span>
            </div>

            <div className="space-y-2">
              {parsedPreview.map((field, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-background border rounded text-xs space-y-1"
                >
                  <div className="font-medium">{field.name}</div>
                  <div className="text-muted-foreground">
                    Type: {field.uiType || field.inputType || field.type}
                    {field.required && " • Required"}
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={handleImport} className="w-full">
              Import to Form Builder
            </Button>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="p-4 border-t bg-muted/50">
        <p className="text-[10px] text-muted-foreground">
          <strong>Tips:</strong> Field names auto-detect UI types (email → email input, phone → phone input, etc.)
        </p>
      </div>
    </div>
  );
}
