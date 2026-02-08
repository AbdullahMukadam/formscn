"use client";

import { Layout, Wand2, Code2, Shield, Layers, ShieldCheck, Plus, type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  highlight: string;
  description: string;
  showPlus?: boolean;
}

const features: FeatureCardProps[] = [
  {
    icon: Layout,
    title: "shadcn/ui",
    highlight: "Components.",
    description: "Built exclusively for shadcn/ui. Every form uses your existing components—Button, Input, Select, and more. No learning curve.",
  },
  {
    icon: Wand2,
    title: "Visual Drag & Drop",
    highlight: "Editor.",
    description: "Build forms visually, see live preview, and watch your code update in real-time. No more copy-pasting examples.",
  },
  {
    icon: Code2,
    title: "Choose Your",
    highlight: "Form Library.",
    description: "Toggle between React Hook Form and TanStack Form. Same visual builder, different output—you own the code.",
  },
  {
    icon: Shield,
    title: "Type-Safe Zod",
    highlight: "Validation.",
    description: "Every form auto-generates a Zod schema. Full TypeScript support with inferred types for your form data.",
    showPlus: true,
  },
  {
    icon: Layers,
    title: "Multi-Step Wizard",
    highlight: "Support.",
    description: "Build complex onboarding flows and checkouts. State management and per-step validation handled automatically.",
    showPlus: true,
  },
  {
    icon: ShieldCheck,
    title: "Better Auth",
    highlight: "Integration.",
    description: "Optional one-click auth. Add 2FA, Passkeys, Magic Links, and OAuth providers to your shadcn forms instantly.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-0 overflow-hidden">
      {/* Background Grid Lines */}
      <div className="absolute inset-y-0 left-0 w-full grid grid-cols-1 md:grid-cols-3 pointer-events-none">
        <div className="border-x border-white/[0.05] hidden md:block" />
        <div className="border-r border-white/[0.05] hidden md:block" />
        <div className="border-r border-white/[0.05] hidden md:block" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  highlight, 
  description, 
  showPlus = false,
  index 
}: FeatureCardProps & { index: number }) {
  // Determine border classes based on position
  const borderClasses = [
    "border-b border-white/[0.05]", // First row
    "border-b border-white/[0.05] md:border-l md:border-l-white/[0.05]", // Second column
    "border-b border-white/[0.05] md:border-l md:border-l-white/[0.05]", // Third column
  ];

  const borderClass = borderClasses[index % 3];

  return (
    <div className={`p-8 md:p-16 ${borderClass} space-y-6 hover:bg-white/[0.01] transition-colors group relative`}>
      {showPlus && (
        <Plus className="absolute -top-3 -right-3 w-6 h-6 text-white/10 z-20 hidden md:block" />
      )}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white leading-tight">
          {title} <br className="hidden md:block" />
          <span className="text-white/30">{highlight}</span>
        </h3>
        <p className="text-sm leading-relaxed text-[#888]">
          {description}
        </p>
      </div>
    </div>
  );
}
