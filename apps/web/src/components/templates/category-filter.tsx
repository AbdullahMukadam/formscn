import { CATEGORIES } from "@/constants/template";
import { cn } from "@/lib/utils";
import type { TemplateCategory } from "@/types/templates";


interface CategoryFilterProps {
  selectedCategory: TemplateCategory;
  onCategoryChange: (category: TemplateCategory) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = Object.entries(CATEGORIES) as [TemplateCategory, typeof CATEGORIES[TemplateCategory]][];
  
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
      {categories.map(([key, config]) => {
        const Icon = config.icon;
        const isSelected = selectedCategory === key;
        
        return (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={cn(
              "px-4 py-2",
              "text-[10px] font-bold uppercase tracking-wide",
              "rounded-lg",
              "transition-all duration-200",
              "flex items-center gap-2 flex-shrink-0",
              "border",
              isSelected
                ? "bg-primary text-black border-primary shadow-lg" 
                : "bg-white/[0.02] text-white/40 border-white/10 hover:text-white/60 hover:border-white/20"
            )}
            aria-pressed={isSelected}
            aria-label={`Filter by ${config.label}`}
          >
            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
            {config.label}
          </button>
        );
      })}
    </div>
  );
}
