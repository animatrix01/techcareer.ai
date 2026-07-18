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



export function StartupBoldTemplate({
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
      aria-label="Startup Bold resume template preview"
    >
      {/* Left sidebar */}
      <aside
        className="px-[6mm] py-[8mm] text-white"
        style={{ backgroundColor: themeColor }}
      >
        <header>
          <h1 className="text-[clamp(1.2rem,3cqw,1.6rem)] font-bold leading-tight tracking-tight">
            {basics.fullName.trim() || "Your Name"}
          </h1>
          {basics.jobTitle.trim() && (
            <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wider opacity-90">
              {basics.jobTitle}
            </p>
          )}
        </header>

        <section className="mt-5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider opacity-90">
            Contact
          </h2>
          <div className="mt-2 space-y-1 text-[10px] leading-relaxed opacity-95">
            {basics.email && <p>{basics.email}</p>}
            {basics.phone && <p>{basics.phone}</p>}
            {basics.location && <p>{basics.location}</p>}
          </div>
        </section>

        {skillsList.length > 0 ? (
          <section className="mt-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider opacity-90">
              Skills
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {skillsList.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full bg-white/20 px-2.5 py-1 text-[9.5px] font-medium backdrop-blur-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {education.length > 0 ? (
          <section className="mt-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider opacity-90">
              Education
            </h2>
            <ul className="mt-2 space-y-2.5">
              {education.map((ed) => (
                <li key={ed.id} className="text-[10px] leading-relaxed opacity-95">
                  <p className="font-semibold">
                    {ed.degree.trim() || "Degree"}{ed.fieldOfStudy ? ` in ${ed.fieldOfStudy}` : ""}
                  </p>
                  <p className="mt-1">{ed.institution.trim() || "Institution"}</p>
                  {(ed.city || ed.gpa) && (
                    <p className="mt-0.5 text-[9px] opacity-80">
                      {[ed.city, ed.gpa ? `GPA: ${ed.gpa}` : ""].filter(Boolean).join(" • ")}
                    </p>
                  )}
                  <p className="mt-0.5 text-[9px] opacity-80">
                    {formatDates(ed.startDate, ed.currentlyStudying ? "Present" : ed.endDate)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {certifications && certifications.length > 0 ? (
          <section className="mt-5">
            <h2 className="text-[11px] font-bold uppercase tracking-wider opacity-90">
              Certifications
            </h2>
            <ul className="mt-2 space-y-2">
              {certifications.map((cert) => (
                <li key={cert.id} className="text-[9.5px] leading-relaxed opacity-95">
                  <p className="font-semibold">{cert.name.trim() || "Certification"}</p>
                  <p className="mt-0.5">{cert.issuer}</p>
                  {cert.issueDate && (
                    <p className="mt-0.5 text-[8.5px] opacity-80">{cert.issueDate}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </aside>

      {/* Main content */}
      <main className="px-[8mm] py-[8mm]">
        {basics.summary.trim() ? (
          <section>
            <h2
              className="text-[12px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              About
            </h2>
            <RichTextContent
              html={basics.summary}
              className="mt-2 text-[11px] leading-relaxed text-slate-700"
            />
          </section>
        ) : null}

        {experience.length > 0 ? (
          <section className={cn(basics.summary.trim() && "mt-5")}>
            <h2
              className="text-[12px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Experience
            </h2>
            <ul className="mt-2.5 space-y-3.5">
              {experience.map((job) => (
                <li key={job.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[11.5px] font-bold text-slate-900">
                      {job.role.trim() || "Role"}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {formatDates(job.startDate, job.currentlyWorking ? "Present" : job.endDate)}
                    </p>
                  </div>
                  <p className="mt-1 text-[11px] font-semibold text-slate-700">
                    {job.company.trim() || "Company"}
                  </p>
                  {(job.location || job.employmentType) && (
                    <p className="text-[9.5px] text-slate-500">
                      {[job.location, job.employmentType, job.workMode].filter(Boolean).join(" • ")}
                    </p>
                  )}
                  {job.technologies.length > 0 && (
                    <p className="mt-0.5 text-[9.5px] text-slate-600">
                      <span className="font-semibold">Tech:</span> {job.technologies.join(", ")}
                    </p>
                  )}
                  {job.description.trim() ? (
                    <RichTextContent
                      html={job.description}
                      className="mt-1.5 text-[10.5px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4"
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
              className="text-[12px] font-bold uppercase tracking-wider"
              style={{ color: themeColor }}
            >
              Projects
            </h2>
            <ul className="mt-2.5 space-y-3">
              {projects.map((p) => (
                <li key={p.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[11px] font-bold text-slate-900">
                      {p.name.trim() || "Project"}
                    </p>
                    {(p.startDate || p.endDate) && (
                      <p className="text-[9px] text-slate-500">
                        {formatDates(p.startDate, p.endDate)}
                      </p>
                    )}
                  </div>
                  {p.role && (
                    <p className="text-[10px] text-slate-600">{p.role}</p>
                  )}
                  {p.techStack.trim() && (
                    <p className="mt-0.5 text-[10px] text-slate-500">
                      <span className="font-semibold">Tech:</span> {p.techStack.trim()}
                    </p>
                  )}
                  {(p.githubUrl || p.liveUrl) && (
                    <p className="text-[9px] text-slate-500">
                      {[p.githubUrl ? "🔗 GitHub" : null, p.liveUrl ? "🌐 Live" : null].filter(Boolean).join(" • ")}
                    </p>
                  )}
                  {p.description.trim() && (
                    <RichTextContent
                      html={p.description}
                      className="mt-1 text-[10.5px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-3"
                    />
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
