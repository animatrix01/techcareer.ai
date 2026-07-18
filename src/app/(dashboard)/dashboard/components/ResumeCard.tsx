"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileTextIcon, Trash2Icon } from "lucide-react";
import { motion } from "framer-motion";

import { deleteResume } from "@/actions/resume";

type ResumeCardProps = {
  resumeId: string;
  title: string;
  template: string | null;
  themeColor: string | null;
  basics: {
    jobTitle?: string;
    email?: string;
    fullName?: string;
  } | null;
  updatedAt: Date | string | null;
};

function timeAgo(date: Date | string | null): string {
  if (!date) return "Never";
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ResumeCard({
  resumeId,
  title,
  template,
  themeColor,
  basics,
  updatedAt,
}: ResumeCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = () => {
    router.push(`/tools/builder/editor/contact?resumeId=${resumeId}`);
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteResume(resumeId);
      router.refresh();
    });
  };

  return (
    <motion.div
      className="group relative tile h-full min-h-[220px] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-float"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleEdit}
    >
      <div className="flex h-full flex-col p-6">
        {/* Header with icon */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-indigo/10">
            <FileTextIcon className="size-6 text-indigo" />
          </div>
          <div
            className="size-3 shrink-0 rounded-full border border-border"
            style={{ backgroundColor: themeColor ?? "#6366f1" }}
            title="Theme color"
          />
        </div>

        {/* Content */}
        <div className="mt-4 flex-1">
          <h3 className="font-serif text-lg font-semibold text-ink line-clamp-1">
            {title}
          </h3>
          
          {basics?.fullName && (
            <p className="mt-2 text-sm font-medium text-ink/80">{basics.fullName}</p>
          )}
          {basics?.jobTitle && (
            <p className="mt-1 text-xs text-muted-foreground">{basics.jobTitle}</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
          <div className="text-xs text-muted-foreground">
            <p className="capitalize">{template ?? "modern"} template</p>
            <p className="mt-0.5">{timeAgo(updatedAt)}</p>
          </div>

          {/* Action button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {showConfirm ? (
              <div className="flex items-center gap-1.5 rounded-lg bg-paper/95 backdrop-blur-sm px-2 py-1.5 border border-border shadow-soft">
                <span className="text-xs font-medium text-ink">Delete?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isPending}
                  className="rounded-md bg-coral/80 px-2 py-1 text-xs font-semibold text-paper transition hover:bg-coral disabled:opacity-50"
                >
                  {isPending ? "..." : "Yes"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirm(false)}
                  className="rounded-md border border-border bg-paper px-2 py-1 text-xs font-semibold text-ink hover:bg-muted"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-paper/80 backdrop-blur-sm text-coral transition hover:bg-coral hover:text-paper hover:border-coral"
                aria-label="Delete resume"
              >
                <Trash2Icon className="size-4" />
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
