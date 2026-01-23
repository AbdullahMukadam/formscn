"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { docsConfig, type DocSection, type DocItem } from "@/lib/docs-config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DocsPager() {
  const pathname = usePathname();
  const pager = getPagerForDoc(pathname);

  if (!pager) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between mt-10">
      {pager?.prev?.href && (
        <Link
          href={pager.prev.href}
          className={cn(buttonVariants({ variant: "outline" }), "mr-auto")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next?.href && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: "outline" }), "ml-auto")}
        >
          {pager.next.title}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export function getPagerForDoc(slug: string) {
  const flattenedLinks = [null, ...flatten(docsConfig), null];
  const activeIndex = flattenedLinks.findIndex(
    (link) => slug === link?.href || (slug.endsWith("/") && slug === link?.href + "/")
  );
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

export function flatten(links: DocSection[]): DocItem[] {
  return links
    .reduce<DocItem[]>((flat, link) => {
      return flat.concat(link.items ? link.items : []);
    }, []);
}
