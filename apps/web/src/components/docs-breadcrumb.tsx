"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { docsConfig } from "@/lib/docs-config";

export function DocsBreadcrumb() {
  const pathname = usePathname();
  
  // Find the current section and item based on pathname
  let currentSection = "";
  let currentItem = "";

  for (const section of docsConfig) {
    const item = section.items.find((item) => item.href === pathname);
    if (item) {
      currentSection = section.title;
      currentItem = item.title;
      break;
    }
  }

  if (!currentItem) return null;

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>{currentSection}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentItem}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
