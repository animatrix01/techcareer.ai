export function ResumeMock() {
  return (
    <div className="mt-6 relative">
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-indigo/15 to-transparent blur-2xl" />
      <div className="relative grid grid-cols-5 gap-3">
        <div className="col-span-3 rounded-xl border border-border bg-paper/70 p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-serif text-lg text-ink">Maya Chen</div>
              <div className="text-[11px] text-muted-foreground">Senior Product Manager · NYC</div>
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-coral to-peach" />
          </div>
          <div className="mt-3 space-y-1.5">
            {[100, 92, 78, 88, 64].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full bg-muted" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="mt-3 flex gap-1.5">
            {["PM", "0→1", "Growth", "API"].map(t => (
              <span key={t} className="rounded-md bg-indigo/10 px-1.5 py-0.5 text-[9px] font-medium text-indigo">{t}</span>
            ))}
          </div>
        </div>
        <div className="col-span-2 rounded-xl border border-border bg-ink p-4 text-paper shadow-soft">
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-60">AI suggests</div>
          <div className="mt-2 font-serif text-base leading-snug">
            "Led 0→1 launch reaching <span className="text-mint">$4.2M ARR</span> in 9 months."
          </div>
          <button className="mt-3 rounded-full bg-paper/15 px-2.5 py-1 text-[10px]">↩ Insert</button>
        </div>
      </div>
    </div>
  );
}
