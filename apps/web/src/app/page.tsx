"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formTemplates } from "@/lib/form-templates";
import { Footer } from "@/components/footer";
import { Github, Zap, Shield, Layout, Cpu, Box, Code2, ArrowUpRight, Wand2, Layers, Database, Sparkles, Binary, ChevronRight, Plus, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#888] selection:bg-primary/30 font-sans tracking-tight overflow-x-hidden">
      
      <section className="relative pt-20 md:pt-28 pb-16 md:pb-24 border-b border-white/[0.05]">
        {/* Abstract Background: Radial Mesh */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />
        
        {/* Horizon Glows - Increased opacity for visibility + Pulse Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[1000px] h-[300px] md:h-[400px] bg-white/[0.08] blur-[80px] md:blur-[120px] rounded-full -z-10" 
        />

        <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6 text-left">

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center rounded-lg bg-white/5 border border-white/10 px-3 py-1 text-xs font-medium text-white/80 mb-8 backdrop-blur-xl"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            v1.0 Now Public • Shadcn/UI Compatible
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.1] md:leading-[1.0] mb-6 md:mb-8"
          >
            The Visual Registry for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 italic">Technical Forms.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm md:text-lg text-white/60 max-w-2xl mb-8 md:mb-10 leading-relaxed font-normal px-0"
          >
            FormsCN bridges the gap between visual builders and code ownership. 
            Architect complex <strong>multi-step wizards</strong>, full authentication flows (2FA, Passkeys, Magic Links), and data schemas visually. 
            <br /><br />
            Then, install production-ready, type-safe code directly into your project via CLI—
            fully integrated with <strong>Better Auth</strong>, <strong>Zod</strong>, and <strong>Shadcn/UI</strong>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16 md:mb-20 justify-start"
          >
            <Link href="/editor" className="w-full sm:w-auto">
              <Button size="lg" className="h-12 px-8 rounded-xl bg-white text-black hover:bg-white/90 font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
                Open Visual Editor
              </Button>
            </Link>
            <Link href="/docs" className="w-full sm:w-auto">
              <div className="h-12 px-6 rounded-xl flex items-center justify-center gap-2 font-medium text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-all cursor-pointer w-full sm:w-auto bg-white/[0.02]">
                Read Documentation
              </div>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-6 text-xs text-white/30 font-mono"
          >
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                npx shadcn@latest add ...
             </div>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                Next.js 15 Ready
             </div>
          </motion.div>
        </div>

        {/* Static Tech Marquee */}
        <div className="mt-20 md:mt-32 w-full overflow-hidden border-y border-white/[0.03] bg-white/[0.01] py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-30 grayscale contrast-200">
              {[
                { name: "Next.js", icon: <Cpu className="w-4 h-4" /> },
                { name: "Better Auth", icon: <ShieldCheck className="w-4 h-4" /> },
                { name: "Shadcn UI", icon: <Layout className="w-4 h-4" /> },
                { name: "Drizzle", icon: <Database className="w-4 h-4" /> },
                { name: "Prisma", icon: <Binary className="w-4 h-4" /> },
                { name: "TypeScript", icon: <Code2 className="w-4 h-4" /> },
                { name: "Tailwind", icon: <Sparkles className="w-4 h-4" /> },
                { name: "Zod", icon: <Zap className="w-4 h-4" /> },
              ].map((tech) => (
                <div key={tech.name} className="flex items-center gap-2 group cursor-default">
                  <div className="text-white group-hover:text-primary transition-colors">
                    {tech.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-0 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-full grid grid-cols-1 md:grid-cols-3 pointer-events-none">
          <div className="border-x border-white/[0.05] hidden md:block" />
          <div className="border-r border-white/[0.05] hidden md:block" />
          <div className="border-r border-white/[0.05] hidden md:block" />
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl px-0">
          <div className="grid grid-cols-1 md:grid-cols-3">
            
            <div className="p-8 md:p-16 border-b border-white/[0.05] space-y-6 hover:bg-white/[0.01] transition-colors group">
              <Cpu className="w-4 h-4 text-white opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white leading-tight">
                  Framework Agnostic <br className="hidden md:block" />
                  <span className="text-white/30">exporting.</span>
                </h3>
                <p className="text-sm leading-relaxed text-[#888]">
                  Export optimized code for Next.js, Remix, TanStack Start, and Vite. We handle the routing and server action patterns for you.
                </p>
              </div>
            </div>

            <div className="p-8 md:p-16 border-b border-white/[0.05] md:border-l md:border-l-white/[0.05] space-y-6 hover:bg-white/[0.01] transition-colors group">
              <Shield className="w-4 h-4 text-white opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white leading-tight">
                  Type-Safe Zod <br className="hidden md:block" />
                  <span className="text-white/30">Validation.</span>
                </h3>
                <p className="text-sm leading-relaxed text-[#888]">
                   Every form generates a corresponding Zod schema. Full TypeScript support with inferred types for your form data.
                </p>
              </div>
            </div>

            <div className="p-8 md:p-16 border-b border-white/[0.05] md:border-l md:border-l-white/[0.05] space-y-6 hover:bg-white/[0.01] transition-colors group">
              <Layers className="w-4 h-4 text-white opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white leading-tight">
                  Multi-Step Wizard <br className="hidden md:block" />
                  <span className="text-white/30">architecture.</span>
                </h3>
                <p className="text-sm leading-relaxed text-[#888]">
                  Create complex multi-page forms with ease. State management and per-step validation are handled out of the box.
                </p>
              </div>
            </div>

            <div className="p-8 md:p-16 border-b border-white/[0.05] space-y-6 hover:bg-white/[0.01] transition-colors group relative">
              <Plus className="absolute -top-3 -right-3 w-6 h-6 text-white/10 z-20 hidden md:block" />
              <Layout className="w-4 h-4 text-white opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white leading-tight">
                   Visual Drag & Drop <br className="hidden md:block" />
                  <span className="text-white/30">Editor.</span>
                </h3>
                <p className="text-sm leading-relaxed text-[#888]">
                  A powerful visual lab where you can build forms, configure fields, and see your code update in real-time.
                </p>
              </div>
            </div>

            <div className="p-8 md:p-16 border-b border-white/[0.05] md:border-l md:border-l-white/[0.05] space-y-6 hover:bg-white/[0.01] transition-colors group relative">
               <Plus className="absolute -top-3 -right-3 w-6 h-6 text-white/10 z-20 hidden md:block" />
               <ShieldCheck className="w-4 h-4 text-white opacity-40 group-hover:opacity-100 transition-opacity" />
               <div className="space-y-4">
                <h3 className="text-xl font-bold text-white leading-tight">
                  Advanced Auth <br className="hidden md:block" /> <span className="text-white/30">Features.</span>
                </h3>
                <p className="text-sm leading-relaxed text-[#888]">
                   One-click support for 2FA, Magic Links, Passkeys, and Organizations. We generate both the complex logic and the polished UI components.
                </p>
              </div>
            </div>

            <div className="p-8 md:p-16 border-b border-white/[0.05] md:border-l md:border-l-white/[0.05] space-y-6 hover:bg-white/[0.01] transition-colors group">
              <Code2 className="w-4 h-4 text-white opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white leading-tight">
                  Interactive Setup <br className="hidden md:block" />
                  <span className="text-white/30">Checklist.</span>
                </h3>
                <p className="text-sm leading-relaxed text-[#888]">
                  Don&apos;t guess the integration steps. Get a dynamic checklist for secret generation, database migrations, and environment setup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-white/[0.05]">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-10">
            <div className="space-y-3">
               <h2 className="text-3xl font-bold text-white tracking-tighter italic">The Form Registry</h2>
               <p className="text-sm text-white/30 max-w-md leading-relaxed">
                 A curated inventory of form architectures. Ready to be
                 initialized and deployed into production.
               </p>
            </div>
            <Link href="/templates" className="w-full sm:w-auto">
               <div className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-white/30 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all cursor-pointer flex items-center justify-center md:justify-start gap-2 group w-full sm:w-auto">
                 All Templates <ChevronRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
               </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] border border-white/[0.05]">
            {formTemplates.slice(0, 6).map((template) => (
              <Link
                key={template.id}
                href={`/editor?template=${template.id}`}
                className="group relative p-8 md:p-10 bg-[#000] hover:bg-white/[0.01] transition-all duration-300"
              >
                <div className="mb-6 md:mb-8 flex justify-between items-start">
                   {template.steps && (
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary border border-primary/20 px-2 py-0.5">Wizard</span>
                   )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">{template.name}</h3>
                  <p className="text-xs text-white/40 line-clamp-2 leading-relaxed mb-6">
                    {template.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-white transition-colors">
                  Architect Form <ArrowUpRight className="w-3 h-3 text-primary" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-40 text-center relative overflow-hidden group">
        {/* Animated Background SVG */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M-100 200 Q 360 150, 720 200 T 1540 200" 
              stroke="url(#grid-gradient)" 
              strokeWidth="2" 
              fill="none" 
              className="animate-pulse"
              strokeDasharray="10 20"
            />
          </svg>
        </div>

        <div className="container relative z-10 mx-auto max-w-3xl px-4 md:px-6 space-y-8 md:space-y-12">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-7xl font-bold text-white tracking-tighter leading-[1.1] md:leading-[0.9] italic">
              Architect your next <br className="hidden sm:block" /> production form.
            </h2>
            <p className="text-sm md:text-lg text-white/40 max-w-lg mx-auto leading-relaxed px-4">
              Stop wiring boilerplate. Start generating production-grade, 
              type-safe forms in the lab.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 pt-4 px-4">
            <Link href="/editor" className="w-full sm:w-auto">
              <Button size="lg" className="h-14 px-10 rounded-xl bg-white text-black hover:bg-white/90 font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto shadow-2xl shadow-white/10">
                Launch The Lab
              </Button>
            </Link>
            <Link href="https://github.com/AbdullahMukadam/formscn" className="w-full sm:w-auto">
              <div className="flex items-center justify-center gap-3 text-white/30 hover:text-white transition-all cursor-pointer group text-sm font-bold h-14 px-6 rounded-xl border border-white/5 bg-white/[0.02] w-full sm:w-auto">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
                
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
