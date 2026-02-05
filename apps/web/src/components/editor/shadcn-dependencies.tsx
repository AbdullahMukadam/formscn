"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { detectShadcnComponents, generateInstallCommand, getComponentDescription } from "@/lib/detect-shadcn-components";

interface ShadcnDependenciesProps {
  code: string;
}

export function ShadcnDependencies({ code }: ShadcnDependenciesProps) {
  const [copied, setCopied] = useState(false);
  
  const components = detectShadcnComponents(code);
  const installCommand = generateInstallCommand(components);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">shadcn/ui Components Required</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {components.map((component) => (
          <Badge 
            key={component} 
            variant="secondary" 
            className="text-xs"
            title={getComponentDescription(component)}
          >
            {component}
          </Badge>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          Install all required components:
        </p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-xs bg-background px-3 py-2 rounded border font-mono">
            {installCommand}
          </code>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
