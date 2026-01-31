"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";

const codeSnippet = `import { z } from "zod"

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["user", "admin"]),
  company: z.object({
    name: z.string().min(2),
    size: z.number().min(1)
  })
})

// Auto-generated types
export type SignUpValues = z.infer<typeof signUpSchema>
`;

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(0,229,153,0.15),transparent_70%)] blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              The Bridge Between Visual Builders and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E599] to-emerald-600">
                Code Ownership.
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Architect complex multi-step wizards and auth flows visually. Then, install production-ready, type-safe code directly into your project via CLI.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="h-12 px-8 rounded-full text-base font-semibold bg-[#00E599] text-black hover:bg-[#00E599]/90">
              Start Building <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
            </Button>
            <div className="flex items-center gap-2 px-4 py-3 bg-[#131316] border border-white/10 rounded-full font-mono text-sm text-white/80 cursor-pointer hover:border-[#00E599]/50 transition-colors group">
              <span className="text-[#00E599]">$</span>
              <span>npx formscn@latest init</span>
              <Terminal className="ml-2 h-4 w-4 text-white/40 group-hover:text-white transition-colors" strokeWidth={1.5} />
            </div>
          </motion.div>
        </div>

        {/* Visual Split */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10 rounded-xl overflow-hidden bg-[#0C0C0E]/50 backdrop-blur-sm shadow-2xl">
            {/* Left: UI Node Graph Simulation */}
            <div className="relative h-[400px] lg:h-auto border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0C0C0E] p-8 overflow-hidden group">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
              
              {/* Nodes */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Node 1 */}
                <div className="absolute top-10 left-10 w-48 bg-[#131316] border border-white/10 rounded-lg p-3 shadow-lg transform -rotate-2">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-xs font-mono text-white/70">Start Step</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-24 bg-white/10 rounded" />
                    <div className="h-2 w-16 bg-white/10 rounded" />
                  </div>
                </div>

                {/* Connection Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path d="M 180 100 C 250 100, 250 200, 320 200" fill="none" stroke="#00E599" strokeWidth="2" strokeDasharray="4 4" className="opacity-40" />
                </svg>

                {/* Node 2 (Active) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 bg-[#131316] border border-[#00E599]/30 shadow-[0_0_30px_-10px_rgba(0,229,153,0.2)] rounded-lg p-4 z-20">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00E599]" />
                      <span className="text-xs font-mono text-white">Sign Up Form</span>
                    </div>
                    <div className="text-[10px] text-[#00E599] bg-[#00E599]/10 px-1.5 py-0.5 rounded">Active</div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-8 bg-white/5 rounded border border-white/5 flex items-center px-3 text-xs text-white/40">Enter email...</div>
                    <div className="h-8 bg-white/5 rounded border border-white/5 flex items-center px-3 text-xs text-white/40">Password...</div>
                    <div className="flex justify-end">
                      <div className="h-6 w-16 bg-[#00E599] rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="absolute bottom-10 right-10 w-48 bg-[#131316] border border-white/10 rounded-lg p-3 shadow-lg transform rotate-2">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-xs font-mono text-white/70">OnSubmit</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-20 bg-white/10 rounded" />
                    <div className="h-2 w-28 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Code */}
            <div className="relative bg-[#08080A] max-h-[400px] overflow-auto">
              <div className="absolute top-0 right-0 p-2 z-10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                </div>
              </div>
              <CodeBlock 
                code={codeSnippet} 
                language="typescript" 
                className="border-none bg-transparent h-full font-mono text-sm" 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
