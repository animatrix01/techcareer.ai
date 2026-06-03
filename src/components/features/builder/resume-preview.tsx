"use client";

import * as React from "react";

import { ClassicTemplate } from "@/components/features/builder/templates/ClassicTemplate";
import { ExecutiveTemplate } from "@/components/features/builder/templates/ExecutiveTemplate";
import { InnovatorTemplate } from "@/components/features/builder/templates/InnovatorTemplate";
import { MinimalistTemplate } from "@/components/features/builder/templates/MinimalistTemplate";
import { ModernTemplate } from "@/components/features/builder/templates/ModernTemplate";
import { ATSMinimalTemplate } from "@/components/features/builder/templates/ATSMinimalTemplate";
import { ATSCompactTemplate } from "@/components/features/builder/templates/ATSCompactTemplate";
import { StartupBoldTemplate } from "@/components/features/builder/templates/StartupBoldTemplate";
import { TechFocusedTemplate } from "@/components/features/builder/templates/TechFocusedTemplate";
import { CreativeSidebarTemplate } from "@/components/features/builder/templates/CreativeSidebarTemplate";
import { DesignerSplitTemplate } from "@/components/features/builder/templates/DesignerSplitTemplate";
import { ProfessionalCleanTemplate } from "@/components/features/builder/templates/ProfessionalCleanTemplate";
import { ATSElegantTemplate } from "@/components/features/builder/templates/ATSElegantTemplate";
import { GradientProTemplate } from "@/components/features/builder/templates/GradientProTemplate";
import { ExecutiveLuxeTemplate } from "@/components/features/builder/templates/ExecutiveLuxeTemplate";
import { CreativePortfolioTemplate } from "@/components/features/builder/templates/CreativePortfolioTemplate";
import { DeveloperDarkTemplate } from "@/components/features/builder/templates/DeveloperDarkTemplate";
import { FresherEdgeTemplate } from "@/components/features/builder/templates/FresherEdgeTemplate";
import { ConsultantProTemplate } from "@/components/features/builder/templates/ConsultantProTemplate";
import { FounderResumeTemplate } from "@/components/features/builder/templates/FounderResumeTemplate";
import type { BuilderTemplateId, ResumeBuilderData } from "@/stores/useBuilderStore";

export const ResumePreview = React.memo(function ResumePreview({
  resume,
  template,
  themeColor,
}: {
  resume: ResumeBuilderData;
  template: BuilderTemplateId;
  themeColor: string;
}) {
  switch (template) {
    case "classic":
      return <ClassicTemplate resume={resume} />;
    case "executive":
      return <ExecutiveTemplate resume={resume} themeColor={themeColor} />;
    case "innovator":
      return <InnovatorTemplate resume={resume} themeColor={themeColor} />;
    case "minimalist":
      return <MinimalistTemplate resume={resume} />;
    case "ats-minimal":
      return <ATSMinimalTemplate resume={resume} />;
    case "ats-compact":
      return <ATSCompactTemplate resume={resume} />;
    case "startup-bold":
      return <StartupBoldTemplate resume={resume} themeColor={themeColor} />;
    case "tech-focused":
      return <TechFocusedTemplate resume={resume} themeColor={themeColor} />;
    case "creative-sidebar":
      return <CreativeSidebarTemplate resume={resume} themeColor={themeColor} />;
    case "designer-split":
      return <DesignerSplitTemplate resume={resume} themeColor={themeColor} />;
    case "professional-clean":
      return <ProfessionalCleanTemplate resume={resume} themeColor={themeColor} />;
    case "ats-elegant":
      return <ATSElegantTemplate resume={resume} themeColor={themeColor} />;
    case "gradient-pro":
      return <GradientProTemplate resume={resume} themeColor={themeColor} />;
    case "executive-luxe":
      return <ExecutiveLuxeTemplate resume={resume} themeColor={themeColor} />;
    case "creative-portfolio":
      return <CreativePortfolioTemplate resume={resume} themeColor={themeColor} />;
    case "developer-dark":
      return <DeveloperDarkTemplate resume={resume} themeColor={themeColor} />;
    case "fresher-edge":
      return <FresherEdgeTemplate resume={resume} themeColor={themeColor} />;
    case "consultant-pro":
      return <ConsultantProTemplate resume={resume} themeColor={themeColor} />;
    case "founder-resume":
      return <FounderResumeTemplate resume={resume} themeColor={themeColor} />;
    case "modern":
    default:
      return <ModernTemplate resume={resume} themeColor={themeColor} />;
  }
});
