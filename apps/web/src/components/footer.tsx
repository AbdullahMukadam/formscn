import Link from "next/link";
import { Github, Twitter, Box } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-12 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:gap-12 md:grid-cols-4">
          <div className="md:col-span-2 space-y-4 md:space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tighter text-white">formscn</span>
            </div>
            <p className="text-sm text-[#888] max-w-xs leading-relaxed">
              The professional form engine for React. Build complex flows 
              visually and export production-grade, type-safe code.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-2">
            <div>
              <h3 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4 md:mb-6">Resources</h3>
              <ul className="space-y-3 md:space-y-4 text-sm font-medium">
                <li>
                  <Link href="/docs" className="text-[#888] hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/templates" className="text-[#888] hover:text-white transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="/editor" className="text-[#888] hover:text-white transition-colors">
                    Editor
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4 md:mb-6">Social</h3>
              <ul className="space-y-3 md:space-y-4 text-sm font-medium">
                <li>
                  <Link href="https://github.com/AbdullahMukadam/formscn" className="text-[#888] hover:text-white transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="https://x.com/abd_mukadam" className="text-[#888] hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.1em] text-white/20">
            © {new Date().getFullYear()} formscn. 
          </p>
          <div className="flex items-center justify-center md:justify-end gap-6">
            <Link href="https://github.com/AbdullahMukadam/formscn" className="text-white/20 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="https://x.com/abd_mukadam" className="text-white/20 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
