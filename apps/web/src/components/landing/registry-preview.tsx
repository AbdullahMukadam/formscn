"use client";

import { motion } from "framer-motion";
import { ArrowRight, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const templates = [
  { title: "Signup Form", desc: "Email/Password with validation", tag: "Auth" },
  { title: "2FA Setup Flow", desc: "QR Code generation & verification", tag: "Security" },
  { title: "Org Invitation", desc: "Invite members via email", tag: "SaaS" },
  { title: "Passkey Mgmt", desc: "Register and manage passkeys", tag: "Advanced" },
  { title: "Multi-Step Wizard", desc: "Onboarding flow with state", tag: "UX" },
];

export function RegistryPreview() {
  return (
    <section className="py-24 bg-[#0C0C0E] border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              The Form Registry.
            </h2>
            <p className="text-lg text-white/60">
              Curated architectures ready for production.
            </p>
          </div>
          <Button variant="outline" className="text-white border-white/10 hover:bg-white/5 hover:text-white">
            View All Templates <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
          </Button>
        </div>

        <div className="flex overflow-x-auto pb-8 gap-6 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {templates.map((template, i) => (
            <motion.div
              key={template.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-[280px] md:min-w-[320px] bg-[#131316] border border-white/10 rounded-xl p-6 flex flex-col justify-between group hover:border-[#00E599]/30 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs font-mono text-[#00E599] bg-[#00E599]/10 px-2 py-1 rounded">
                    {template.tag}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white/10">
                    <Copy size={14} className="text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{template.title}</h3>
                <p className="text-white/60 text-sm">{template.desc}</p>
              </div>
              
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-white/40">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Updated 2 days ago
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
