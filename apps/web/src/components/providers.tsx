"use client";

import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class" disableTransitionOnChange>
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
