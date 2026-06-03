"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const templates = [
  { 
    id: "modern", 
    name: "Modern", 
    category: "ATS Friendly", 
    accent: "#4f46e5", 
    badge: "Most Popular", 
    badgeColor: "bg-indigo-100 text-indigo-700",
    layout: "sidebar"
  },
  { 
    id: "classic", 
    name: "Classic", 
    category: "Professional", 
    accent: "#0f172a", 
    badge: "ATS Safe", 
    badgeColor: "bg-slate-100 text-slate-700",
    layout: "traditional"
  },
  { 
    id: "executive", 
    name: "Executive", 
    category: "Executive", 
    accent: "#1e3a5f", 
    badge: "Premium", 
    badgeColor: "bg-blue-100 text-blue-700",
    layout: "elegant"
  },
  { 
    id: "startup-bold", 
    name: "Startup Bold", 
    category: "Startup", 
    accent: "#7c3aed", 
    badge: "Trending", 
    badgeColor: "bg-violet-100 text-violet-700",
    layout: "creative"
  },
  { 
    id: "ats-minimal", 
    name: "ATS Minimal", 
    category: "ATS Friendly", 
    accent: "#0d9488", 
    badge: "ATS Safe", 
    badgeColor: "bg-teal-100 text-teal-700",
    layout: "minimal"
  },
  { 
    id: "developer-dark", 
    name: "Developer Dark", 
    category: "Developer", 
    accent: "#1e293b", 
    badge: "For Devs", 
    badgeColor: "bg-slate-100 text-slate-700",
    layout: "tech"
  },
];

