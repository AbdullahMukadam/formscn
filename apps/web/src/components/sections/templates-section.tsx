"use client";

import Link from "next/link";
import { Layout, Wand2, ChevronRight, ArrowUpRight } from "lucide-react";
import { formTemplates } from "@/lib/form-templates";

const MAX_DISPLAYED_TEMPLATES = 6;

export function TemplatesSection() {
  const displayedTemplates = formTemplates.slice(0, MAX_DISPLAYED_TEMPLATES);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Container */}
      <div className="relative mx-auto max-w-5xl md:border-x border-white/[0.1]">
        {/* Top Radial Gradient */}
        <div className="absolute top-0 inset-x-0 h-px w-full bg-white/[0.1]" />
        <div className="absolute inset-0 top-0 h-[300px] w-full bg-[radial-gradient(40%_128px_at_50%_0%,theme(colors.white/5%),transparent)] pointer-events-none" />

        {/* Section Header */}
        <div className="relative p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-white/40 mb-2">
              <Layout className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest font-mono">Template Library</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
              Production-Ready Forms
            </h2>
            <p className="text-sm text-white/40 max-w-md leading-relaxed">
              Don&apos;t start from scratch. Clone these shadcn/ui templates and customize them in the visual builder.
            </p>
          </div>

          <Link href="/templates" className="w-full md:w-auto">
            <div className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] text-xs font-medium text-white transition-all cursor-pointer">
              View All Templates
              <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-white/[0.1]" />

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.1]">
          {displayedTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {/* Bottom Divider Line */}
        <div className="w-full h-px bg-white/[0.1]" />

        {/* Bottom Footer */}
        <div className="p-4 bg-white/[0.01] flex items-center justify-center">
          <p className="text-[10px] text-white/20 font-mono text-center">
            UPDATED WEEKLY • COMMUNITY CONTRIBUTIONS WELCOME
          </p>
        </div>

        {/* Bottom Border Line */}
        <div className="absolute inset-x-0 bottom-0 h-px w-full bg-white/[0.1]" />
      </div>
    </section>
  );
}

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    steps?: unknown[];
  };
}

function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link
      href={`/editor?template=${template.id}`}
      className="group relative p-8 hover:bg-white/[0.02] transition-colors duration-300 flex flex-col h-full"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div>
          <div className="flex justify-between items-start mb-4">
            {template.steps && template.steps.length > 0 && (
              <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-sm">
                <Wand2 className="w-2.5 h-2.5" /> Wizard
              </span>
            )}
          </div>

          <h3 className="text-base font-medium text-white mb-2 group-hover:text-primary transition-colors">
            {template.name}
          </h3>
          <p className="text-sm text-white/40 leading-relaxed line-clamp-2">
            {template.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white/60 transition-colors pt-4 border-t border-white/[0.05]">
          <span>Use Template</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </Link>
  );
}
