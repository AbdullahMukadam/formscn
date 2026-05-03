"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { SearchDialog } from "@/components/search-dialog";

export function SearchTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 h-8 px-3 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white/50 hover:text-white/80 text-sm"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search docs...</span>
        <kbd className="ml-2 text-xs bg-white/10 px-1.5 py-0.5 rounded text-white/40">
          ⌘K
        </kbd>
      </button>

      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center justify-center w-8 h-8 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
      >
        <Search className="w-4 h-4" />
      </button>

      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
