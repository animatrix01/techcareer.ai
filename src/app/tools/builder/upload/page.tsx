"use client";

import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function BuilderUploadPage() {
  const router = useRouter();
  const timeoutsRef = useRef<number[]>([]);

  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanText, setScanText] = useState("Reading document structure...");

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, []);

  const startScanning = () => {
    if (isScanning) return;

    clearAllTimeouts();
    setIsScanning(true);
    setScanText("Reading document structure...");

    timeoutsRef.current.push(
      window.setTimeout(() => {
        setScanText("Extracting work experience & metrics...");
      }, 1500),
      window.setTimeout(() => {
        setScanText("Mapping skills to ATS standards...");
      }, 3000),
      window.setTimeout(() => {
        setScanText("Formatting for perfect layout...");
      }, 4500),
      window.setTimeout(() => {
        router.push("/tools/builder/verify");
      }, 5500)
    );
  };

  const handleFilePicked = (pickedFile: File | null) => {
    if (!pickedFile) return;
    setFile(pickedFile);
    startScanning();
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0] ?? null;
    handleFilePicked(droppedFile);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const selectedFile = event.target.files?.[0] ?? null;
    handleFilePicked(selectedFile);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[78vh] w-full max-w-5xl items-center justify-center">
        {!isScanning ? (
          <div
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
            className="w-full max-w-3xl rounded-3xl border-2 border-dashed border-indigo-200 bg-white/80 p-10 text-center shadow-[0_25px_70px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-14"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
              <UploadCloud className="h-8 w-8" />
            </div>

            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Drop your existing resume here
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">
              We will extract and upgrade your data using AI.
            </p>

            <input
              id="resume-upload-input"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleInputChange}
            />
            <label
              htmlFor="resume-upload-input"
              className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Choose PDF Resume
            </label>

            {file && (
              <p className="mt-4 text-xs text-slate-500">
                Selected: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>
        ) : (
          <div className="w-full max-w-3xl rounded-3xl bg-white/80 p-8 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-10">
            <div className="relative mx-auto h-[440px] w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="h-full rounded-xl bg-white p-6 shadow-sm">
                <div className="space-y-3">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-11/12 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-10/12 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-9/12 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="mt-8 space-y-3">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-11/12 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-10/12 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-8/12 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="mt-8 space-y-3">
                  <div className="h-3 w-1/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-10/12 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-9/12 animate-pulse rounded bg-slate-200" />
                </div>
              </div>

              <motion.div
                className="pointer-events-none absolute left-0 right-0 top-0 h-1.5 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                animate={{ y: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <p className="mt-6 text-center text-sm font-medium text-slate-700 sm:text-base">
              {scanText}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
