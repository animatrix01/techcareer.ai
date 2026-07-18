import { Pill } from "../atoms";

export function RoadmapPanel() {
  return (
    <div className="tile p-6 shadow-float bg-paper/80">
      <div className="flex items-center justify-between">
        <Pill tone="lavender">12-week plan</Pill>
        <span className="font-mono text-[10px] text-muted-foreground">updated · just now</span>
      </div>
      <div className="mt-5 space-y-3">
        {[
          { w: "Now", t: "Ship side project · Stripe webhook tool", c: "bg-mint", d: 100 },
          { w: "Wk 3", t: "System design · API rate limiting", c: "bg-sky", d: 60 },
          { w: "Wk 6", t: "Mock loop · Stripe-style PM", c: "bg-lavender", d: 20 },
          { w: "Wk 9", t: "Negotiate · TC band $240-280k", c: "bg-coral", d: 0 },
        ].map((s, i) => (
          <div key={i} className="rounded-xl border border-border bg-paper p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-7 w-7 rounded-lg ${s.c}`} />
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{s.w}</div>
                  <div className="text-sm font-medium text-ink">{s.t}</div>
                </div>
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">{s.d}%</div>
            </div>
            <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
              <div className={`h-full ${s.c}`} style={{ width: `${s.d}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
