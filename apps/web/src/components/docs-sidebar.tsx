"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsConfig } from "@/lib/docs-config";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block md:w-64">
      <ScrollArea className="h-full py-6 pr-6 lg:py-8">
        <nav className="w-full">
          {docsConfig.map((section, i) => (
            <div key={i} className="pb-8">
              <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                {section.title}
              </h4>
              <div className="grid grid-flow-row auto-rows-max text-sm">
                {section.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                      pathname === item.href
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
