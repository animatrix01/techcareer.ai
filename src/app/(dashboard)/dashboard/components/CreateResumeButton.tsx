"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateResumeButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push("/tools/builder")}
      className="group tile h-full min-h-[220px] flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo focus-visible:ring-offset-2"
      aria-label="Create New Resume"
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-indigo/10 text-indigo transition-all duration-300 group-hover:bg-indigo/15 group-hover:scale-110">
        <Plus className="size-9" aria-hidden />
      </span>
      <p className="text-base font-semibold text-ink">
        Create New Resume
      </p>
    </button>
  );
}
