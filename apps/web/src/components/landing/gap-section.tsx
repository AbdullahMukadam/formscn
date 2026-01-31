"use client";

import { motion } from "framer-motion";
import { MousePointer2, FileJson } from "lucide-react";

export function GapSection() {
  return (
    <section className="py-24 md:py-32 bg-[#0C0C0E]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00E599]">
              <MousePointer2 size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Visual Drag & Drop Editor.
              </h2>
              <p className="text-lg text-white/60 leading-relaxed max-w-md">
                A powerful visual lab where you can build forms, configure fields, and see your code update in real-time.
              </p>
            </div>
            {/* Abstract visual line */}
            <div className="h-px w-full bg-gradient-to-r from-[#00E599]/50 to-transparent mt-4" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
              <FileJson size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                Type-Safe Zod Validation.
              </h2>
              <p className="text-lg text-white/60 leading-relaxed max-w-md">
                Every form generates a corresponding Zod schema with full TypeScript support and inferred types.
              </p>
            </div>
            {/* Abstract visual line */}
            <div className="h-px w-full bg-gradient-to-r from-blue-400/50 to-transparent mt-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
