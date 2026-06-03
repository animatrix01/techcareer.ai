"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const stats = [
  { value: 52000, suffix: "+", label: "Resumes created", description: "and counting every day" },
  { value: 89, suffix: "%", label: "ATS success rate", description: "across all templates" },
  { value: 120000, suffix: "+", label: "Careers improved", description: "by our AI tools" },
  { value: 10000, suffix: "+", label: "Roadmaps generated", description: "for every career path" },
];

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(0) + "k";
  return n.toString();
}

function AnimatedCounter({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) { setCount(target); return; }
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, reduceMotion]);

  return <span ref={ref}>{formatNumber(count)}{suffix}</span>;
}

export function StatsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 bg-[#EFE9E1]"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-sm font-bold uppercase tracking-[0.18em] text-[#2F5233]"
          >
            By the numbers
          </motion.p>
          <motion.h2
            id="stats-heading"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-2 text-3xl font-black tracking-tight text-[#1C1C1C] sm:text-4xl"
            style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            Trusted by job seekers worldwide
          </motion.h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-sm border-2 border-[#1C1C1C] bg-[#F5F1EB] p-6 shadow-[3px_3px_0px_0px_rgba(28,28,28,0.15)] transition-all duration-300 hover:shadow-[5px_5px_0px_0px_rgba(28,28,28,0.25)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              {/* Top accent bar */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[#2F5233]" />
              
              <p className="relative text-3xl font-black tracking-tight text-[#1C1C1C] sm:text-4xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="relative mt-1.5 text-sm font-bold text-[#3D5A40]">{stat.label}</p>
              <p className="relative mt-0.5 text-xs text-[#6B5944]">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {["✦ Updated this week", "✦ ATS optimized", "✦ Trusted worldwide", "✦ Free to start"].map((tag) => (
            <span key={tag} className="rounded-sm border-2 border-[#1C1C1C] bg-[#EFE9E1] px-3 py-1 text-xs font-medium text-[#5C4F3F]">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
