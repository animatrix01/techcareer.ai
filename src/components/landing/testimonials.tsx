"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ethan Walker",
    role: "Software Engineer",
    company: "Google",
    location: "San Francisco, CA",
    avatar: "EW",
    color: "bg-[#2F5233] text-[#EFE9E1]",
    stars: 5,
    text: "I had been applying for months with zero callbacks. After rebuilding my resume here and running it through the analyzer, I got 3 interview calls in the first week. The ATS score went from 42 to 87.",
  },
  {
    name: "Olivia Carter",
    role: "Product Manager",
    company: "Microsoft",
    location: "Seattle, WA",
    avatar: "OC",
    color: "bg-[#3D5A40] text-[#EFE9E1]",
    stars: 5,
    text: "The roadmap planner genuinely changed how I think about my career. I was switching from engineering to PM and had no idea where to start. The AI gave me a 6-month plan that actually made sense.",
  },
  {
    name: "Mason Reed",
    role: "Frontend Developer",
    company: "Airbnb",
    location: "Austin, TX",
    avatar: "MR",
    color: "bg-[#6B5944] text-[#EFE9E1]",
    stars: 5,
    text: "The templates are genuinely premium. I used the Developer Dark template and my recruiter literally commented on how clean my resume looked. Landed my first senior role.",
  },
  {
    name: "Sophia Bennett",
    role: "Data Analyst",
    company: "Spotify",
    location: "New York, NY",
    avatar: "SB",
    color: "bg-[#8B4513] text-[#EFE9E1]",
    stars: 5,
    text: "I was a fresh graduate with no idea how to write a resume. The AI summary enhancement turned my rough notes into something that sounded genuinely professional. Got my first internship within 3 weeks.",
  },
  {
    name: "Liam Brooks",
    role: "DevOps Engineer",
    company: "Amazon",
    location: "Chicago, IL",
    avatar: "LB",
    color: "bg-[#A0522D] text-[#EFE9E1]",
    stars: 5,
    text: "The analyzer caught things I never would have noticed — weak action verbs, missing metrics, vague descriptions. Fixed them all and my resume finally felt like it belonged at a top company.",
  },
  {
    name: "Emma Collins",
    role: "UX Designer",
    company: "Adobe",
    location: "Toronto, Canada",
    avatar: "EC",
    color: "bg-[#5C4F3F] text-[#EFE9E1]",
    stars: 5,
    text: "As a designer I'm picky about how things look. The Creative Portfolio template is stunning — it actually shows personality while staying ATS-safe. I've recommended this to my entire design cohort.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
      ))}
    </div>
  );
}

export function Testimonials() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 bg-[#EFE9E1]"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="text-sm font-bold uppercase tracking-[0.18em] text-[#2F5233]"
          >
            Real stories
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-2 text-3xl font-black tracking-tight text-[#1C1C1C] sm:text-4xl"
            style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
          >
            People who landed their{" "}
            <span className="text-[#2F5233]">
              next role
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.14 }}
            className="mt-3 text-base text-[#5C4F3F]"
          >
            From fresh graduates to senior engineers — here&apos;s what they said.
          </motion.p>
        </div>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="mb-5 break-inside-avoid rounded-sm border-2 border-[#1C1C1C] bg-[#F5F1EB] p-5 shadow-[3px_3px_0px_0px_rgba(28,28,28,0.15)] transition-all duration-300 hover:shadow-[5px_5px_0px_0px_rgba(28,28,28,0.25)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              <StarRating count={t.stars} />
              <p className="mt-3 text-sm leading-relaxed text-[#1C1C1C]">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className={`flex size-9 shrink-0 items-center justify-center rounded-sm text-xs font-bold border-2 border-[#1C1C1C] ${t.color}`} aria-hidden>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1C1C1C]">{t.name}</p>
                  <p className="text-xs text-[#5C4F3F] font-medium">{t.role} · {t.company} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
