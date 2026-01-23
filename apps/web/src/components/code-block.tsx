"use client"

import { createHighlighter, type Highlighter } from "shiki"
import { cn } from "@/lib/utils"
import { Loader2, Copy, Check } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
}

export function CodeBlock({ code, language = "tsx", className, ...props }: CodeBlockProps) {
  const [html, setHtml] = useState<string>("")
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null)
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    async function initHighlighter() {
      if (!highlighter) {
        const h = await createHighlighter({
          themes: ["github-dark", "github-light"],
          langs: ["typescript", "tsx", "bash", "json"],
        })
        setHighlighter(h)
      }
    }
    initHighlighter()
  }, [highlighter])

  useEffect(() => {
    if (highlighter && code) {
      const highlighted = highlighter.codeToHtml(code, {
        lang: language,
        theme: "github-dark",
      })
      setHtml(highlighted)
    }
  }, [code, language, highlighter])

  const onCopy = () => {
    navigator.clipboard.writeText(code)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  if (!html) {
    return (
      <div className={cn("p-4 bg-muted rounded-md border flex items-center justify-center min-h-[100px]", className)} {...props}>
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="relative group">
      <div
        className={cn("rounded-md border overflow-auto p-4 [&_pre]:my-0", className)}
        {...props}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-sm"
        onClick={onCopy}
      >
        {hasCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">Copy code</span>
      </Button>
    </div>
  )
}
