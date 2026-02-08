import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Code, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormHeaderProps {
  showSchemaImport: boolean;
  onToggleSchemaImport: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function FormHeader({
  showSchemaImport,
  onToggleSchemaImport,
  activeTab,
  onTabChange,
  className,
}: FormHeaderProps) {
  return (
    <header className={cn("flex items-center justify-between p-4 border-b bg-background", className)}>
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full max-w-[400px]">
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

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleSchemaImport}
          className="h-10 bg-background shadow-sm px-4 gap-2"
        >
          {showSchemaImport ? <X size={16} /> : "Import Schema"}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => window.location.href = "/"}
          className="h-10 bg-background shadow-sm px-4"
        >
          Exit
        </Button>
      </div>
    </header>
  );
}
