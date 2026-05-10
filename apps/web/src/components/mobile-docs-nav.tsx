"use client";

import * as React from "react";
import { Menu, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsConfig } from "@/lib/docs-config";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileDocsNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden h-9 w-9 text-muted-foreground">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <ScrollArea className="h-full">
          <nav className="p-6 space-y-6">
            {docsConfig.map((section, i) => (
              <div key={i}>
                <h4 className="mb-2 text-sm font-semibold text-foreground">
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {section.items.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href as any}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-1.5 text-sm rounded-md px-2 transition-colors",
                        pathname === item.href
                          ? "font-medium text-foreground bg-accent"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      <span>{item.title}</span>
                      {pathname === item.href && (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
