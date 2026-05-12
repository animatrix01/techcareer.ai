"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { createNewResume } from "@/actions/resume";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function CreateResumeButton() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreate = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Please enter a resume title.");
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const resumeId = await createNewResume(trimmedTitle);
        setOpen(false);
        router.push(`/dashboard/resume/${resumeId}`);
      } catch {
        setError("Could not create resume. Please try again.");
      }
    });
  };

  const handleDialogOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setTitle("");
      setError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          aria-label="Create New Resume"
        >
          <Card className="h-full border-2 border-dashed border-slate-300 bg-white transition-all duration-200 hover:border-slate-400 hover:shadow-md">
            <CardContent className="flex min-h-[220px] flex-col items-center justify-center gap-4">
              <span className="flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors group-hover:bg-slate-200">
                <Plus className="size-9" aria-hidden />
              </span>
              <p className="text-lg font-semibold text-slate-900">
                Create New Resume
              </p>
            </CardContent>
          </Card>
        </button>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-900">Name your new resume</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Frontend Engineer Resume"
            className="border-slate-300 text-slate-900 placeholder:text-slate-500"
            disabled={isPending}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleCreate();
              }
            }}
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>

        <DialogFooter className="bg-slate-50">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleCreate} disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
