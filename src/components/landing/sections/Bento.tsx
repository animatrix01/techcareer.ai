import { Pill, Dot, SectionHeader } from "../atoms";
import { ResumeMock } from "../visualizations";

function Heatmap() {
  const cells = Array.from({ length: 7 * 5 });
  return (
    <div className="mt-4 grid grid-cols-7 gap-1.5">
      {cells.map((_, i) => {
        const v = (Math.sin(i * 1.7) + 1) / 2;
        const bg = v > 0.75 ? "bg-coral" : v > 0.5 ? "bg-peach" : v > 0.25 ? "bg-mint/70" : "bg-muted";
        return <div key={i} className={`aspect-square rounded-[5px] ${bg}`} style={{ opacity: 0.4 + v * 0.6 }} />;
      })}
    </div>
  );
}

function RoadmapTimeline() {
  const steps = [
    { w: "Wk 1", t: "System Design", c: "bg-mint" },
    { w: "Wk 3", t: "Case Studies", c: "bg-sky" },
    { w: "Wk 6", t: "Mock Loops", c: "bg-lavender" },
    { w: "Wk 9", t: "Negotiation", c: "bg-coral" },
    { w: "Wk 12", t: "Offer", c: "bg-indigo" },
  ];
  return (
    <div className="mt-5 relative">
      <div className="absolute left-0 right-0 top-3 h-px bg-border" />
      <div className="relative grid grid-cols-5 gap-2">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`h-6 w-6 rounded-full ${s.c} ring-4 ring-paper`} />
            <div className="mt-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{s.w}</div>
            <div className="text-xs font-medium text-ink">{s.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InterviewMock() {
  return (
    <div className="mt-4 space-y-2">
      <div className="rounded-xl rounded-tl-sm bg-muted px-3 py-2 text-xs max-w-[85%]">
        Tell me about a time you shipped under ambiguity.
      </div>
      <div className="rounded-xl rounded-tr-sm bg-indigo px-3 py-2 text-xs text-paper max-w-[85%] ml-auto">
        Q4 last year, our roadmap pivoted twice in three weeks…
      </div>
      <div className="rounded-xl border border-border bg-paper/80 px-3 py-2 text-[11px] text-muted-foreground">
        <span className="font-mono text-mint">●</span> Strong STAR structure · suggest tightening result by 1 sentence
      </div>
    </div>
  );
}

function TemplateMini() {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      {["from-paper to-cream", "from-ink to-ink", "from-coral/30 to-peach/40"].map((g, i) => (
        <div key={i} className={`aspect-[3/4] rounded-md bg-gradient-to-br ${g} border border-border p-2 shadow-soft`}>
          <div className={`h-1.5 w-2/3 rounded-full ${i === 1 ? "bg-paper/40" : "bg-ink/60"}`} />
          <div className="mt-1.5 space-y-1">
            {[80, 60, 70, 50].map((w, j) => (
              <div key={j} className={`h-0.5 rounded-full ${i === 1 ? "bg-paper/25" : "bg-ink/20"}`} style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function WorkflowMini() {
  return (
    <svg viewBox="0 0 220 110" className="mt-4 w-full">
      <defs>
        <linearGradient id="wm" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.7 0.13 275)"/>
          <stop offset="1" stopColor="oklch(0.7 0.11 195)"/>
        </linearGradient>
      </defs>
      <path d="M10,55 Q70,10 110,55 T210,55" stroke="url(#wm)" strokeWidth="1.5" fill="none" className="flow-dash" />
      {[10, 70, 110, 150, 210].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={i % 2 === 0 ? 55 : i === 1 ? 25 : 85} r="5" fill="oklch(0.42 0.18 275)" />
          <circle cx={x} cy={i % 2 === 0 ? 55 : i === 1 ? 25 : 85} r="10" fill="oklch(0.42 0.18 275 / 0.18)" />
        </g>
      ))}
    </svg>
  );
}

export function Bento() {
  return (
    <section id="product" className="relative py-40">
      <div className="mx-auto max-w-[1180px] px-6">
        <SectionHeader
          kicker="The toolkit"
          title={<>One canvas. <span className="font-serif italic text-indigo">Every</span> career tool you&apos;d otherwise tab between.</>}
          sub="Each surface is a first-class product, designed in-house, sharing one data model."
        />

        <div className="mt-14 grid grid-cols-12 gap-4 auto-rows-[120px]">
          {/* Resume Builder — big left */}
          <div className="tile col-span-12 md:col-span-7 row-span-3 p-6 bg-gradient-to-br from-paper to-cream">
            <div className="flex items-center justify-between">
              <Pill tone="lavender">01 · Resume Builder</Pill>
              <span className="font-mono text-[10px] text-muted-foreground">draft · saved</span>
            </div>
            <div className="mt-3 font-serif text-[2rem] leading-tight text-ink">Write with an AI that knows what hiring managers skim for.</div>
            <ResumeMock />
          </div>

          {/* ATS Score */}
          <div className="tile col-span-12 md:col-span-5 row-span-2 p-6 bg-gradient-to-br from-mint/40 to-paper">
            <Pill tone="mint">02 · Live ATS</Pill>
            <div className="mt-4 flex items-center gap-5">
              <div className="relative h-32 w-32">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="50" stroke="oklch(0.93 0.01 270)" strokeWidth="10" fill="none" />
                  <circle cx="60" cy="60" r="50" stroke="oklch(0.42 0.18 275)" strokeWidth="10" fill="none"
                    strokeDasharray="314" strokeDashoffset="44" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="font-serif text-4xl text-ink">86</div>
                    <div className="text-[10px] text-muted-foreground tracking-widest">SCORE</div>
                  </div>
                </div>
              </div>
              <ul className="flex-1 space-y-2 text-sm">
                <li className="flex items-center gap-2"><Dot tone="mint"/> Keyword density healthy</li>
                <li className="flex items-center gap-2"><Dot tone="peach"/> Add &quot;system design&quot;</li>
                <li className="flex items-center gap-2"><Dot tone="sky"/> Tighten line 14</li>
              </ul>
            </div>
          </div>

          {/* Skill heatmap */}
          <div className="tile col-span-6 md:col-span-3 row-span-2 p-5 bg-gradient-to-br from-coral/25 to-peach/30">
            <Pill tone="coral">03 · Skill Heatmap</Pill>
            <Heatmap />
          </div>

          {/* Job match */}
          <div className="tile col-span-6 md:col-span-2 row-span-2 p-5 bg-gradient-to-br from-sky/40 to-cyan-soft/40">
            <Pill tone="sky">04 · Job Match</Pill>
            <div className="mt-4 font-serif text-5xl text-ink">94<span className="text-2xl text-muted-foreground">%</span></div>
            <div className="mt-1 text-xs text-muted-foreground">Senior PM · Stripe</div>
            <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden"><div className="h-full w-[94%] bg-indigo" /></div>
          </div>

          {/* Roadmap timeline */}
          <div className="tile col-span-12 md:col-span-7 row-span-2 p-6 bg-gradient-to-br from-paper to-lavender/25">
            <div className="flex items-center justify-between">
              <Pill tone="lavender">05 · Career Roadmap</Pill>
              <span className="font-mono text-[10px] text-muted-foreground">12-week plan</span>
            </div>
            <RoadmapTimeline />
          </div>

          {/* Interview Coach */}
          <div className="tile col-span-12 md:col-span-5 row-span-2 p-6 bg-gradient-to-br from-cream to-peach/30">
            <Pill tone="peach">06 · Interview Coach</Pill>
            <InterviewMock />
          </div>

          {/* Templates */}
          <div className="tile col-span-6 md:col-span-4 row-span-2 p-5 bg-gradient-to-br from-paper to-mint/25">
            <Pill tone="mint">07 · Templates</Pill>
            <TemplateMini />
          </div>

          {/* Workflow */}
          <div className="tile col-span-6 md:col-span-4 row-span-2 p-5 bg-gradient-to-br from-paper to-sky/25">
            <Pill tone="sky">08 · Workflow</Pill>
            <WorkflowMini />
          </div>

          {/* Outcomes */}
          <div className="tile col-span-12 md:col-span-4 row-span-2 p-5 bg-gradient-to-br from-indigo/10 to-paper">
            <Pill tone="ink">09 · Outcome</Pill>
            <div className="mt-3 font-serif text-3xl text-ink leading-tight">Avg. <span className="text-indigo">+38%</span> total compensation in 90 days.</div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[["3.2x", "callbacks"], ["11d", "to offer"], ["+$42k", "uplift"]].map(([n, l]) => (
                <div key={l} className="rounded-xl border border-border bg-paper/60 py-3">
                  <div className="font-serif text-lg text-ink">{n}</div>
                  <div className="text-[10px] text-muted-foreground tracking-wider uppercase">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
