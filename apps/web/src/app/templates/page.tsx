"use client";

import { useState } from "react";
import Link from "next/link";
import { formTemplates } from "@/lib/form-templates";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Box, ArrowUpRight, Search, Layers, Layout, Filter, X, Plus, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "standard" | "wizard">("all");

  const filteredTemplates = formTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isWizard = !!template.steps?.length;
    const matchesType = selectedType === "all" || 
                       (selectedType === "wizard" && isWizard) || 
                       (selectedType === "standard" && !isWizard);
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="relative min-h-screen bg-black text-[#888] selection:bg-primary/30 font-sans tracking-tight">
      <style jsx global>{`
        body {
          background-color: #000000 !important;
        }
      `}</style>
      {/* Background Mesh - Full screen fixed background */}
      <div 
        className="fixed inset-0 z-0 opacity-[0.1] pointer-events-none" 
        style={{ 
          backgroundColor: '#000000',
          backgroundImage: `radial-gradient(circle at 1px 1px, #333 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} 
      />

      <main className="relative z-10 mx-auto max-w-7xl px-0 pt-24 md:pt-32 pb-24 md:pb-32 min-h-screen">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16 border-b border-white/5 pb-8 md:pb-12 px-4 md:px-6">
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-6xl font-bold text-white tracking-tighter italic">
              Component Registry
            </h1>
            <p className="text-base md:text-lg text-white/40 max-w-xl leading-relaxed font-medium">
              Explore production-ready form architectures. Fully customizable 
              logic, type-safe schemas, and CLI-ready integration.
            </p>
          </div>
              <div className="inline-flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/5 px-3 py-1.5 border border-primary/10 rounded-full w-fit">
                <Box className="w-3 h-3" />
                {filteredTemplates.length} Registry Modules
              </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-16 md:mb-24 px-4 md:px-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search architectures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
          
              <div className="flex bg-white/[0.02] border border-white/10 p-1 rounded-xl overflow-x-auto no-scrollbar">
                {(["all", "standard", "wizard"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={cn(
                      "px-4 md:px-6 py-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex-shrink-0",
                      selectedType === type 
                        ? "bg-white text-black shadow-lg" 
                        : "text-white/40 hover:text-white/60"
                    )}
                  >
                    {type === "all" ? "All Modules" : type === "wizard" ? "Multi-Step" : "Single-Page"}
                  </button>
                ))}
              </div>
        </div>

        {/* Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 relative pointer-events-none">
             {/* Continuous vertical lines */}
             <div className="absolute inset-y-0 left-0 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pointer-events-none z-0">
              <div className="border-x border-white/[0.05]" />
              <div className="border-r border-white/[0.05] hidden sm:block" />
              <div className="border-r border-white/[0.05] hidden md:block" />
            </div>

            {filteredTemplates.map((template, i) => {
              const isWizard = !!template.steps?.length;
              const fieldCount = template.steps 
                ? template.steps.reduce((acc, step) => acc + step.fields.length, 0)
                : template.fields.length;

              return (
                <Link 
                  key={template.id} 
                  href={`/editor?template=${template.id}`}
                  className="p-8 md:p-16 border-b border-white/[0.05] space-y-6 md:space-y-8 hover:bg-white/[0.01] transition-colors group relative pointer-events-auto overflow-hidden z-10"
                >
                  <Plus className="absolute -top-3 -right-3 w-6 h-6 text-white/10 z-20 group-hover:text-primary transition-colors hidden md:block" />
                  
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {template.name} <br />
                      <span className="text-white/30">{isWizard ? "multi-step architecture." : "functional module."}</span>
                    </h3>
                    <p className="text-sm leading-relaxed text-[#888] line-clamp-3">
                      {template.description}
                    </p>
                  </div>

                  <div className="pt-6 md:pt-8 flex items-center justify-between font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-white/60 transition-colors">
                    <div className="flex gap-3 md:gap-4">
                      <span>{fieldCount} FIELDS</span>
                      <span>ZOD/RHF</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-32 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01] mx-4 md:mx-6">
            <div className="flex justify-center mb-6 opacity-20">
              <Search className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 italic">No architectures found</h3>
            <p className="text-white/30">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
