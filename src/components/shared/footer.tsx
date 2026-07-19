import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/next career logo only.png"
        alt="NextCareer logo"
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
      />
      <span className="font-semibold text-base tracking-tight text-ink">
        NextCareer AI
      </span>
    </Link>
  );
}

const cols: [string, { label: string; href: string }[]][] = [
  [
    "Product",
    [
      { label: "Resume Builder", href: "/tools/builder" },
      { label: "Resume Analyzer", href: "/tools/analyzer" },
      { label: "Career Roadmaps", href: "/tools/roadmap" },
      { label: "Templates", href: "/tools/builder/templates" },
    ],
  ],
  [
    "Resources",
    [
      { label: "How it works", href: "/#workflow" },
      { label: "FAQ", href: "/#faq" },
      { label: "Features", href: "/features" },
    ],
  ],
  [
    "Company",
    [
      { label: "About", href: "/#" },
      { label: "Contact", href: "/#" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  ],
  [
    "Legal",
    [
      { label: "Privacy Policy", href: "/#" },
      { label: "Terms of Service", href: "/#" },
      { label: "Cookie Policy", href: "/#" },
    ],
  ],
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 pt-16 pb-12">
      <div className="mx-auto max-w-[1180px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              The AI operating system for your career. Built for students and professionals shipping real careers.
            </p>
            <div className="mt-5 flex gap-2">
              {["X", "in", "GH", "✦"].map((s) => (
                <a
                  key={s}
                  className="grid h-8 w-8 place-items-center rounded-full border border-border bg-paper text-xs text-muted-foreground hover:text-ink cursor-pointer transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          {cols.map(([h, items]) => (
            <div key={h}>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {h}
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-ink/80 hover:text-ink transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
          <div className="font-serif text-[clamp(3rem,10vw,8rem)] leading-none tracking-[-0.04em] text-ink/90">
            NextCareer<span className="text-indigo">·</span>AI
          </div>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} · v2.4 · made on Earth
          </div>
        </div>
      </div>
    </footer>
  );
}
