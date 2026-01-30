import { type ThemeConfig, FONTS, RADII } from "@/lib/appearance-config";
import { type ThemeColor, THEMES } from "@/lib/themes-config";
import { ThemeSelector } from "./theme-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "@/components/ui/label";
import { Type, Square, Circle } from "lucide-react";

interface AppearanceSelectorProps {
  config: ThemeConfig;
  onUpdate: (updates: Partial<ThemeConfig>) => void;
}

export function AppearanceSelector({ config, onUpdate }: AppearanceSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Color Theme */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground">Color Theme</Label>
        <ThemeSelector
          currentTheme={config.color}
          onThemeChange={(color) => onUpdate({ color })}
        />
      </div>

      {/* Font Family */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground flex items-center gap-2">
          <Type className="h-3 w-3" /> Font Family
        </Label>
        <Select
          value={config.font}
          onValueChange={(font) => onUpdate({ font: font as any })}
        >
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {FONTS.map((font) => (
              <SelectItem key={font.name} value={font.name} className="text-xs">
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Corner Radius */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground flex items-center gap-2">
          <Square className="h-3 w-3" /> Corner Radius
        </Label>
        <ToggleGroup
          type="single"
          value={config.radius}
          onValueChange={(val) => val && onUpdate({ radius: val as any })}
          className="justify-start gap-1"
        >
          {RADII.map((radius) => (
            <ToggleGroupItem
              key={radius.value}
              value={radius.value}
              className="h-7 px-2 text-[10px] data-[state=on]:bg-primary data-[state=on]:text-primary-foreground border"
              aria-label={`Radius ${radius.label}`}
            >
              {radius.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}
