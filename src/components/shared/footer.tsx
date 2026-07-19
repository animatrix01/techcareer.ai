import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/nextcareerlogo.png"
        alt="NextCareer logo"
        width={44}
        height={44}
        className="h-11 w-11 object-contain"
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
          <div className="font-sans font-semibold text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-tight text-ink/80">
            NextCareer AI
          </div>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} · v2.4 · made on Earth
          </div>
        </div>
      </div>
    </footer>
  );
}
