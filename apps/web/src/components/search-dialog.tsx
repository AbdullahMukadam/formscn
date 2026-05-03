"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse, { type FuseResult, type FuseResultMatch } from "fuse.js";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FileText, Hash, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchSection = { heading: string; slug: string; content: string };
type SearchDoc = {
  slug: string;
  title: string;
  description: string;
  content: string;
  sections: SearchSection[];
  url: string;
};

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function highlight(text: string, indices: readonly [number, number][]): React.ReactNode {
  if (!indices?.length) return text;
  const result: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const [start, end] of indices) {
    if (start > lastIndex) result.push(text.slice(lastIndex, start));
    result.push(
      <mark key={start} className="bg-yellow-400/30 text-foreground rounded-sm px-0.5">
        {text.slice(start, end + 1)}
      </mark>
    );
    lastIndex = end + 1;
  }

  if (lastIndex < text.length) result.push(text.slice(lastIndex));
  return <>{result}</>;
}

function getSnippet(content: string, indices: readonly [number, number][]): string {
  if (!indices?.length || !content) return content?.slice(0, 100) ?? "";
  const [start] = indices[0];
  const snippetStart = Math.max(0, start - 40);
  const snippetEnd = Math.min(content.length, start + 120);
  const snippet = content.slice(snippetStart, snippetEnd);
  return (snippetStart > 0 ? "..." : "") + snippet + (snippetEnd < content.length ? "..." : "");
}

function highlightSnippet(
  content: string,
  indices: readonly [number, number][],
  snippetStart: number
): React.ReactNode {
  const snippet = getSnippet(content, indices);
  if (!indices?.length) return snippet;

  const offset = Math.max(0, snippetStart - 40);
  const adjustedIndices = indices
    .map(([s, e]): [number, number] => [s - offset, e - offset])
    .filter(([s, e]) => s >= 0 && e >= 0 && s < snippet.length);

  return highlight(snippet, adjustedIndices);
}

type MatchedSection = {
  doc: SearchDoc;
  matchedSection?: SearchSection;
  titleIndices?: readonly [number, number][];
  contentIndices?: readonly [number, number][];
  sectionIndices?: readonly [number, number][];
};

function processResults(fuseResults: FuseResult<SearchDoc>[]): MatchedSection[] {
  return fuseResults.map((result) => {
    const doc = result.item;
    const matches = result.matches ?? [];

    const titleMatch = matches.find((m: FuseResultMatch) => m.key === "title");
    const contentMatch = matches.find((m: FuseResultMatch) => m.key === "content");
    const sectionContentMatch = matches.find((m: FuseResultMatch) =>
      m.key === "sections.content"
    );
    const sectionHeadingMatch = matches.find((m: FuseResultMatch) =>
      m.key === "sections.heading"
    );

    let matchedSection: SearchSection | undefined;
    if (sectionContentMatch?.refIndex !== undefined) {
      matchedSection = doc.sections[sectionContentMatch.refIndex];
    } else if (sectionHeadingMatch?.refIndex !== undefined) {
      matchedSection = doc.sections[sectionHeadingMatch.refIndex];
    }

    return {
      doc,
      matchedSection,
      titleIndices: titleMatch?.indices,
      contentIndices: contentMatch?.indices,
      sectionIndices: sectionContentMatch?.indices ?? sectionHeadingMatch?.indices,
    };
  });
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MatchedSection[]>([]);
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("/api/search")
      .then((r) => r.json())
      .then(setDocs);
  }, []);

  useEffect(() => {
    if (!query.trim()) return setResults([]);

    const fuse = new Fuse(docs, {
      keys: [
        { name: "title", weight: 2 },
        { name: "description", weight: 1.5 },
        { name: "sections.heading", weight: 1.5 },
        { name: "sections.content", weight: 1 },
        { name: "content", weight: 0.5 },
      ],
      threshold: 0.4,
      includeMatches: true,
      minMatchCharLength: 2,
    });

    setResults(processResults(fuse.search(query)));
    setActiveIndex(0);
  }, [query, docs]);

  const handleSelect = useCallback(
    (url: string) => {
      router.push(url as any);
      onOpenChange(false);
      setQuery("");
    },
    [router, onOpenChange]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      const list = query.trim() ? results : [];
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, list.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && list[activeIndex]) {
        handleSelect(list[activeIndex].doc.url);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, results, query, activeIndex, handleSelect]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-lg overflow-hidden">
        <DialogTitle className="sr-only">Search documentation</DialogTitle>

        <div className="flex items-center gap-3 px-4 py-3 border-b">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            autoFocus
            placeholder="Search docs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="max-h-[420px] overflow-y-auto">
          {!query && docs.length > 0 && (
            <div className="py-2">
              <p className="text-xs text-muted-foreground px-4 py-1.5 font-medium">Pages</p>
              {docs.slice(0, 6).map((doc, i) => (
                <button
                  key={doc.url}
                  onClick={() => handleSelect(doc.url)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                    i === activeIndex ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{doc.title}</p>
                    {doc.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {doc.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No results for "
              <span className="text-foreground font-medium">{query}</span>"
            </div>
          )}

          {query && results.length > 0 && (
            <div className="py-2">
              <p className="text-xs text-muted-foreground px-4 py-1.5 font-medium">
                {results.length} result{results.length !== 1 ? "s" : ""}
              </p>
              {results.map(({ doc, matchedSection, titleIndices, contentIndices, sectionIndices }, i) => {
                const snippetSource = matchedSection?.content ?? doc.content;
                const snippetIndices = sectionIndices ?? contentIndices;
                const snippetOffset = Math.max(0, (snippetIndices?.[0]?.[0] ?? 0) - 40);

                return (
                  <button
                    key={`${doc.url}-${i}`}
                    onClick={() => handleSelect(matchedSection?.slug
                            ? `${doc.url}#${matchedSection.slug}`
                            : doc.url)}
                    className={cn(
                      "w-full flex flex-col items-start gap-1 px-4 py-3 text-left transition-colors border-b border-border/50 last:border-0",
                      i === activeIndex ? "bg-muted" : "hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      <span className="text-xs text-muted-foreground">{doc.title}</span>
                    </div>

                    {matchedSection?.heading && (
                      <div className="flex items-center gap-2 pl-5">
                        <Hash className="w-3 h-3 text-muted-foreground shrink-0" />
                        <span className="text-sm font-medium">
                          {highlight(matchedSection.heading, sectionIndices ?? [])}
                        </span>
                      </div>
                    )}

                    {!matchedSection && (
                      <p className="text-sm font-medium pl-5">
                        {highlight(doc.title, titleIndices ?? [])}
                      </p>
                    )}

                    {snippetSource && (
                      <p className="text-xs text-muted-foreground pl-5 line-clamp-2 leading-relaxed">
                        {highlightSnippet(snippetSource, snippetIndices ?? [], snippetOffset)}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="border-t px-4 py-2 flex items-center gap-4 text-xs text-muted-foreground">
          <span><kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">↑↓</kbd> navigate</span>
          <span><kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">↵</kbd> select</span>
          <span><kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">esc</kbd> close</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
