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

export function ModernTemplate({
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
      className="grid min-h-[297mm] grid-cols-[30%_1fr] bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200/80"
      aria-label="Modern resume template preview"
    >
      <aside className="px-5 py-7 text-white" style={{ backgroundColor: themeColor }}>
        <h1 className="font-heading text-xl font-semibold leading-tight">
          {basics.fullName.trim() || "Your name"}
        </h1>
        <p className="mt-3 text-xs uppercase tracking-wider text-white/85">
          Contact
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-white/95">
          {[basics.email, basics.phone, basics.location].filter(Boolean).length
            ? [basics.email, basics.phone, basics.location].filter(Boolean).join(" • ")
            : "email • phone • city"}
        </p>

        {skillsList.length > 0 ? (
          <section className="mt-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white/80">
              Skills
            </h2>
            <ul className="mt-2 space-y-1.5">
              {skillsList.map((skill, index) => (
                <li key={`${skill}-${index}`} className="text-[11px] text-white/95">
                  • {skill}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </aside>

      <main className="min-h-0 px-6 py-7">
        {basics.summary.trim() ? (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Professional Summary
            </h2>
            <RichTextContent
              html={basics.summary}
              className="mt-2 text-[11.5px] font-normal leading-relaxed text-slate-700"
            />
          </section>
        ) : null}

        {experience.length > 0 ? (
          <section className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Experience
            </h2>
            <ul className="mt-3 space-y-3">
              {experience.map((job) => (
                <li key={job.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-xs font-semibold text-zinc-900">
                      {job.role.trim() || "Role"}
                    </p>
                    <p className="text-[10px] font-normal text-slate-500 flex-shrink-0">
                      {formatDates(job.startDate, job.currentlyWorking ? "Present" : job.endDate)}
                    </p>
                  </div>
                  <p className="text-[11px] font-normal text-slate-600">
                    {job.company.trim() || "Company"}
                  </p>
                  {(job.location || job.employmentType || job.workMode) && (
                    <p className="text-[10px] text-slate-500">
                      {[
                        job.location,
                        job.employmentType && job.employmentType.charAt(0).toUpperCase() + job.employmentType.slice(1).replace('-', ' '),
                        job.workMode && job.workMode.charAt(0).toUpperCase() + job.workMode.slice(1)
                      ].filter(Boolean).join(" • ")}
                    </p>
                  )}
                  {job.technologies.length > 0 && (
                    <p className="mt-1 text-[10px] text-slate-600">
                      <span className="font-semibold">Tech:</span> {job.technologies.join(", ")}
                    </p>
                  )}
                  {job.description.trim() ? (
                    <RichTextContent
                      html={job.description}
                      className="mt-1.5 text-[11px] font-normal leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {education.length > 0 ? (
          <section className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Education
            </h2>
            <ul className="mt-3 space-y-2">
              {education.map((ed) => (
                <li key={ed.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[11.5px] font-semibold text-zinc-900">
                      {ed.institution.trim() || "School"}
                    </p>
                    <p className="text-[10px] font-normal text-slate-500 flex-shrink-0">
                      {formatDates(ed.startDate, ed.currentlyStudying ? "Present" : ed.endDate)}
                    </p>
                  </div>
                  <p className="text-[11px] font-normal text-slate-700">
                    {ed.degree}{ed.fieldOfStudy ? ` in ${ed.fieldOfStudy}` : ""}
                  </p>
                  {(ed.city || ed.gpa) && (
                    <p className="text-[10px] text-slate-500">
                      {[ed.city, ed.gpa ? `GPA: ${ed.gpa}` : ""].filter(Boolean).join(" • ")}
                    </p>
                  )}
                  {ed.description.trim() && (
                    <RichTextContent
                      html={ed.description}
                      className="mt-1 text-[10px] leading-relaxed text-slate-600 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4"
                    />
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {projects.length > 0 ? (
          <section className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Projects
            </h2>
            <ul className="mt-3 space-y-3">
              {projects.map((project) => (
                <li key={project.id}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-[11.5px] font-semibold text-zinc-900">
                      {project.name.trim() || "Project"}
                    </p>
                    {(project.githubUrl || project.liveUrl) && (
                      <p className="text-[9px] text-slate-500 flex-shrink-0">
                        {[
                          project.githubUrl ? "GitHub" : null,
                          project.liveUrl ? "Live" : null
                        ].filter(Boolean).join(" • ")}
                      </p>
                    )}
                  </div>
                  {project.role && (
                    <p className="text-[10px] text-slate-600">{project.role}</p>
                  )}
                  {project.techStack && (
                    <p className="text-[10px] text-slate-500">
                      <span className="font-semibold">Tech:</span> {project.techStack}
                    </p>
                  )}
                  {project.description.trim() && (
                    <RichTextContent
                      html={project.description}
                      className="mt-1 text-[11px] leading-relaxed text-slate-700 [&_ul]:list-disc [&_ul]:space-y-0.5 [&_ul]:pl-4"
                    />
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {certifications && certifications.length > 0 ? (
          <section className="mt-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600">
              Certifications
            </h2>
            <ul className="mt-3 space-y-2">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <p className="text-[11.5px] font-semibold text-zinc-900">
                    {cert.name.trim() || "Certification"}
                  </p>
                  <p className="text-[11px] text-slate-600">{cert.issuer}</p>
                  {(cert.issueDate || cert.credentialId) && (
                    <p className="text-[10px] text-slate-500">
                      {[
                        cert.issueDate,
                        cert.credentialId ? `ID: ${cert.credentialId}` : ""
                      ].filter(Boolean).join(" • ")}
                    </p>
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
