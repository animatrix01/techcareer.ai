import { Logo } from "../atoms";

const cols: [string, string[]][] = [
  ["Product", ["Resume Builder", "ATS Analyzer", "Templates", "Roadmap", "Interview Coach"]],
  ["Resources", ["Changelog", "Blog", "Guides", "Templates Library", "Status"]],
  ["Company", ["About", "Careers", "Press", "Contact", "Brand"]],
  ["Legal", ["Privacy", "Terms", "DPA", "Security", "Cookies"]],
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 pt-16 pb-12">
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The AI operating system for your career. Made carefully, in New York &amp; Bangalore.
            </p>
            <div className="mt-5 flex gap-2">
              {["X", "in", "GH", "✦"].map(s => (
                <a key={s} className="grid h-8 w-8 place-items-center rounded-full border border-border bg-paper text-xs text-muted-foreground hover:text-ink cursor-pointer">{s}</a>
              ))}
            </div>
          </div>
          {cols.map(([h, items]) => (
            <div key={h}>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{h}</div>
              <ul className="mt-4 space-y-2 text-sm">
                {items.map(item => (
                  <li key={item}><a className="text-ink/80 hover:text-ink cursor-pointer">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
          <div className="font-serif text-[clamp(3rem,10vw,8rem)] leading-none tracking-[-0.04em] text-ink/90">
            NextCareer<span className="text-indigo">·</span>AI
          </div>
          <div className="text-xs text-muted-foreground">© 2026 · v2.4 · made on Earth</div>
        </div>
      </div>
    </footer>
  );
}
