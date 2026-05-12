"use client";

import * as React from "react";

import { ClassicTemplate } from "@/components/features/builder/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/features/builder/templates/ModernTemplate";
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
  if (template === "classic") return <ClassicTemplate resume={resume} />;
  return <ModernTemplate resume={resume} themeColor={themeColor} />;
});
