"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, BookOpen, Code2, Server,
  FolderGit2, BriefcaseBusiness, Sparkles,
  CheckCircle2, X, ChevronDown, Cpu, Zap,
  Target, Brain,
} from "lucide-react";
import { useRoadmapStore } from "@/stores/useRoadmapStore";
import { RoleAutocomplete } from "@/components/roadmap/RoleAutocomplete";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Milestone {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  difficultyColor: string;
  skills: string[];
  nodeColor: string;
  glowColor: string;
  cardAccent: string;
  side: "left" | "right";
}

// ─── Journey data ─────────────────────────────────────────────────────────────

const MILESTONES: Milestone[] = [
  {
    id: 1,
    icon: BookOpen,
    title: "Foundations",
    description: "Every expert was once a beginner. Build the mental models that make everything else click.",
    duration: "3–4 weeks",
    difficulty: "Beginner",
    difficultyColor: "text-teal-700 bg-teal-50 border-teal-200",
    skills: ["HTML", "CSS", "Git", "Terminal", "Internet basics"],
    nodeColor: "from-violet-500 to-violet-600",
    glowColor: "shadow-violet-300",
    cardAccent: "border-l-violet-400",
    side: "right",
  },
  {
    id: 2,
    icon: Code2,
    title: "Frontend Development",
    description: "Turn static pages into living, breathing interfaces. This is where ideas become real.",
    duration: "6–8 weeks",
    difficulty: "Beginner",
    difficultyColor: "text-teal-700 bg-teal-50 border-teal-200",
    skills: ["JavaScript", "React", "Tailwind CSS", "APIs", "State management"],
    nodeColor: "from-blue-500 to-blue-600",
    glowColor: "shadow-blue-300",
    cardAccent: "border-l-blue-400",
    side: "left",
  },
  {
    id: 3,
    icon: Server,
    title: "Backend & Databases",
    description: "The engine under the hood. Learn to store, retrieve, and protect data at scale.",
    duration: "6–8 weeks",
    difficulty: "Intermediate",
    difficultyColor: "text-blue-700 bg-blue-50 border-blue-200",
    skills: ["Node.js", "PostgreSQL", "REST APIs", "Auth", "Deployment"],
    nodeColor: "from-teal-500 to-teal-600",
    glowColor: "shadow-teal-300",
    cardAccent: "border-l-teal-400",
    side: "right",
  },
  {
    id: 4,
    icon: FolderGit2,
    title: "Real Projects",
    description: "Theory without practice is just trivia. Build things that matter and prove what you know.",
    duration: "4–6 weeks",
    difficulty: "Intermediate",
    difficultyColor: "text-blue-700 bg-blue-50 border-blue-200",
    skills: ["Portfolio site", "SaaS clone", "Open source", "Code reviews"],
    nodeColor: "from-amber-500 to-orange-500",
    glowColor: "shadow-amber-300",
    cardAccent: "border-l-amber-400",
    side: "left",
  },
  {
    id: 5,
    icon: BriefcaseBusiness,
    title: "Job Ready",
    description: "You've done the work. Now let the world know. Land the role you've been building toward.",
    duration: "2–3 weeks",
    difficulty: "Advanced",
    difficultyColor: "text-violet-700 bg-violet-50 border-violet-200",
    skills: ["Resume", "LinkedIn", "Interview prep", "ATS optimization", "Negotiation"],
    nodeColor: "from-violet-600 to-indigo-600",
    glowColor: "shadow-violet-400",
    cardAccent: "border-l-indigo-400",
    side: "right",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Main page ────────────────────────────────────────────────────────────────

export default function RoadmapInputPage() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const formInViewRef = useRef<HTMLDivElement>(null);
  const formIsInView = useInView(formInViewRef, { once: true, margin: "-100px" });
  const [skillInput, setSkillInput] = useState("");

  const targetRole = useRoadmapStore((s) => s.targetRole);
  const currentSkills = useRoadmapStore((s) => s.currentSkills);
  const setTargetRole = useRoadmapStore((s) => s.setTargetRole);
  const addSkill = useRoadmapStore((s) => s.addSkill);
  const removeSkill = useRoadmapStore((s) => s.removeSkill);

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      addSkill(skillInput.trim());
      setSkillInput("");
    }
  };

  const isDisabled = !targetRole || targetRole.trim().length === 0;

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="w-full overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden py-24 lg:py-32">

        <div className="relative mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-center">
          {/* Left: headline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full bg-indigo/10 border border-indigo/20 px-4 py-1.5 text-xs font-medium text-indigo"
            >
              <Sparkles className="h-3 w-3" />
              AI-POWERED CAREER NAVIGATION
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="mt-5 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-ink"
            >
              Stop guessing.{" "}
              <span className="text-indigo">
                Start mapping.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mt-6 max-w-lg text-lg text-muted-foreground"
            >
              Too many tutorials. Too little direction. Our AI builds a
              personalized, skill-ordered roadmap so you always know exactly
              what to learn next.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={scrollToForm}
                className="btn-primary"
              >
                Build My Roadmap
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={scrollToForm}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-ink"
              >
                See the journey
                <ChevronDown className="h-4 w-4" />
              </button>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-5 text-xs text-muted-foreground"
            >
              {["Personalized to your level", "Skill-ordered by AI", "Free to generate"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-mint" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Interactive AI Roadmap Generator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            className="hidden lg:flex lg:justify-center lg:items-center"
          >
            <div className="relative w-96 h-96">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-100/60 via-blue-100/40 to-teal-100/60 rounded-3xl blur-2xl" />
              
              {/* Main container */}
              <div className="relative w-full h-full rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-2xl overflow-hidden">
                
                {/* Floating skill bubbles */}
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 left-6 px-3 py-1.5 bg-violet-100/80 border border-violet-200/60 rounded-full text-xs font-medium text-violet-700 backdrop-blur-sm"
                >
                  React
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, 6, 0],
                    rotate: [0, -1, 0]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-16 right-8 px-3 py-1.5 bg-blue-100/80 border border-blue-200/60 rounded-full text-xs font-medium text-blue-700 backdrop-blur-sm"
                >
                  Node.js
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, 1.5, 0]
                  }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-20 left-8 px-3 py-1.5 bg-teal-100/80 border border-teal-200/60 rounded-full text-xs font-medium text-teal-700 backdrop-blur-sm"
                >
                  PostgreSQL
                </motion.div>

                {/* Central AI processing animation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Pulsing core */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg flex items-center justify-center"
                    >
                      <Cpu className="w-7 h-7 text-white" />
                    </motion.div>
                    
                    {/* Orbiting elements */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0"
                    >
                      <div className="relative w-16 h-16">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-400 shadow-lg" />
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400 shadow-lg" />
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-teal-400 shadow-lg" />
                        <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-lg" />
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Animated roadmap cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute top-24 left-12 w-32 h-16 bg-white/90 border border-slate-200/60 rounded-xl shadow-lg backdrop-blur-sm p-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-violet-400" />
                    <div className="text-xs font-semibold text-slate-700">Foundations</div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">3-4 weeks</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="absolute bottom-24 right-12 w-32 h-16 bg-white/90 border border-slate-200/60 rounded-xl shadow-lg backdrop-blur-sm p-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400" />
                    <div className="text-xs font-semibold text-slate-700">Job Ready</div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">2-3 weeks</div>
                </motion.div>

                {/* Connecting lines animation */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <motion.path
                    d="M 80 100 Q 200 150 320 250"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, delay: 1.8, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M 150 300 Q 250 200 350 150"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, delay: 2.2, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, Math.sin(i) * 10, 0],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4
                    }}
                    className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-violet-400 to-blue-400"
                    style={{
                      left: `${20 + (i * 12)}%`,
                      top: `${30 + (i * 8)}%`
                    }}
                  />
                ))}

                {/* AI scanning effect */}
                <motion.div
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent"
                />

                {/* Status indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.5 }}
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-teal-50/90 border border-teal-200/60 rounded-full backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-teal-500"
                  />
                  <span className="text-xs font-medium text-teal-700">AI Analyzing</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PREMIUM TIMELINE EXPERIENCE — Two-column immersive layout
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">

        {/* Section intro */}
        <div className="relative mx-auto mb-20 max-w-3xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            AI-POWERED CAREER NAVIGATION
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
            className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink"
          >
            Your personalized path to{" "}
            <span className="text-indigo italic">
              career success
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.14, ease: EASE }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Watch how our AI transforms scattered learning into a structured journey
          </motion.p>
        </div>

        {/* Two-column premium layout */}
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* LEFT COLUMN - Story & Insights */}
            <div className="space-y-24">
              
              {/* Insight Block 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-100/50 to-blue-100/30 rounded-3xl blur-xl" />
                <div className="relative rounded-3xl border border-white/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-violet-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-violet-600">The Problem</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Most developers quit because they learn randomly
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Without a clear path, 73% of aspiring developers give up within 6 months. 
                    They jump between tutorials, frameworks, and concepts without understanding 
                    how everything connects.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    Our AI solves this with skill-ordered learning
                  </div>
                </div>
              </motion.div>

              {/* Insight Block 2 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/50 to-teal-100/30 rounded-3xl blur-xl" />
                <div className="relative rounded-3xl border border-white/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">The Solution</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Every milestone builds on the previous one
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our AI analyzes thousands of successful developer journeys to create 
                    the optimal learning sequence. Each skill unlocks naturally from the last, 
                    creating momentum instead of confusion.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Personalized to your current level
                  </div>
                </div>
              </motion.div>

              {/* Insight Block 3 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-100/50 to-amber-100/30 rounded-3xl blur-xl" />
                <div className="relative rounded-3xl border border-white/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600">The Result</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Projects unlock only after foundations are complete
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    No more tutorial hell. No more imposter syndrome. Each project phase 
                    builds confidence because you have the exact skills needed to succeed. 
                    Real portfolio pieces, not toy examples.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                    <BriefcaseBusiness className="w-4 h-4 text-violet-500" />
                    Ready for real job interviews
                  </div>
                </div>
              </motion.div>

            </div>

            {/* RIGHT COLUMN - Large Premium Roadmap Visual */}
            <div className="relative lg:sticky lg:top-24 lg:h-fit">
              
              {/* Roadmap container with enhanced styling */}
              <div className="relative">
                
                {/* Background glow for roadmap */}
                <div className="absolute inset-0 bg-gradient-to-b from-violet-100/40 via-blue-100/30 to-teal-100/40 rounded-3xl blur-2xl scale-110" />
                
                {/* Main roadmap container */}
                <div className="relative rounded-3xl border border-white/60 bg-white/50 backdrop-blur-xl p-8 shadow-2xl">
                  
                  {/* Animated flowing roadmap line */}
                  <div className="absolute left-12 top-16 bottom-16 w-1 overflow-hidden rounded-full">
                    <div className="absolute inset-0 bg-gradient-to-b from-violet-200 via-blue-200 via-teal-200 to-amber-200" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-violet-500 via-blue-500 via-teal-500 to-amber-500"
                      initial={{ scaleY: 0, transformOrigin: "top" }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-200px" }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
                    {/* Flowing glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-violet-400 via-blue-400 to-teal-400 opacity-60 blur-sm"
                      animate={{ 
                        backgroundPosition: ["0% 0%", "0% 100%"],
                        opacity: [0.4, 0.8, 0.4]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>

                  {/* Premium milestone cards */}
                  <div className="space-y-12">
                    {MILESTONES.map((milestone, index) => {
                      const Icon = milestone.icon;
                      return (
                        <motion.div
                          key={milestone.id}
                          initial={{ opacity: 0, x: 40 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.6, delay: index * 0.15, ease: EASE }}
                          className="relative flex items-start gap-6"
                        >
                          {/* Enhanced node */}
                          <div className="relative z-10 flex-shrink-0">
                            <motion.div
                              whileInView={{
                                boxShadow: [
                                  "0 0 0 0px rgba(139,92,246,0.4)",
                                  "0 0 0 12px rgba(139,92,246,0)",
                                  "0 0 0 0px rgba(139,92,246,0.4)",
                                ],
                              }}
                              transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${milestone.nodeColor} shadow-xl ${milestone.glowColor} ring-4 ring-white`}
                            >
                              <Icon className="h-7 w-7 text-white" />
                            </motion.div>
                          </div>

                          {/* Premium milestone card */}
                          <motion.div
                            whileHover={{ y: -2, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                            transition={{ duration: 0.2 }}
                            className="flex-1 rounded-2xl border border-white/80 bg-white/90 p-6 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-200"
                          >
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <h4 className="text-xl font-bold text-slate-900">{milestone.title}</h4>
                              <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${milestone.difficultyColor}`}>
                                {milestone.difficulty}
                              </span>
                            </div>
                            
                            <p className="text-slate-600 leading-relaxed mb-4">
                              {milestone.description}
                            </p>
                            
                            {/* Skills grid */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {milestone.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-200"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            
                            {/* Duration with enhanced styling */}
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                              <Zap className="h-4 w-4 text-amber-500" />
                              <span>{milestone.duration}</span>
                              <div className="ml-auto flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-teal-400" />
                                <span className="text-xs text-teal-600">On track</span>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Completion indicator */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="mt-12 flex items-center justify-center"
                  >
                    <div className="flex items-center gap-3 rounded-full border border-teal-200 bg-teal-50 px-6 py-3 shadow-lg">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Cpu className="h-5 w-5 text-teal-600" />
                      </motion.div>
                      <span className="text-sm font-bold text-teal-700">Career Ready</span>
                    </div>
                  </motion.div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          PREMIUM ROADMAP BUILDER CTA — Split layout with interactive preview
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 py-32">
        {/* Enhanced atmospheric background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-violet-200/30 via-blue-200/20 to-teal-200/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/25 via-cyan-200/20 to-violet-200/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-teal-200/20 to-blue-200/15 rounded-full blur-3xl" />
        </div>

        {/* Subtle background grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            
            {/* Left: Interactive Roadmap Preview */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative order-2 lg:order-1"
            >
              {/* Background glow for roadmap container */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-100/50 via-blue-100/30 to-teal-100/40 rounded-3xl blur-2xl scale-110" />
              
              {/* Main roadmap container */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl p-8 overflow-hidden">
                
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-blue-100 rounded-full text-sm font-semibold text-violet-700 mb-4"
                  >
                    <Sparkles className="w-4 h-4" />
                    AI-Generated Roadmap
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl font-bold text-slate-900"
                  >
                    Senior Frontend Engineer
                  </motion.h3>
                </div>

                {/* Vertical roadmap path */}
                <div className="relative">
                  {/* Animated connecting line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-violet-200 via-blue-200 via-teal-200 to-amber-200" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-violet-500 via-blue-500 via-teal-500 to-amber-500"
                      initial={{ scaleY: 0, transformOrigin: "top" }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                    />
                  </div>

                  {/* Roadmap milestones */}
                  <div className="space-y-6">
                    {[
                      { 
                        title: "Foundations", 
                        duration: "3-4 weeks", 
                        skills: ["HTML", "CSS", "Git"], 
                        color: "from-violet-500 to-violet-600",
                        delay: 0.6 
                      },
                      { 
                        title: "Frontend", 
                        duration: "6-8 weeks", 
                        skills: ["React", "TypeScript", "APIs"], 
                        color: "from-blue-500 to-blue-600",
                        delay: 0.8 
                      },
                      { 
                        title: "Backend", 
                        duration: "6-8 weeks", 
                        skills: ["Node.js", "PostgreSQL", "Auth"], 
                        color: "from-teal-500 to-teal-600",
                        delay: 1.0 
                      },
                      { 
                        title: "Projects", 
                        duration: "4-6 weeks", 
                        skills: ["Portfolio", "SaaS Clone"], 
                        color: "from-amber-500 to-orange-500",
                        delay: 1.2 
                      },
                      { 
                        title: "Job Ready", 
                        duration: "2-3 weeks", 
                        skills: ["Resume", "Interview Prep"], 
                        color: "from-violet-600 to-indigo-600",
                        delay: 1.4 
                      }
                    ].map((milestone, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: milestone.delay }}
                        whileHover={{ x: 4, transition: { duration: 0.2 } }}
                        className="relative flex items-start gap-4 group cursor-pointer"
                      >
                        {/* Node */}
                        <div className="relative z-10 flex-shrink-0">
                          <motion.div
                            whileInView={{
                              boxShadow: [
                                "0 0 0 0px rgba(139,92,246,0.4)",
                                "0 0 0 8px rgba(139,92,246,0)",
                                "0 0 0 0px rgba(139,92,246,0.4)",
                              ],
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${milestone.color} flex items-center justify-center text-white font-bold shadow-lg ring-4 ring-white group-hover:scale-105 transition-transform duration-200`}
                          >
                            {i + 1}
                          </motion.div>
                        </div>

                        {/* Milestone card */}
                        <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 p-4 shadow-md group-hover:shadow-lg group-hover:bg-white/80 transition-all duration-200">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-slate-900">{milestone.title}</h4>
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                              {milestone.duration}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {milestone.skills.map((skill) => (
                              <span key={skill} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -15, 0],
                      x: [0, Math.sin(i) * 8, 0],
                      opacity: [0.2, 0.6, 0.2]
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3
                    }}
                    className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-violet-400 to-blue-400"
                    style={{
                      left: `${15 + (i * 10)}%`,
                      top: `${20 + (i * 8)}%`
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right: Form and Copy */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              {/* Header copy */}
              <div className="mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-blue-100 rounded-full text-sm font-semibold text-violet-700 mb-6"
                >
                  <Target className="w-4 h-4" />
                  Your personalized roadmap starts here
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-4xl font-bold tracking-tight text-slate-900 mb-4 lg:text-5xl"
                >
                  Stop learning{" "}
                  <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    randomly
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-lg text-slate-600 leading-relaxed mb-6"
                >
                  Our AI organizes every skill in the exact order you need it. 
                  No more tutorial hell. No more wasted months.
                </motion.p>

                {/* Benefits */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="grid grid-cols-2 gap-4 mb-8"
                >
                  {[
                    { icon: Brain, text: "AI skill ordering" },
                    { icon: Zap, text: "Beginner friendly" },
                    { icon: Target, text: "Job-focused path" },
                    { icon: CheckCircle2, text: "Real hiring results" }
                  ].map((benefit, i) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-violet-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{benefit.text}</span>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Premium form card */}
              <div ref={formRef}>
                <motion.div
                  ref={formInViewRef}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
                  className="relative"
                >
                  {/* Form glow background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 rounded-3xl blur-xl scale-105" />
                  
                  {/* Form container */}
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/80 shadow-2xl p-8">
                    <div className="space-y-6">
                      {/* Target role */}
                      <div>
                        <label htmlFor="target-role" className="mb-3 block text-sm font-semibold text-slate-700">
                          What&apos;s your target role?
                        </label>
                        <div className="relative">
                          <RoleAutocomplete
                            id="target-role"
                            value={targetRole ?? ""}
                            onChange={setTargetRole}
                            placeholder="e.g. Senior Frontend Engineer"
                          />
                          <motion.div
                            className="absolute inset-0 rounded-xl border-2 border-violet-400/50 pointer-events-none opacity-0"
                            animate={targetRole ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                      </div>

                      {/* Current skills */}
                      <div>
                        <label htmlFor="current-skills" className="mb-2 block text-sm font-semibold text-slate-700">
                          Current Skills{" "}
                          <span className="text-xs font-normal text-slate-400">(Optional)</span>
                        </label>
                        <p className="mb-3 text-xs text-slate-500">
                          Press Enter after each skill. Leave empty for a beginner-friendly path.
                        </p>
                        <input
                          id="current-skills"
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={handleSkillKeyDown}
                          placeholder="e.g. HTML, CSS, JavaScript…"
                          className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100/50 hover:border-slate-300"
                        />
                        {currentSkills.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4 flex flex-wrap gap-2"
                          >
                            {currentSkills.map((skill) => (
                              <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  aria-label={`Remove ${skill}`}
                                  className="inline-flex h-4 w-4 items-center justify-center rounded-full text-violet-400 transition hover:bg-violet-200 hover:text-violet-700"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </motion.span>
                            ))}
                          </motion.div>
                        )}
                      </div>

                      {/* Enhanced CTA button */}
                      <motion.button
                        type="button"
                        disabled={isDisabled}
                        onClick={() => router.push("/tools/roadmap/building")}
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative h-14 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-violet-200/60 transition-all duration-200 hover:shadow-xl hover:shadow-violet-300/60 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        <div className="relative flex items-center justify-center gap-2">
                          Generate My Roadmap
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={formIsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500"
                >
                  {[
                    { icon: CheckCircle2, text: "Personalized roadmap" },
                    { icon: Sparkles, text: "AI skill ordering" },
                    { icon: Zap, text: "Beginner friendly" },
                    { icon: Target, text: "Built for real hiring paths" }
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <span key={i} className="flex items-center gap-1.5">
                        <Icon className="h-3.5 w-3.5 text-teal-500" />
                        {item.text}
                      </span>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
