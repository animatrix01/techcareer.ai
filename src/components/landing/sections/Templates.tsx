"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SAMPLE_PROFILES } from "@/lib/config/sample-resume";
import { ModernTemplate } from "@/components/features/builder/templates/ModernTemplate";
import { ClassicTemplate } from "@/components/features/builder/templates/ClassicTemplate";
import { ExecutiveTemplate } from "@/components/features/builder/templates/ExecutiveTemplate";
import { StartupBoldTemplate } from "@/components/features/builder/templates/StartupBoldTemplate";
import { ATSMinimalTemplate } from "@/components/features/builder/templates/ATSMinimalTemplate";
import { DeveloperDarkTemplate } from "@/components/features/builder/templates/DeveloperDarkTemplate";
import { InnovatorTemplate } from "@/components/features/builder/templates/InnovatorTemplate";
import { MinimalistTemplate } from "@/components/features/builder/templates/MinimalistTemplate";

/* ─────────────────────────────────────────────────
   Template registry
───────────────────────────────────────────────── */
const TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    role: "Product · Design",
    badge: "Most Popular",
    badgeTone: "bg-indigo/15 text-indigo",
    themeColor: "#4f46e5",
    category: "Modern",
    ats: true,
    description: "Two-column layout with a bold dark sidebar.",
    profileKey: "modern",
    Component: ModernTemplate,
  },
  {
    id: "classic",
    name: "Classic",
    role: "Finance · Law",
    badge: "ATS Safe",
    badgeTone: "bg-ink/10 text-ink",
    themeColor: "#0f172a",
    category: "Minimal",
    ats: true,
    description: "Timeless centered serif layout. Clean, ATS-safe.",
    profileKey: "classic",
    Component: ClassicTemplate,
  },
  {
    id: "executive",
    name: "Executive",
    role: "C-suite · Director",
    badge: "Premium",
    badgeTone: "bg-sky/30 text-ink",
    themeColor: "#1e3a5f",
    category: "Executive",
    ats: true,
    description: "Authoritative single-column layout built for seni.",
    profileKey: "executive",
    Component: ExecutiveTemplate,
  },
  {
    id: "innovator",
    name: "Innovator",
    role: "PM · Strategy",
    badge: "Trending",
    badgeTone: "bg-coral/20 text-ink",
    themeColor: "#7c3aed",
    category: "Creative",
    ats: true,
    description: "Dynamic layout for bold product leaders.",
    profileKey: "innovator",
    Component: InnovatorTemplate,
  },
  {
    id: "ats-minimal",
    name: "ATS Minimal",
    role: "Operations · HR",
    badge: "ATS Safe",
    badgeTone: "bg-mint/40 text-ink",
    themeColor: "#0d9488",
    category: "Minimal",
    ats: true,
    description: "Structured, keyword-optimized, zero frills.",
    profileKey: "ats-minimal",
    Component: ATSMinimalTemplate,
  },
  {
    id: "developer-dark",
    name: "Dev Dark",
    role: "Engineer · SWE",
    badge: "For Devs",
    badgeTone: "bg-ink/10 text-ink",
    themeColor: "#22d3ee",
    category: "Dev",
    ats: true,
    description: "Terminal-inspired dark template for engineers.",
    profileKey: "tech-focused",
    Component: DeveloperDarkTemplate,
  },
  {
    id: "startup-bold",
    name: "Startup Bold",
    role: "Founder · Growth",
    badge: "Bold",
    badgeTone: "bg-peach/50 text-ink",
    themeColor: "#f59e0b",
    category: "Creative",
    ats: true,
    description: "High-energy layout for startup operators.",
    profileKey: "startup-bold",
    Component: StartupBoldTemplate,
  },
  {
    id: "minimalist",
    name: "Minimalist",
    role: "Data · Research",
    badge: "Clean",
    badgeTone: "bg-lavender/40 text-ink",
    themeColor: "#64748b",
    category: "Minimal",
    ats: true,
    description: "Maximum signal, zero visual noise.",
    profileKey: "minimalist",
    Component: MinimalistTemplate,
  },
];

