import { SectionHeader } from "../atoms";

const steps = [
  { t: "Upload resume", s: "Drop a PDF, LinkedIn URL, or start from a template.", c: "from-mint to-teal" },
  { t: "AI analysis", s: "Parse, structure and benchmark against 4,000+ JD signals.", c: "from-sky to-cyan-soft" },
  { t: "ATS optimization", s: "Re-write, re-rank, re-format. Live score, no guessing.", c: "from-lavender to-indigo-soft" },
  { t: "Skill gap", s: "See the exact missing 6% — and the fastest path to close it.", c: "from-coral to-peach" },
  { t: "Roadmap", s: "Auto-built 12-week plan with daily, doable rituals.", c: "from-peach to-coral" },
  { t: "Interview practice", s: "Real-time STAR coach. Audio in, transcript out, score returned.", c: "from-indigo-soft to-lavender" },
  { t: "Apply", s: "One-click tailored apply across 9 ATS providers.", c: "from-teal to-mint" },
  { t: "Offer", s: "Negotiation scripts and TC benchmarks for 1,200+ companies.", c: "from-indigo to-indigo-soft" },
];

export function Workflow() {
  return (
    <section id="workflow" className="relative py-40">
      <div className="mx-auto max-w-[1180px] px-6">
        <SectionHeader
          kicker="The workflow"
          title={<>From <span className="font-serif italic text-indigo">draft</span> to <span className="font-serif italic text-coral">offer</span> in eight quiet steps.</>}
          sub="No tabs. No spreadsheets. No prompt engineering. Just the next obvious move, made obvious."
        />

        <div className="mt-16 relative">
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent md:block" />
          <ol className="space-y-10">
            {steps.map((s, i) => (
              <li key={i} className={`grid md:grid-cols-2 gap-6 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className={`${i % 2 ? "md:text-left md:pl-10" : "md:text-right md:pr-10"}`}>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Step {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-1 font-serif text-3xl text-ink">{s.t}</h3>
                  <p className="mt-2 text-muted-foreground max-w-md md:inline-block">{s.s}</p>
                </div>
                <div className="relative">
                  <div className={`tile p-5 shadow-float bg-gradient-to-br ${s.c}/20`}>
                    <div className="flex items-center justify-between">
                      <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${s.c} shadow-soft`} />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">·{String(i + 1).padStart(2, "0")}·</span>
                    </div>
                    <div className="mt-3 grid grid-cols-5 gap-1.5">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <div key={k} className={`h-1.5 rounded-full ${k <= i % 5 ? `bg-gradient-to-r ${s.c}` : "bg-muted"}`} />
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <span className="font-mono text-ink">{94 - i * 3}%</span> of users complete this in under {2 + i} min.
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
