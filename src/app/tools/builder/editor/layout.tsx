"use client";

import { type ReactNode, useDeferredValue, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeftIcon, CheckIcon, SaveIcon } from "lucide-react";

import { ResumePreview } from "@/components/features/builder/resume-preview";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/stores/useBuilderStore";
import { saveBuilderResume, getResumeById } from "@/actions/resume";

type EditorLayoutProps = {
  children: ReactNode;
};

export default function BuilderEditorLayout({ children }: EditorLayoutProps) {
  const resume = useBuilderStore((s) => s.resume);
  const design = useBuilderStore((s) => s.design);
  const setResume = useBuilderStore((s) => s.setResume);
  const setTemplate = useBuilderStore((s) => s.setTemplate);
  const setThemeColor = useBuilderStore((s) => s.setThemeColor);
  const deferredResume = useDeferredValue(resume);

  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [isPending, startTransition] = useTransition();

  // Hydrate store from DB when resumeId is in URL
  useEffect(() => {
    if (!resumeId) return;
    getResumeById(resumeId).then((row) => {
      if (!row) return;
      // Restore template + themeColor from DB (always correct source of truth)
      if (row.template) setTemplate(row.template as typeof design.template);
      if (row.themeColor) setThemeColor(row.themeColor);
      // Restore resume content only if the store is empty (reopen flow, not fresh creation)
      const isStoreEmpty =
        !resume.basics.fullName &&
        !resume.basics.email &&
        resume.experience.length === 0;
      if (isStoreEmpty && row.basics) {
        setResume({
          basics: row.basics as typeof resume.basics,
          skills: typeof row.skills === "string" ? row.skills : "",
          experience: Array.isArray(row.experience) ? row.experience as typeof resume.experience : [],
          education: Array.isArray(row.education) ? row.education as typeof resume.education : [],
          projects: [],
        });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeId]);

  const handleSave = () => {
    if (!resumeId) return;
    setSaveStatus("saving");
    startTransition(async () => {
      try {
        await saveBuilderResume({
          resumeId,
          title: resume.basics.fullName || "Untitled Resume",
          resume,
          template: design.template,
          themeColor: design.themeColor,
        });
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2500);
      } catch {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    });
  };

  return (
    <main className="editor-shell min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1600px] grid-cols-2">
        <section className="editor-left border-r border-slate-200 p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <Button
              asChild
              variant="outline"
              className="editor-control border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
            >
              <Link href="/tools/builder/templates">
                <ArrowLeftIcon className="mr-2 size-4" />
                Back to Gallery
              </Link>
            </Button>

            {resumeId && (
              <Button
                type="button"
                onClick={handleSave}
                disabled={isPending || saveStatus === "saving"}
                className={
                  saveStatus === "saved"
                    ? "bg-emerald-600 text-white hover:bg-emerald-500"
                    : saveStatus === "error"
                    ? "bg-rose-600 text-white hover:bg-rose-500"
                    : "bg-slate-900 text-white hover:bg-slate-700"
                }
              >
                {saveStatus === "saving" ? (
                  <>
                    <SaveIcon className="mr-2 size-4 animate-pulse" />
                    Saving...
                  </>
                ) : saveStatus === "saved" ? (
                  <>
                    <CheckIcon className="mr-2 size-4" />
                    Saved!
                  </>
                ) : saveStatus === "error" ? (
                  "Save failed"
                ) : (
                  <>
                    <SaveIcon className="mr-2 size-4" />
                    Save Resume
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">{children}</div>
        </section>

        <section className="editor-right bg-slate-100 p-6">
          <div className="mb-3 flex items-center justify-between print:hidden">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Live preview · A4
            </p>
          </div>
          <div className="preview-stage h-[calc(100vh-130px)] overflow-y-auto rounded-xl border border-slate-200 bg-slate-200/60 p-3">
            <div className="preview-scaler">
              <div id="resume-print-canvas" className="preview-canvas">
                <div className="preview-content absolute inset-0 overflow-hidden rounded-md bg-white">
                  <ResumePreview
                    resume={deferredResume}
                    template={design.template}
                    themeColor={design.themeColor}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <style jsx global>{`
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            overflow: hidden !important;
            background: #ffffff !important;
          }
          nav, header, footer,
          [role="navigation"],
          [role="banner"],
          [role="contentinfo"],
          .print\\:hidden {
            display: none !important;
          }
          .editor-left { display: none !important; }
          .editor-right {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 210mm !important; height: 297mm !important;
            padding: 0 !important; margin: 0 !important;
            background: white !important;
          }
          .preview-stage {
            height: 297mm !important; padding: 0 !important;
            margin: 0 !important; background: white !important;
            border: none !important; border-radius: 0 !important;
            overflow: visible !important;
          }
          .preview-scaler { width: 210mm !important; height: 297mm !important; position: static !important; }
          .preview-canvas {
            position: static !important;
            width: 210mm !important; height: 297mm !important;
            transform: none !important; border: none !important;
            box-shadow: none !important; border-radius: 0 !important;
            overflow: visible !important;
          }
          .preview-content {
            position: static !important; inset: auto !important;
            border-radius: 0 !important; width: 100% !important;
            height: 100% !important; overflow: visible !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          @page { size: A4 portrait; margin: 0; }
        }
        .preview-stage { container-type: inline-size; }
        .preview-scaler {
          --a4-scale: calc((100cqw - 2rem) / 210mm);
          width: calc(210mm * var(--a4-scale));
          height: calc(297mm * var(--a4-scale));
          position: relative;
          margin: 0 auto;
        }
        .preview-canvas {
          position: absolute; left: 0; top: 0;
          width: 210mm; height: 297mm;
          transform: scale(var(--a4-scale));
          transform-origin: top left;
          overflow: hidden; border-radius: 0.6rem; background: white;
          box-shadow: 0 25px 60px -20px rgba(15,23,42,0.35), 0 10px 20px -10px rgba(15,23,42,0.25);
          border: 1px solid rgb(226 232 240);
        }
      `}</style>
    </main>
  );
}
