"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "AI-powered resume builder", us: true, others: false },
  { feature: "ATS score analyzer", us: true, others: false },
  { feature: "Personalized career roadmaps", us: true, others: false },
  { feature: "20+ premium templates", us: true, others: true },
  { feature: "AI summary enhancement", us: true, others: false },
  { feature: "Skill gap suggestions", us: true, others: false },
  { feature: "Saved resumes & roadmaps", us: true, others: true },
  { feature: "Commerce & tech career paths", us: true, others: false },
  { feature: "Free to start", us: true, others: false },
];

export function WhyTechCareer() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-[#EFE9E1]"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-sm font-bold uppercase tracking-[0.18em] text-[#2F5233]"
          >
            Why us
          </motion.p>
          <motion.h2
            id="why-heading"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-2 text-3xl font-black tracking-tight text-[#1C1C1C] sm:text-4xl"
            style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            Built for modern careers.{" "}
            <span className="text-[#2F5233]">
              Not just resumes.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-3 text-base text-[#5C4F3F]"
          >
            Most resume builders stop at templates. We give you the full career toolkit.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-12 overflow-hidden rounded-sm border-2 border-[#1C1C1C] bg-[#F5F1EB] shadow-[3px_3px_0px_0px_rgba(28,28,28,0.15)]"
        >
          <div className="grid grid-cols-[1fr_auto_auto] border-b-2 border-[#1C1C1C] bg-[#EFE9E1] px-6 py-3">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#6B5944]">Feature</span>
            <span className="w-28 text-center text-xs font-bold text-[#2F5233] sm:w-36">TechCareer OS</span>
            <span className="w-28 text-center text-xs font-bold text-[#6B5944] sm:w-36">Others</span>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="grid grid-cols-[1fr_auto_auto] items-center border-b-2 border-[#D4C5B3] px-6 py-3.5 last:border-0 transition-colors hover:bg-[#EFE9E1]"
            >
              <span className="text-sm font-medium text-[#1C1C1C]">{row.feature}</span>
              <div className="flex w-28 justify-center sm:w-36">
                {row.us ? (
                  <span className="flex size-6 items-center justify-center rounded-full border-2 border-[#2F5233] bg-[#2F5233]">
                    <Check className="size-3.5 text-[#EFE9E1]" strokeWidth={2.5} />
                  </span>
                ) : (
                  <span className="flex size-6 items-center justify-center rounded-full border-2 border-[#8B4513] bg-[#F5F1EB]">
                    <X className="size-3.5 text-[#8B4513]" strokeWidth={2.5} />
                  </span>
                )}
              </div>
              <div className="flex w-28 justify-center sm:w-36">
                {row.others ? (
                  <span className="flex size-6 items-center justify-center rounded-full border-2 border-[#6B5944] bg-[#D4C5B3]">
                    <Check className="size-3.5 text-[#6B5944]" strokeWidth={2.5} />
                  </span>
                ) : (
                  <span className="flex size-6 items-center justify-center rounded-full border-2 border-[#8B4513] bg-[#F5F1EB]">
                    <X className="size-3.5 text-[#8B4513]" strokeWidth={2.5} />
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
