"use client";

import type { DragEvent } from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileUp, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAnalyzerStore } from "@/stores/useAnalyzerStore";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export default function AnalyzerDropzonePage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const setFileName = useAnalyzerStore((state) => state.setFileName);
  const setIsScanning = useAnalyzerStore((state) => state.setIsScanning);

  const handleSelectedFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) {
      return;
    }

    if (file.size > MAX_SIZE) {
      setUploadError("Max 2MB");
      return;
    }

    setUploadError("");
    setFileName(file.name);
    setIsScanning(true);
    router.push("/tools/analyzer/scanning");
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleSelectedFiles(event.dataTransfer.files);
  };

  return (
    <section className="bg-gradient-to-br from-teal-50 via-purple-50 to-slate-50">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid w-full gap-10 overflow-hidden rounded-3xl border border-white/70 bg-white/70 p-6 shadow-xl shadow-teal-900/5 backdrop-blur-xl sm:p-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <motion.div
            aria-hidden
            animate={{ x: [0, 14, 0], y: [0, -10, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-12 -top-8 h-40 w-40 rounded-full bg-teal-200/35 blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={{ x: [0, -16, 0], y: [0, 12, 0] }}
            transition={{ duration: 8.2, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -bottom-12 right-10 h-44 w-44 rounded-full bg-violet-200/35 blur-3xl"
          />
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            onChange={(event) => {
              handleSelectedFiles(event.target.files);
            }}
          />

          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.22em] text-teal-700">
              RESUME CHECKER
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Is your resume good enough?
            </h1>
            <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
              Our AI runs crucial checks that hiring systems care about, from ATS
              compatibility to readability and role relevance.
            </p>

            <motion.div
              role="button"
              tabIndex={0}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  inputRef.current?.click();
                }
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              className={`mt-8 flex min-h-72 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition-all duration-200 ${
                isDragging
                  ? "border-teal-500/60 bg-teal-50/70"
                  : "border-teal-500/30 bg-white/80 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-900/5"
              }`}
            >
              <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-white text-teal-700 shadow-md shadow-teal-900/10 ring-1 ring-teal-100">
                <FileUp className="size-7" aria-hidden />
              </div>
              <p className="mt-5 max-w-md text-sm font-medium text-slate-700">
                Drop your resume here or choose a file. PDF &amp; DOCX only. Max
                2MB file size.
              </p>
              <Button className="mt-5 h-11 rounded-xl bg-teal-600 px-6 text-sm font-semibold text-white hover:bg-teal-500">
                Upload Your Resume
              </Button>
              {uploadError ? (
                <p className="mt-2 text-center font-medium text-red-500">{uploadError}</p>
              ) : null}
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                <Lock className="size-3.5" aria-hidden />
                Privacy guaranteed
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ y: -3 }}
            transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.06, 1], opacity: [0.45, 0.65, 0.45] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-teal-200/45 blur-3xl"
            />
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.07, 1], opacity: [0.45, 0.65, 0.45] }}
              transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 bottom-8 h-44 w-44 rounded-full bg-violet-200/45 blur-3xl"
            />
            <div className="relative w-full max-w-md rounded-3xl border border-white/80 bg-white/85 p-5 shadow-xl shadow-teal-900/10 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-tight text-slate-900">
                  Resume Quality Overview
                </span>
                <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                  Score 46
                </span>
              </div>
              <div className="mt-5 space-y-3">
                <div className="h-3 w-4/5 rounded-full bg-slate-200" />
                <div className="h-3 w-full rounded-full bg-slate-100" />
                <div className="h-24 rounded-2xl bg-gradient-to-br from-teal-100 to-violet-100" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-100 p-3">
                    <div className="h-2.5 w-16 rounded-full bg-slate-300" />
                    <div className="mt-3 h-9 rounded-xl bg-slate-200" />
                  </div>
                  <div className="rounded-2xl bg-slate-100 p-3">
                    <div className="h-2.5 w-14 rounded-full bg-slate-300" />
                    <div className="mt-3 h-9 rounded-xl bg-slate-200" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
