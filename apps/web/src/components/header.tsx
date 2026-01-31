"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { Github, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();
  
  // Don't render header in editor
  if (pathname?.startsWith('/editor')) return null;

  const links = [
    { to: "/docs", label: "Documentation" },
    { to: "/registry", label: "Registry" },
    { to: "/templates", label: "Templates" },
  ] as const;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0C0C0E]/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold tracking-tight text-white text-xl">FormsCN</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {links.map(({ to, label }) => {
              const isActive = pathname === to || pathname?.startsWith(to + "/");
              return (
                <Link
                  key={to}
                  href={to}
                  className={cn(
                    "transition-colors text-sm font-medium hover:text-[#00E599]",
                    isActive ? "text-[#00E599]" : "text-white/70"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="https://github.com/AbdullahMukadam/formscn" 
            className="hidden md:block text-white/40 hover:text-white transition-colors"
            target="_blank"
          >
            <Github size={20}/>
          </Link>
          
          <Button 
            className="hidden md:flex bg-[#00E599] text-black hover:bg-[#00E599]/90 rounded-full px-6 font-semibold"
            size="sm"
          >
            <Terminal className="mr-2 h-4 w-4" />
            Install CLI
          </Button>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
