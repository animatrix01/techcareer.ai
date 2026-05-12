"use client";

import type { ResumeBuilderData } from "@/stores/useBuilderStore";
import { RichTextContent } from "@/components/features/builder/rich-text-content";

function formatDates(start: string, end: string) {
  const s = start.trim();
  const e = end.trim();
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} - ${e}`;
}

function skillTokens(skills: string) {
  return skills
    .split(/[,•\n]/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function ModernTemplate({
  resume,
  themeColor,
}: {
  resume: ResumeBuilderData;
  themeColor: string;
}) {
  const { basics, skills, experience, education } = resume;
  const skillsList = skillTokens(skills);

  return (
    <article
      className="grid h-full min-h-0 grid-cols-[34%_1fr] bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/80"
      aria-label="Modern resume template preview"
    >
      <aside className="px-[5mm] py-[6mm] text-white" style={{ backgroundColor: themeColor }}>
        <h1 className="font-heading text-[clamp(0.9rem,2.1cqw,1.2rem)] font-semibold leading-tight">
          {basics.fullName.trim() || "Your name"}
        </h1>
        <p className="mt-2 text-[8px] uppercase tracking-[0.12em] text-white/85">
          Contact
        </p>
        <p className="mt-1 text-[9px] leading-relaxed text-white/95">
          {[basics.email, basics.phone, basics.location].filter(Boolean).length
            ? [basics.email, basics.phone, basics.location].filter(Boolean).join(" \u2022 ")
            : "email \u2022 phone \u2022 city"}
        </p>

        {skillsList.length > 0 ? (
          <section className="mt-4">
            <h2 className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/80">
              Skills
            </h2>
            <ul className="mt-2 space-y-1">
              {skillsList.map((skill, index) => (
                <li key={`${skill}-${index}`} className="text-[9px] text-white/95">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </aside>

      <main className="min-h-0 px-[6mm] py-[6mm]">
        {basics.summary.trim() ? (
          <section>
            <h2 className="text-[8px] font-bold uppercase tracking-wider text-slate-600">
              Professional Summary
            </h2>
            <RichTextContent
              html={basics.summary}
              className="mt-1 text-[10px] font-normal leading-relaxed text-slate-700"
            />
          </section>
        ) : null}

        {experience.length > 0 ? (
          <section className="mt-2.5">
            <h2 className="text-[8px] font-bold uppercase tracking-wider text-slate-600">
              Experience
            </h2>
            <ul className="mt-1.5 space-y-2">
              {experience.map((job) => (
                <li key={job.id}>
                  <div className="flex items-baseline justify-between gap-1.5">
                    <p className="text-[10.5px] font-semibold text-zinc-900">
                      {job.role.trim() || "Role"}
                    </p>
                    <p className="text-[8.5px] font-normal text-slate-500">
                      {formatDates(job.startDate, job.endDate)}
                    </p>
                  </div>
                  <p className="text-[9.5px] font-normal text-slate-600">
                    {job.company.trim() || "Company"}
                  </p>
                  {job.description.trim() ? (
                    <RichTextContent
                      html={job.description}
                      className="mt-0.5 text-[9px] font-normal text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-3"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {education.length > 0 ? (
          <section className="mt-2.5">
            <h2 className="text-[8px] font-bold uppercase tracking-wider text-slate-600">
              Education
            </h2>
            <ul className="mt-1.5 space-y-1.5">
              {education.map((ed) => (
                <li key={ed.id}>
                  <div className="flex items-baseline justify-between gap-1.5">
                    <p className="text-[10px] font-semibold text-zinc-900">
                      {ed.institution.trim() || "School"}
                    </p>
                    <p className="text-[8.5px] font-normal text-slate-500">
                      {formatDates(ed.startDate, ed.endDate)}
                    </p>
                  </div>
                  <p className="text-[9px] font-normal text-slate-700">{ed.degree}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </article>
  );
}
