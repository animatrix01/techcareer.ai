"use client";

import { 
  ArrowLeftIcon, 
  ZoomInIcon, 
  ZoomOutIcon, 
  DownloadIcon, 
  PrinterIcon,
  ExpandIcon,
  ShrinkIcon,
  RectangleHorizontalIcon,
  CropIcon
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { BuilderTemplateId } from "@/stores/useBuilderStore";

type ZoomLevel = 50 | 75 | 90 | 100 | 110 | 125 | 150 | "fit-width" | "fit-page";

interface PreviewToolbarProps {
  onBack: () => void;
  template: BuilderTemplateId;
  onTemplateChange: (template: BuilderTemplateId) => void;
  zoom: ZoomLevel;
  onZoomChange: (zoom: ZoomLevel) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onDownloadPDF: () => void;
  onPrint: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

const TEMPLATES: { value: BuilderTemplateId; label: string }[] = [
  { value: "modern", label: "Modern" },
  { value: "classic", label: "Classic" },
  { value: "minimalist", label: "Minimalist" },
  { value: "executive", label: "Executive" },
  { value: "innovator", label: "Innovator" },
  { value: "tech-focused", label: "Tech" },
  { value: "professional-clean", label: "Professional" },
  { value: "startup-bold", label: "Startup" },
  { value: "ats-minimal", label: "ATS Minimal" },
  { value: "designer-split", label: "Designer" },
];

export function PreviewToolbar({
  onBack,
  template,
  onTemplateChange,
  zoom,
  onZoomChange,
  onZoomIn,
  onZoomOut,
  onDownloadPDF,
  onPrint,
  isFullscreen,
  onToggleFullscreen,
}: PreviewToolbarProps) {
  const formatZoomDisplay = (zoom: ZoomLevel): string => {
    if (zoom === "fit-width") return "Fit Width";
    if (zoom === "fit-page") return "Fit Page";
    return `${zoom}%`;
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Builder
          </Button>

          {/* Template Selector */}
          <div className="hidden md:block">
            <Select value={template} onValueChange={onTemplateChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Center Section - Zoom Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomOut}
            disabled={zoom === 50}
            className="px-2"
          >
            <ZoomOutIcon className="size-4" />
          </Button>

          <Select 
            value={zoom.toString()} 
            onValueChange={(value) => {
              if (value === "fit-width" || value === "fit-page") {
                onZoomChange(value);
              } else {
                onZoomChange(parseInt(value) as ZoomLevel);
              }
            }}
          >
            <SelectTrigger className="w-28">
              <SelectValue>
                {formatZoomDisplay(zoom)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fit-page">
                <div className="flex items-center gap-2">
                  <CropIcon className="size-3" />
                  Fit Page
                </div>
              </SelectItem>
              <SelectItem value="fit-width">
                <div className="flex items-center gap-2">
                  <RectangleHorizontalIcon className="size-3" />
                  Fit Width
                </div>
              </SelectItem>
              <SelectItem value="50">50%</SelectItem>
              <SelectItem value="75">75%</SelectItem>
              <SelectItem value="90">90%</SelectItem>
              <SelectItem value="100">100%</SelectItem>
              <SelectItem value="110">110%</SelectItem>
              <SelectItem value="125">125%</SelectItem>
              <SelectItem value="150">150%</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomIn}
            disabled={zoom === 150}
            className="px-2"
          >
            <ZoomInIcon className="size-4" />
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFullscreen}
            className="hidden md:flex px-2"
          >
            {isFullscreen ? (
              <ShrinkIcon className="size-4" />
            ) : (
              <ExpandIcon className="size-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onPrint}
            className="px-2"
          >
            <PrinterIcon className="size-4" />
          </Button>

          <Button
            onClick={onDownloadPDF}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4"
            size="sm"
          >
            <DownloadIcon className="size-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}