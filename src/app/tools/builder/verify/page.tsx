"use client";

import Link from "next/link";

const extractedSkills = ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS"];

const extractedHighlights = [
  "Led frontend migration to Next.js, improving Lighthouse performance score by 28%.",
  "Built reusable UI components that reduced new feature development time by 20%.",
  "Collaborated with product and design teams to ship a resume builder workflow.",
];

export default function VerifyExtractionPage() {
  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900 flex flex-col">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/tools/builder/upload"
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Back
          </Link>

          <p className="text-center text-sm font-semibold sm:text-base">
            Step 2: Verify AI Extraction
          </p>

          <Link
            href="/tools/builder/editor/contact"
            className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Looks Good -&gt; Continue
          </Link>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Original Document</h2>
          <p className="mt-1 text-sm text-slate-600">
            Compare your uploaded resume with the extracted data before continuing.
          </p>

          <div className="mt-5 flex min-h-[560px] items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 p-6">
            <div className="flex h-full w-full max-w-md items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm">
              <p className="text-center text-sm text-slate-500">
                PDF preview placeholder
                <br />
                Your original document will appear here.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Extracted Data</h2>
          <p className="mt-1 text-sm text-slate-600">
            Please review and fix any AI mistakes before moving to the editor.
          </p>

          <div className="mt-5 max-h-[calc(100vh-210px)] space-y-5 overflow-y-auto pr-1">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="verify-name">
                Name
              </label>
              <input
                id="verify-name"
                type="text"
                defaultValue="Animesh Sharma"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="verify-email">
                Email
              </label>
              <input
                id="verify-email"
                type="email"
                defaultValue="animesh.sharma@email.com"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-900">Job Experience</h3>
              <p className="mt-1 text-sm text-slate-700">Frontend Developer - NovaTech Labs</p>
              <p className="text-xs text-slate-500">Jan 2023 - Present</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {extractedHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {extractedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </article>
      </section>
    </main>
  );
}
