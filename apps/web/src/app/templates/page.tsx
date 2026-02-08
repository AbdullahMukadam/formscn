"use client";

import { useState, useMemo } from "react";
import { formTemplates } from "@/lib/form-templates";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

import {
  TemplatesHeader,
  SearchInput,
  CategoryFilter,
  TemplatesGrid,
  EmptyState,
} from "@/components/templates";
import type { TemplateCategory } from "@/types/templates";
import { filterTemplates } from "@/lib/templates.utils";


function BackgroundGrid() {
  return (
    <div
      className={cn(
        "fixed inset-0 z-0",
        "opacity-[0.1]",
        "pointer-events-none"
      )}
      style={{
        backgroundColor: "#000000",
        backgroundImage: "radial-gradient(circle at 1px 1px, #333 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
      aria-hidden="true"
    />
  );
}


export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>("all");

  // Memoized filtered templates for performance
  const filteredTemplates = useMemo(() => 
    filterTemplates(formTemplates, searchQuery, selectedCategory),
    [searchQuery, selectedCategory]
  );

  const hasTemplates = filteredTemplates.length > 0;

  return (
    <div className="relative min-h-screen bg-black text-[#888] selection:bg-primary/30 font-sans tracking-tight">
      {/* Global Styles */}
      <style jsx global>{`
        body {
          background-color: #000000 !important;
        }
      `}</style>

      {/* Background */}
      <BackgroundGrid />

      <main className="relative z-10 mx-auto max-w-7xl px-0 pt-24 md:pt-32 pb-24 md:pb-32 min-h-screen">
        {/* Header */}
        <TemplatesHeader templateCount={filteredTemplates.length} />

        {/* Filters & Search */}
        <section className="flex flex-col gap-4 mb-12 md:mb-16 px-4 md:px-6">
          <SearchInput 
            value={searchQuery} 
            onChange={setSearchQuery}
            placeholder="Search templates..."
          />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </section>

        {/* Templates Grid or Empty State */}
        <section>
          {hasTemplates ? (
            <TemplatesGrid templates={filteredTemplates} />
          ) : (
            <EmptyState searchQuery={searchQuery} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
