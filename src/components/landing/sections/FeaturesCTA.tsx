"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FilePenLine, ScanSearch, Route, Sparkles } from "lucide-react";

const TOOLS = [
  {
    icon: FilePenLine,
    name: "Resume Builder",
    tagline: "Build ATS-ready resumes with AI",
    detail: "20+ templates · Live preview · PDF export",
    href: "/tools/builder/templates",
    accent: "from-indigo/20 to-indigo/5",
    iconBg: "bg-indigo/10",
    iconColor: "text-indigo",
  },
  {
    icon: ScanSearch,
    name: "ATS Analyzer",
    tagline: "Know your score before applying",
    detail: "Instant score · Issue breakdown · AI fixes",
    href: "/tools/analyzer",
    accent: "from-teal/20 to-teal/5",
    iconBg: "bg-teal/10",
    iconColor: "text-teal",
  },
  {
    icon: Route,
    name: "Career Roadmap",
    tagline: "Your personalized learning path",
    detail: "AI-ordered skills · Time estimates · Saved",
    href: "/tools/roadmap",
    accent: "from-coral/20 to-coral/5",
    iconBg: "bg-coral/10",
    iconColor: "text-coral",
  },
];

export function FeaturesCTA() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[1180px] px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2"
            >
              All Tools
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink"
            >
              Three tools.{" "}
              <span className="italic text-indigo">One career OS.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/features"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo hover:text-indigo/80 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              See all features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Tool cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {TOOLS.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <Link
                  href={tool.href}
                  className="group block tile overflow-hidden h-full hover:-translate-y-2 hover:shadow-float transition-all duration-300"
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${tool.accent}`} />
                  <div className="p-6">
                    <div className={`w-11 h-11 rounded-xl ${tool.iconBg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-5 h-5 ${tool.iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-ink mb-1">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{tool.tagline}</p>
                    <p className="text-xs text-muted-foreground/70 font-mono">{tool.detail}</p>
                    <div className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${tool.iconColor} group-hover:gap-2 transition-all`}>
                      Get started <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
