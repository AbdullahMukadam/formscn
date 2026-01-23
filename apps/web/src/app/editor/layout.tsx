import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visual Editor",
  description: "Drag-and-drop form builder with live preview and code generation.",
  alternates: {
    canonical: "/editor",
  },
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
