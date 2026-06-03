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
      className="group relative flex cursor-pointer flex-col rounded-sm border-2 border-[#1C1C1C] bg-[#FDFAF5] p-5 shadow-[6px_6px_0px_0px_rgba(28,28,28,0.2)] transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(28,28,28,0.25)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => router.push(`/tools/roadmap/path?id=${id}`)}
    >
      {/* Vintage map decorative corners */}
      <div className="absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-[#8B4513]" />
      <div className="absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-[#8B4513]" />
      <div className="absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-[#8B4513]" />
      <div className="absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-[#8B4513]" />

      {/* Paper texture overlay */}
      <div className="absolute inset-0 rounded-sm opacity-[0.03]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }} />

      {/* Aged paper stains */}
      <div className="absolute left-4 top-8 h-8 w-8 rounded-full bg-[#D4A574] opacity-10 blur-md" />

      {/* Header */}
      <div className="relative flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-sm border-2 border-[#1C1C1C] bg-[#3D5A40]">
          <MapIcon className="size-5 text-[#EFE9E1]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-bold text-[#1C1C1C]" style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}>
            {targetRole}
          </p>
          <p className="mt-1 font-mono text-xs text-[#5C4F3F]">
            {skills.slice(0, 3).join(", ")}
            {skills.length > 3 ? ` +${skills.length - 3} more` : ""}
          </p>
        </div>
      </div>

      {/* Decorative divider line */}
      <div className="relative my-3">
        <div className="h-px bg-[#D4C5B3]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FDFAF5] px-2">
          <div className="h-1 w-1 rotate-45 border border-[#8B4513]" />
        </div>
      </div>

      {/* Skills path preview - vintage style */}
      <div className="relative flex items-center gap-1 text-[10px] font-mono text-[#6B5944]">
        <span>→</span>
        <span>Skills</span>
        <span>→</span>
        <span>Path</span>
        <span>→</span>
        <span>Success</span>
      </div>

      {/* Footer */}
      <div className="relative mt-4 flex items-center justify-between border-t-2 border-dashed border-[#D4C5B3] pt-3">
        <p className="text-xs font-medium text-[#8B4513]">Generated {timeAgo(createdAt)}</p>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1 text-xs font-bold text-[#2F5233]"
        >
          <span>View</span>
          <ArrowRight className="size-3" />
        </motion.div>
      </div>

      {/* Action buttons - appear on hover */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
        className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Delete */}
        {showConfirm ? (
          <div className="flex items-center gap-1.5 rounded-sm border-2 border-[#1C1C1C] bg-white px-2 py-1 shadow-[2px_2px_0px_0px_rgba(28,28,28,0.25)]">
            <span className="text-xs font-bold text-[#1C1C1C]">Delete?</span>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="rounded-sm bg-[#A0522D] px-2 py-1 text-xs font-bold text-white transition hover:bg-[#8B4513] disabled:opacity-50"
            >
              {isPending ? "..." : "Yes"}
            </button>
            <button
              type="button"
              onClick={() => setShowConfirm(false)}
              className="rounded-sm border border-[#1C1C1C] bg-white px-2 py-1 text-xs font-bold text-[#1C1C1C] hover:bg-[#EFE9E1]"
            >
              No
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="flex size-8 items-center justify-center rounded-sm border-2 border-[#1C1C1C] bg-white text-[#A0522D] shadow-[2px_2px_0px_0px_rgba(28,28,28,0.25)] transition hover:bg-[#A0522D] hover:text-white"
            aria-label="Delete roadmap"
          >
            <Trash2Icon className="size-4" />
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
