import { Metadata } from "next";
import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsPager } from "@/components/docs-pager";
import { DocsBreadcrumb } from "@/components/docs-breadcrumb";
import { DocsTOC } from "@/components/docs-toc";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: {
    template: "%s - Documentation | FormCN",
    default: "Documentation | FormCN",
  },
  description: "Comprehensive documentation for FormCN, the visual form builder for React.",
  keywords: ["documentation", "guide", "api reference", "form components", "react forms"],
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <DocsSidebar />
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">
          <DocsBreadcrumb />
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {children}
          </div>
          <DocsPager />
        </div>
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-hidden pt-6">
            <ScrollArea className="h-full pb-10">
              <DocsTOC />
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
}
