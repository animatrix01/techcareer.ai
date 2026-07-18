import { Pill } from "../atoms";
import { NodeSparkline } from "./NodeSparkline";

function Row({ label, val, tone }: { label: string; val: string; tone: "mint" | "peach" | "sky" }) {
  const bar: Record<string, string> = { mint: "bg-mint", peach: "bg-peach", sky: "bg-sky" };
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 text-[10px] text-muted-foreground">{label}</div>
      <div className="h-1 w-14 rounded-full bg-muted overflow-hidden">
        <div className={`h-full ${bar[tone]}`} style={{ width: `${val}%` }} />
      </div>
      <div className="w-6 text-right text-[10px] font-mono text-ink">{val}</div>
    </div>
  );
}

export function EcosystemDiagram() {
  const nodes = [
    { id: "resume", label: "Resume Builder", sub: "v2.4", x: 60, y: 80, tone: "from-indigo to-indigo-soft" },
    { id: "ats", label: "ATS Analyzer", sub: "94 / 100", x: 540, y: 60, tone: "from-coral to-peach" },
    { id: "skills", label: "Skill Gap", sub: "+6 to close", x: 640, y: 280, tone: "from-mint to-teal" },
    { id: "roadmap", label: "Career Roadmap", sub: "12 wk", x: 510, y: 470, tone: "from-sky to-cyan-soft" },
    { id: "interview", label: "Interview Prep", sub: "live", x: 60, y: 470, tone: "from-lavender to-indigo-soft" },
    { id: "offer", label: "Offer", sub: "+38% TC", x: 0, y: 280, tone: "from-peach to-coral" },
  ];

  return (
    <div className="relative mx-auto mt-14 w-full max-w-[1080px] aspect-[16/10]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.42_0.18_275/0.18),transparent)] blur-2xl" />
      </div>

      <svg viewBox="0 0 720 560" className="absolute inset-0 h-full w-full" fill="none">
        <defs>
          <linearGradient id="eco-line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.42 0.18 275)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="oklch(0.7 0.11 195)" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {[
          "M360,280 C260,200 200,140 160,130",
          "M360,280 C460,200 540,150 580,110",
          "M360,280 C520,300 600,310 660,320",
          "M360,280 C500,360 540,440 560,500",
          "M360,280 C240,360 180,440 160,500",
          "M360,280 C220,290 140,300 80,320",
        ].map((d, i) => (
          <path key={i} d={d} stroke="url(#eco-line)" strokeWidth="1.25" className="flow-dash" opacity="0.85" />
        ))}
      </svg>

      {/* Central core card */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative tile shadow-float w-[280px] p-5">
          <div className="absolute -inset-px rounded-[1.5rem] bg-gradient-to-br from-indigo/30 via-transparent to-mint/40 -z-10 blur-md" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative h-6 w-6">
                <div className="absolute inset-0 rounded-[6px] bg-gradient-to-br from-indigo via-lavender to-coral" />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">core · v2</span>
            </div>
            <Pill tone="mint">live</Pill>
          </div>
          <div className="mt-3 font-serif text-2xl leading-tight text-ink">Career Index</div>
          <div className="mt-1 text-xs text-muted-foreground">12 signals · synced 2s ago</div>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-[72px] w-[72px]">
              <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
                <circle cx="36" cy="36" r="30" stroke="oklch(0.93 0.01 270)" strokeWidth="6" fill="none" />
                <circle cx="36" cy="36" r="30" stroke="url(#eco-line)" strokeWidth="6" fill="none"
                  strokeDasharray="188" strokeDashoffset="34" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="text-lg font-semibold leading-none">82</div>
                  <div className="text-[9px] text-muted-foreground">/100</div>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-1.5">
              <Row label="ATS readability" val="94" tone="mint" />
              <Row label="Keyword match" val="71" tone="peach" />
              <Row label="Role fit · PM" val="86" tone="sky" />
            </div>
          </div>
        </div>
      </div>

      {/* Satellite nodes */}
      {nodes.map((n) => (
        <div
          key={n.id}
          className="absolute float-slow"
          style={{ left: `${(n.x / 720) * 100}%`, top: `${(n.y / 560) * 100}%`, animationDelay: `${(n.x % 7) * 0.3}s` }}
        >
          <div className="tile shadow-soft w-[200px] p-3 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center justify-between">
              <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${n.tone} shadow-soft`} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{n.sub}</span>
            </div>
            <div className="mt-2 text-sm font-medium text-ink">{n.label}</div>
            <NodeSparkline />
          </div>
        </div>
      ))}
    </div>
  );
}
