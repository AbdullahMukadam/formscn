"use client"

import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function CallToAction() {
  const router = useRouter()

  return (
    <div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-y bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)] px-4 py-8">
      <PlusIcon
        className="absolute top-[-12.5px] left-[-11.5px] z-1 size-6"
        strokeWidth={1}
      />
      <PlusIcon
        className="absolute top-[-12.5px] right-[-11.5px] z-1 size-6"
        strokeWidth={1}
      />
      <PlusIcon
        className="absolute bottom-[-12.5px] left-[-11.5px] z-1 size-6"
        strokeWidth={1}
      />
      <PlusIcon
        className="absolute right-[-11.5px] bottom-[-12.5px] z-1 size-6"
        strokeWidth={1}
      />

      <div className="-inset-y-6 pointer-events-none absolute left-0 w-px border-l" />
      <div className="-inset-y-6 pointer-events-none absolute right-0 w-px border-r" />

      <div className="-z-10 absolute top-0 left-1/2 h-full border-l border-dashed" />


      <div className="space-y-1">
        <h2 className="text-center font-bold text-2xl">
        Build your next shadcn form.
        </h2>
        <p className="text-center text-muted-foreground">
        Stop copy-pasting code examples.
        Design visually, export production-ready TypeScript in seconds
        </p>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Link href={"https://github.com/AbdullahMukadam/formscn"}>
        <Button variant="outline">View Source</Button>
        </Link>
        <Button onClick={()=> router.push("/editor")}>
          Start Building <ArrowRightIcon className="size-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}