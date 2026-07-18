"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PreviewToolbar } from "@/components/features/preview/PreviewToolbar";
import { ResumePreview } from "@/components/features/builder/resume-preview";
import { useBuilderStore, type BuilderTemplateId } from "@/stores/useBuilderStore";
import { getResumeById } from "@/actions/resume";

type ZoomLevel = 50 | 75 | 90 | 100 | 110 | 125 | 150;

export default function PreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const lastStep = searchParams.get("step") || "contact";

  const resume = useBuilderStore((s) => s.resume);
  const design = useBuilderStore((s) => s.design);
  const setResume = useBuilderStore((s) => s.setResume);
  const setTemplate = useBuilderStore((s) => s.setTemplate);
  const setThemeColor = useBuilderStore((s) => s.setThemeColor);

  const [zoom, setZoom] = useState<ZoomLevel>(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Load resume data from DB
  useEffect(() => {
    if (!resumeId) return;

    getResumeById(resumeId).then((row) => {
      if (!row) {
        import("sonner").then(({ toast }) => {
          toast.error("Resume not found", {
            description: "This resume doesn't exist or you don't have access to it.",
          });
        });
        router.replace("/dashboard");
        return;
      }

      if (row.template) setTemplate(row.template as BuilderTemplateId);
      if (row.themeColor) setThemeColor(row.themeColor);
      if (row.basics) {
        setResume({
          basics: row.basics as typeof resume.basics,
          skills:
            typeof row.skills === "object" && row.skills !== null
              ? (row.skills as typeof resume.skills)
              : { programming: [], frameworks: [], databases: [], cloud: [], devops: [], tools: [], softSkills: [], languages: [] },
          experience: Array.isArray(row.experience) ? (row.experience as typeof resume.experience) : [],
          education: Array.isArray(row.education) ? (row.education as typeof resume.education) : [],
          projects: Array.isArray(row.projects) ? (row.projects as typeof resume.projects) : [],
          certifications: Array.isArray(row.certifications) ? (row.certifications as typeof resume.certifications) : [],
        });
      }
    });
  }, [resumeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBack = () => {
    if (resumeId) {
      router.push(`/tools/builder/editor/${lastStep}?resumeId=${resumeId}`);
    } else {
      router.push("/tools/builder");
    }
  };

  const handleTemplateChange = (template: BuilderTemplateId) => setTemplate(template);
  const handleZoomChange = (newZoom: ZoomLevel) => setZoom(newZoom);

  const handleZoomIn = () => {
    const levels: ZoomLevel[] = [50, 75, 90, 100, 110, 125, 150];
    const i = levels.indexOf(zoom);
    if (i < levels.length - 1) setZoom(levels[i + 1]);
  };

  const handleZoomOut = () => {
    const levels: ZoomLevel[] = [50, 75, 90, 100, 110, 125, 150];
    const i = levels.indexOf(zoom);
    if (i > 0) setZoom(levels[i - 1]);
  };

  const handleDownloadPDF = () => window.print();
  const handlePrint = () => window.print();

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <>
      {/* ── Toolbar (hidden on print) ─────────────────────────────── */}
      <div className="preview-toolbar sticky top-0 z-50 print:hidden">
        <PreviewToolbar
          onBack={handleBack}
          template={design.template}
          onTemplateChange={handleTemplateChange}
          zoom={zoom}
          onZoomChange={handleZoomChange}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onDownloadPDF={handleDownloadPDF}
          onPrint={handlePrint}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
        />
      </div>

      {/* ── Preview stage (hidden on print, shown on screen) ───────── */}
      <main className="preview-main min-h-[calc(100vh-57px)] bg-slate-200 p-8 print:hidden">
        {/* Container that drives the CSS container query */}
        <div className="preview-stage mx-auto">
          {/* Scaler: shrinks 210mm canvas to fit available width */}
          <div className="preview-scaler" style={{ "--zoom": zoom / 100 } as React.CSSProperties}>
            {/* The actual A4 canvas at true 210mm width */}
            <div className="preview-canvas" id="resume-screen-canvas">
              <ResumePreview
                resume={resume}
                template={design.template}
                themeColor={design.themeColor}
              />
            </div>
          </div>
        </div>
      </main>

      {/* ── Print-only content ─────────────────────────────────────── */}
      <div className="resume-print-only hidden print:block" id="resume-print-canvas">
        <ResumePreview
          resume={resume}
          template={design.template}
          themeColor={design.themeColor}
        />
      </div>

      <style jsx global>{`
        /* ── Screen layout ─────────────────────────────────────────── */
        .preview-stage {
          container-type: inline-size;
          /* Max width = 210mm + padding so there's always breathing room */
          max-width: 900px;
        }

        .preview-scaler {
          /* Scale = (container width / 210mm) × user zoom */
          --base-scale: calc(100cqw / 210mm);
          --final-scale: calc(var(--base-scale) * var(--zoom, 1));

          /* Reserve exact space so page doesn't collapse */
          width:  calc(210mm * var(--final-scale));
          height: calc(297mm * var(--final-scale));
          position: relative;
          margin: 0 auto;
        }

        .preview-canvas {
          /* Render at true A4 size, then scale down */
          position: absolute;
          top: 0; left: 0;
          width:  210mm;
          height: 297mm;
          transform: scale(var(--final-scale));
          transform-origin: top left;
          background: white;
          overflow: hidden;
          border-radius: 4px;
          box-shadow:
            0 20px 60px -10px rgba(15,23,42,0.35),
            0 8px  20px -6px  rgba(15,23,42,0.20);
        }

        /* ── Print layout ──────────────────────────────────────────── */
        @media print {
          /* Hide everything except the resume */
          .preview-toolbar,
          .preview-main {
            display: none !important;
          }

          .resume-print-only {
            display: block !important;
            width:  210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width:  210mm !important;
            height: 297mm !important;
            background: white !important;
          }

          @page {
            size: A4 portrait;
            margin: 0;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </>
  );
}
