"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Copy } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface FormDataPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: Record<string, any>;
}

export function FormDataPreview({ open, onOpenChange, data }: FormDataPreviewProps) {
  const [copied, setCopied] = useState(false);

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (value instanceof Date) return value.toLocaleDateString();
    if (typeof value === "object") return JSON.stringify(value, null, 2);
    return String(value);
  };

  const handleCopyJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto p-2">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <SheetTitle>Form Submitted Successfully!</SheetTitle>
          </div>
          <SheetDescription>
            Here's a preview of the data you submitted
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          {/* Pretty formatted key-value pairs */}
          <div className="space-y-3">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="grid grid-cols-[140px_1fr] gap-4 py-2 border-b border-border/50 last:border-0">
                <div className="font-medium text-sm text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="text-sm break-words">
                  {formatValue(value) || <span className="text-muted-foreground italic">Empty</span>}
                </div>
              </div>
            ))}
          </div>

          {/* JSON View */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-muted-foreground">JSON Format</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyJSON}
                className="h-8"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy JSON
                  </>
                )}
              </Button>
            </div>
            <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 mt-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
