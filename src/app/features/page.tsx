"use client";

import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  CheckCircle2, ArrowRight, Star, Brain, Target, Code2,
  GraduationCap, Briefcase, ScanSearch,
  Route, FilePenLine, Shield, Clock, Users, Sparkles,
} from "lucide-react";

function FadeIn({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const rm = useReducedMotion();
  return (
    <motion.div ref={ref}
      initial={rm ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#EFE9E1]">
      {/* Retro grid background */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{ 
            backgroundImage: "linear-gradient(#D4C5B3 1px, transparent 1px), linear-gradient(90deg, #D4C5B3 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />
      </div>

      {/* Compact header */}
      <section className="border-b-2 border-[#1C1C1C] py-12 sm:py-16 bg-[#EFE9E1]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} className="flex items-end justify-between">
            <div>
              <p className="mb-2 inline-block rounded-sm border-2 border-[#2F5233] bg-[#2F5233] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#EFE9E1]">
                Features
              </p>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-[#1C1C1C] sm:text-4xl" style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}>
                Pick your tool. Start building.
              </h1>
            </div>
            <div className="hidden items-center gap-2 rounded-sm border-2 border-[#1C1C1C] bg-white px-4 py-2.5 shadow-[4px_4px_0px_0px_rgba(28,28,28,0.25)] sm:flex">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-3 fill-[#D4A574] text-[#D4A574]" />)}
              </div>
              <span className="text-sm font-semibold text-[#1C1C1C]">4.9</span>
              <span className="text-sm text-[#6B5944]">· 18k reviews</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 Product cards */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { icon: FilePenLine, bg: "bg-[#3D5A40]", color: "text-[#EFE9E1]", headerBg: "bg-[#F5F1EB]",
                title: "Resume Builder", desc: "Build ATS-optimized resumes with AI assistance. Choose from 20+ premium templates, get real-time feedback, and export in seconds.", href: "/tools/builder",
                features: ["20+ ATS-ready templates", "AI bullet point enhancement", "Real-time ATS score", "PDF & DOCX export", "Section-by-section guidance", "Skills auto-suggestions"] },
              { icon: ScanSearch, bg: "bg-[#5C4F3F]", color: "text-[#EFE9E1]", headerBg: "bg-[#F5F1EB]",
                title: "ATS Analyzer", desc: "Upload your resume and get an instant score with actionable fixes. Know exactly what recruiters and ATS systems see.", href: "/tools/analyzer",
                features: ["Instant ATS score (0–100)", "Keyword gap analysis", "Weak verb detection", "Formatting issue flags", "Job description matching", "AI fix suggestions"] },
              { icon: Route, bg: "bg-[#8B4513]", color: "text-[#EFE9E1]", headerBg: "bg-[#F5F1EB]",
                title: "Career Roadmap", desc: "Get a personalized, AI-generated learning path to your dream role. Every skill in the right order, with time estimates.", href: "/tools/roadmap",
                features: ["Role-specific roadmaps", "AI skill ordering", "Time estimates per phase", "Resource recommendations", "Progress tracking", "Beginner to senior paths"] },
            ].map((tool, i) => (
              <FadeIn key={tool.title} delay={i * 0.08}>
                <div className="group flex h-full flex-col overflow-hidden rounded-sm border-2 border-[#1C1C1C] bg-white shadow-[6px_6px_0px_0px_rgba(28,28,28,0.25)] transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(28,28,28,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]">
                  <div className={`border-b-2 border-[#1C1C1C] ${tool.headerBg} p-8`}>
                    <div className={`mb-5 inline-flex size-14 items-center justify-center rounded-sm border-2 border-[#1C1C1C] ${tool.bg}`}>
                      <tool.icon className={`size-7 ${tool.color}`} />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-[#1C1C1C]" style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}>
                      {tool.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#5C4F3F]">{tool.desc}</p>
                  </div>
                  <div className="flex flex-1 flex-col bg-white p-8">
                    <ul className="mb-8 flex-1 space-y-3">
                      {tool.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-[#1C1C1C]">
                          <CheckCircle2 className="size-4 shrink-0 text-[#2F5233]" />{f}
                        </li>
                      ))}
                    </ul>
                    <Link href={tool.href}
                      className="flex items-center justify-center gap-2 rounded-sm border-2 border-[#1C1C1C] bg-[#2F5233] py-3 text-sm font-bold text-[#EFE9E1] shadow-[4px_4px_0px_0px_rgba(28,28,28,0.25)] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_rgba(28,28,28,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]">
                      Try {tool.title} <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features grid */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn className="mb-12 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-sm border-2 border-[#1C1C1C] bg-[#2F5233] px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#EFE9E1]">
              <Brain className="size-3.5" /> AI-Powered
            </span>
            <h2 className="mt-6 text-3xl font-black tracking-tight text-[#1C1C1C] sm:text-4xl" style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}>
              AI that actually helps
            </h2>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Brain, bg: "bg-[#6B5944]", color: "text-[#EFE9E1]", title: "AI Bullet Enhancement",
                desc: "Transform vague descriptions into powerful, quantified impact statements." },
              { icon: Target, bg: "bg-[#5C4F3F]", color: "text-[#EFE9E1]", title: "Job Description Matching",
                desc: "Paste any JD and get instant keyword gap analysis with suggestions." },
              { icon: Code2, bg: "bg-[#D4A574]", color: "text-[#1C1C1C]", title: "Skills Auto-Suggest",
                desc: "AI detects your role and suggests in-demand skills to add." },
              { icon: GraduationCap, bg: "bg-[#3D5A40]", color: "text-[#EFE9E1]", title: "Personalized Roadmaps",
                desc: "Step-by-step learning path based on your skills and target role." },
              { icon: Briefcase, bg: "bg-[#A0522D]", color: "text-[#EFE9E1]", title: "Interview Prep",
                desc: "Get likely interview questions based on your resume." },
              { icon: Sparkles, bg: "bg-[#2F5233]", color: "text-[#EFE9E1]", title: "Smart Summary",
                desc: "Generate compelling professional summary in one click." },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.05}>
                <div className="rounded-sm border-2 border-[#1C1C1C] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(28,28,28,0.2)] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_rgba(28,28,28,0.25)] hover:translate-x-[-2px] hover:translate-y-[-2px]">
                  <div className={`mb-4 inline-flex size-11 items-center justify-center rounded-sm border-2 border-[#1C1C1C] ${item.bg}`}>
                    <item.icon className={`size-5 ${item.color}`} />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-[#1C1C1C]">{item.title}</h3>
                  <p className="text-sm text-[#5C4F3F]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="border-t-2 border-[#1C1C1C] bg-[#F5F1EB] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { icon: CheckCircle2, color: "text-[#2F5233]", text: "Free to start" },
              { icon: Shield, color: "text-[#5C4F3F]", text: "No credit card" },
              { icon: Clock, color: "text-[#D4A574]", text: "Results in minutes" },
              { icon: Users, color: "text-[#3D5A40]", text: "120k+ users" },
            ].map((item) => (
              <span key={item.text} className="flex items-center gap-2 text-sm font-semibold text-[#1C1C1C]">
                <item.icon className={`size-4 ${item.color}`} />
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