const CATEGORIES = ["All", "Modern", "Minimal", "Executive", "Creative", "Dev"];

/* ─────────────────────────────────────────────────
   Scaled live preview wrapper
   Renders the real template at A4 size (794×1123px)
   then scales it down to fit the card.
───────────────────────────────────────────────── */
const A4_W = 794;
const A4_H = 1123;

function LivePreview({
  Component,
  resume,
  themeColor,
  cardHeight,
}: {
  Component: React.ComponentType<{ resume: any; themeColor: string }>;
  resume: any;
  themeColor: string;
  cardHeight: number;
}) {
  const scale = cardHeight / A4_H;

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-2xl"
      style={{ pointerEvents: "none" }}
    >
      <div
        style={{
          width: A4_W,
          height: A4_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Component resume={resume} themeColor={themeColor} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Main section
───────────────────────────────────────────────── */

const CARD_H = 440;
const CARD_W = Math.round((A4_W / A4_H) * CARD_H); // ~311px — true A4 ratio

export function Templates() {
  const [active, setActive] = useState("All");

  const visible =
    active === "All"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === active);

  return (
    <section id="templates" className="relative py-40">
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Templates
            </div>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] text-ink">
              Handcrafted by designers.{" "}
              <span className="font-serif italic text-indigo">Built</span> to get hired.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Every template passes ATS scans, looks sharp in every inbox, and takes under 30 minutes to complete.
            </p>
          </div>
          <Link
            href="/tools/builder/templates"
            className="btn-ghost group inline-flex items-center gap-2"
          >
            Browse all templates
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Filters */}
        <div className="mt-10 flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium border transition-all duration-200 ${
                active === c
                  ? "bg-ink text-paper border-ink"
                  : "bg-white/50 border-border text-muted-foreground hover:text-ink hover:bg-white/80 backdrop-blur-sm"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Static scrollable gallery */}
      <div className="mt-12 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-6 px-6">
        {visible.map((t, idx) => {
            const resume = SAMPLE_PROFILES[t.profileKey] ?? SAMPLE_PROFILES["modern"];
            return (
              <Link
                key={`${t.id}-${idx}`}
                href="/tools/builder/templates"
                className="group relative shrink-0 outline-none"
                style={{ width: CARD_W }}
              >
                {/* Card shell */}
                <div
                  className="relative overflow-hidden rounded-2xl border border-border/40 shadow-soft transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-float"
                  style={{ height: CARD_H, background: "oklch(1 0 0 / 0.7)", backdropFilter: "blur(12px)" }}
                >
                  <LivePreview
                    Component={t.Component}
                    resume={resume}
                    themeColor={t.themeColor}
                    cardHeight={CARD_H}
                  />

                  {/* ATS pill */}
                  {t.ats && (
                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-mint/90 backdrop-blur-sm px-2.5 py-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal" />
                      <span className="font-mono text-[9px] font-medium text-ink uppercase tracking-wider">ATS</span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-ink/0 transition-all duration-300 group-hover:bg-ink/10">
                    <span className="translate-y-2 rounded-full bg-ink px-5 py-2 text-xs font-medium text-paper opacity-0 shadow-float transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Use template →
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-4 flex items-start justify-between gap-2 px-0.5">
                  <div>
                    <div className="text-sm font-medium text-ink">{t.name}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{t.description}</div>
                  </div>
                  <span className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${t.badgeTone}`}>
                    {t.badge}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA strip */}
      <div className="mx-auto mt-14 max-w-[1180px] px-6">
        <div className="tile flex flex-wrap items-center justify-between gap-4 px-8 py-5 bg-gradient-to-r from-indigo/8 to-lavender/10">
          <div>
            <div className="text-sm font-medium text-ink">20+ professionally designed templates</div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              All ATS-safe · Instant PDF export · Fully customizable
            </div>
          </div>
          <Link href="/tools/builder/templates" className="btn-primary text-sm">
            Start building free
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
