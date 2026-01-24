"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";
import { MobileNav } from "./mobile-nav";
import { Github } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const links = [
    { to: "/", label: "formscn" },
    { to: "/docs", label: "docs" },
    { to: "/editor", label: "editor" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2">
      <div className="container flex h-14 items-center min-w-full">
        <MobileNav />
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">formscn</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            {links.map(({ to, label }) => {
              // Skip home link in nav as it's the logo
              if (to === "/") return null;
              return (
                <Link
                  key={to}
                  href={to}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === to || pathname?.startsWith(to + "/")
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        {/* Mobile Logo */}
        <div className="flex md:hidden mr-auto ml-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">formscn</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link href={"https://github.com/AbdullahMukadam/formscn"}>
            <Github size={18}/>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
