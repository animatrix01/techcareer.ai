"use client";

import { useEffect, useRef, useState } from "react";
import type { BuilderTemplateId, ResumeBuilderData } from "@/stores/useBuilderStore";

// Template Components
import { ModernTemplate } from "@/components/features/builder/templates/ModernTemplate";
import { ClassicTemplate } from "@/components/features/builder/templates/ClassicTemplate";
import { ExecutiveTemplate } from "@/components/features/builder/templates/ExecutiveTemplate";
import { InnovatorTemplate } from "@/components/features/builder/templates/InnovatorTemplate";
import { MinimalistTemplate } from "@/components/features/builder/templates/MinimalistTemplate";
import { ATSMinimalTemplate } from "@/components/features/builder/templates/ATSMinimalTemplate";
import { ATSCompactTemplate } from "@/components/features/builder/templates/ATSCompactTemplate";
import { StartupBoldTemplate } from "@/components/features/builder/templates/StartupBoldTemplate";
import { CreativeSidebarTemplate } from "@/components/features/builder/templates/CreativeSidebarTemplate";
import { ProfessionalCleanTemplate } from "@/components/features/builder/templates/ProfessionalCleanTemplate";
import { TechFocusedTemplate } from "@/components/features/builder/templates/TechFocusedTemplate";
import { DesignerSplitTemplate } from "@/components/features/builder/templates/DesignerSplitTemplate";
import { ATSElegantTemplate } from "@/components/features/builder/templates/ATSElegantTemplate";
import { GradientProTemplate } from "@/components/features/builder/templates/GradientProTemplate";
import { ExecutiveLuxeTemplate } from "@/components/features/builder/templates/ExecutiveLuxeTemplate";
import { CreativePortfolioTemplate } from "@/components/features/builder/templates/CreativePortfolioTemplate";
import { DeveloperDarkTemplate } from "@/components/features/builder/templates/DeveloperDarkTemplate";
import { FresherEdgeTemplate } from "@/components/features/builder/templates/FresherEdgeTemplate";
import { ConsultantProTemplate } from "@/components/features/builder/templates/ConsultantProTemplate";
import { FounderResumeTemplate } from "@/components/features/builder/templates/FounderResumeTemplate";

const templateComponents = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  executive: ExecutiveTemplate,
  innovator: InnovatorTemplate,
  minimalist: MinimalistTemplate,
  "ats-minimal": ATSMinimalTemplate,
  "ats-compact": ATSCompactTemplate,
  "startup-bold": StartupBoldTemplate,
  "creative-sidebar": CreativeSidebarTemplate,
  "professional-clean": ProfessionalCleanTemplate,
  "tech-focused": TechFocusedTemplate,
  "designer-split": DesignerSplitTemplate,
  "ats-elegant": ATSElegantTemplate,
  "gradient-pro": GradientProTemplate,
  "executive-luxe": ExecutiveLuxeTemplate,
  "creative-portfolio": CreativePortfolioTemplate,
  "developer-dark": DeveloperDarkTemplate,
  "fresher-edge": FresherEdgeTemplate,
  "consultant-pro": ConsultantProTemplate,
  "founder-resume": FounderResumeTemplate,
} as const;

type ZoomLevel = 50 | 75 | 90 | 100 | 110 | 125 | 150 | "fit-width" | "fit-page";

interface ResumeRendererProps {
  resume: ResumeBuilderData;
  template: BuilderTemplateId;
  themeColor: string;
  zoom: ZoomLevel;
}

export function ResumeRenderer({
  resume,
  template,
  themeColor,
  zoom,
}: ResumeRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [calculatedZoom, setCalculatedZoom] = useState(100);
  const [containerHeight, setContainerHeight] = useState(0);

  // A4 dimensions in pixels (96 DPI)
  const A4_WIDTH = 794; // 210mm
  const A4_HEIGHT = 1123; // 297mm

  // Calculate zoom based on container size
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const viewportHeight = window.innerHeight - 120; // Account for toolbar

    let newZoom = 100;

    if (zoom === "fit-width") {
      newZoom = (containerWidth / A4_WIDTH) * 100;
    } else if (zoom === "fit-page") {
      const widthRatio = containerWidth / A4_WIDTH;
      const heightRatio = viewportHeight / A4_HEIGHT;
      newZoom = Math.min(widthRatio, heightRatio) * 100;
    } else {
      newZoom = zoom as number;
    }

    // Clamp zoom between 25% and 200%
    newZoom = Math.max(25, Math.min(200, newZoom));
    setCalculatedZoom(newZoom);

    // Calculate container height based on zoom
    const scaledHeight = (A4_HEIGHT * newZoom) / 100;
    setContainerHeight(scaledHeight);
  }, [zoom, A4_WIDTH, A4_HEIGHT]);

  // Get template component
  const TemplateComponent = templateComponents[template];
  if (!TemplateComponent) {
    return (
      <div className="text-red-500 p-8">
        Template &ldquo;{template}&rdquo; not found
      </div>
    );
  }

  // Calculate scale factor
  const scaleFactor = calculatedZoom / 100;

  return (
    <div 
      ref={containerRef}
      className="flex justify-center items-start"
      style={{
        minHeight: `${containerHeight + 64}px`, // Add padding
      }}
    >
      {/* Paper Container */}
      <div
        className="relative bg-white shadow-2xl transition-transform duration-200 print:shadow-none print:scale-100"
        style={{
          width: `${A4_WIDTH}px`,
          minHeight: `${A4_HEIGHT}px`,
          transform: `scale(${scaleFactor})`,
          transformOrigin: "top center",
          borderRadius: "8px",
          // Ensure crisp rendering at all zoom levels
          imageRendering: "crisp-edges",
        }}
      >
        {/* Resume Content */}
        <div 
          className="w-full h-full overflow-hidden rounded-lg print:rounded-none resume-print-content"
          data-resume-content
        >
          <TemplateComponent
            resume={resume}
            themeColor={themeColor}
          />
        </div>

        {/* Page Break Indicators (for multi-page resumes) */}
        <div 
          className="absolute left-0 right-0 border-t border-dashed border-slate-300 print:hidden"
          style={{ top: `${A4_HEIGHT}px` }}
        />
      </div>
    </div>
  );
}