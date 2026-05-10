import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsPager } from "@/components/docs-pager";
import { DocsBreadcrumb } from "@/components/docs-breadcrumb";
import { DocsTOC } from "@/components/docs-toc";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MobileDocsNav } from "@/components/mobile-docs-nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - Documentation | FormSCN",
    default: "Documentation | FormSCN",
  },
  description: "Comprehensive documentation for FormSCN, the visual form builder for React.",
  keywords: ["documentation", "guide", "api reference", "form components", "react forms"],
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
return (
    <div className="container flex flex-1 flex-col items-start md:flex-row md:gap-6 lg:gap-10">
      <div className="md:hidden sticky top-14 z-40 w-full bg-background border-b border-border">
        <div className="flex items-center h-12 px-4">
          <MobileDocsNav />
        </div>
      </div>

      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] shrink-0 border-r border-border md:sticky md:block md:w-[220px] lg:w-[250px]">
        <ScrollArea className="h-full py-6 pr-6 lg:py-8">
          <DocsSidebar />
        </ScrollArea>
      </aside>

      <main className="relative flex w-full flex-1 flex-col xl:flex-row xl:gap-10">
        <div className="mx-auto flex min-w-0 flex-1 flex-col px-4 py-6 sm:px-6 lg:py-8 lg:w-[600px]">
          <DocsBreadcrumb />

          <div className="prose prose-slate dark:prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg py-8 prose-pre:max-w-[calc(100vw-2rem)] md:prose-pre:max-w-none break-words">
            {children}
          </div>

          <DocsPager />
        </div>
        <div className="hidden shrink-0 text-sm xl:block xl:w-[250px]">
          <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] pt-4">
            <ScrollArea className="h-full pb-10">
              <DocsTOC />
            </ScrollArea>
          </div>
        </div>
      </main>

    </div>
  );
}
