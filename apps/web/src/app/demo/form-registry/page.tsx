"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {Form} from "form-registry"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Code,
  ChevronRight,
  Play,
  Package,
  FileText,
  User,
  Calendar,
  Shield,
  Copy,
  Check,
  Info,
  Terminal,
  ExternalLink,
  Zap,
  CheckCircle2,
  AlertCircle,
  Layers,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ============================================================================
// Demo Schemas
// ============================================================================

const examples = [
  {
    id: "contact",
    name: "Contact Form",
    description: "Text, email, select, textarea, checkbox",
    icon: FileText,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
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
    features: ["Email validation", "Enum select", "Optional checkbox"],
  },
  {
    id: "profile",
    name: "User Profile",
    description: "Optional fields, date picker, URL validation",
    icon: User,
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
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
    features: ["Date picker", "URL validation", "Character limits"],
  },
  {
    id: "event",
    name: "Event Form",
    description: "Numbers, booleans, enums, textarea",
    icon: Calendar,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
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
    features: ["Number input", "Boolean toggle", "Enum select"],
  },
  {
    id: "auth",
    name: "Login Form",
    description: "Email, password, checkbox",
    icon: Shield,
    color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    schema: z.object({
      email: z.string().email("Invalid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      rememberMe: z.boolean().optional(),
    }),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    features: ["Email validation", "Password min length", "Remember me"],
  },
];

// ============================================================================
// Main Demo Component
// ============================================================================

export default function FormRegistryDemo() {
  const [selectedExample, setSelectedExample] = useState(examples[0]);
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "about">("preview");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    toast.success("Form submitted successfully!", {
      description: "Check the console for the form data.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard");
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
      auth: `z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
})`,
    };
    return fields[selectedExample.id];
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden bg-background">
      {/* Left Sidebar */}
      <aside className="w-80 border-r bg-muted/30 flex flex-col shrink-0">
        {/* Header */}
        <div className="h-16 border-b flex items-center px-4 bg-background shrink-0 gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Demo Playground</p>
          </div>
        </div>

        {/* Examples */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Example Forms
            </p>
            <div className="space-y-1">
              {examples.map((example) => {
                const Icon = example.icon;
                const isSelected = selectedExample.id === example.id;

                return (
                  <button
                    key={example.id}
                    onClick={() => setSelectedExample(example)}
                    className={cn(
                      "w-full flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-all group",
                      isSelected
                        ? "bg-primary/5 border border-primary/20"
                        : "hover:bg-muted border border-transparent"
                    )}
                  >

                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "font-medium text-sm truncate",
                        isSelected && "text-primary"
                      )}>
                        {example.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {example.description}
                      </p>
                    </div>
                    {isSelected && (
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-1.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <Separator className="mx-4" />

          {/* Features */}
          <div className="p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Features Demo'd
            </p>
            <div className="space-y-1.5">
              {selectedExample.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="mx-4" />

          {/* Install */}
          <div className="p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Quick Install
            </p>
            <div className="flex items-center gap-2 bg-muted rounded-lg p-2.5 border">
              <code className="text-xs flex-1 text-muted-foreground font-mono">
                npm i form-registry
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0"
                onClick={() => copyToClipboard("npm install form-registry")}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            </div>
          </div>

          <Separator className="mx-4" />

          {/* Links */}
          <div className="p-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Resources
            </p>
            <div className="space-y-1">
              <Link
                href="/docs"
                className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Documentation
              </Link>
              <Link
                href="/editor"
                className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
              >
                <Layers className="w-3.5 h-3.5" />
                Visual Editor
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6 bg-background shrink-0">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="font-semibold">{selectedExample.name}</h1>
              <p className="text-xs text-muted-foreground">{selectedExample.description}</p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="bg-muted h-9">
              <TabsTrigger value="preview" className="gap-2 text-xs px-4 h-8">
                <Eye className="h-3.5 w-3.5" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="gap-2 text-xs px-4 h-8">
                <Code className="h-3.5 w-3.5" />
                Code
              </TabsTrigger>
              <TabsTrigger value="about" className="gap-2 text-xs px-4 h-8">
                <Info className="h-3.5 w-3.5" />
                About
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </header>

        {/* Workspace */}
        <div className="flex-1 overflow-auto bg-muted/20">
          <AnimatePresence mode="wait">
            {/* Preview */}
            {activeTab === "preview" && (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8"
              >
                <div className="max-w-xl mx-auto">
                  <Form
                    key={selectedExample.id}
                    schema={selectedExample.schema}
                    onSubmit={handleSubmit}
                    defaultValues={selectedExample.defaultValues}
                    className="space-y-4"
                    title={selectedExample.name}
                    description="Fill out this form to test validation. Errors appear automatically"
                  >
                    <Button type="submit" className="w-full h-10">
                      Submit Form
                    </Button>
                  </Form>

                  {/* Field Types */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { icon: AlertCircle, label: "Auto Validation", desc: "On blur & submit" },
                      { icon: Zap, label: "Instant Feedback", desc: "Real-time errors" },
                      { icon: CheckCircle2, label: "Type Safe", desc: "Full TypeScript" },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-muted/50 border text-center">
                        <item.icon className="w-4 h-4 mx-auto text-muted-foreground mb-1.5" />
                        <p className="text-xs font-medium">{item.label}</p>
                        <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Code */}
            {activeTab === "code" && (
              <motion.div
                key="code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8"
              >
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Schema */}
                  <div className="rounded-xl border bg-card overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                          <Terminal className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Schema Definition</span>
                        <Badge variant="secondary" className="text-[10px] h-5">Zod v4</Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(getSchemaCode())}
                        className="h-8"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                        Copy
                      </Button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                      <code className="text-muted-foreground">{`const schema = `}<span className="text-foreground">{getSchemaCode()}</span>{`;`}</code>
                    </pre>
                  </div>

                  {/* Usage */}
                  <div className="rounded-xl border bg-card overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/30">
                      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                        <Code className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">Component Usage</span>
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                      <code className="text-muted-foreground">{`import { Form } from "@formscn/form-registry";
import { Button } from "@/components/ui/button";

export default function Page() {
  const handleSubmit = (data) => {
    console.log(data); // Fully typed!
  };

  return (
    `}<span className="text-foreground">{`<Form schema={schema} onSubmit={handleSubmit}>`}</span>{`
      <Button type="submit">Submit</Button>
    `}<span className="text-foreground">{`</Form>`}</span>{`
  );
}`}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}

            {/* About */}
            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8"
              >
                <div className="max-w-2xl mx-auto space-y-6">
                  <Card>
                    <CardHeader className="border-b bg-muted/30">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package className="w-4 h-4 text-primary" />
                        </div>
                        What is Form Registry?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Form Registry is a React package that automatically generates fully-functional
                        forms from Zod schemas. Define your data structure once, get a complete form
                        with validation, error handling, and shadcn/ui styling automatically.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: Zap, text: "Zero form boilerplate" },
                          { icon: CheckCircle2, text: "Automatic validation" },
                          { icon: Sparkles, text: "shadcn/ui components" },
                          { icon: Terminal, text: "Full TypeScript support" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-sm p-2.5 rounded-lg bg-muted/50">
                            <item.icon className="w-4 h-4 text-primary shrink-0" />
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="border-b bg-muted/30">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Layers className="w-4 h-4 text-primary" />
                        </div>
                        How it Works
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {[
                          { step: "1", title: "Define Schema", desc: "Create a Zod schema describing your data structure and validation rules" },
                          { step: "2", title: "Use Form Component", desc: "Pass the schema to the Form component - it handles the rest" },
                          { step: "3", title: "Get Typed Data", desc: "Receive fully validated, type-safe data in your onSubmit handler" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold shrink-0">
                              {item.step}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{item.title}</p>
                              <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
