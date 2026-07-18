"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Brain, Target, FileText,
  ScanSearch, Route, FilePenLine, Sparkles, Shield,
  Clock, Zap, Star, BarChart3, Award
} from "lucide-react";

const TOOLS = [
  {
    icon: FilePenLine,
    tag: "Resume Builder",
    title: "Build a resume that gets past ATS — and impresses humans",
    description:
      "Step-by-step guided editor with AI enhancements, live preview, and 20+ templates. Fill in your details once, switch templates anytime without losing data.",
    href: "/tools/builder/templates",
    cta: "Start Building",
    accent: "indigo",
    features: [
      "20+ ATS-ready professional templates",
      "AI-powered bullet point enhancement",
      "Live real-time preview as you type",
      "PDF download via browser print",
      "Skills chip input with AI suggestions",
      "Experience, Education, Projects steps",
    ],
  },
  {
    icon: ScanSearch,
    tag: "ATS Analyzer",
    title: "Know your ATS score before the recruiter sees your resume",
    description:
      "Upload your resume (PDF or DOCX) and get an instant AI-powered score with specific issues, weak action verb detection, and fix suggestions.",
    href: "/tools/analyzer",
    cta: "Analyze Resume",
    accent: "teal",
    features: [
      "Instant 0–100 ATS compatibility score",
      "Weak action verb detection",
      "Issue severity breakdown (critical/warning/info)",
      "Specific improvement suggestions per issue",
      "Supports PDF and DOCX uploads",
      "AI-generated fix recommendations",
    ],
  },
  {
    icon: Route,
    tag: "Career Roadmap",
    title: "A personalized learning path to your target role",
    description:
      "Tell us your target role and current skills. Our AI generates a step-by-step roadmap with milestones, skill priorities, and estimated timelines.",
    href: "/tools/roadmap",
    cta: "Generate Roadmap",
    accent: "coral",
    features: [
      "Role-specific personalized roadmap",
      "AI-ordered skill learning sequence",
      "Time estimates per learning phase",
      "Resource and certification recommendations",
      "Saved to your dashboard",
      "1,000+ role targets supported",
    ],
  },
];

const AI_FEATURES = [
  {
    icon: Brain,
    title: "AI Summary Writer",
    description: "Transform weak bullet points into powerful, quantified impact statements with one click.",
    tag: "Builder",
  },
  {
    icon: Target,
    title: "ATS Keyword Matching",
    description: "Analyzes keyword density and gaps against industry standards and common ATS parsers.",
    tag: "Analyzer",
  },
  {
    icon: Sparkles,
    title: "Skill Suggestions",
    description: "AI detects your role from your experience and suggests the most in-demand skills to add.",
    tag: "Builder",
  },
  {
    icon: BarChart3,
    title: "Score Benchmarking",
    description: "Your ATS score is benchmarked against real resumes for similar roles and experience levels.",
    tag: "Analyzer",
  },
  {
    icon: FileText,
    title: "Roadmap Generation",
    description: "A multi-step AI flow that understands your current level and generates a realistic path forward.",
    tag: "Roadmap",
  },
  {
    icon: Award,
    title: "Career Milestones",
    description: "Break down your career goal into actionable milestones with realistic time estimates.",
    tag: "Roadmap",
  },
];

const ACCENT_MAP: Record<string, { bg: string; text: string; border: string; tag: string }> = {
  indigo: {
    bg: "bg-indigo/10",
    text: "text-indigo",
    border: "border-indigo/20",
    tag: "bg-indigo text-white",
  },
  teal: {
    bg: "bg-teal/10",
    text: "text-teal",
    border: "border-teal/20",
    tag: "bg-teal text-white",
  },
  coral: {
    bg: "bg-coral/10",
    text: "text-coral",
    border: "border-coral/20",
    tag: "bg-coral text-white",
  },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1180px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo/10 border border-indigo/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo" />
              <span className="text-xs font-medium text-indigo uppercase tracking-wider">Platform Features</span>
            </div>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-tight text-ink mb-5">
              Everything you need to{" "}
              <span className="italic text-indigo">land your next role</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Three AI-powered tools in one platform — resume builder, ATS analyzer, and career roadmap.
              Built to work together, designed to get you hired.
            </p>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
              {[
                { icon: CheckCircle2, text: "Free to start" },
                { icon: Shield, text: "No credit card" },
                { icon: Clock, text: "Results in minutes" },
                { icon: Star, text: "4.9 · 18k reviews" },
              ].map((item) => (
                <span key={item.text} className="flex items-center gap-1.5">
                  <item.icon className="w-4 h-4 text-indigo" />
                  {item.text}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="pb-24">
        <div className="mx-auto max-w-[1180px] px-6 space-y-8">
          {TOOLS.map((tool, i) => {
            const accent = ACCENT_MAP[tool.accent];
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.tag}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="tile overflow-hidden"
              >
                <div className="grid lg:grid-cols-[1fr_320px] gap-0">
                  {/* Content */}
                  <div className="p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-xl ${accent.bg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${accent.text}`} />
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accent.tag}`}>
                        {tool.tag}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl text-ink leading-tight mb-3">
                      {tool.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-lg">{tool.description}</p>

                    <Link
                      href={tool.href}
                      className="btn-primary inline-flex"
                    >
                      {tool.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Feature list */}
                  <div className={`border-t lg:border-t-0 lg:border-l border-border ${accent.bg} p-8 lg:p-10`}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                      What&apos;s included
                    </p>
                    <ul className="space-y-3">
                      {tool.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${accent.text}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* AI Features Grid */}
      <section className="py-24 bg-paper/40 border-t border-border/40">
        <div className="mx-auto max-w-[1180px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
              AI Capabilities
            </div>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink">
              Powered by advanced AI
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Every feature is designed to give your application an edge — from the first scan to the final offer.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AI_FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="tile p-6 hover:-translate-y-1 hover:shadow-float transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-indigo" />
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {feature.tag}
                    </span>
                  </div>
                  <h3 className="font-semibold text-ink mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="tile p-12 lg:p-16 text-center bg-gradient-to-br from-indigo/5 via-paper to-mint/10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo to-indigo/80 text-white shadow-soft mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink mb-4">
                Start building your career today
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Join 50,000+ professionals who used NextCareer AI to land their dream roles.
                Free to start, no credit card required.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/tools/builder/templates" className="btn-primary text-base px-8 h-12 inline-flex items-center gap-2">
                  Build My Resume
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/tools/analyzer" className="btn-ghost text-base px-8 h-12 inline-flex items-center gap-2">
                  Analyze Existing Resume
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
