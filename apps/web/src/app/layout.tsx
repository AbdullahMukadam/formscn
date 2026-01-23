import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "../index.css";
import Header from "@/components/header";
import Providers from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://formscn.dev"),
  title: {
    default: "FormCN - Build Production-Ready Forms in React",
    template: "%s | FormCN",
  },
  description: "The open-source form builder for modern React apps. Drag-and-drop editor, Better Auth integration, and framework-agnostic code generation (Next.js, Vite, Remix).",
  keywords: [
    "react form builder",
    "shadcn forms",
    "better-auth forms",
    "nextjs forms",
    "react hook form builder",
    "zod form generator",
    "open source form builder",
    "tanstack start forms",
    "remix forms",
    "form generator",
    "ui components"
  ],
  authors: [
    {
      name: "FormCN Team",
      url: "https://formscn.dev",
    },
  ],
  creator: "FormCN",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://formscn.dev",
    title: "FormCN - Build Production-Ready Forms in React",
    description: "The open-source form builder for modern React apps. Drag-and-drop editor, Better Auth integration, and framework-agnostic code generation.",
    siteName: "FormCN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FormCN - Visual Form Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FormCN - Build Production-Ready Forms in React",
    description: "The open-source form builder for modern React apps. Drag-and-drop editor, Better Auth integration, and framework-agnostic code generation.",
    images: ["/og-image.png"],
    creator: "@formscn",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="grid grid-rows-[auto_1fr] h-svh">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
