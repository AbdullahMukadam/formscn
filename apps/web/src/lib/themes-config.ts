export type ThemeColor = 
  | "zinc" 
  | "red" 
  | "rose" 
  | "orange" 
  | "green" 
  | "blue" 
  | "yellow" 
  | "violet";

export interface ThemeDefinition {
  name: string;
  label: string;
  activeColor: string;
  cssVars: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

export const THEMES: ThemeDefinition[] = [
  {
    name: "zinc",
    label: "Zinc",
    activeColor: "#18181b",
    cssVars: {
      light: {
        "--primary": "#18181b",
        "--primary-foreground": "#fafafa",
        "--ring": "#18181b",
      },
      dark: {
        "--primary": "#fafafa",
        "--primary-foreground": "#18181b",
        "--ring": "#fafafa",
      },
    },
  },
  {
    name: "red",
    label: "Red",
    activeColor: "#dc2626",
    cssVars: {
      light: {
        "--primary": "#dc2626",
        "--primary-foreground": "#fef2f2",
        "--ring": "#dc2626",
      },
      dark: {
        "--primary": "#f87171",
        "--primary-foreground": "#450a0a",
        "--ring": "#f87171",
      },
    },
  },
  {
    name: "rose",
    label: "Rose",
    activeColor: "#e11d48",
    cssVars: {
      light: {
        "--primary": "#e11d48",
        "--primary-foreground": "#fff1f2",
        "--ring": "#e11d48",
      },
      dark: {
        "--primary": "#fb7185",
        "--primary-foreground": "#4c0519",
        "--ring": "#fb7185",
      },
    },
  },
  {
    name: "orange",
    label: "Orange",
    activeColor: "#f97316",
    cssVars: {
      light: {
        "--primary": "#f97316",
        "--primary-foreground": "#fff7ed",
        "--ring": "#f97316",
      },
      dark: {
        "--primary": "#fb923c",
        "--primary-foreground": "#431407",
        "--ring": "#fb923c",
      },
    },
  },
  {
    name: "green",
    label: "Green",
    activeColor: "#16a34a",
    cssVars: {
      light: {
        "--primary": "#16a34a",
        "--primary-foreground": "#f0fdf4",
        "--ring": "#16a34a",
      },
      dark: {
        "--primary": "#4ade80",
        "--primary-foreground": "#052e16",
        "--ring": "#4ade80",
      },
    },
  },
  {
    name: "blue",
    label: "Blue",
    activeColor: "#2563eb",
    cssVars: {
      light: {
        "--primary": "#2563eb",
        "--primary-foreground": "#eff6ff",
        "--ring": "#2563eb",
      },
      dark: {
        "--primary": "#60a5fa",
        "--primary-foreground": "#172554",
        "--ring": "#60a5fa",
      },
    },
  },
  {
    name: "yellow",
    label: "Yellow",
    activeColor: "#ca8a04",
    cssVars: {
      light: {
        "--primary": "#ca8a04",
        "--primary-foreground": "#fefce8",
        "--ring": "#ca8a04",
      },
      dark: {
        "--primary": "#facc15",
        "--primary-foreground": "#422006",
        "--ring": "#facc15",
      },
    },
  },
  {
    name: "violet",
    label: "Violet",
    activeColor: "#7c3aed",
    cssVars: {
      light: {
        "--primary": "#7c3aed",
        "--primary-foreground": "#f5f3ff",
        "--ring": "#7c3aed",
      },
      dark: {
        "--primary": "#a78bfa",
        "--primary-foreground": "#2e1065",
        "--ring": "#a78bfa",
      },
    },
  },
];
