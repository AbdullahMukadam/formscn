import { Hero } from "@/components/landing/hero";
import { GapSection } from "@/components/landing/gap-section";
import { BentoGrid } from "@/components/landing/bento-grid";
import { RegistryPreview } from "@/components/landing/registry-preview";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0C0C0E] text-white selection:bg-[#00E599] selection:text-black overflow-x-hidden">
      <Hero />
      <GapSection />
      <BentoGrid />
      <RegistryPreview />
      <Footer />
    </main>
  );
}
