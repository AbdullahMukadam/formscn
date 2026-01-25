"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { Github } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const links = [
    { to: "/", label: "formscn" },
    { to: "/templates", label: "templates" },
    { to: "/docs", label: "docs" },
    { to: "/editor", label: "editor" },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl supports-[backdrop-filter]:bg-black/40 px-2">
      <div className="container flex h-14 items-center justify-between mx-auto max-w-7xl">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold tracking-tighter text-white">formscn</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {links.map(({ to, label }) => {
              if (to === "/") return null;
              return (
                <Link
                  key={to}
                  href={to}
                  className={cn(
                    "transition-colors hover:text-white font-semibold",
                    pathname === to || pathname?.startsWith(to + "/")
                      ? "text-white"
                      : "text-white/40"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 border-l border-white/10 pl-4">
            <Link 
              href="https://github.com/AbdullahMukadam/formscn" 
              className="text-white/40 hover:text-white transition-colors"
              target="_blank"
            >
              <Github size={18}/>
            </Link>
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
