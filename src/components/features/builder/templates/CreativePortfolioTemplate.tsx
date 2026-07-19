"use client";

import type { ResumeBuilderData } from "@/stores/useBuilderStore";
import { RichTextContent } from "@/components/features/builder/rich-text-content";
import { formatSkillsForTemplate } from "@/lib/utils/skills-formatter";

function formatDates(start: string, end: string) {
  const s = start.trim();
  const e = end.trim();
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} - ${e}`;
}



export function CreativePortfolioTemplate({
  resume,
  themeColor,
}: {
  resume: ResumeBuilderData;
  themeColor: string;
}) {
  const { basics, skills, experience, education, projects, certifications } = resume;
  const skillsList = formatSkillsForTemplate(skills);

  return (
    <article
      className="grid min-h-[297mm] grid-cols-[40%_1fr] gap-x-0 bg-white text-slate-900 shadow-md ring-1 ring-slate-200/90"
      aria-label="Creative Portfolio resume template preview"
    >
      {/* Left sidebar with accent */}
      <aside className="px-[6mm] py-[9mm]" style={{ backgroundColor: `${themeColor}15` }}>
        <div
          className="rounded-2xl p-4 text-white"
          style={{ backgroundColor: themeColor }}
        >
          <h1 className="text-[clamp(1rem,2.5cqw,1.35rem)] font-bold leading-tight">
            {basics.fullName.trim() || "Your Name"}
          </h1>
          {basics.jobTitle.trim() && (
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider opacity-95">
              {basics.jobTitle}
            </p>
          )}
        </div>

        <section className="mt-4">
          <h2
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Contact
          </h2>
          <div className="mt-1.5 space-y-1 text-[9px] leading-relaxed text-slate-700">
            {basics.email && <p>{basics.email}</p>}
            {basics.phone && <p>{basics.phone}</p>}
            {basics.location && <p>{basics.location}</p>}
          </div>
        </section>

        {skillsList.length > 0 ? (
          <section className="mt-4">
            <h2
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Skills
            </h2>
            <ul className="mt-1.5 space-y-1.5 text-[9px] text-slate-700">
              {skillsList.map((skill, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div
                    className="size-2 rounded-full"
                    style={{ backgroundColor: themeColor }}
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {education.length > 0 ? (
          <section className="mt-4">
            <h2 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              Education
            </h2>
            <ul className="mt-1.5 space-y-2">
              {education.map((ed) => (
                <li key={ed.id} className="text-[9px] leading-relaxed text-slate-700">
                  <p className="font-semibold text-slate-900">{ed.degree.trim() || "Degree"}</p>
                  <p className="mt-0.5">{ed.institution.trim() || "Institution"}</p>
                  <p className="mt-0.5 text-[8px] text-slate-500">
                    {formatDates(ed.startDate, (ed as any).currentlyStudying ? "Present" : ed.endDate)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {certifications && certifications.length > 0 ? (
          <section className="mt-4">
            <h2 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: themeColor }}>
              Certifications
            </h2>
            <ul className="mt-1.5 space-y-1.5 text-[9px] text-slate-700">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <p className="font-semibold text-slate-900">{cert.name.trim() || "Certification"}</p>
                  <p className="mt-0.5">{cert.issuer}</p>
                  {cert.issueDate && <p className="mt-0.5 text-[8px] text-slate-500">{cert.issueDate}</p>}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </aside>

      {/* Main content */}
      <main className="px-[7mm] py-[9mm]">
        {basics.summary.trim() ? (
          <section>
            <h2
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              About Me
            </h2>
            <RichTextContent
              html={basics.summary}
              className="mt-1.5 text-[10px] leading-relaxed text-slate-700"
            />
          </section>
        ) : null}

        {projects.length > 0 ? (
          <section className="mt-4">
            <h2
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Portfolio
            </h2>
            <ul className="mt-2 space-y-3">
              {projects.map((p) => (
                <li
                  key={p.id}
                  className="rounded-xl border-l-4 bg-slate-50/50 p-3"
                  style={{ borderColor: themeColor }}
                >
                  <p className="text-[10.5px] font-bold text-slate-900">
                    {p.name.trim() || "Project"}
                  </p>
                  {p.techStack.trim() && (
                    <p className="mt-0.5 text-[9px] font-medium" style={{ color: themeColor }}>
                      {p.techStack.trim()}
                    </p>
                  )}
                  {p.description.trim() && (
                    <p className="mt-1 text-[9.5px] leading-relaxed text-slate-700">
                      {p.description.trim()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {experience.length > 0 ? (
          <section className="mt-4">
            <h2
              className="text-[11px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Experience
            </h2>
            <ul className="mt-2 space-y-3">
              {experience.map((job) => (
                <li key={job.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[10.5px] font-bold text-slate-900">
                      {job.role.trim() || "Role"}
                    </p>
                    <p className="text-[9px] text-slate-500">
                      {formatDates(job.startDate, job.endDate)}
                    </p>
                  </div>
                  <p className="mt-0.5 text-[10px] font-semibold text-slate-700">
                    {job.company.trim() || "Company"}
                  </p>
                  {job.description.trim() ? (
                    <RichTextContent
                      html={job.description}
                      className="mt-1 text-[9.5px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </article>
  );
}
