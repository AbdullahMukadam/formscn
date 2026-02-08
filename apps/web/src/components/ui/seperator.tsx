import { cn } from "@/lib/utils";

interface SeparatorProps {
    className?: string;
    orientation?: "horizontal" | "vertical";
  }
  
  export function Separator({ className, orientation = "horizontal" }: SeparatorProps) {
    return (
      <div
        className={cn(
          "relative flex bg-background",
          orientation === "horizontal" ? "h-8 w-full lg:hidden" : "h-full w-8 md:w-12",
          "before:absolute before:-z-1",
          orientation === "horizontal"
            ? "before:left-0 before:h-8 before:w-full"
            : "before:top-0 before:bottom-0 before:w-8",
          "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/60",
          "after:absolute after:inset-0 after:-z-2",
          orientation === "horizontal"
            ? "after:left-0 after:w-full after:border-t after:border-b after:border-edge"
            : "after:inset-y-0 after:border-l after:border-r after:border-edge",
          className
        )}
      />
    );
  }