"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FilePenLine, Route, ScanSearch } from "lucide-react";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: FilePenLine,
    title: "Resume builder",
    href: "/tools/builder",
    description: "Structured sections, live preview, and export-ready layouts tuned for every career.",
    card: "border-t-teal-400 bg-gradient-to-b from-teal-50/80 to-white",
    iconWrap: "bg-teal-50 text-teal-700 ring-teal-200/80",
  },
  {
    icon: ScanSearch,
    title: "Resume analyzer",
    href: "/tools/analyzer",
    description: "Upload, parse, and surface actionable feedback with a clear ATS score breakdown.",
    card: "border-t-indigo-400 bg-gradient-to-b from-indigo-50/80 to-white",
    iconWrap: "bg-indigo-50 text-indigo-700 ring-indigo-200/80",
  },
  {
    icon: Route,
    title: "Roadmap planner",
    href: "/tools/roadmap",
    description: "Visualize skills and milestones so your next offer stays concrete, not abstract.",
    card: "border-t-violet-400 bg-gradient-to-b from-violet-50/80 to-white",
    iconWrap: "bg-violet-50 text-violet-700 ring-violet-200/80",
  },
] as const;

const containerVariants = (rm: boolean) => ({
  hidden: {},
  visible: rm ? {} : { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}) as const;

const itemVariants = (rm: boolean) =>
  rm
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } };

export function FeatureGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="features"
      className="relative scroll-mt-28 overflow-hidden border-b border-slate-100 bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="features-heading"
    >
      {/* Subtle teal glow top-left */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute -left-40 -top-20 size-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 65%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute -right-32 bottom-0 size-96 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%)", filter: "blur(70px)" }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600"
          >
            Product
          </motion.p>
          <motion.h2
            id="features-heading"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-teal-500 to-violet-600 bg-clip-text text-transparent">
              move forward
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-3 text-base text-slate-500 sm:text-lg"
          >
            Three focused tools that share one calm interface — so you spend time executing, not context-switching.
          </motion.p>
        </div>

        <motion.ul
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          variants={containerVariants(!!reduceMotion)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.li key={feature.title} variants={itemVariants(!!reduceMotion)}>
                <Link href={feature.href} className="block h-full rounded-xl">
                  <Card className={cn(
                    "h-full overflow-hidden border border-t-4 border-slate-200/60",
                    "shadow-[0_1px_4px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.06)]",
                    "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]",
                    feature.card
                  )}>
                    <CardHeader className="pb-2">
                      <div className={cn("mb-3 flex size-11 items-center justify-center rounded-xl ring-1", feature.iconWrap)}>
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <CardTitle className="text-lg text-slate-900">{feature.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed text-slate-600">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
