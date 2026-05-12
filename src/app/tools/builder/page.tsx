"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileUp, Sparkles } from "lucide-react";

const startPaths = [
  {
    title: "Create from Scratch",
    description:
      "Choose a template and build your resume section by section with guided prompts.",
    href: "/tools/builder/templates",
    icon: Sparkles,
  },
  {
    title: "Upload my Resume",
    description:
      "Import your existing resume and continue editing in a smarter, structured workflow.",
    href: "/tools/builder/upload",
    icon: FileUp,
  },
];

export default function BuilderHeroPortalPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_55%)]" />
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-6xl flex-col items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
        >
          How would you like to start?
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid w-full gap-4 sm:mt-10 md:grid-cols-2 md:gap-6"
        >
          {startPaths.map((path) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.href}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
              >
                <Link
                  href={path.href}
                  className="group flex h-full min-h-64 flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-colors hover:border-indigo-300 hover:bg-indigo-50/40 hover:shadow-md sm:p-7"
                >
                  <div className="inline-flex size-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                    <Icon className="size-5" aria-hidden />
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
                    {path.title}
                  </h2>
                  <p className="mt-3 max-w-prose text-sm leading-relaxed text-slate-600 sm:text-base">
                    {path.description}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-indigo-700">
                    Continue
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </main>
  );
}
