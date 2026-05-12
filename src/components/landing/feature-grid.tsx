"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FilePenLine, Route, ScanSearch } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: FilePenLine,
    title: "Resume builder",
    href: "/tools/builder/upload",
    description:
      "Structured sections, live preview, and export-ready layouts tuned for tech roles.",
    card: "border-t-violet-400 bg-gradient-to-b from-violet-50/90 to-white",
    iconWrap: "bg-violet-100 text-violet-700 ring-violet-200/90",
  },
  {
    icon: ScanSearch,
    title: "Resume analyzer",
    href: "/tools/analyzer",
    description:
      "Upload, parse, and surface actionable feedback with a clear score breakdown.",
    card: "border-t-indigo-400 bg-gradient-to-b from-indigo-50/90 to-white",
    iconWrap: "bg-indigo-100 text-indigo-700 ring-indigo-200/90",
  },
  {
    icon: Route,
    title: "Roadmap planner",
    href: "/tools/roadmap",
    description:
      "Visualize skills and milestones so your next offer stays concrete, not abstract.",
    card: "border-t-amber-400 bg-gradient-to-b from-amber-50/90 to-white",
    iconWrap: "bg-amber-100 text-amber-800 ring-amber-200/90",
  },
] as const;

const containerVariants = (reduceMotion: boolean) =>
  ({
    hidden: {},
    visible: reduceMotion
      ? {}
      : {
          transition: { staggerChildren: 0.08, delayChildren: 0.05 },
        },
  }) as const;

const itemVariants = (reduceMotion: boolean) =>
  reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

export function FeatureGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="features"
      className="scroll-mt-28 border-b border-indigo-200/35 bg-gradient-to-b from-violet-50/50 via-indigo-50/30 to-amber-50/35 py-16 sm:py-20 lg:py-24"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-indigo-600">Product</p>
          <h2
            id="features-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              move forward
            </span>
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">
            Three focused tools that share one calm interface — so you spend
            time executing, not context-switching.
          </p>
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
                  <Card
                    className={cn(
                      "h-full overflow-hidden border border-indigo-100/80 border-t-4 shadow-md shadow-indigo-950/5 backdrop-blur-sm transition-[box-shadow,transform] duration-300",
                      "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10",
                      feature.card
                    )}
                  >
                    <CardHeader className="pb-2">
                      <div
                        className={cn(
                          "mb-3 flex size-11 items-center justify-center rounded-xl ring-1",
                          feature.iconWrap
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <CardTitle className="text-lg text-slate-900">{feature.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed text-slate-600">
                        {feature.description}
                      </CardDescription>
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
