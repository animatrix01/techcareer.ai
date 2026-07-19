import { Pill } from "../atoms";

export function CoachPanel() {
  return (
    <div className="tile p-6 shadow-float bg-paper/80">
      <div className="flex items-center justify-between">
        <Pill tone="teal">Live mock · PM loop</Pill>
        <span className="font-mono text-[10px] text-muted-foreground">04:32</span>
      </div>
      <div className="mt-5 space-y-2">
        <div className="rounded-xl rounded-tl-sm bg-muted px-4 py-3 text-sm max-w-[85%]">
          Walk me through a product you&apos;d build for Stripe Atlas.
        </div>
        <div className="rounded-xl rounded-tr-sm bg-indigo px-4 py-3 text-sm text-paper max-w-[85%] ml-auto">
          I&apos;d start with the founder&apos;s first 30 days — the biggest drop-off is incorporation paperwork…
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-paper px-3 py-2 text-xs">
          <span className="inline-block h-2 w-2 rounded-full bg-coral animate-pulse" />
          <span className="font-mono text-muted-foreground">Listening · waveform</span>
          <div className="ml-auto flex items-end gap-[2px]">
            {[8, 14, 10, 18, 6, 12, 16, 9, 20, 7, 13].map((h, i) => (
              <div key={i} className="w-[2px] bg-indigo" style={{ height: `${h}px` }} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[["Situation", "mint"], ["Action", "sky"], ["Result", "peach"]].map(([t, c]) => (
            <div key={t} className="rounded-lg border border-border bg-paper p-2 text-center">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{t}</div>
              <div className={`mt-1 h-1 rounded-full bg-${c}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
