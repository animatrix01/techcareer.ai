"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "tile shadow-float",
          title: "text-ink font-medium",
          description: "text-muted-foreground",
          actionButton: "btn-primary",
          cancelButton: "btn-ghost",
          error: "border-destructive/20 bg-destructive/5",
          success: "border-mint/20 bg-mint/5",
          warning: "border-amber-500/20 bg-amber-50",
          info: "border-sky/20 bg-sky/5",
        },
      }}
    />
  );
}
