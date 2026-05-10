"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {Form} from "@formscn/form"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  ExternalLink,
  Layers2,
  Box,
  FileCode2,
  Settings2,
  Component,
  Sparkles,
  Search,
  Library,
  Puzzle,
  Zap,
  Fingerprint,
  CalendarDays,
  Mail,
  PanelRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const examples = [
  {
    id: "contact",
    name: "Contact / Support",
    description: "Standard contact implementation with multi-type inputs.",
    icon: Mail,
    accent: "text-white",
    bgAccent: "bg-blue-500/10",
    schema: z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email"),
      subject: z.enum(["general", "support", "sales", "feedback"]),
      message: z.string().min(10, "Message must be at least 10 characters"),
      newsletter: z.boolean().optional(),
    }),
    defaultValues: {
      name: "",
      email: "",
      subject: "general",
      message: "",
      newsletter: false,
    },
    features: ["Email Validation", "Enum Select", "Optional Checkbox"],
    engine: "Zod v3.22+",
  },
  {
    id: "profile",
    name: "User Profile",
    description: "Complex profile management with date and URL validations.",
    icon: Fingerprint,
    accent: "text-white",
    bgAccent: "bg-indigo-500/10",
    schema: z.object({
      username: z.string().min(3).max(20),
      bio: z.string().max(500).optional(),
      website: z.string().url().optional().or(z.literal("")),
      birthDate: z.date().optional(),
    }),
    defaultValues: {
      username: "",
      bio: "",
      website: "",
      birthDate: undefined,
    },
    features: ["Date Picker Interface", "URL Coercion", "Length Limits"],
    engine: "Zod v3.22+",
  },
  {
    id: "event",
    name: "Event Registration",
    description: "Numeric bounds and boolean toggles for event management.",
    icon: CalendarDays,
    accent: "text-white",
    bgAccent: "bg-emerald-500/10",
    schema: z.object({
      eventName: z.string().min(5),
      eventType: z.enum(["conference", "workshop", "meetup", "webinar"]),
      maxAttendees: z.number().min(1).max(1000),
      isPublic: z.boolean(),
      description: z.string().min(20),
    }),
    defaultValues: {
      eventName: "",
      eventType: "conference",
      maxAttendees: 50,
      isPublic: true,
      description: "",
    },
    features: ["Number Stepper", "Switch Toggle", "Textarea Auto-resize"],
    engine: "Zod v3.22+",
  },
];

