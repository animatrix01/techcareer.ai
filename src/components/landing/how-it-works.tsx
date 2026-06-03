"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, LayoutTemplate, ScanSearch, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: 1,
    icon: LayoutTemplate,
    title: "Choose a template",
    description: "Pick from 20+ professionally designed layouts — each one ATS-friendly out of the box.",
    accent: "#2F5233",
    iconBg: "bg-[#F5F1EB] text-[#2F5233] border-2 border-[#2F5233]",
  },
  {
    number: 2,
    icon: Sparkles,
    title: "Build with AI assistance",
    description: "Let AI sharpen your summary, suggest bullet points, and surface the right skills for your target role.",
    accent: "#3D5A40",
    iconBg: "bg-[#F5F1EB] text-[#3D5A40] border-2 border-[#3D5A40]",
  },
  {
    number: 3,
    icon: ScanSearch,
    title: "Analyze & improve ATS score",
    description: "Get a clear score breakdown with specific, actionable fixes before you hit send.",
    accent: "#6B5944",
    iconBg: "bg-[#F5F1EB] text-[#6B5944] border-2 border-[#6B5944]",
  },
  {
    number: 4,
    icon: Download,
    title: "Download and apply",
    description: "Export a pixel-perfect PDF and apply with confidence — your resume is ready for any ATS.",
    accent: "#2F5233",
    iconBg: "bg-[#F5F1EB] text-[#2F5233] border-2 border-[#2F5233]",
  },
] as const;

const containerVariants = (rm: boolean) => ({
  hidden: {},
  visible: rm ? {} : { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}) as const;

const itemVariants = (rm: boolean) =>
  rm
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } } };

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-28 overflow-hidden py-20 sm:py-28 lg:py-32 bg-[#EFE9E1]"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-sm font-bold uppercase tracking-[0.18em] text-[#2F5233]"
          >
            How it works
          </motion.p>
          <motion.h2
            id="how-it-works-heading"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-2 text-3xl font-black tracking-tight text-[#1C1C1C] sm:text-4xl"
            style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            How your next role{" "}
            <span className="text-[#2F5233]">
              starts here
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-3 text-base text-[#5C4F3F] sm:text-lg"
          >
            Four steps from blank page to submitted application — no guesswork, no wasted effort.
          </motion.p>
        </div>

        <div className="relative mt-14">
          {/* Connecting line desktop */}
          <div className="absolute inset-x-0 top-9 hidden h-px lg:block" aria-hidden>
            <div className="mx-auto max-w-5xl px-[calc(12.5%+1rem)]">
              <div className="h-px w-full bg-[#D4C5B3]" />
            </div>
          </div>

          <motion.ol
            className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
            variants={containerVariants(!!reduceMotion)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.number}
                  variants={itemVariants(!!reduceMotion)}
                  className={cn(
                    "group relative flex flex-col items-center rounded-sm border-2 border-[#1C1C1C] bg-[#F5F1EB] px-6 py-8",
                    "shadow-[3px_3px_0px_0px_rgba(28,28,28,0.15)]",
                    "transition-all duration-300 hover:shadow-[5px_5px_0px_0px_rgba(28,28,28,0.25)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                  )}
                >
                  <div
                    className="relative z-10 flex size-[2.375rem] items-center justify-center rounded-full text-sm font-bold text-[#EFE9E1] shadow-sm border-2 border-[#1C1C1C]"
                    style={{ background: step.accent }}
                  >
                    {step.number}
                  </div>
                  <div className={cn("mt-5 flex size-12 items-center justify-center rounded-sm", step.iconBg)}>
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-center text-base font-bold text-[#1C1C1C]">{step.title}</h3>
                  <p className="mt-2 text-center text-sm leading-relaxed text-[#5C4F3F]">{step.description}</p>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
