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
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function HeroSection() {
  return (
    <section className="flex flex-col">
      <div className="relative pt-20 md:pt-32 pb-16 md:pb-24 border-b border-white/[0.05]">
        <Separator
          orientation="vertical"
          className="absolute left-0 top-0 bottom-0 -translate-x-1/2 z-50"
        />

        <Separator
          orientation="vertical"
          className="absolute right-0 top-0 bottom-0 translate-x-1/2 z-50"

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
        <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center">
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-white/20 mb-10 cursor-default shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="opacity-80 group-hover:opacity-100 transition-opacity">Open Source</span>
            <span className="w-px h-3 bg-white/20 mx-1"></span>
            <span className="opacity-80 group-hover:opacity-100 transition-opacity">Built for shadcn/ui</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-semibold font-sans tracking-tighter text-white mb-8 drop-shadow-sm"
          >
            Visual Form Builder <br />
            <span className="font-serif italic font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 pb-2">
              for shadcn/ui
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-xl text-white/70 max-w-2xl mb-12 leading-relaxed font-light tracking-wide mx-auto"
          >
            Stop copying form code. Design <strong className="font-medium text-white underline decoration-white/30 underline-offset-4">shadcn/ui forms visually</strong> with drag-and-drop,
            see live preview, and export production-ready TypeScript.
            <br className="hidden md:block" /><br className="hidden md:block" />
            Choose <strong>React Hook Form</strong> or <strong>TanStack Form</strong>.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20 w-full"
          >
            <Link href="/editor" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-14 px-10 rounded-full bg-white text-black hover:bg-white/90 font-bold text-base transition-all hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_-5px_rgba(255,255,255,0.4)]"
              >
                Build Your First Form
              </Button>
            </Link>
            <Link href="/templates" className="w-full sm:w-auto">
              <div className="h-14 px-8 rounded-full flex items-center justify-center gap-3 font-medium text-sm text-white/70 hover:text-white border border-white/10 hover:border-white/30 hover:bg-white/[0.05] backdrop-blur-sm transition-all cursor-pointer w-full sm:w-auto">
                <Layout className="w-4 h-4" />
                Browse Templates
              </div>
            </Link>
          </motion.div>

          {/* Footer Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[10px] md:text-xs uppercase tracking-[0.15em] text-white/40 font-mono"
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
    <div className="flex items-center gap-3 hover:text-white/60 transition-colors cursor-default">
      <div className="w-1 h-1 rounded-full bg-white/40 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
      {label}
    </div>
  );
}
