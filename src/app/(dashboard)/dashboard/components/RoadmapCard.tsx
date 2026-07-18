"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MapIcon, Trash2Icon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { deleteRoadmap } from "@/actions/roadmap";

type RoadmapCardProps = {
  id: string;
  targetRole: string;
  currentSkills: string[] | unknown;
  createdAt: Date | string | null;
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

export function RoadmapCard({ id, targetRole, currentSkills, createdAt }: RoadmapCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const skills = Array.isArray(currentSkills) ? currentSkills as string[] : [];

  const handleDelete = () => {
    startTransition(async () => {
      await deleteRoadmap(id);
      router.refresh();
    });
  };

  return (
    <motion.div
      className="group relative tile cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-float"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => router.push(`/tools/roadmap/path?id=${id}`)}
    >
      <div className="flex flex-col p-6">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal/10">
            <MapIcon className="size-6 text-teal" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-base font-semibold text-ink line-clamp-1">
              {targetRole}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
              {skills.slice(0, 3).join(", ")}
              {skills.length > 3 ? ` +${skills.length - 3}` : ""}
            </p>
          </div>
        </div>

        {/* Skills visualization */}
        <div className="mt-4 flex items-center gap-1.5">
          {skills.slice(0, 4).map((skill, i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-teal/80 to-mint/80"
              style={{ opacity: 1 - i * 0.15 }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-4">
          <p className="text-xs text-muted-foreground">
            {timeAgo(createdAt)}
          </p>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 text-xs font-semibold text-teal"
          >
            <span>View</span>
            <ArrowRight className="size-3" />
          </motion.div>
        </div>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          className="absolute -top-2 -right-2 z-10"
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
              className="flex size-8 items-center justify-center rounded-lg border border-border bg-paper/80 backdrop-blur-sm text-coral transition hover:bg-coral hover:text-paper hover:border-coral shadow-soft"
              aria-label="Delete roadmap"
            >
              <Trash2Icon className="size-4" />
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
