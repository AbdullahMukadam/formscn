"use client";


const NextJsIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12c0 2.465-.745 4.758-2.022 6.665l-1.643-1.643V6h-1.5v10.125L7.435 4.665H5.85v14.67h1.5V9.21l11.315 11.125z" />
  </svg>
);

const TanStackIcon = ({ className }: { className?: string }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S16.627 0 12 0zm0 18.6c-3.645 0-6.6-2.955-6.6-6.6s2.955-6.6 6.6-6.6 6.6 2.955 6.6 6.6-2.955 6.6-6.6 6.6z" />
  </svg>
);

const BetterAuthIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.1 10.36H15.149999999999999V13.68H12.1z" />
    <path d="m3,3v18h18V3H3Zm15.48,10.68v3h-6.38v-3h-3.48v3h-3.13V7.36h3.13v3h3.48v-3h6.38v6.32Z" />
  </svg>
);

const ShadcnIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    fill="currentColor" viewBox="0 0 24 24" >
    <path d="m19.01 11.55-7.46 7.46c-.46.46-.46 1.19 0 1.65a1.16 1.16 0 0 0 1.64 0l7.46-7.46c.46-.46.46-1.19 0-1.65s-1.19-.46-1.65 0ZM19.17 3.34c-.46-.46-1.19-.46-1.65 0L3.34 17.52c-.46.46-.46 1.19 0 1.65a1.16 1.16 0 0 0 1.64 0L19.16 4.99c.46-.46.46-1.19 0-1.65Z" />
  </svg>
);

const DrizzleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    fill="currentColor" viewBox="0 0 24 24" >
    <path d="M6.13 10.67c.42.24.57.77.33 1.19l-2.82 4.92c-.24.42-.78.57-1.2.33a.87.87 0 0 1-.33-1.19L4.93 11c.24-.42.78-.57 1.2-.33M12.21 6.9c.42.24.57.77.33 1.19l-2.82 4.92c-.24.42-.78.57-1.2.33a.87.87 0 0 1-.33-1.19l2.82-4.92c.24-.42.78-.57 1.2-.33M21.56 6.9c.42.24.57.77.33 1.19l-2.82 4.92c-.24.42-.78.57-1.2.33a.87.87 0 0 1-.33-1.19l2.82-4.92c.24-.42.78-.57 1.2-.33M15.48 10.67c.42.24.57.77.33 1.19l-2.82 4.92c-.24.42-.78.57-1.2.33a.87.87 0 0 1-.33-1.19L14.28 11c.24-.42.78-.57 1.2-.33" />
  </svg>
);

const PrismaIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    fill="currentColor" viewBox="0 0 24 24" >
    <path d="M13.23 2.58c-.33-.72-1.34-.78-1.75-.1L4 14.67c-.2.32-.2.73 0 1.05l3.68 5.81c.24.38.7.55 1.13.42l10.63-3.19c.58-.17.87-.82.62-1.37zm4.29 14.8-7.34 2.19a.37.37 0 0 1-.47-.43l2.63-13.1c.07-.36.56-.41.71-.07l4.71 10.9c.09.21-.02.44-.24.51" />
  </svg>
);

const TypeScriptIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    fill="currentColor" viewBox="0 0 24 24" >
    <path d="M19.24 3H4.76A1.76 1.76 0 0 0 3 4.76v14.48A1.76 1.76 0 0 0 4.76 21h14.48A1.76 1.76 0 0 0 21 19.24V4.76A1.76 1.76 0 0 0 19.24 3m-5.8 10h-2.25v6.44H9.4V13H7.15v-1.46h6.29zm5.8 5.28a1.7 1.7 0 0 1-.67.74 3 3 0 0 1-1 .39 6 6 0 0 1-1.2.12 7 7 0 0 1-1.23-.11 4.5 4.5 0 0 1-1-.33v-1.71l-.06-.06h.06v.07a3.4 3.4 0 0 0 1 .54 3.1 3.1 0 0 0 1.13.2 2.6 2.6 0 0 0 .6-.06 1.5 1.5 0 0 0 .42-.17.75.75 0 0 0 .25-.25.69.69 0 0 0-.06-.74 1.2 1.2 0 0 0-.35-.33 3 3 0 0 0-.53-.3l-.67-.28a3.6 3.6 0 0 1-1.37-1 2 2 0 0 1-.46-1.33 2.16 2.16 0 0 1 .24-1.06 2.1 2.1 0 0 1 .66-.71 2.9 2.9 0 0 1 1-.42 5 5 0 0 1 1.19-.13 7 7 0 0 1 1.09.07 4.5 4.5 0 0 1 .88.23v1.65a2.4 2.4 0 0 0-.42-.24 4 4 0 0 0-.49-.17 3 3 0 0 0-.49-.1 2.5 2.5 0 0 0-.46 0 2.3 2.3 0 0 0-.56.06 1.5 1.5 0 0 0-.43.16.8.8 0 0 0-.26.25.63.63 0 0 0-.09.33.6.6 0 0 0 .1.35 1.2 1.2 0 0 0 .3.29 2.2 2.2 0 0 0 .46.28l.63.28a6.6 6.6 0 0 1 .84.42 2.7 2.7 0 0 1 .64.49 1.8 1.8 0 0 1 .42.63 2.5 2.5 0 0 1 .14.85 2.7 2.7 0 0 1-.25 1.08z" />
  </svg>
);

const TailwindIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" fill="#fefeff" xmlns="http://www.w3.org/2000/svg" id="Tailwind-Css-Fill--Streamline-Remix-Fill" height="24" width="24">
    <path d="M7.9997333333333325 3.239993333333333c-2.1155466666666665 0 -3.437773333333333 1.0577733333333332 -3.9666599999999996 3.173333333333333 0.7933333333333332 -1.05778 1.7188866666666665 -1.4544466666666667 2.77666 -1.19 0.6035999999999999 0.15073333333333333 1.0346666666666666 0.5883866666666666 1.5126 1.07364C9.100466666666666 7.086333333333333 10.000266666666667 8 11.9664 8c2.115533333333333 0 3.4377999999999997 -1.0577999999999999 3.966666666666667 -3.1733466666666663 -0.7933333333333332 1.05778 -1.7188666666666665 1.4544466666666667 -2.7766666666666664 1.1900066666666667 -0.6035999999999999 -0.15073333333333333 -1.0346 -0.5883933333333333 -1.5126 -1.0736466666666666 -0.7774666666666665 -0.7893666666666667 -1.6772666666666665 -1.70302 -3.6440666666666663 -1.70302ZM4.033073333333333 8C1.91752 8 0.5952953333333333 9.0578 0.06640626666666666 11.173333333333334 0.85974 10.115533333333332 1.7852933333333332 9.718866666666667 2.8430733333333333 9.983333333333333c0.6035933333333333 0.15073333333333333 1.03464 0.5884 1.51262 1.0736666666666665 0.7781266666666666 0.7893333333333332 1.6778999999999997 1.7029999999999998 3.6440399999999995 1.7029999999999998 2.115533333333333 0 3.4377999999999997 -1.0577999999999999 3.966666666666667 -3.173333333333333 -0.7933333333333332 1.0577999999999999 -1.7188666666666665 1.4544666666666668 -2.7766666666666664 1.19 -0.6035999999999999 -0.15073333333333333 -1.0346666666666666 -0.5884 -1.5126 -1.0736666666666665C6.899666666666667 8.913666666666666 5.999879999999999 8 4.033073333333333 8Z" stroke-width="0.6667"></path>
  </svg>
);

const ZodIcon = ({ className }: { className?: string }) => (
<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="Zod--Streamline-Simple-Icons" height="24" width="24">
  <path d="M19.088 2.477 24 7.606 12.521 20.485l-0.925 1.038L0 7.559l5.108 -5.082h13.98Zm-17.434 5.2 6.934 -4.003H5.601L1.619 7.636l0.035 0.041Zm12.117 -4.003L3.333 9.7l2.149 2.588 10.809 -6.241 -0.2 -0.346 2.851 -1.646 -0.365 -0.381h-4.806Zm7.52 2.834L8.257 14.034h5.101v-0.4h3.667l5.346 -5.998 -1.08 -1.128Zm-7.129 10.338H9.268l2.36 2.843 2.534 -2.843Z" fill="#fdfdfd" stroke-width="1"></path>
</svg>
)

// 2. Map Data
const techStack = [
  { name: "Next.js", icon: NextJsIcon },
  { name: "TanStack Form", icon: TanStackIcon },
  { name: "Better Auth", icon: BetterAuthIcon },
  { name: "Shadcn UI", icon: ShadcnIcon },
  { name: "Drizzle", icon: DrizzleIcon },
  { name: "Prisma", icon: PrismaIcon },
  { name: "TypeScript", icon: TypeScriptIcon },
  { name: "Tailwind", icon: TailwindIcon },
  { name: "Zod", icon: ZodIcon },
] as const;

export function TechStackSection() {
  return (
    <div className="w-full bg-black border-b border-white/[0.1]">
      <div className="container relative mx-auto max-w-5xl md:border-x border-white/[0.1]">
        {/* Top Light Leak Effect */}
        <div className="absolute inset-0 top-0 h-24 w-full bg-[radial-gradient(35%_64px_at_50%_0%,theme(colors.white/5%),transparent)] pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center py-10 px-8 gap-8 md:gap-12">

          {/* Tech Stack List */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 w-full">
            {techStack.map((tech) => {
              const Icon = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="flex items-center gap-2.5 group cursor-default opacity-40 hover:opacity-100 transition-all duration-300"
                >
                  <div className="text-white group-hover:text-primary transition-colors group-hover:scale-110 duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}