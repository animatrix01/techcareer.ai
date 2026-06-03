"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileTextIcon, PencilIcon, Trash2Icon } from "lucide-react";
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
      className="group relative flex h-full min-h-[280px] cursor-pointer flex-col items-center justify-center perspective-1000"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleEdit}
    >
      {/* Paper Roll Scroll - Vintage Style */}
      <motion.div
        className="relative w-full"
        animate={{
          rotateX: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Top wooden rod */}
        <div className="relative mx-auto mb-2 h-4 w-3/4">
          <div className="absolute inset-0 rounded-full border-2 border-[#1C1C1C] bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] shadow-md" />
          {/* Wood grain texture */}
          <div className="absolute inset-0 rounded-full opacity-20" style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)"
          }} />
          {/* End caps */}
          <div className="absolute -left-2 top-1/2 h-6 w-4 -translate-y-1/2 rounded-full border-2 border-[#1C1C1C] bg-[#6B5944]" />
          <div className="absolute -right-2 top-1/2 h-6 w-4 -translate-y-1/2 rounded-full border-2 border-[#1C1C1C] bg-[#6B5944]" />
        </div>

        {/* Rolled paper - unrolls on hover */}
        <motion.div
          className="relative mx-auto w-3/4 origin-top overflow-hidden rounded-sm border-2 border-[#1C1C1C] bg-[#FDFAF5] shadow-[6px_6px_0px_0px_rgba(28,28,28,0.2)]"
          animate={{
            height: isHovered ? "240px" : "80px",
          }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }} />
          
          {/* Aged paper stains */}
          <div className="absolute right-4 top-6 h-12 w-12 rounded-full bg-[#D4C5B3] opacity-10 blur-md" />
          <div className="absolute left-6 bottom-8 h-16 w-16 rounded-full bg-[#D4C5B3] opacity-10 blur-lg" />

          {/* Paper content */}
          <div className="relative p-6">
            {/* Wax seal or stamp */}
            <div className="absolute -right-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#1C1C1C] bg-[#A0522D] shadow-md">
              <FileTextIcon className="size-6 text-[#EFE9E1]" />
            </div>

            {/* Resume title - vintage handwritten style */}
            <div className="mb-3 border-b-2 border-[#1C1C1C] pb-2">
              <p className="text-lg font-bold text-[#1C1C1C]" style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}>
                {title}
              </p>
            </div>

            {/* Basics preview - typewriter style */}
            <div className="space-y-1.5 font-mono text-xs text-[#1C1C1C]">
              {basics?.fullName && (
                <p className="font-bold uppercase tracking-wide">{basics.fullName}</p>
              )}
              {basics?.jobTitle && (
                <p className="text-[#5C4F3F]">{basics.jobTitle}</p>
              )}
              {basics?.email && (
                <p className="text-[#6B5944]">{basics.email}</p>
              )}
              <p className="text-[10px] capitalize text-[#8B4513]">
                {template ?? "modern"} template
              </p>
            </div>

            {/* Additional content that appears on hover */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-4 space-y-2"
            >
              <div className="h-px bg-[#D4C5B3]" />
              <p className="text-[10px] font-medium text-[#6B5944]">
                Last updated: {timeAgo(updatedAt)}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-[#5C4F3F]">
                <span className="inline-block h-2 w-2 rounded-full border border-[#1C1C1C]" style={{ backgroundColor: themeColor ?? "#1a2e35" }} />
                Theme color
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom wooden rod */}
        <div className="relative mx-auto mt-2 h-4 w-3/4">
          <div className="absolute inset-0 rounded-full border-2 border-[#1C1C1C] bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] shadow-md" />
          {/* Wood grain texture */}
          <div className="absolute inset-0 rounded-full opacity-20" style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)"
          }} />
          {/* End caps */}
          <div className="absolute -left-2 top-1/2 h-6 w-4 -translate-y-1/2 rounded-full border-2 border-[#1C1C1C] bg-[#6B5944]" />
          <div className="absolute -right-2 top-1/2 h-6 w-4 -translate-y-1/2 rounded-full border-2 border-[#1C1C1C] bg-[#6B5944]" />
        </div>

        {/* Hanging string/ribbon */}
        <div className="absolute -top-8 left-1/2 h-8 w-1 -translate-x-1/2 bg-[#8B4513] opacity-60" />
      </motion.div>

      {/* Action buttons - appear on hover */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
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
          <>
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="flex size-8 items-center justify-center rounded-sm border-2 border-[#1C1C1C] bg-white text-[#A0522D] transition hover:bg-[#A0522D] hover:text-white"
              aria-label="Delete resume"
            >
              <Trash2Icon className="size-4" />
            </button>

            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center gap-1.5 rounded-sm border-2 border-[#1C1C1C] bg-[#2F5233] px-3 py-1.5 text-xs font-bold text-[#EFE9E1] shadow-[4px_4px_0px_0px_rgba(28,28,28,0.25)] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_rgba(28,28,28,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <PencilIcon className="size-3" />
              Edit
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