function TemplateMiniPreview({ accent, layout }: { accent: string; layout: string }) {
  const renderLayout = () => {
    switch (layout) {
      case "sidebar":
        return (
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-1/3 p-3" style={{ backgroundColor: accent }}>
              <div className="space-y-2">
                <div className="h-8 w-8 rounded-full bg-white/30" />
                <div className="h-2 w-full rounded bg-white/60" />
                <div className="h-1.5 w-3/4 rounded bg-white/40" />
                <div className="mt-3 space-y-1">
                  <div className="h-1 w-full rounded bg-white/50" />
                  <div className="h-1 w-5/6 rounded bg-white/40" />
                </div>
                <div className="mt-3 space-y-1">
                  <div className="h-3 w-full rounded bg-white/20" />
                  <div className="flex gap-1">
                    <div className="h-4 w-8 rounded-full bg-white/30 text-[6px]" />
                    <div className="h-4 w-8 rounded-full bg-white/30" />
                  </div>
                </div>
              </div>
            </div>
            {/* Main content */}
            <div className="flex-1 p-3 space-y-2">
              <div className="h-2 w-4/5 rounded bg-slate-200" />
              <div className="h-1 w-full rounded bg-slate-100" />
              <div className="h-1 w-3/4 rounded bg-slate-100" />
              <div className="mt-2 h-px bg-slate-200" />
              <div className="space-y-1">
                <div className="h-1.5 w-2/3 rounded bg-slate-200" />
                <div className="h-1 w-full rounded bg-slate-100" />
                <div className="h-1 w-4/5 rounded bg-slate-100" />
              </div>
            </div>
          </div>
        );

      case "traditional":
        return (
          <div className="p-3 space-y-2">
            <div className="text-center space-y-1">
              <div className="h-2.5 w-2/3 mx-auto rounded bg-slate-800" />
              <div className="h-1.5 w-1/2 mx-auto rounded bg-slate-600" />
              <div className="h-1 w-1/3 mx-auto rounded bg-slate-400" />
            </div>
            <div className="h-px bg-slate-200 my-2" />
            <div className="space-y-1.5">
              <div className="h-1.5 w-1/4 rounded bg-slate-700" />
              <div className="h-1 w-full rounded bg-slate-200" />
              <div className="h-1 w-5/6 rounded bg-slate-200" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-1/3 rounded bg-slate-700" />
              <div className="flex justify-between">
                <div className="h-1 w-1/3 rounded bg-slate-300" />
                <div className="h-1 w-1/4 rounded bg-slate-300" />
              </div>
              <div className="h-1 w-full rounded bg-slate-200" />
              <div className="h-1 w-4/5 rounded bg-slate-200" />
            </div>
          </div>
        );

      case "elegant":
        return (
          <div className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 rounded bg-slate-300" />
              <div className="space-y-1">
                <div className="h-2 w-16 rounded bg-slate-800" />
                <div className="h-1 w-12 rounded bg-slate-500" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="col-span-2 space-y-1">
                <div className="h-1.5 w-full rounded" style={{ backgroundColor: accent + "80" }} />
                <div className="h-1 w-full rounded bg-slate-200" />
                <div className="h-1 w-4/5 rounded bg-slate-200" />
              </div>
              <div className="space-y-1">
                <div className="h-1 w-full rounded bg-slate-300" />
                <div className="h-1 w-3/4 rounded bg-slate-300" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <div className="h-1 w-1 rounded-full" style={{ backgroundColor: accent }} />
                <div className="h-1 w-1/3 rounded bg-slate-600" />
              </div>
              <div className="h-1 w-full rounded bg-slate-200" />
              <div className="h-1 w-5/6 rounded bg-slate-200" />
            </div>
          </div>
        );

      case "creative":
        return (
          <div className="p-3">
            <div className="flex items-start gap-2 mb-2">
              <div className="h-8 w-8 rounded-full" style={{ backgroundColor: accent + "40" }} />
              <div className="flex-1 space-y-1">
                <div className="h-2 w-3/4 rounded bg-slate-800" />
                <div className="h-1.5 w-1/2 rounded" style={{ backgroundColor: accent }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-1">
                <div className="h-4 w-12 rounded-full text-[6px] flex items-center justify-center" style={{ backgroundColor: accent + "20", color: accent }}>
                  <div className="h-1 w-6 rounded" style={{ backgroundColor: accent }} />
                </div>
                <div className="h-4 w-10 rounded-full bg-slate-100" />
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-1/3 rounded" style={{ backgroundColor: accent }} />
                <div className="h-1 w-full rounded bg-slate-200" />
                <div className="h-1 w-4/5 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        );

      case "minimal":
        return (
          <div className="p-3 space-y-2">
            <div className="space-y-1">
              <div className="h-2 w-2/3 rounded bg-slate-900" />
              <div className="h-1 w-1/2 rounded bg-slate-600" />
            </div>
            <div className="h-px bg-slate-200" />
            <div className="space-y-1.5">
              <div className="h-1 w-1/4 rounded bg-slate-700 uppercase" />
              <div className="space-y-0.5">
                <div className="h-1 w-full rounded bg-slate-300" />
                <div className="h-1 w-5/6 rounded bg-slate-300" />
                <div className="h-1 w-4/5 rounded bg-slate-300" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-1 w-1/3 rounded bg-slate-700" />
              <div className="flex justify-between items-center">
                <div className="h-1 w-1/3 rounded bg-slate-400" />
                <div className="h-1 w-1/5 rounded bg-slate-300" />
              </div>
              <div className="space-y-0.5">
                <div className="h-1 w-full rounded bg-slate-200" />
                <div className="h-1 w-3/4 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        );

      case "tech":
        return (
          <div className="bg-slate-900 h-full p-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-green-400" />
              <div className="h-1.5 w-2/3 rounded bg-green-400" />
            </div>
            <div className="space-y-1">
              <div className="h-1 w-1/2 rounded bg-slate-400" />
              <div className="h-1 w-1/3 rounded bg-slate-500" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <div className="h-1 w-1 rounded bg-cyan-400" />
                <div className="h-1 w-1/4 rounded bg-cyan-400" />
              </div>
              <div className="ml-2 space-y-0.5">
                <div className="h-1 w-full rounded bg-slate-300" />
                <div className="h-1 w-4/5 rounded bg-slate-300" />
              </div>
            </div>
            <div className="flex gap-1 flex-wrap">
              <div className="h-3 w-8 rounded bg-slate-700 border border-slate-600" />
              <div className="h-3 w-6 rounded bg-slate-700 border border-slate-600" />
              <div className="h-3 w-10 rounded bg-slate-700 border border-slate-600" />
            </div>
          </div>
        );

      default:
        return (
          <div className="p-3 space-y-2">
            <div className="h-2 w-2/3 rounded bg-slate-300" />
            <div className="h-1 w-1/2 rounded bg-slate-200" />
            <div className="space-y-1">
              <div className="h-1 w-full rounded bg-slate-200" />
              <div className="h-1 w-4/5 rounded bg-slate-200" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-t-xl bg-white border-b border-slate-100">
      {renderLayout()}
      <div className="absolute bottom-2 right-2">
        <div className="flex items-center gap-1 rounded-lg bg-teal-50 px-2 py-1">
          <CheckCircle2 className="size-2.5 text-teal-500" />
          <span className="text-[8px] font-medium text-teal-700">ATS</span>
        </div>
      </div>
    </div>
  );
}

export function TemplateShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-[#EFE9E1]"
      aria-labelledby="templates-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-sm font-bold uppercase tracking-[0.18em] text-[#2F5233]"
            >
              Templates
            </motion.p>
            <motion.h2
              id="templates-heading"
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-2 text-3xl font-black tracking-tight text-[#1C1C1C] sm:text-4xl"
              style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              20+ templates built to{" "}
              <span className="text-[#2F5233]">
                get you hired
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.14 }}
              className="mt-3 text-base text-[#5C4F3F]"
            >
              Every template is ATS-safe, professionally designed, and fully customizable.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Link href="/tools/builder/templates" className="inline-flex items-center gap-2 rounded-sm border-2 border-[#1C1C1C] bg-transparent px-5 py-2 text-sm font-bold text-[#1C1C1C] transition-all hover:bg-[#1C1C1C] hover:text-[#EFE9E1]">
              View all templates <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {templates.map((tpl, i) => (
            <motion.div
              key={tpl.id}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <Link href="/tools/builder/templates" className="group block">
                <div
                  className={cn(
                    "relative overflow-hidden rounded-sm border-2 border-[#1C1C1C] bg-[#F5F1EB]",
                    "shadow-[3px_3px_0px_0px_rgba(28,28,28,0.15)]",
                    "transition-all duration-300 group-hover:shadow-[5px_5px_0px_0px_rgba(28,28,28,0.25)] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px]"
                  )}
                  style={{ height: 220 }}
                >
                  <TemplateMiniPreview accent={tpl.accent} layout={tpl.layout} />
                </div>
                <div className="mt-2.5 px-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-bold text-[#1C1C1C]">{tpl.name}</p>
                    <span className={cn("rounded-sm px-1.5 py-0.5 text-[9px] font-bold border-2 border-[#1C1C1C]", tpl.badgeColor)}>{tpl.badge}</span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-[#6B5944] font-medium">{tpl.category}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
