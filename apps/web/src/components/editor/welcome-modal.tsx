"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Code, Play } from "lucide-react";

interface WelcomeModalProps {
  onTryTemplate: () => void;
  onStartFromScratch: () => void;
}

export function WelcomeModal({
  onTryTemplate,
  onStartFromScratch,
}: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if this is the user's first visit
    const hasVisited = localStorage.getItem("formscn-welcome-shown");
    if (!hasVisited) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("formscn-welcome-shown", "true");
  };

  const handleTryTemplate = () => {
    handleClose();
    onTryTemplate();
  };

  const handleStartFromScratch = () => {
    handleClose();
    onStartFromScratch();
  };


  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Welcome to FormSCN</DialogTitle>
          <DialogDescription>
            The visual form builder for shadcn/ui. How would you like to get started?
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-4">
          <Button
            onClick={handleTryTemplate}
            className="w-full justify-start h-auto py-4 px-4"
            variant="outline"
          >
            <div className="flex items-start gap-3 w-full">
              <div className="p-2 bg-primary/10 rounded-md text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-sm mb-1">Try a Template</div>
                <div className="text-xs text-muted-foreground">
                  Start with a pre-built contact form template
                </div>
              </div>
            </div>
          </Button>

          <Button
            onClick={handleStartFromScratch}
            className="w-full justify-start h-auto py-4 px-4"
            variant="outline"
          >
            <div className="flex items-start gap-3 w-full">
              <div className="p-2 bg-primary/10 rounded-md text-primary">
                <Code className="h-5 w-5" />
              </div>
              <div className="text-left flex-1">
                <div className="font-semibold text-sm mb-1">Start from Scratch</div>
                <div className="text-xs text-muted-foreground">
                  Build your form from the ground up
                </div>
              </div>
            </div>
          </Button>

        </div>

        <div className="text-center">
          <button
            onClick={handleClose}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip for now
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
