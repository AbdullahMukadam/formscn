"use client";

import { motion } from "framer-motion";
import { Fingerprint, Shield, Mail, CheckCircle2, Layers, Key } from "lucide-react";
import { cn } from "@/lib/utils";

export function BentoGrid() {
  return (
    <section className="py-24 bg-[#0C0C0E]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            The complete toolkit for <br />
            <span className="text-[#00E599]">modern form infrastructure.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[auto_auto] gap-4 md:gap-6 max-w-6xl mx-auto">
          {/* Card 1: Wide - Advanced Auth */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 rounded-xl bg-[#131316] border border-white/10 p-8 flex flex-col justify-between overflow-hidden group hover:border-[#00E599]/30 transition-colors relative"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
               <Fingerprint size={120} className="text-[#00E599]" strokeWidth={1} />
            </div>
            
            <div className="relative z-10">
              <div className="flex gap-4 mb-6">
                <div className="p-3 bg-white/5 rounded-lg text-[#00E599]"><Fingerprint strokeWidth={1.5} /></div>
                <div className="p-3 bg-white/5 rounded-lg text-blue-400"><Shield strokeWidth={1.5} /></div>
                <div className="p-3 bg-white/5 rounded-lg text-purple-400"><Mail strokeWidth={1.5} /></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Advanced Auth Features</h3>
              <p className="text-white/60 max-w-md">
                One-click 2FA, Magic Links, Passkeys, and Organization invites. We generate the logic and the UI so you don't have to.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Tall - Framework Agnostic */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.1 }}
             className="md:col-span-1 md:row-span-2 rounded-xl bg-[#131316] border border-white/10 p-8 flex flex-col overflow-hidden group hover:border-[#00E599]/30 transition-colors"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Framework Agnostic</h3>
            <p className="text-white/60 mb-8">Export optimized code for your stack.</p>
            
            <div className="flex-1 flex flex-col gap-4">
               {["Next.js", "Remix", "TanStack Start", "Vite"].map((fw, i) => (
                 <div key={fw} className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between group-hover:bg-white/10 transition-colors">
                   <span className="font-mono text-sm text-white/80">{fw}</span>
                   <div className={cn("w-2 h-2 rounded-full", i === 0 ? "bg-[#00E599]" : "bg-white/20")} />
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Card 3: Square - Interactive Checklist */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="rounded-xl bg-[#131316] border border-white/10 p-8 flex flex-col justify-between group hover:border-[#00E599]/30 transition-colors"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#00E599]/10 flex items-center justify-center text-[#00E599] mb-4">
                <CheckCircle2 size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Interactive Checklist</h3>
              <p className="text-white/60 text-sm">Dynamic checklist for secret generation and DB migrations.</p>
            </div>
          </motion.div>

          {/* Card 4: Square - Multi-Step */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.3 }}
             className="rounded-xl bg-[#131316] border border-white/10 p-8 flex flex-col justify-between group hover:border-[#00E599]/30 transition-colors"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                <Layers size={20} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Multi-Step Arch</h3>
              <p className="text-white/60 text-sm">State management and per-step validation out of the box.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
