"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Layout } from "lucide-react";
import dynamic from "next/dynamic";
import { Separator } from "../ui/seperator";

// Dynamically import Dither to reduce initial bundle size
const LightRays = dynamic(() => import("@/components/LightRays"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/50" />,
});

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section className="flex flex-col antialiased">
      <div className="relative pt-20 md:pt-32 pb-16 md:pb-24 border-b border-white/[0.05]">
        <Separator
          orientation="vertical"
          className="absolute left-0 top-0 bottom-0 -translate-x-1/2 z-50 bg-white/[0.05]"
        />

        <Separator
          orientation="vertical"
          className="absolute right-0 top-0 bottom-0 translate-x-1/2 z-50 bg-white/[0.05]"
        />

        {/* Background Layer: Dither */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={1}
            rayLength={2}
            pulsating={false}
            fadeDistance={1}
            saturation={1}
            followMouse
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
          />
        </div>

        {/* Content Layer */}
        <div className="container relative z-10 mx-auto px-6 md:px-8 flex flex-col items-center justify-center text-center">
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-zinc-950/50 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md transition-all hover:bg-zinc-900/80 hover:border-white/10 mb-10 cursor-default"
          >
            <span className="relative flex h-1.5 w-1.5 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="transition-opacity">Open Source</span>
            <span className="w-px h-3 bg-zinc-700 mx-1"></span>
            <span className="transition-opacity">Built for shadcn/ui</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl sm:text-7xl leading-[1.1] font-semibold font-sans tracking-tight text-zinc-50 mb-6"
          >
            Visual Form Builder <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 to-zinc-600">
              for shadcn/ui
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base md:text-lg text-zinc-400 max-w-2xl mb-12 leading-relaxed font-normal mx-auto"
          >
            Stop copying form code. Design{" "}
            <strong className="font-medium text-zinc-200">
              shadcn/ui forms visually
            </strong>{" "}
            with drag-and-drop, see live previews, and export production-ready
            TypeScript.
            <br className="hidden md:block" />
            <span className="mt-2 inline-block text-zinc-500">
              Supports <strong>React Hook Form</strong> &{" "}
              <strong>TanStack Form</strong>.
            </span>
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full"
          >
            <Link href="/editor" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-12 px-8 rounded-full bg-zinc-50 text-zinc-950 hover:bg-zinc-200 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto shadow-[0_0_40px_-15px_rgba(255,255,255,0.2)]"
              >
                Build Your First Form
              </Button>
            </Link>
            <Link href="/templates" className="w-full sm:w-auto">
              <div className="h-12 px-8 rounded-full flex items-center justify-center gap-2 font-medium text-sm text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 backdrop-blur-sm transition-all cursor-pointer w-full sm:w-auto">
                <Layout className="w-4 h-4" />
                Browse Templates
              </div>
            </Link>
          </motion.div>

          {/* Footer Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[11px] uppercase tracking-widest text-zinc-500 font-semibold"
          >
            <StatItem label="shadcn/ui Compatible" />
            <StatItem label="Next.js 15 Ready" />
            <StatItem label="Open Source" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 hover:text-zinc-300 transition-colors cursor-default">
      <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
      {label}
    </div>
  );
}
