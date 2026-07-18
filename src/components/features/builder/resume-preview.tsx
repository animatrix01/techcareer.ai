"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import type { BuilderTemplateId, ResumeBuilderData } from "@/stores/useBuilderStore";

const Skeleton = () => <div className="h-full w-full animate-pulse bg-slate-100" />;

// next/dynamic requires options to be an inline object literal (not a variable)
const ModernTemplate          = dynamic(() => import("./templates/ModernTemplate").then(m => ({ default: m.ModernTemplate })), { loading: Skeleton, ssr: false });
const ClassicTemplate         = dynamic(() => import("./templates/ClassicTemplate").then(m => ({ default: m.ClassicTemplate })), { loading: Skeleton, ssr: false });
const ExecutiveTemplate       = dynamic(() => import("./templates/ExecutiveTemplate").then(m => ({ default: m.ExecutiveTemplate })), { loading: Skeleton, ssr: false });
const InnovatorTemplate       = dynamic(() => import("./templates/InnovatorTemplate").then(m => ({ default: m.InnovatorTemplate })), { loading: Skeleton, ssr: false });
const MinimalistTemplate      = dynamic(() => import("./templates/MinimalistTemplate").then(m => ({ default: m.MinimalistTemplate })), { loading: Skeleton, ssr: false });
const ATSMinimalTemplate      = dynamic(() => import("./templates/ATSMinimalTemplate").then(m => ({ default: m.ATSMinimalTemplate })), { loading: Skeleton, ssr: false });
const ATSCompactTemplate      = dynamic(() => import("./templates/ATSCompactTemplate").then(m => ({ default: m.ATSCompactTemplate })), { loading: Skeleton, ssr: false });
const StartupBoldTemplate     = dynamic(() => import("./templates/StartupBoldTemplate").then(m => ({ default: m.StartupBoldTemplate })), { loading: Skeleton, ssr: false });
const TechFocusedTemplate     = dynamic(() => import("./templates/TechFocusedTemplate").then(m => ({ default: m.TechFocusedTemplate })), { loading: Skeleton, ssr: false });
const CreativeSidebarTemplate = dynamic(() => import("./templates/CreativeSidebarTemplate").then(m => ({ default: m.CreativeSidebarTemplate })), { loading: Skeleton, ssr: false });
const DesignerSplitTemplate   = dynamic(() => import("./templates/DesignerSplitTemplate").then(m => ({ default: m.DesignerSplitTemplate })), { loading: Skeleton, ssr: false });
const ProfessionalCleanTemplate = dynamic(() => import("./templates/ProfessionalCleanTemplate").then(m => ({ default: m.ProfessionalCleanTemplate })), { loading: Skeleton, ssr: false });
const ATSElegantTemplate      = dynamic(() => import("./templates/ATSElegantTemplate").then(m => ({ default: m.ATSElegantTemplate })), { loading: Skeleton, ssr: false });
const GradientProTemplate     = dynamic(() => import("./templates/GradientProTemplate").then(m => ({ default: m.GradientProTemplate })), { loading: Skeleton, ssr: false });
const ExecutiveLuxeTemplate   = dynamic(() => import("./templates/ExecutiveLuxeTemplate").then(m => ({ default: m.ExecutiveLuxeTemplate })), { loading: Skeleton, ssr: false });
const CreativePortfolioTemplate = dynamic(() => import("./templates/CreativePortfolioTemplate").then(m => ({ default: m.CreativePortfolioTemplate })), { loading: Skeleton, ssr: false });
const DeveloperDarkTemplate   = dynamic(() => import("./templates/DeveloperDarkTemplate").then(m => ({ default: m.DeveloperDarkTemplate })), { loading: Skeleton, ssr: false });
const FresherEdgeTemplate     = dynamic(() => import("./templates/FresherEdgeTemplate").then(m => ({ default: m.FresherEdgeTemplate })), { loading: Skeleton, ssr: false });
const ConsultantProTemplate   = dynamic(() => import("./templates/ConsultantProTemplate").then(m => ({ default: m.ConsultantProTemplate })), { loading: Skeleton, ssr: false });
const FounderResumeTemplate   = dynamic(() => import("./templates/FounderResumeTemplate").then(m => ({ default: m.FounderResumeTemplate })), { loading: Skeleton, ssr: false });

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
    case "classic":             return <ClassicTemplate resume={resume} />;
    case "executive":           return <ExecutiveTemplate resume={resume} themeColor={themeColor} />;
    case "innovator":           return <InnovatorTemplate resume={resume} themeColor={themeColor} />;
    case "minimalist":          return <MinimalistTemplate resume={resume} />;
    case "ats-minimal":         return <ATSMinimalTemplate resume={resume} />;
    case "ats-compact":         return <ATSCompactTemplate resume={resume} />;
    case "startup-bold":        return <StartupBoldTemplate resume={resume} themeColor={themeColor} />;
    case "tech-focused":        return <TechFocusedTemplate resume={resume} themeColor={themeColor} />;
    case "creative-sidebar":    return <CreativeSidebarTemplate resume={resume} themeColor={themeColor} />;
    case "designer-split":      return <DesignerSplitTemplate resume={resume} themeColor={themeColor} />;
    case "professional-clean":  return <ProfessionalCleanTemplate resume={resume} themeColor={themeColor} />;
    case "ats-elegant":         return <ATSElegantTemplate resume={resume} themeColor={themeColor} />;
    case "gradient-pro":        return <GradientProTemplate resume={resume} themeColor={themeColor} />;
    case "executive-luxe":      return <ExecutiveLuxeTemplate resume={resume} themeColor={themeColor} />;
    case "creative-portfolio":  return <CreativePortfolioTemplate resume={resume} themeColor={themeColor} />;
    case "developer-dark":      return <DeveloperDarkTemplate resume={resume} themeColor={themeColor} />;
    case "fresher-edge":        return <FresherEdgeTemplate resume={resume} themeColor={themeColor} />;
    case "consultant-pro":      return <ConsultantProTemplate resume={resume} themeColor={themeColor} />;
    case "founder-resume":      return <FounderResumeTemplate resume={resume} themeColor={themeColor} />;
    case "modern":
    default:                    return <ModernTemplate resume={resume} themeColor={themeColor} />;
  }
});
