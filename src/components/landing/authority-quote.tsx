"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AuthorityQuote() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 bg-[#EFE9E1]"
      aria-label="Career insight"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.figure
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div
            className="mx-auto mb-6 flex size-12 items-center justify-center rounded-sm border-2 border-[#1C1C1C] text-3xl font-serif text-[#2F5233] bg-[#F5F1EB]"
            aria-hidden
          >
            &ldquo;
          </div>

          <blockquote>
            <p className="text-xl font-medium leading-relaxed tracking-tight text-[#1C1C1C] sm:text-2xl sm:leading-relaxed lg:text-3xl lg:leading-relaxed" style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}>
              Your resume is not a history of where you&apos;ve been.
              <br className="hidden sm:block" />
              <span className="text-[#2F5233]">
                {" "}It&apos;s an argument for where you&apos;re going.
              </span>
            </p>
          </blockquote>

          <figcaption className="mt-8">
            <div className="mx-auto h-0.5 w-12 bg-[#1C1C1C]" aria-hidden />
            <p className="mt-4 text-sm font-bold text-[#6B5944]">
              The philosophy behind every tool we build
            </p>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
