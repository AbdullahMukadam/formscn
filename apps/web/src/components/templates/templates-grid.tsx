import { cn } from "@/lib/utils";
import { TemplateCard } from "./template-card";
import type { CategorizedTemplate } from "@/types/templates";


interface TemplatesGridProps {
  templates: CategorizedTemplate[];
}

export function TemplatesGrid({ templates }: TemplatesGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 relative pointer-events-none">
      {/* Background Grid Lines */}
      <div 
        className={cn(
          "absolute inset-y-0 left-0 w-full",
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
          "pointer-events-none z-0"
        )}
        aria-hidden="true"
      >
        <div className="border-x border-white/[0.05]" />
        <div className="border-r border-white/[0.05] hidden sm:block" />
        <div className="border-r border-white/[0.05] hidden md:block" />
      </div>

      {/* Template Cards */}
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
}
