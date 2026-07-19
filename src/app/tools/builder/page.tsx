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
    <main className="w-full overflow-x-hidden">
      
      {/* ════════════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] overflow-hidden py-24 lg:py-32">
        <div className="relative mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:items-center">
          
          {/* Left: Hero Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full bg-indigo/10 border border-indigo/20 px-4 py-1.5 text-xs font-medium text-indigo"
            >
              <Sparkles className="h-3 w-3" />
              AI-POWERED RESUME BUILDER
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="mt-6 font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-ink"
            >
              Build{" "}
              <span className="text-indigo">
                job-winning
              </span>{" "}
              resumes with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mt-6 max-w-lg text-lg text-muted-foreground"
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
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint/20">
                  <TrendingUp className="h-4 w-4 text-teal" />
                </div>
                <span className="font-semibold text-ink">94% ATS Pass Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky/20">
                  <Users className="h-4 w-4 text-sky" />
                </div>
                <span className="font-semibold text-ink">50K+ Hired</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
              className="mt-10 flex justify-center lg:justify-start"
            >
              <Link
                href="/tools/builder/templates"
                className="btn-primary"
              >
                Start Building Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-5 text-xs text-muted-foreground"
            >
              {["No credit card required", "ATS-optimized templates", "AI-powered suggestions"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-mint" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Modern Resume Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            className="hidden lg:flex lg:justify-center lg:items-center"
          >
            <div className="relative w-80 h-[520px]">
              {/* Main resume container - modern tile */}
              <div className="tile relative w-full h-full overflow-hidden">
                
                {/* Resume Header */}
                <div className="border-b border-border bg-indigo/5 p-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="font-serif text-lg font-semibold text-ink"
                  >
                    SARAH JOHNSON
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mt-1 text-sm text-ink/80"
                  >
                    Senior Software Engineer
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="mt-2 space-y-1 text-xs text-muted-foreground"
                  >
                    <div>sarah.johnson@email.com</div>
                    <div>San Francisco, CA</div>
                  </motion.div>
                </div>

                {/* AI Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.8 }}
                  className="absolute right-4 top-4 z-10 rounded-full bg-indigo/15 px-3 py-1 text-xs font-semibold text-indigo"
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
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink/60">SUMMARY</h3>
                    <div className="space-y-2">
                      <div className="h-1.5 w-full rounded-full bg-muted" />
                      <div className="h-1.5 w-5/6 rounded-full bg-muted" />
                      <div className="h-1.5 w-4/5 rounded-full bg-muted" />
                    </div>
                  </motion.div>

                  {/* Experience */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.2 }}
                  >
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink/60">EXPERIENCE</h3>
                    
                    <div className="mb-4">
                      <div className="mb-1 flex items-start justify-between text-xs">
                        <div className="font-semibold text-ink">Senior Engineer</div>
                        <div className="text-muted-foreground">2021 - Now</div>
                      </div>
                      <div className="mb-2 text-xs text-muted-foreground">TechCorp Inc</div>
                      <div className="space-y-1">
                        <div className="h-1 w-full rounded-full bg-muted" />
                        <div className="h-1 w-4/5 rounded-full bg-muted" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Skills */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 2.4 }}
                  >
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink/60">SKILLS</h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Node.js", "Python"].map((skill, i) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 2.6 + i * 0.1 }}
                          className="rounded-lg bg-indigo/10 px-2.5 py-1 text-xs font-medium text-indigo"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                </div>

                {/* ATS Score */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.8 }}
                  className="absolute bottom-4 left-4 rounded-lg bg-mint/20 border border-mint/30 px-3 py-2 text-xs font-semibold text-teal"
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
      <section className="relative py-32">
        <div className="mx-auto max-w-[1180px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              How it works
            </div>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink">
              Transform your experience into a <span className="text-indigo italic">job-winning</span> resume
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Our AI analyzes and enhances your content with industry keywords in minutes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Upload or Start Fresh",
                description: "Import your existing resume or choose from our ATS-optimized templates",
                icon: FileUp,
                color: "mint"
              },
              {
                step: "02", 
                title: "AI Enhancement",
                description: "Our AI analyzes and enhances your content with industry keywords",
                icon: Brain,
                color: "indigo"
              },
              {
                step: "03",
                title: "Download & Apply",
                description: "Get your optimized resume and start landing interviews",
                icon: Download,
                color: "sky"
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
                  className="tile group transition-all duration-300 hover:-translate-y-2 hover:shadow-float"
                >
                  <div className="p-6">
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-${item.color}/10`}>
                      <Icon className={`h-5 w-5 text-${item.color}`} />
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          AI FEATURES
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32">
        <div className="mx-auto max-w-[1180px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              AI Features
            </div>
            <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] text-ink">
              Powered by <span className="text-indigo italic">advanced AI</span>
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Every feature is designed to give you an unfair advantage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "AI Summary Writer",
                description: "Transform weak bullet points into compelling summaries",
                icon: Brain,
                color: "indigo"
              },
              {
                title: "ATS Optimization",
                description: "Ensure your resume passes tracking systems",
                icon: Shield,
                color: "mint"
              },
              {
                title: "Smart Keywords",
                description: "AI adds industry-specific keywords",
                icon: Target,
                color: "coral"
              },
              {
                title: "Job Tailoring",
                description: "Customize for specific job descriptions",
                icon: FileText,
                color: "sky"
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
                  className="tile transition-all duration-300 hover:-translate-y-2 hover:shadow-float"
                >
                  <div className="p-6">
                    <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-${feature.color}/10`}>
                      <Icon className={`h-5 w-5 text-${feature.color}`} />
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-ink">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32">
        <div className="mx-auto max-w-[1180px] px-6">
          <div className="tile overflow-hidden bg-gradient-to-br from-indigo/10 via-lavender/10 to-mint/10">
            <div className="px-8 py-24 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-ink"
              >
                Start building your resume today
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-6 text-lg text-muted-foreground"
              >
                Join 50,000+ professionals who landed their dream jobs
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-10"
              >
                <Link
                  href="/tools/builder/templates"
                  className="btn-primary text-base"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
