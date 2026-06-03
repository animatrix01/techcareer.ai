"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  FileUp, 
  Sparkles, 
  Target, 
  CheckCircle2,
  TrendingUp, 
  Users, 
  Download,
  Shield,
  FileText,
  Brain,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PremiumResumeBuilderPage() {
  return (
    <main className="w-full overflow-x-hidden bg-[#EFE9E1]">
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
      
      {/* ════════════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[95vh] overflow-hidden">
        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
          
          {/* Left: Hero Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-sm border-2 border-[#2F5233] bg-[#2F5233] px-4 py-1.5 text-xs font-bold text-[#EFE9E1]"
            >
              <Sparkles className="h-3 w-3" />
              AI-POWERED RESUME BUILDER
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="mt-6 text-balance text-5xl font-black leading-[1.1] tracking-tight text-[#1C1C1C] sm:text-6xl lg:text-7xl"
              style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              Build{" "}
              <span className="text-[#2F5233]">
                job-winning
              </span>{" "}
              resumes with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-[#5C4F3F]"
            >
              Stop struggling with blank pages. Our AI writes compelling summaries, 
              optimizes for ATS systems, and gets you hired faster.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="mt-8 flex flex-wrap gap-6 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm border-2 border-[#1C1C1C] bg-[#3D5A40]">
                  <TrendingUp className="h-4 w-4 text-[#EFE9E1]" />
                </div>
                <span className="font-bold text-[#1C1C1C]">94% ATS Pass Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm border-2 border-[#1C1C1C] bg-[#5C4F3F]">
                  <Users className="h-4 w-4 text-[#EFE9E1]" />
                </div>
                <span className="font-bold text-[#1C1C1C]">50K+ Hired</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="/tools/builder/templates"
                className="inline-flex items-center gap-2 rounded-sm border-2 border-[#1C1C1C] bg-[#2F5233] px-8 py-4 text-sm font-bold text-[#EFE9E1] shadow-[6px_6px_0px_0px_rgba(28,28,28,0.25)] transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(28,28,28,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
              >
                Start Building Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tools/builder/upload"
                className="inline-flex items-center gap-2 rounded-sm border-2 border-[#1C1C1C] bg-white px-8 py-4 text-sm font-bold text-[#1C1C1C] shadow-[4px_4px_0px_0px_rgba(28,28,28,0.2)] transition-all duration-200 hover:bg-[#F5F1EB]"
              >
                <FileUp className="h-4 w-4" />
                Upload Resume
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-5 text-xs font-medium text-[#6B5944]"
            >
              {["No credit card required", "ATS-optimized templates", "AI-powered suggestions"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#2F5233]" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Vintage Resume Paper */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            className="hidden lg:flex lg:justify-center lg:items-center"
          >
            <div className="relative w-80 h-[520px]">
              {/* Main resume container - vintage paper */}
              <div className="relative w-full h-full rounded-sm border-2 border-[#1C1C1C] bg-white shadow-[10px_10px_0px_0px_rgba(28,28,28,0.2)] overflow-hidden">
                
                {/* Paper texture */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
                }} />

                {/* Resume Header */}
                <div className="border-b-2 border-[#1C1C1C] bg-[#2F5233] p-6 text-[#EFE9E1]">
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="text-lg font-bold" style={{ fontFamily: 'ui-serif, Georgia, Cambria' }}
                  >
                    SARAH JOHNSON
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mt-1 font-mono text-sm"
                  >
                    Senior Software Engineer
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="mt-2 space-y-1 font-mono text-xs"
                  >
                    <div>sarah.johnson@email.com</div>
                    <div>San Francisco, CA</div>
                  </motion.div>
                </div>

                {/* AI Badge - retro stamp style */}
                <motion.div
                  initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: -12, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.8 }}
                  className="absolute right-4 top-4 z-10 rounded-sm border-2 border-[#A0522D] bg-[#A0522D] px-3 py-1.5 text-xs font-bold text-white shadow-md"
                >
                  AI ENHANCED
                </motion.div>

                {/* Resume Content */}
                <div className="space-y-5 p-6">
                  
                  {/* Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2 }}
                  >
                    <h3 className="mb-2 border-b-2 border-[#1C1C1C] text-sm font-bold uppercase tracking-wide text-[#1C1C1C]">SUMMARY</h3>
                    <div className="space-y-2 font-mono text-[10px]">
                      <div className="h-1.5 w-full bg-[#D4C5B3]" />
                      <div className="h-1.5 w-5/6 bg-[#D4C5B3]" />
                      <div className="h-1.5 w-4/5 bg-[#D4C5B3]" />
                    </div>
                  </motion.div>

                  {/* Experience */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.2 }}
                  >
                    <h3 className="mb-3 border-b-2 border-[#1C1C1C] text-sm font-bold uppercase tracking-wide text-[#1C1C1C]">EXPERIENCE</h3>
                    
                    <div className="mb-4 font-mono">
                      <div className="mb-1 flex items-start justify-between text-xs">
                        <div className="font-semibold text-[#1C1C1C]">Senior Engineer</div>
                        <div className="text-[#5C4F3F]">2021 - Now</div>
                      </div>
                      <div className="mb-2 text-xs text-[#6B5944]">TechCorp Inc</div>
                      <div className="space-y-1">
                        <div className="h-1 w-full bg-[#E8E1D5]" />
                        <div className="h-1 w-4/5 bg-[#E8E1D5]" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Skills */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.4 }}
                  >
                    <h3 className="mb-3 border-b-2 border-[#1C1C1C] text-sm font-bold uppercase tracking-wide text-[#1C1C1C]">SKILLS</h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Node.js", "Python"].map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 2.6 + i * 0.1 }}
                          className="rounded-sm border border-[#1C1C1C] bg-[#F5F1EB] px-2 py-1 font-mono text-xs font-medium text-[#1C1C1C]"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                </div>

                {/* ATS Score - retro badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                  className="absolute bottom-4 left-4 rounded-sm border-2 border-[#1C1C1C] bg-[#3D5A40] px-3 py-2 text-xs font-bold text-white shadow-md"
                >
                  ATS: 94/100
                </motion.div>

              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative border-t-2 border-[#1C1C1C] bg-[#F5F1EB] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-black text-[#1C1C1C]" style={{ fontFamily: 'ui-serif, Georgia, Cambria' }}>
              How it works
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-[#5C4F3F]">
              Our AI transforms your experience into a job-winning resume in minutes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Upload or Start Fresh",
                description: "Import your existing resume or choose from our ATS-optimized templates",
                icon: FileUp
              },
              {
                step: "02", 
                title: "AI Enhancement",
                description: "Our AI analyzes and enhances your content with industry keywords",
                icon: Brain
              },
              {
                step: "03",
                title: "Download & Apply",
                description: "Get your optimized resume and start landing interviews",
                icon: Download
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-sm border-2 border-[#1C1C1C] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(28,28,28,0.2)] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_rgba(28,28,28,0.25)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm border-2 border-[#1C1C1C] bg-[#2F5233]">
                    <Icon className="h-5 w-5 text-[#EFE9E1]" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-[#1C1C1C]" style={{ fontFamily: 'ui-serif, Georgia, Cambria' }}>
                    {item.title}
                  </h3>
                  <p className="font-medium leading-relaxed text-[#5C4F3F]">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          AI FEATURES
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative border-t-2 border-[#1C1C1C] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-black text-[#1C1C1C]" style={{ fontFamily: 'ui-serif, Georgia, Cambria' }}>
              Powered by{" "}
              <span className="text-[#2F5233]">
                advanced AI
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-[#5C4F3F]">
              Every feature is designed to give you an unfair advantage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "AI Summary Writer",
                description: "Transform weak bullet points into compelling summaries",
                icon: Brain,
                color: "#5C4F3F"
              },
              {
                title: "ATS Optimization",
                description: "Ensure your resume passes tracking systems",
                icon: Shield,
                color: "#3D5A40"
              },
              {
                title: "Smart Keywords",
                description: "AI adds industry-specific keywords",
                icon: Target,
                color: "#8B4513"
              },
              {
                title: "Job Tailoring",
                description: "Customize for specific job descriptions",
                icon: FileText,
                color: "#D4A574"
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-sm border-2 border-[#1C1C1C] bg-white p-6 shadow-[4px_4px_0px_0px_rgba(28,28,28,0.2)] transition-all duration-200 hover:shadow-[6px_6px_0px_0px_rgba(28,28,28,0.25)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-sm border-2 border-[#1C1C1C]" style={{ backgroundColor: feature.color }}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-[#1C1C1C]">{feature.title}</h3>
                  <p className="text-sm font-medium text-[#5C4F3F]">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative border-t-2 border-[#1C1C1C] bg-[#2F5233] py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-4xl font-black text-[#EFE9E1]" style={{ fontFamily: 'ui-serif, Georgia, Cambria' }}
          >
            Start building your resume today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-10 text-lg font-medium text-[#D4C5B3]"
          >
            Join 50,000+ professionals who landed their dream jobs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/tools/builder/templates"
              className="inline-flex items-center gap-2 rounded-sm border-2 border-[#1C1C1C] bg-[#EFE9E1] px-8 py-4 text-sm font-bold text-[#1C1C1C] shadow-[6px_6px_0px_0px_rgba(28,28,28,0.4)] transition-all duration-200 hover:shadow-[8px_8px_0px_0px_rgba(28,28,28,0.5)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
