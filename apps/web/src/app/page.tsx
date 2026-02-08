"use client";

import { Footer } from "@/components/footer";
import { CallToAction } from "@/components/cta";
import {
  HeroSection,
  TechStackSection,
  FeaturesSection,
  TemplatesSection,
} from "../components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#888] selection:bg-primary/30 font-sans tracking-tight overflow-x-hidden">
      <HeroSection />
      <TechStackSection />
      <FeaturesSection />
      <TemplatesSection />
      
      {/* CTA Section */}
      <section className="py-24 md:py-32 text-center relative overflow-hidden group">
        <CallToAction />
      </section>
      
      <Footer />
    </div>
  );
}