export default function FormRegistryDemo() {
  const [selectedExample, setSelectedExample] = useState(examples[0]);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileRightPanelOpen, setIsMobileRightPanelOpen] = useState(false);

  const handleSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    toast.success("Payload received", {
      description: "Data successfully validated and submitted. Check console.",
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates((prev) => ({ ...prev, [id]: true }));
    toast.success("Copied to clipboard");
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const getSchemaCode = () => {
    const fields: Record<string, string> = {
      contact: `z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.enum(["general", "support", "sales", "feedback"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
  newsletter: z.boolean().optional(),
})`,
      profile: `z.object({
  username: z.string().min(3).max(20),
  bio: z.string().max(500).optional(),
  website: z.string().url().optional(),
  birthDate: z.date().optional(),
})`,
      event: `z.object({
  eventName: z.string().min(5),
  eventType: z.enum(["conference", "workshop", "meetup", "webinar"]),
  maxAttendees: z.number().min(1).max(1000),
  isPublic: z.boolean(),
  description: z.string().min(20),
})`,
    };
    return fields[selectedExample.id];
  };

return (
    <div className="flex h-screen pt-14 overflow-hidden bg-background text-foreground antialiased selection:bg-primary/10">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-14 border-b border-border/40 flex items-center justify-between px-4 shrink-0 bg-background/80 backdrop-blur-md z-50 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileSidebarOpen(true)}
          className="h-8 w-8 text-muted-foreground"
        >
          <Menu className="w-4 h-4" />
        </Button>
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as any)}
          className="w-[160px]"
        >
          <TabsList className="grid w-full grid-cols-2 h-8 bg-zinc-100/80 dark:bg-zinc-900/80 p-0.5 rounded-md">
            <TabsTrigger
              value="preview"
              className="text-[12px] rounded-sm transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="text-[12px] rounded-sm transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileRightPanelOpen(true)}
          className="h-8 w-8 text-muted-foreground"
        >
          <PanelRight className="w-4 h-4" strokeWidth={1.5} />
        </Button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 top-0 bottom-0 w-[260px] flex flex-col shrink-0 border-r border-border/40 bg-zinc-50/50 dark:bg-zinc-950/30 z-50 md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-border/40">
                <span className="text-sm font-semibold">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="h-8 w-8"
                >
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
                <div>
                  <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                    Templates
                  </div>
                  <nav className="space-y-0.5">
                    {examples.map((example) => {
                      const Icon = example.icon;
                      const isSelected = selectedExample.id === example.id;

                      return (
                        <button
                          key={example.id}
                          onClick={() => {
                            setSelectedExample(example);
                            setIsMobileSidebarOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all duration-200 outline-none",
                            isSelected
                              ? "bg-white dark:bg-zinc-900 font-medium text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                              : "text-muted-foreground hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 hover:text-foreground"
                          )}
                        >
                          <Icon
                            className={cn(
                              "w-4 h-4 shrink-0",
                              isSelected ? example.accent : "opacity-70"
                            )}
                            strokeWidth={1.5}
                          />
                          <span className="truncate">{example.name}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div>
                  <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                    Resources
                  </div>
                  <nav className="space-y-0.5">
                    <Link
                      href="/docs"
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-muted-foreground hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 hover:text-foreground transition-all duration-200"
                      onClick={() => setIsMobileSidebarOpen(false)}
                    >
                      <Library
                        className="w-4 h-4 shrink-0 opacity-70"
                        strokeWidth={1.5}
                      />
                      Documentation
                      <ExternalLink className="w-3 h-3 ml-auto opacity-40" />
                    </Link>
                    <Link
                      href="/editor"
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-muted-foreground hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 hover:text-foreground transition-all duration-200"
                      onClick={() => setIsMobileSidebarOpen(false)}
                    >
                      <Layers2
                        className="w-4 h-4 shrink-0 opacity-70"
                        strokeWidth={1.5}
                      />
                      Visual Editor
                    </Link>
                  </nav>
                </div>
              </div>

              <div className="p-4 border-t border-border/40">
                <div className="group relative flex items-center justify-between bg-white dark:bg-zinc-900 rounded-lg p-2 ring-1 ring-black/5 dark:ring-white/10 shadow-sm transition-all hover:ring-black/10 dark:hover:ring-white/20">
                  <code className="text-[11px] font-mono text-muted-foreground px-1 truncate flex-1">
                    npm i @formscn/form
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    onClick={() =>
                      copyToClipboard("npm install @formscn/form", "install")
                    }
                  >
                    {copiedStates["install"] ? (
                      <Check
                        className="w-3.5 h-3.5 text-emerald-500"
                        strokeWidth={2}
                      />
                    ) : (
                      <Copy
                        className="w-3.5 h-3.5 text-muted-foreground"
                        strokeWidth={1.5}
                      />
                    )}
                  </Button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Right Panel Overlay */}
      <AnimatePresence>
        {isMobileRightPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileRightPanelOpen(false)}
            />
            <motion.aside
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ duration: 0.2 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] flex flex-col shrink-0 bg-background border-border/40 z-50 md:hidden"
            >
              <div className="h-14 flex items-center justify-between px-5 border-b border-border/40 shrink-0">
                <span className="text-[13px] font-medium flex items-center gap-2">
                  <Settings2
                    className="w-4 h-4 text-muted-foreground"
                    strokeWidth={1.5}
                  />
                  Properties
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileRightPanelOpen(false)}
                  className="h-8 w-8"
                >
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              <div className="p-5 space-y-8 overflow-y-auto flex-1">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="overflow-hidden">
                      <h2 className="text-[14px] font-semibold text-foreground truncate">
                        {selectedExample.name}
                      </h2>
                      <p className="text-[12px] text-muted-foreground truncate">
                        Live Interactive Demo
                      </p>
                    </div>
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-relaxed whitespace-normal">
                    {selectedExample.description}
                  </p>
                </div>

                <hr className="border-border/40" />

                <div className="space-y-3">
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                    Auto-Generated UI
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2.5 text-[13px] text-foreground">
                      <Check
                        className="w-3.5 h-3.5 text-emerald-500"
                        strokeWidth={2}
                      />
                      <span>Real-time Validation</span>
                    </li>
                    {selectedExample.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-[13px] text-foreground"
                      >
                        <Check
                          className="w-3.5 h-3.5 text-emerald-500"
                          strokeWidth={2}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 rounded-lg bg-primary/5 border border-primary/10 p-3.5 flex items-start gap-3 whitespace-normal">
                  <Sparkles
                    className="w-4 h-4 text-primary shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                  <p className="text-[12px] leading-relaxed text-foreground/80">
                    Zero boilerplate. Define your schema and FormCN handles the
                    state, validation, and accessibility.
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[260px] flex-col shrink-0 border-r border-border/40 bg-zinc-50/50 dark:bg-zinc-950/30 z-10">
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Templates
            </div>
            <nav className="space-y-0.5">
              {examples.map((example) => {
                const Icon = example.icon;
                const isSelected = selectedExample.id === example.id;

                return (
                  <button
                    key={example.id}
                    onClick={() => setSelectedExample(example)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all duration-200 outline-none",
                      isSelected
                        ? "bg-white dark:bg-zinc-900 font-medium text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                        : "text-muted-foreground hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 hover:text-foreground"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 shrink-0",
                        isSelected ? example.accent : "opacity-70"
                      )}
                      strokeWidth={1.5}
                    />
                    <span className="truncate">{example.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              Resources
            </div>
            <nav className="space-y-0.5">
              <Link
                href="/docs"
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-muted-foreground hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 hover:text-foreground transition-all duration-200"
              >
                <Library
                  className="w-4 h-4 shrink-0 opacity-70"
                  strokeWidth={1.5}
                />
                Documentation
                <ExternalLink className="w-3 h-3 ml-auto opacity-40" />
              </Link>
              <Link
                href="/editor"
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-muted-foreground hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 hover:text-foreground transition-all duration-200"
              >
                <Layers2
                  className="w-4 h-4 shrink-0 opacity-70"
                  strokeWidth={1.5}
                />
                Visual Editor
              </Link>
            </nav>
          </div>
        </div>

        <div className="p-4 mt-auto">
          <div className="group relative flex items-center justify-between bg-white dark:bg-zinc-900 rounded-lg p-2 ring-1 ring-black/5 dark:ring-white/10 shadow-sm transition-all hover:ring-black/10 dark:hover:ring-white/20">
            <code className="text-[11px] font-mono text-muted-foreground px-1 truncate flex-1">
              npm i @formscn/form
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              onClick={() =>
                copyToClipboard("npm install @formscn/form", "install")
              }
            >
              {copiedStates["install"] ? (
                <Check
                  className="w-3.5 h-3.5 text-emerald-500"
                  strokeWidth={2}
                />
              ) : (
                <Copy
                  className="w-3.5 h-3.5 text-muted-foreground"
                  strokeWidth={1.5}
                />
              )}
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="hidden md:flex h-14 border-b border-border/40 flex items-center justify-between px-4 sm:px-6 shrink-0 bg-background/80 backdrop-blur-md z-10 absolute top-0 left-0 w-full">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as any)}
            className="w-[200px]"
          >
            <TabsList className="grid w-full grid-cols-2 h-8 bg-zinc-100/80 dark:bg-zinc-900/80 p-0.5 rounded-md">
              <TabsTrigger
                value="preview"
                className="text-[12px] rounded-sm transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="text-[12px] rounded-sm transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
              >
                Code
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <PanelRight className="w-4 h-4" strokeWidth={1.5} />
          </Button>
        </header>

        <div className="flex-1 overflow-auto md:mt-14 relative bg-[#FAFAFA] dark:bg-[#0A0A0A]">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none" />

          <div className="relative w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-12 min-h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeTab === "preview" && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="w-full max-w-md mx-auto"
                >
                  <div className="">
                    <Form
                      title={selectedExample.name}
                      key={selectedExample.id}
                      schema={selectedExample.schema}
                      onSubmit={handleSubmit}
                      defaultValues={selectedExample.defaultValues}
                      className="space-y-5"
                    >
                      <div className="pt-4">
                        <Button
                          type="submit"
                          className="w-full font-medium h-10 shadow-sm"
                        >
                          Submit Application
                        </Button>
                      </div>
                    </Form>
                  </div>
                </motion.div>
              )}

              {activeTab === "code" && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="space-y-6 w-full"
                >
                  <div className="rounded-xl overflow-hidden ring-1 ring-white/10 dark:ring-white/10 shadow-2xl bg-[#0C0C0C]">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <FileCode2
                          className="w-4 h-4 text-zinc-400"
                          strokeWidth={1.5}
                        />
                        <span className="text-[13px] font-medium text-zinc-300 font-mono tracking-tight">
                          schema.ts
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          copyToClipboard(getSchemaCode(), "schema")
                        }
                        className="h-7 w-7 text-zinc-400 hover:text-white hover:bg-white/10"
                      >
                        {copiedStates["schema"] ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                    <div className="p-5 overflow-x-auto">
                      <pre
                        className="text-[13px] leading-relaxed font-mono text-zinc-400"
                        dangerouslySetInnerHTML={{
                          __html: `<span class="text-pink-400">export const</span> <span class="text-blue-400">formSchema</span> = <span class="text-blue-400">z</span>.<span class="text-yellow-300">object</span>({
${
  selectedExample.id === "contact"
    ? `
  <span class="text-zinc-200">name</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">string</span>().<span class="text-yellow-300">min</span>(<span class="text-orange-300">2</span>, <span class="text-green-300">"Name must be at least 2 characters"</span>),
  <span class="text-zinc-200">email</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">string</span>().<span class="text-yellow-300">email</span>(<span class="text-green-300">"Please enter a valid email"</span>),
  <span class="text-zinc-200">subject</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">enum</span>([<span class="text-green-300">"general"</span>, <span class="text-green-300">"support"</span>, <span class="text-green-300">"sales"</span>, <span class="text-green-300">"feedback"</span>]),
  <span class="text-zinc-200">message</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">string</span>().<span class="text-yellow-300">min</span>(<span class="text-orange-300">10</span>, <span class="text-green-300">"Message must be at least 10 characters"</span>),
  <span class="text-zinc-200">newsletter</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">boolean</span>().<span class="text-yellow-300">optional</span>(),`.trim()
    : selectedExample.id === "profile"
      ? `
  <span class="text-zinc-200">username</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">string</span>().<span class="text-yellow-300">min</span>(<span class="text-orange-300">3</span>).<span class="text-yellow-300">max</span>(<span class="text-orange-300">20</span>),
  <span class="text-zinc-200">bio</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">string</span>().<span class="text-yellow-300">max</span>(<span class="text-orange-300">500</span>).<span class="text-yellow-300">optional</span>(),
  <span class="text-zinc-200">website</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">string</span>().<span class="text-yellow-300">url</span>().<span class="text-yellow-300">optional</span>(),
  <span class="text-zinc-200">birthDate</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">date</span>().<span class="text-yellow-300">optional</span>(),`.trim()
      : `
  <span class="text-zinc-200">eventName</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">string</span>().<span class="text-yellow-300">min</span>(<span class="text-orange-300">5</span>),
  <span class="text-zinc-200">eventType</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">enum</span>([<span class="text-green-300">"conference"</span>, <span class="text-green-300">"workshop"</span>, <span class="text-green-300">"meetup"</span>, <span class="text-green-300">"webinar"</span>]),
  <span class="text-zinc-200">maxAttendees</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">number</span>().<span class="text-yellow-300">min</span>(<span class="text-orange-300">1</span>).<span class="text-yellow-300">max</span>(<span class="text-orange-300">1000</span>),
  <span class="text-zinc-200">isPublic</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">boolean</span>(),
  <span class="text-zinc-200">description</span>: <span class="text-blue-400">z</span>.<span class="text-yellow-300">string</span>().<span class="text-yellow-300">min</span>(<span class="text-orange-300">20</span>),`.trim()
}
});`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl overflow-hidden ring-1 ring-white/10 dark:ring-white/10 shadow-2xl bg-[#0C0C0C]">
                    <div className="flex items-center px-4 py-3 bg-[#161616] border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Component
                          className="w-4 h-4 text-zinc-400"
                          strokeWidth={1.5}
                        />
                        <span className="text-[13px] font-medium text-zinc-300 font-mono tracking-tight">
                          page.tsx
                        </span>
                      </div>
                    </div>
                    <div className="p-5 overflow-x-auto">
                      <pre
                        className="text-[13px] leading-relaxed font-mono text-zinc-400"
                        dangerouslySetInnerHTML={{
                          __html: `<span class="text-pink-400">import</span> <span class="text-zinc-200">{ Form }</span> <span class="text-pink-400">from</span> <span class="text-green-300">"@formscn/form"</span>;

<span class="text-pink-400">export default function</span> <span class="text-blue-400">Page</span><span class="text-zinc-200">() {</span>
  <span class="text-pink-400">return</span> (
    <span class="text-emerald-400">&lt;Form</span>
      <span class="text-blue-300">schema</span>=<span class="text-zinc-200">{formSchema}</span>
      <span class="text-blue-300">onSubmit</span>=<span class="text-zinc-200">{handleSubmit}</span>
    <span class="text-emerald-400">&gt;</span>
      <span class="text-emerald-400">&lt;Button</span> <span class="text-blue-300">type</span>=<span class="text-green-300">"submit"</span><span class="text-emerald-400">&gt;</span><span class="text-zinc-200">Submit</span><span class="text-emerald-400">&lt;/Button&gt;</span>
    <span class="text-emerald-400">&lt;/Form&gt;</span>
  );
<span class="text-zinc-200">}</span>`,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

<AnimatePresence>
        {isRightPanelOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0, borderLeftWidth: 0 }}
            animate={{ width: 280, opacity: 1, borderLeftWidth: 1 }}
            exit={{ width: 0, opacity: 0, borderLeftWidth: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="hidden md:flex flex-col shrink-0 bg-background border-border/40 overflow-hidden z-10 whitespace-nowrap"
          >
            <div className="h-14 flex items-center px-5 border-b border-border/40 shrink-0">
              <span className="text-[13px] font-medium flex items-center gap-2">
                <Settings2
                  className="w-4 h-4 text-muted-foreground"
                  strokeWidth={1.5}
                />
                Properties
              </span>
            </div>

            <div className="p-5 space-y-8 overflow-y-auto w-[280px]">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="overflow-hidden">
                    <h2 className="text-[14px] font-semibold text-foreground truncate">
                      {selectedExample.name}
                    </h2>
                    <p className="text-[12px] text-muted-foreground truncate">
                      Live Interactive Demo
                    </p>
                  </div>
                </div>
                <p className="text-[13px] text-muted-foreground leading-relaxed whitespace-normal">
                  {selectedExample.description}
                </p>
              </div>

              <hr className="border-border/40" />
            

              <div className="space-y-3">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Auto-Generated UI
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2.5 text-[13px] text-foreground">
                  <Check
                        className="w-3.5 h-3.5 text-emerald-500"
                        strokeWidth={2}
                      />
                    <span>Real-time Validation</span>
                  </li>
                  {selectedExample.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-[13px] text-foreground"
                    >
                      <Check
                        className="w-3.5 h-3.5 text-emerald-500"
                        strokeWidth={2}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 rounded-lg bg-primary/5 border border-primary/10 p-3.5 flex items-start gap-3 whitespace-normal">
                <Sparkles
                  className="w-4 h-4 text-primary shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <p className="text-[12px] leading-relaxed text-foreground/80">
                  Zero boilerplate. Define your schema and FormCN handles the
                  state, validation, and accessibility.
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
