"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export function CreateResumeButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/tools/builder")}
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
  );
}
