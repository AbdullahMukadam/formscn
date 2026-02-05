"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

export function DocsTOC() {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("");
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    // 1. Build TOC from H2/H3
    const elements = Array.from(document.querySelectorAll("h2, h3"));
    const tocItems: TocItem[] = [];

    elements.forEach((elem) => {
      if (!elem.id) {
        elem.id = elem.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") || "";
      }

      const item = {
        title: elem.textContent || "",
        url: `#${elem.id}`,
      };

      if (elem.tagName === "H2") {
        tocItems.push(item);
      } else if (elem.tagName === "H3" && tocItems.length > 0) {
        if (!tocItems[tocItems.length - 1].items) {
          tocItems[tocItems.length - 1].items = [];
        }
        tocItems[tocItems.length - 1].items?.push(item);
      }
    });

    setItems(tocItems);

    // 2. Setup Intersection Observer for Active State
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, [pathname]);

  if (!items.length) return null;

  return (
    <div className="space-y-2">
      <p className="font-medium text-sm">On This Page</p>
      
      {/* THE MAIN TRACK: 
         We add a 'border-l' here to create the continuous grey line.
      */}
      <div className="relative border-l border-zinc-200 dark:border-zinc-800">
        <ul className="m-0 list-none">
          {items.map((item) => (
            <li key={item.url} className="mt-0 pt-2">
              <a
                href={item.url}
                className={cn(
                  // Layout & Text
                  "inline-block no-underline transition-colors hover:text-foreground",
                  // Indentation
                  "pl-4", 
                  // THE TRICK: Pull left by 1px to overlap the border
                  "-ml-px border-l-2",
                  item.url === `#${activeId}`
                    ? "font-medium text-foreground border-foreground" // Active: White text, colored border
                    : "text-muted-foreground border-transparent"      // Inactive: Grey text, invisible border
                )}
              >
                {item.title}
              </a>
              
              {/* Nested H3 Items */}
              {item.items?.length ? (
                <ul className="m-0 list-none">
                  {item.items.map((subItem) => (
                    <li key={subItem.url} className="mt-0 pt-2">
                      <a
                        href={subItem.url}
                        className={cn(
                          "inline-block no-underline transition-colors hover:text-foreground",
                          // Deeper Indentation for H3
                          "pl-8",
                          // Same Trick: Overlap the parent border
                          "-ml-px border-l-2",
                          subItem.url === `#${activeId}`
                            ? "font-medium text-foreground border-foreground"
                            : "text-muted-foreground border-transparent"
                        )}
                      >
                        {subItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}