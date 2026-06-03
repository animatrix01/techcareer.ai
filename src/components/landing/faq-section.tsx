"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Are the resume templates ATS friendly?",
    a: "Yes. Every template is built with clean, semantic HTML and standard section headings that ATS parsers recognize. We avoid tables, columns, and graphics in the exported version to ensure maximum compatibility.",
  },
  {
    q: "Can I download my resume for free?",
    a: "Yes — building and downloading your resume is completely free. You get access to all templates, the AI analyzer, and the roadmap planner without needing a credit card.",
  },
  {
    q: "How does the AI summary enhancement work?",
    a: "You write a rough summary or even just a few words about your role. Our AI rewrites it into a polished, professional 2-4 sentence summary using strong action language and ATS-friendly keywords — without inventing fake experience or metrics.",
  },
  {
    q: "Can I edit my resume after creating it?",
    a: "Absolutely. All your resumes are saved to your account and accessible from the dashboard. You can edit any section, switch templates, or change the theme color at any time.",
  },
  {
    q: "How does the resume analyzer work?",
    a: "The analyzer runs two passes: a fast rule-based check for missing sections, contact info, and formatting issues — then an AI-powered pass that identifies weak action verbs, vague descriptions, and missing impact metrics. You get a score out of 100 with specific, actionable feedback.",
  },
  {
    q: "Is the roadmap planner beginner friendly?",
    a: "Yes. If you have no existing skills, the AI generates a beginner roadmap starting from fundamentals. If you already have skills, it identifies your gaps and builds a targeted path to your goal role.",
  },
  {
    q: "Which career paths does the roadmap support?",
    a: "The roadmap planner supports 24+ career categories including software engineering, data science, product management, finance, marketing, consulting, HR, and more. It's not limited to tech roles.",
  },
  {
    q: "Is my data private and secure?",
    a: "Your resume data is stored securely and tied to your account. We don't share or sell your data. AI calls are processed server-side and your resume content is not used to train any models.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="border-b-2 border-[#D4C5B3] last:border-0"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-bold text-[#1C1C1C] sm:text-base">{q}</span>
        <span className="mt-0.5 shrink-0 rounded-sm border-2 border-[#1C1C1C] p-1 text-[#5C4F3F] transition-colors duration-200 hover:bg-[#1C1C1C] hover:text-[#EFE9E1]">
          {open ? <Minus className="size-3.5" aria-hidden /> : <Plus className="size-3.5" aria-hidden />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0.1 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-[#5C4F3F]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FaqSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-[#EFE9E1]"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="text-sm font-bold uppercase tracking-[0.18em] text-[#2F5233]"
            >
              FAQ
            </motion.p>
            <motion.h2
              id="faq-heading"
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-2 text-3xl font-black tracking-tight text-[#1C1C1C] sm:text-4xl"
              style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
            >
              Questions we get a lot
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.14 }}
              className="mt-3 text-base text-[#5C4F3F]"
            >
              Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll get back to you.
            </motion.p>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
