"use client";

import { type ReactNode, useDeferredValue } from "react";

import Link from "next/link";
import { ArrowLeftIcon, DownloadIcon } from "lucide-react";

import { ResumePreview } from "@/components/features/builder/resume-preview";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/stores/useBuilderStore";

type EditorLayoutProps = {
  children: ReactNode;
};

export default function BuilderEditorLayout({ children }: EditorLayoutProps) {
  const resume = useBuilderStore((s) => s.resume);
  const design = useBuilderStore((s) => s.design);
  const deferredResume = useDeferredValue(resume);

  return (
    <main className="editor-shell min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1600px] grid-cols-2">
        <section className="editor-left border-r border-slate-200 p-6">
          <div className="mb-5">
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
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">{children}</div>
        </section>
        <section className="editor-right bg-slate-100 p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Live preview · A4
            </p>
            <Button
              type="button"
              className="editor-control bg-slate-900 text-white hover:bg-slate-800"
              onClick={() => window.print()}
            >
              <DownloadIcon className="mr-2 size-4" />
              Download PDF
            </Button>
          </div>
          <div className="preview-stage h-[calc(100vh-80px)] overflow-y-auto rounded-xl border border-slate-200 bg-slate-200/60 p-4">
            <div className="preview-scaler relative mx-auto">
              <div id="resume-print-canvas" className="preview-canvas">
                <div className="preview-content absolute inset-[3px] overflow-hidden rounded-md bg-white">
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
          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }
          .editor-shell * {
            visibility: hidden !important;
          }
          .editor-left,
          .editor-control {
            display: none !important;
          }
          #resume-print-canvas,
          #resume-print-canvas * {
            visibility: visible !important;
          }
          .editor-right,
          .preview-shell,
          #resume-print-canvas {
            width: 210mm !important;
            max-width: 210mm !important;
            min-width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
          }
          #resume-print-canvas {
            height: 297mm !important;
            min-height: 297mm !important;
            transform: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 0;
          }
        }
        .preview-stage {
          container-type: size;
        }
        .preview-scaler {
          --a4-scale: min(
            1,
            calc((100cqw - 2rem) / 210mm),
            calc((100cqh - 2rem) / 297mm)
          );
          width: calc(210mm * var(--a4-scale));
          height: calc(297mm * var(--a4-scale));
        }
        .preview-canvas {
          position: absolute;
          left: 0;
          top: 0;
          width: 210mm;
          height: 297mm;
          transform: scale(var(--a4-scale));
          transform-origin: top left;
          overflow: hidden;
          border-radius: 0.6rem;
          background: white;
          box-shadow:
            0 25px 60px -20px rgba(15, 23, 42, 0.35),
            0 10px 20px -10px rgba(15, 23, 42, 0.25);
          border: 1px solid rgb(226 232 240);
        }
      `}</style>
    </main>
  );
}
