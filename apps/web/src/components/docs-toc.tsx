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
    // Simple client-side TOC generation
    const elements = Array.from(document.querySelectorAll("h2, h3"));
    const tocItems: TocItem[] = [];

    elements.forEach((elem) => {
      if (!elem.id) {
        // Generate ID if missing
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
  }, [pathname]); // Re-run when pathname changes

  if (!items.length) return null;

  return (
    <div className="space-y-2">
      <p className="font-medium text-sm">On This Page</p>
      <ul className="m-0 list-none">
        {items.map((item) => (
          <li key={item.url} className="mt-0 pt-2">
            <a
              href={item.url}
              className={cn(
                "inline-block no-underline transition-colors hover:text-foreground",
                item.url === `#${activeId}`
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <ul className="m-0 list-none pl-4">
                {item.items.map((subItem) => (
                  <li key={subItem.url} className="mt-0 pt-2">
                    <a
                      href={subItem.url}
                      className={cn(
                        "inline-block no-underline transition-colors hover:text-foreground",
                        subItem.url === `#${activeId}`
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
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
  );
}
