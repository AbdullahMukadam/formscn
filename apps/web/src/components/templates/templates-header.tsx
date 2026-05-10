import { Box } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplatesHeaderProps {
  templateCount: number;
}

export function TemplatesHeader({ templateCount }: TemplatesHeaderProps) {
  return (
    <div className={cn(
      "flex flex-col md:flex-row md:items-end justify-between",
      "gap-6 md:gap-8",
      "mb-12 md:mb-16",
      "border-b border-white/5",
      "pb-8 md:pb-12",
      "px-4 md:px-6"
    )}>
      {/* Title Section */}
      <div className="space-y-3 md:space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold text-white tracking-tighter italic">
          shadcn/ui Form Templates
        </h1>
        <p className="text-base md:text-lg text-white/40 max-w-xl leading-relaxed font-medium">
          Production-ready form components built with shadcn/ui, React Hook Form, 
          and Zod validation. Copy, customize, ship.
        </p>
      </div>

      {/* Template Count Badge */}
      <div 
        className={cn(
          "inline-flex items-center gap-2",
          "text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]",
          "text-primary",
          "bg-primary/5",
          "px-3 py-1.5",
          "border border-primary/10",
          "rounded-full",
          "w-fit"
        )}
      >
        <Box className="w-3 h-3" aria-hidden="true" />
        {templateCount} Templates
      </div>
    </div>
  );
}
