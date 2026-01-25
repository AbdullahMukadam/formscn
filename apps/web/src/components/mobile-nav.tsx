"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { docsConfig } from "@/lib/docs-config";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Close on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { to: "/", label: "formscn" },
    { to: "/templates", label: "templates" },
    { to: "/docs", label: "docs" },
    { to: "/editor", label: "editor" },
  ] as const;

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>
      {open && (
        <div className="fixed inset-0 top-14 z-50 grid h-[calc(100vh-3.5rem)] grid-flow-row auto-rows-max overflow-auto bg-background/90 backdrop-blur-md p-6 pb-32 shadow-md animate-in slide-in-from-bottom-10 md:hidden">
          <div className="relative z-20 grid text-popover-foreground">
            <nav className="grid grid-flow-row auto-rows-max">
              {links.map(
                (item) =>
                  item.to !== "/" && (
                    <Link
                      key={item.to}
                      href={item.to as any}
                      className={cn(
                        "flex w-full items-center rounded-md py-2 font-medium capitalize hover:underline",
                        pathname === item.to && "text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
              )}
            </nav>
            <div className="flex flex-col space-y-2">
              {docsConfig.map((item, index) => (
                <div key={index} className="flex flex-col space-y-3 pt-6">
                  <h4 className="font-medium">{item.title}</h4>
                  {item.items?.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href as any}
                      className={cn(
                        "text-muted-foreground transition-colors hover:text-foreground",
                        pathname === item.href && "text-foreground font-medium"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
