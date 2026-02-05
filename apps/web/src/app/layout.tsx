import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
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
  metadataBase: new URL("https://formscn.space"),
  title: {
    default: "FormSCN - shadcn/ui Form Builder with Better Auth Integration",
    template: "%s | FormSCN",
  },
  description: "Visual form builder for shadcn/ui and React. Build production-ready forms with React Hook Form or TanStack Form, add Better Auth in one click, and export clean TypeScript code for Next.js, Remix, or Vite.",
  keywords: [
    "shadcn form builder",
    "shadcn/ui forms",
    "react form builder",
    "better-auth integration",
    "nextjs form generator",
    "react hook form builder",
    "tanstack form builder",
    "zod form generator",
    "shadcn ui components",
    "visual form editor",
    "typescript form generator",
    "open source form builder",
    "drag and drop form builder",
    "authentication forms",
    "login form generator",
    "signup form generator",
    "remix forms",
    "vite forms",
    "form code generator",
  ],
  authors: [
    {
      name: "FormSCN Team",
      url: "https://formscn.space",
    },
  ],
  creator: "FormSCN",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://formscn.space",
    title: "FormSCN - shadcn/ui Form Builder with Better Auth",
    description: "Visual form builder for shadcn/ui. Design forms with drag-and-drop, add Better Auth authentication, export production-ready React code using React Hook Form or TanStack Form.",
    siteName: "FormSCN",
    images: [
      {
        url: "https://formscn.space/og-image.png",
        width: 1200,
        height: 630,
        alt: "FormSCN - Visual Form Builder for shadcn/ui",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FormSCN - shadcn/ui Form Builder with Better Auth",
    description: "Visual form builder for shadcn/ui. Design forms, add Better Auth, export production-ready code. Supports React Hook Form & TanStack Form.",
    images: ["https://formscn.space/og-image.png"],
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
          <div className="grid grid-rows-[auto_1fr] h-svh has-[header]:grid-rows-[auto_1fr]">
            <Header />
            {children}
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
