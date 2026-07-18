import { Pill } from "../atoms";

export function ATSPanel() {
  return (
    <div className="tile p-6 shadow-float bg-paper/80">
      <div className="flex items-center justify-between">
        <Pill tone="ink">resume.pdf</Pill>
        <span className="font-mono text-[10px] text-muted-foreground">parsed in 412 ms</span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 text-center">
        {[
          ["94", "ATS", "mint"],
          ["71", "JD match", "peach"],
          ["88", "Clarity", "sky"],
        ].map(([n, l, c]) => (
          <div key={l} className="rounded-xl border border-border bg-paper p-3">
            <div className="font-serif text-2xl text-ink">{n}</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{l}</div>
            <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
              <div className={`h-full bg-${c}`} style={{ width: `${n}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-2">
        {[
          ["Missing keyword: 'experimentation'", "coral"],
          ["Strong impact verbs (12)", "mint"],
          ["3 dates inconsistent — auto-fix?", "peach"],
        ].map(([t, c], i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-border bg-paper/70 px-3 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className={`inline-block h-1.5 w-1.5 rounded-full bg-${c}`} />{t}
            </div>
            <button className="font-mono text-[10px] text-indigo">FIX</button>
          </div>
        ))}
      </div>
    </div>
  );
}
