
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formTemplates } from "@/lib/form-templates";
import { Footer } from "@/components/footer";
import { ArrowRight, Eye, Sparkles, Code, Box, Zap, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

// All templates array
const featuredTemplates = formTemplates

const TITLE_TEXT = `
 ███████╗ ██████╗ ██████╗ ███╗   ███╗███████╗ ██████╗███╗   ██╗
 ██╔════╝██╔═══██╗██╔══██╗████╗ ████║██╔════╝██╔════╝████╗  ██║
 █████╗  ██║   ██║██████╔╝██╔████╔██║███████╗██║     ██╔██╗ ██║
 ██╔══╝  ██║   ██║██╔══██╗██║╚██╔╝██║╚════██║██║     ██║╚██╗██║
 ██║     ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████║╚██████╗██║ ╚████║
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═══╝
`;

const categoryColors = {
  authentication: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  contact: "bg-green-500/10 text-green-500 border-green-500/20",
  ecommerce: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  survey: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  profile: "bg-pink-500/10 text-pink-500 border-pink-500/20",
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-6xl px-4 py-16 text-center">
          <pre className="overflow-x-auto font-mono text-xs mb-6 inline-block">
            {TITLE_TEXT}
          </pre>
          
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Build Forms Faster
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Pre-built form components with React Hook Form and Zod integration.
            Choose a template, customize in our visual editor, and export clean code.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href={"/editor"}>
              <Button size="lg">
                <Sparkles className="mr-2 h-4 w-4" />
                Start Building
              </Button>
            </Link>
            <Link href={"/docs"}>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Pre-built Form Templates
            </h2>
            <p className="text-muted-foreground">
              Start with a template and customize it to your needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredTemplates.map((template) => {
              const displayFields = template.steps 
                ? template.steps.flatMap(s => s.fields) 
                : template.fields;
              const isMultiStep = !!template.steps?.length;

              return (
                <Card key={template.id} className="group border p-6 flex flex-col justify-between hover:border-primary/50 transition-all duration-300 relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
                  {/* Hover Shadow Effect */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold tracking-tight">{template.name}</h3>
                        {isMultiStep && (
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                            Multi-step
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed min-h-[40px]">
                     {template.description}
                    </p>

                    <div className="mb-6">
                      <p className=" text-xs uppercase tracking-wider mb-2 font-medium text-muted-foreground/80">
                        {isMultiStep ? 'Steps & Fields:' : 'Fields included:'}
                      </p>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        {displayFields.slice(0, 3).map((field, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary/50 mr-2" />
                            {field.label}
                          </li>
                        ))}
                        {displayFields.length > 3 && (
                          <li className="text-xs text-muted-foreground/70 pl-3.5 pt-1">
                            + {displayFields.length - 3} more...
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto pt-6">
                    <Link href={`/editor?template=${template.id}` as any} className="flex-1">
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" variant="outline">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-24 bg-background border-t">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 tracking-tight uppercase">
              Everything you need
            </h2>
            <p className="text-muted-foreground text-lg">
              [ A complete toolkit for building production-ready forms in React ]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border bg-border">
            {/* Feature 1: Visual Builder - Large */}
            <div className="md:col-span-2 row-span-1 bg-background p-8 flex flex-col justify-between group border-b md:border-b-0 md:border-r">
              <div className="relative z-10">
                <div className="w-10 h-10 border flex items-center justify-center mb-6 ">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Visual Editor</h3>
                <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                  Drag, drop, and configure your form fields in real-time.
                  See exactly what your users will see as you build.
                </p>
              </div>
            </div>

            {/* Feature 2: Type Safe */}
            <div className="md:col-span-1 row-span-1 bg-background p-8 flex flex-col justify-between group border-b md:border-b-0">
              <div>
                <div className="w-10 h-10 border flex items-center justify-center mb-6">
                  <Code className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Type Safe</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Generated code includes full Zod schemas and TypeScript interfaces.
                </p>
              </div>
            </div>

            {/* Feature 3: Accessible */}
            <div className="md:col-span-1 row-span-1 bg-background p-8 flex flex-col justify-between group md:border-r border-t">
              <div>
                <div className="w-10 h-10 border flex items-center justify-center mb-6 ">
                  <Box className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Accessible</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Built on top of shadcn/ui and radix-ui for full accessibility compliance.
                </p>
              </div>
            </div>

            {/* Feature 4: Validation - Wide */}
            <div className="md:col-span-2 row-span-1 bg-background p-8 flex flex-col justify-between group border-t">
              <div className="relative z-10">
                 <div className="w-10 h-10 border flex items-center justify-center mb-6 ">
                  <Lock className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase tracking-wider">Smart Validation</h3>
                <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                  Complex validation logic made easy. Email, passwords,
                  custom rules - all handled with Zod resolvers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
