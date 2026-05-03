import fs from "fs";
import path from "path";

export type SearchSection = {
  heading: string;
  slug: string;
  content: string;
};

export type SearchDoc = {
  slug: string;
  title: string;
  description: string;
  content: string;
  sections: SearchSection[];
  url: string;
};

function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function extractMetadata(source: string): { title: string; description: string } {
  const titleMatch = source.match(/title:\s*["'`]([^"'`]+)["'`]/);
  const descMatch = source.match(/description:\s*["'`]([^"'`]+)["'`]/);
  return {
    title: titleMatch?.[1] ?? "",
    description: descMatch?.[1] ?? "",
  };
}

function extractContent(source: string): string {
  return source
    .replace(/export const metadata[\s\S]*?};/m, "")
    .replace(/^import .+$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/\n{2,}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSections(source: string): SearchSection[] {
  const clean = source
    .replace(/export const metadata[\s\S]*?};/m, "")
    .replace(/^import .+$/gm, "")
    .replace(/```[\s\S]*?```/g, "");

  const lines = clean.split("\n");
  const sections: SearchSection[] = [];
  let currentHeading = "";
  let currentLines: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^#{1,6}\s+(.+)/);
    if (headingMatch) {
      if (currentLines.length > 0) {
        sections.push({
          heading: currentHeading,
          slug: slugifyHeading(currentHeading),
          content: currentLines
            .join(" ")
            .replace(/\*\*([^*]+)\*\*/g, "$1")
            .replace(/\*([^*]+)\*/g, "$1")
            .replace(/`[^`]*`/g, "")
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
            .replace(/\s+/g, " ")
            .trim(),
        });
      }
      currentHeading = headingMatch[1];
      currentLines = [];
    } else if (line.trim()) {
      currentLines.push(line.trim());
    }
  }

  if (currentLines.length > 0) {
    sections.push({
      heading: currentHeading,
      slug: slugifyHeading(currentHeading),
      content: currentLines.join(" ").replace(/\s+/g, " ").trim(),
    });
  }

  return sections.filter((s) => s.content.length > 0);
}

function getMdxFiles(dir: string, baseUrl: string): SearchDoc[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const docs: SearchDoc[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      docs.push(...getMdxFiles(fullPath, `${baseUrl}/${entry.name}`));
    } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
      const source = fs.readFileSync(fullPath, "utf-8");
      const { title, description } = extractMetadata(source);
      const slug = entry.name.replace(/\.mdx?$/, "");
      const url = slug === "page" ? baseUrl : `${baseUrl}/${slug}`;

      docs.push({
        slug,
        title,
        description,
        content: extractContent(source),
        sections: extractSections(source),
        url,
      });
    }
  }

  return docs;
}

export function getSearchDocs(): SearchDoc[] {
  const docsDir = path.join(process.cwd(), "/src/app/docs");
  return getMdxFiles(docsDir, "/docs");
}
