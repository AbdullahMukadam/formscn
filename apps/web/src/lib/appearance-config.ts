import type { ThemeColor } from "./themes-config";

export type ThemeFont = "default" | "serif" | "mono";
export type ThemeRadius = "0" | "0.3" | "0.5" | "0.75" | "1.0";

export interface ThemeConfig {
  color: ThemeColor;
  font: ThemeFont;
  radius: ThemeRadius;
}

export const FONTS: { name: ThemeFont; label: string; family: string }[] = [
  { name: "default", label: "Default (Sans)", family: "var(--font-geist-sans)" },
  { name: "serif", label: "Serif", family: "var(--font-serif)" },
  { name: "mono", label: "Mono", family: "var(--font-geist-mono)" },
];

export const RADII: { value: ThemeRadius; label: string }[] = [
  { value: "0", label: "Sharp" },
  { value: "0.3", label: "Small" },
  { value: "0.5", label: "Default" },
  { value: "0.75", label: "Large" },
  { value: "1.0", label: "Full" },
];
