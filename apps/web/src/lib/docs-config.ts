export interface DocItem {
  title: string;
  href: string;
}

export interface DocSection {
  title: string;
  items: DocItem[];
}

export const docsConfig: DocSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
      },
      {
        title: "Installation",
        href: "/docs/installation",
      },
      {
        title: "CLI",
        href: "/docs/cli",
      },
      {
        title: "Quick Start",
        href: "/docs/quick-start",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Form Builder",
        href: "/docs/components/form-builder",
      },
      {
        title: "Form Fields",
        href: "/docs/components/form-fields",
      },
    ],
  },
  {
    title: "Community",
    items: [
      {
        title: "Open Source",
        href: "/docs/open-source",
      },
    ],
  },
];
