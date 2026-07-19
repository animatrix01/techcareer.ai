"use client";

import type { ResumeBuilderData } from "@/stores/useBuilderStore";
import { RichTextContent } from "@/components/features/builder/rich-text-content";
import { formatSkillsForTemplate } from "@/lib/utils/skills-formatter";
import { cn } from "@/lib/utils";

function formatDates(start: string, end: string) {
  const s = start.trim();
  const e = end.trim();
  if (!s && !e) return "";
  if (!s) return e;
  if (!e) return s;
  return `${s} - ${e}`;
}



export function CreativeSidebarTemplate({
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
      className="grid min-h-[297mm] grid-cols-[35%_1fr] bg-white text-slate-900 shadow-md ring-1 ring-slate-200/90"
      aria-label="Creative Sidebar resume template preview"
    >
      {/* Left sidebar */}
      <aside className="bg-slate-50 px-5 py-8">
        <header>
          <div
            className="inline-block rounded-lg px-3 py-2 text-white"
            style={{ backgroundColor: themeColor }}
          >
            <h1 className="text-lg font-bold leading-tight">
              {basics.fullName.trim() || "Your Name"}
            </h1>
          </div>
          {basics.jobTitle.trim() && (
            <p
              className="mt-2 text-xs font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              {basics.jobTitle}
            </p>
          )}
        </header>

        <section className="mt-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Contact
          </h2>
          <div className="mt-2 space-y-1 text-[11px] leading-relaxed text-slate-700">
            {basics.email && <p className="break-all">{basics.email}</p>}
            {basics.phone && <p>{basics.phone}</p>}
            {basics.location && <p>{basics.location}</p>}
          </div>
        </section>

        {skillsList.length > 0 ? (
          <section className="mt-5">
            <h2
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Skills
            </h2>
            <ul className="mt-2 space-y-1.5 text-[11px] text-slate-700">
              {skillsList.map((skill, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span
                    className="mt-1.5 size-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: themeColor }}
                  />
                  <span className="break-words">{skill}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {education.length > 0 ? (
          <section className="mt-5">
            <h2
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Education
            </h2>
            <ul className="mt-2 space-y-3">
              {education.map((ed) => (
                <li key={ed.id} className="text-[11px] leading-relaxed text-slate-700">
                  <p className="font-semibold text-slate-900">{ed.degree.trim() || "Degree"}</p>
                  <p className="mt-1">{ed.institution.trim() || "Institution"}</p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    {formatDates(ed.startDate, (ed as any).currentlyStudying ? "Present" : ed.endDate)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {certifications && certifications.length > 0 ? (
          <section className="mt-5">
            <h2
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Certifications
            </h2>
            <ul className="mt-2 space-y-2 text-[11px] text-slate-700">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <p className="font-semibold text-slate-900">{cert.name.trim() || "Certification"}</p>
                  <p className="mt-1">{cert.issuer}</p>
                  {cert.issueDate && <p className="mt-1 text-[10px] text-slate-500">{cert.issueDate}</p>}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </aside>

      {/* Main content */}
      <main className="px-6 py-8">
        {basics.summary.trim() ? (
          <section>
            <h2
              className="border-b-2 pb-1 text-sm font-bold uppercase tracking-wider"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Profile
            </h2>
            <RichTextContent
              html={basics.summary}
              className="mt-2 text-[11.5px] leading-relaxed text-slate-700"
            />
          </section>
        ) : null}

        {experience.length > 0 ? (
          <section className={cn(basics.summary.trim() && "mt-5")}>
            <h2
              className="border-b-2 pb-1 text-sm font-bold uppercase tracking-wider"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Experience
            </h2>
            <ul className="mt-3 space-y-4">
              {experience.map((job) => (
                <li key={job.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900">
                      {job.role.trim() || "Role"}
                    </p>
                    <p className="text-[10px] text-slate-500 flex-shrink-0">
                      {formatDates(job.startDate, job.endDate)}
                    </p>
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-slate-700">
                    {job.company.trim() || "Company"}
                  </p>
                  {job.description.trim() ? (
                    <RichTextContent
                      html={job.description}
                      className="mt-1.5 text-[11px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {projects.length > 0 ? (
          <section className="mt-5">
            <h2
              className="border-b-2 pb-1 text-sm font-bold uppercase tracking-wider"
              style={{ borderColor: themeColor, color: themeColor }}
            >
              Projects
            </h2>
            <ul className="mt-3 space-y-3">
              {projects.map((p) => (
                <li key={p.id}>
                  <p className="text-xs font-bold text-slate-900">
                    {p.name.trim() || "Project"}
                    {p.techStack.trim() && (
                      <span className="ml-2 text-[10px] font-normal text-slate-500">
                        {p.techStack.trim()}
                      </span>
                    )}
                  </p>
                  {p.role && <p className="mt-0.5 text-[11px] text-slate-600">{p.role}</p>}
                  {p.description.trim() && (
                    <RichTextContent html={p.description} className="mt-1 text-[11px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4" />
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </article>
  );
}
