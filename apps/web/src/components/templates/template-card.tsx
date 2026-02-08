import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategorizedTemplate } from "@/types/templates";
import { CATEGORIES } from "@/constants/template";


interface TemplateCardProps {
  template: CategorizedTemplate;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const { stats, category } = template;
  const CategoryIcon = CATEGORIES[category].icon;
  const visibleComponents = stats.components.slice(0, 5);
  const hasMoreComponents = stats.components.length > 5;
  
  return (
    <Link
      href={`/editor?template=${template.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden",
        "p-8 md:p-16",
        "border-b border-white/[0.05]",
        "space-y-6 md:space-y-8",
        "hover:bg-white/[0.01]",
        "transition-colors duration-200",
        "pointer-events-auto z-10"
      )}
    >
      {/* Hover Icon */}
      <Plus 
        className={cn(
          "absolute -top-3 -right-3 w-6 h-6",
          "text-white/10",
          "group-hover:text-primary",
          "transition-colors duration-200",
          "hidden md:block"
        )} 
      />

      {/* Header */}
      <div className="space-y-3 md:space-y-4">
        {/* Category Badge */}
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wide text-white/40">
          <CategoryIcon className="w-3 h-3" />
          <span>{CATEGORIES[category].label}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white leading-tight">
          {template.name}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#888] line-clamp-2">
          {template.description}
        </p>
      </div>

      {/* Stats Section */}
      <div className="space-y-3">
        {/* Field Count & Type */}
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wide text-white/30">
          <span>{stats.fieldCount} fields</span>
          <span>•</span>
          <span>{stats.isWizard ? "Multi-step" : "Single page"}</span>
        </div>

        {/* Components */}
        <div className="flex flex-wrap gap-1.5">
          {visibleComponents.map((component) => (
            <ComponentBadge key={component} name={component} />
          ))}
          {hasMoreComponents && (
            <span className="px-2 py-0.5 text-[9px] text-white/30">
              +{stats.components.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <div 
        className={cn(
          "pt-2 flex items-center justify-between",
          "font-mono text-[9px] md:text-[10px]",
          "font-black uppercase tracking-[0.2em]",
          "text-white/20",
          "group-hover:text-primary",
          "transition-colors duration-200"
        )}
      >
        <span>Use Template</span>
        <ArrowUpRight 
          className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" 
        />
      </div>
    </Link>
  );
}

function ComponentBadge({ name }: { name: string }) {
  return (
    <span className="px-2 py-0.5 bg-white/[0.03] border border-white/10 rounded text-[9px] font-mono text-white/50">
      {name}
    </span>
  );
}
