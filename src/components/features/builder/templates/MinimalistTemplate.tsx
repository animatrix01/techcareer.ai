"use client";

import { RichTextContent } from "@/components/features/builder/rich-text-content";
import type { ResumeBuilderData } from "@/stores/useBuilderStore";

function fmt(start: string, end: string) {
  const s = start.trim();
  const e = end.trim();
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} – ${e}`;
}

function skills(raw: string) {
  return raw.split(/[,•\n]/g).map((s) => s.trim()).filter(Boolean);
}

export function MinimalistTemplate({ resume }: { resume: ResumeBuilderData }) {
  const { basics, skills: rawSkills, experience, education, projects } = resume;
  const skillList = skills(rawSkills);

  return (
    <article
      className="h-full min-h-0 bg-white px-[12mm] py-[10mm] text-slate-900"
      aria-label="Minimalist resume template"
    >
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-[clamp(1.2rem,3.4cqw,1.7rem)] font-light tracking-[0.04em] text-slate-950">
          {basics.fullName.trim() || "Your Name"}
        </h1>
        {basics.jobTitle.trim() && (
          <p className="mt-1 text-[clamp(0.65rem,1.8cqw,0.9rem)] font-normal text-slate-500">
            {basics.jobTitle.trim()}
          </p>
        )}
        <div className="mt-2.5 flex flex-wrap gap-x-3 text-[9.5px] text-slate-400">
          {basics.email.trim() && <span>{basics.email.trim()}</span>}
          {basics.phone.trim() && <span>{basics.phone.trim()}</span>}
          {basics.location.trim() && <span>{basics.location.trim()}</span>}
        </div>
      </header>

      {/* Summary */}
      {basics.summary.trim() && (
        <section className="mb-5">
          <RichTextContent
            html={basics.summary}
            className="text-[10.5px] leading-relaxed text-slate-600 italic"
          />
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <Rule />
          <h2 className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Experience
          </h2>
          <ul className="space-y-3.5">
            {experience.map((job) => (
              <li key={job.id} className="grid grid-cols-[1fr_auto] gap-x-3">
                <div>
                  <p className="text-[11px] font-semibold text-slate-900">{job.role.trim() || "Role"}</p>
                  <p className="text-[10px] text-slate-500">{job.company.trim() || "Company"}</p>
                  {job.description.trim() && (
                    <RichTextContent
                      html={job.description}
                      className="mt-1 text-[9.5px] leading-relaxed text-slate-600 [&_ul]:list-disc [&_ul]:pl-3 [&_ul]:space-y-0.5"
                    />
                  )}
                </div>
                <p className="mt-0.5 text-right text-[9px] text-slate-400 whitespace-nowrap">
                  {fmt(job.startDate, job.endDate)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <Rule />
          <h2 className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Projects
          </h2>
          <ul className="space-y-2.5">
            {projects.map((p) => (
              <li key={p.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[11px] font-semibold text-slate-900">{p.name.trim() || "Project"}</p>
                  {p.stack.trim() && (
                    <p className="text-[9px] text-slate-400">{p.stack.trim()}</p>
                  )}
                </div>
                {p.description.trim() && (
                  <p className="mt-1 text-[9.5px] leading-relaxed text-slate-600">{p.description.trim()}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <Rule />
          <h2 className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Education
          </h2>
          <ul className="space-y-2">
            {education.map((ed) => (
              <li key={ed.id} className="grid grid-cols-[1fr_auto] gap-x-3">
                <div>
                  <p className="text-[11px] font-semibold text-slate-900">{ed.degree.trim() || "Degree"}</p>
                  <p className="text-[10px] text-slate-500">{ed.institution.trim() || "Institution"}</p>
                </div>
                <p className="mt-0.5 text-right text-[9px] text-slate-400 whitespace-nowrap">
                  {fmt(ed.startDate, ed.endDate)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      {skillList.length > 0 && (
        <section>
          <Rule />
          <h2 className="mb-2.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Skills
          </h2>
          <p className="text-[10px] leading-relaxed text-slate-600">
            {skillList.join("  ·  ")}
          </p>
        </section>
      )}
    </article>
  );
}

function Rule() {
  return <div className="mb-2 h-px w-full bg-slate-100" />;
}
