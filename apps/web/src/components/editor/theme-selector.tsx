import { type ThemeColor, THEMES } from "@/lib/themes-config";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ThemeSelectorProps {
  currentTheme: ThemeColor;
  onThemeChange: (theme: ThemeColor) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-background/50 border rounded-full shadow-sm backdrop-blur-sm">
        {THEMES.map((theme) => {
          const isActive = currentTheme === theme.name;
          return (
            <Tooltip key={theme.name}>
              <TooltipTrigger
                  onClick={() => onThemeChange(theme.name as ThemeColor)}
                  className={cn(
                    "relative w-5 h-5 rounded-full flex items-center justify-center transition-all hover:scale-110 focus:outline-none ring-offset-2 focus:ring-2",
                    isActive && "ring-2 ring-ring scale-110"
                  )}
                  style={{ backgroundColor: theme.activeColor }}
                >
                  {isActive && (
                    <Check className="w-3 h-3 text-white stroke-[3px]" />
                  )}
                  <span className="sr-only">Select {theme.label} theme</span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-[10px] font-bold uppercase tracking-wider">
                {theme.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
    </div>
  );
}
