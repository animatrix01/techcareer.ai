import Link from "next/link";
import { ATSPanel, RoadmapPanel, CoachPanel } from "../visualizations";

function Feature({
  kicker,
  title,
  body,
  tone,
  tryItHref,
  docsHref,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  body: string;
  tone: "left" | "right";
  tryItHref?: string;
  docsHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`grid gap-10 md:grid-cols-2 items-center ${tone === "right" ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{kicker}</div>
        <h3 className="mt-3 font-serif text-[clamp(2rem,3.5vw,3rem)] leading-[1.05] text-ink">{title}</h3>
        <p className="mt-4 max-w-md text-muted-foreground">{body}</p>
        <div className="mt-6 flex gap-2">
          <Link className="btn-primary" href={tryItHref || "#cta"}>Try it</Link>
          {docsHref && <a className="btn-ghost" href={docsHref}>Read the docs</a>}
        </div>
      </div>
      <div className="relative">
        <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-indigo/10 via-transparent to-mint/15 blur-2xl" />
        {children}
      </div>
    </div>
  );
}

export function Showcase() {
  return (
    <section className="relative py-40">
      <div className="mx-auto max-w-[1180px] px-6 space-y-36">
        <Feature
          kicker="ATS Analyzer"
          title={<>Read the resume <span className="font-serif italic text-indigo">like the bot does.</span></>}
          body="We run your resume through the same parsers Greenhouse, Lever, Workday and Taleo use. See exactly where you fall out — and the one-tap fix to stay in."
          tone="left"
          tryItHref="/tools/analyzer"
          docsHref="#"
        >
          <ATSPanel />
        </Feature>

        <Feature
          kicker="Career Roadmap"
          title={<>A plan that <span className="font-serif italic text-coral">moves</span> when you do.</>}
          body="The roadmap is alive: ship a project, mark a milestone, take a course — the next 12 weeks re-flow around your real progress."
          tone="right"
          tryItHref="/tools/roadmap"
          docsHref="#"
        >
          <RoadmapPanel />
        </Feature>

        <Feature
          kicker="Interview Coach"
          title={<>A loop partner that <span className="font-serif italic text-teal">never gets tired.</span></>}
          body="Voice-in, voice-out mock interviews tuned to your role, your level and the company's known question bank. Detailed rubric after every answer."
          tone="left"
          tryItHref="/tools/coach"
          docsHref="#"
        >
          <CoachPanel />
        </Feature>
      </div>
    </section>
  );
}
