"use client";

import { useState } from "react";
import Link from "next/link";
import { formTemplates } from "@/lib/form-templates";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Box, ArrowUpRight, Search, Layers, Layout, Filter, X, Plus, ChevronRight, Shield, Mail, ShoppingCart, User, Blocks } from "lucide-react";
import { cn } from "@/lib/utils";

// Template categories
const CATEGORIES = {
  all: { label: "All Templates", icon: Blocks },
  auth: { label: "Authentication", icon: Shield },
  contact: { label: "Contact & Forms", icon: Mail },
  ecommerce: { label: "E-commerce", icon: ShoppingCart },
  profile: { label: "Profile & Settings", icon: User },
} as const;

type Category = keyof typeof CATEGORIES;

// Categorize templates
function getTemplateCategory(templateName: string): Category {
  const name = templateName.toLowerCase();
  if (name.includes("login") || name.includes("signup") || name.includes("auth") || 
      name.includes("password") || name.includes("factor") || name.includes("passkey")) {
    return "auth";
  }
  if (name.includes("profile") || name.includes("settings") || name.includes("organization")) {
    return "profile";
  }
  if (name.includes("checkout") || name.includes("payment") || name.includes("ecommerce")) {
    return "ecommerce";
  }
  if (name.includes("contact") || name.includes("newsletter") || name.includes("feedback") || 
      name.includes("support") || name.includes("application") || name.includes("booking") ||
      name.includes("event") || name.includes("waitlist") || name.includes("address")) {
    return "contact";
  }
  return "contact"; // default
}

// Detect shadcn components used in template
function getShadcnComponents(template: any): string[] {
  const components = new Set<string>();
  
  // Always has these
  components.add("button");
  components.add("form");
  components.add("card");
  
  // Check fields for component types
  template.fields?.forEach((field: any) => {
    if (field.inputType === "text" || field.inputType === "email" || field.inputType === "password") {
      components.add("input");
    }
    if (field.inputType === "textarea") {
      components.add("textarea");
    }
    if (field.inputType === "select") {
      components.add("select");
    }
    if (field.inputType === "checkbox") {
      components.add("checkbox");
    }
    if (field.inputType === "radio") {
      components.add("radio-group");
    }
    if (field.inputType === "date") {
      components.add("calendar");
      components.add("popover");
    }
  });
  
  return Array.from(components);
}

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  const filteredTemplates = formTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const templateCategory = getTemplateCategory(template.name);
    const matchesCategory = selectedCategory === "all" || templateCategory === selectedCategory;
    
    return matchesSearch && matchesCategory;
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
              shadcn/ui Form Templates
            </h1>
            <p className="text-base md:text-lg text-white/40 max-w-xl leading-relaxed font-medium">
              Production-ready form components built with shadcn/ui, React Hook Form, 
              and Zod validation. Copy, customize, ship.
            </p>
          </div>
              <div className="inline-flex items-center gap-2 text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/5 px-3 py-1.5 border border-primary/10 rounded-full w-fit">
                <Box className="w-3 h-3" />
                {filteredTemplates.length} Templates
              </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col gap-4 mb-12 md:mb-16 px-4 md:px-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {(Object.keys(CATEGORIES) as Category[]).map((category) => {
              const { label, icon: Icon } = CATEGORIES[category];
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-all flex items-center gap-2 flex-shrink-0 border",
                    selectedCategory === category 
                      ? "bg-primary text-black border-primary shadow-lg" 
                      : "bg-white/[0.02] text-white/40 hover:text-white/60 border-white/10 hover:border-white/20"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              );
            })}
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
              
              const components = getShadcnComponents(template);
              const category = getTemplateCategory(template.name);
              const CategoryIcon = CATEGORIES[category].icon;

              return (
                <Link 
                  key={template.id} 
                  href={`/editor?template=${template.id}`}
                  className="p-8 md:p-16 border-b border-white/[0.05] space-y-6 md:space-y-8 hover:bg-white/[0.01] transition-colors group relative pointer-events-auto overflow-hidden z-10"
                >
                  <Plus className="absolute -top-3 -right-3 w-6 h-6 text-white/10 z-20 group-hover:text-primary transition-colors hidden md:block" />
                  
                  <div className="space-y-3 md:space-y-4">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wide text-white/40">
                      <CategoryIcon className="w-3 h-3" />
                      {CATEGORIES[category].label}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {template.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#888] line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wide text-white/30">
                      <span>{fieldCount} fields</span>
                      <span>•</span>
                      <span>{isWizard ? "Multi-step" : "Single page"}</span>
                    </div>
                    
                    {/* shadcn Components */}
                    <div className="flex flex-wrap gap-1.5">
                      {components.slice(0, 5).map((comp) => (
                        <span 
                          key={comp}
                          className="px-2 py-0.5 bg-white/[0.03] border border-white/10 rounded text-[9px] font-mono text-white/50"
                        >
                          {comp}
                        </span>
                      ))}
                      {components.length > 5 && (
                        <span className="px-2 py-0.5 text-[9px] text-white/30">
                          +{components.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between font-mono text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-primary transition-colors">
                    <span>Use Template</span>
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
            <h3 className="text-xl font-bold text-white mb-2 italic">No templates found</h3>
            <p className="text-white/30">Try adjusting your search or category filter.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
