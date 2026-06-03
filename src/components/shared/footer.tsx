import Link from "next/link";
import { FilePenLine, ScanSearch, Route, LayoutTemplate } from "lucide-react";

function BrandMark() {
  return (
    <span className="flex items-center gap-0.5" aria-hidden>
      <span className="h-3.5 w-1 rounded-full bg-[#2F5233]" />
      <span className="h-3.5 w-1 rounded-full bg-[#3D5A40]" />
      <span className="h-3.5 w-1 rounded-full bg-[#6B5944]" />
    </span>
  );
}

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Resume Builder", href: "/tools/builder", icon: FilePenLine },
      { label: "Resume Analyzer", href: "/tools/analyzer", icon: ScanSearch },
      { label: "Career Roadmaps", href: "/tools/roadmap", icon: Route },
      { label: "Templates", href: "/tools/builder/templates", icon: LayoutTemplate },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Features", href: "#features" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

const socialLinks = [
  {
    label: "Twitter / X",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-[#1C1C1C] bg-[#EFE9E1]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <BrandMark />
              <span className="text-sm font-bold tracking-tight text-[#1C1C1C]">TechCareer OS</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[#5C4F3F]">
              The AI-powered career workspace for students and professionals.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ label, href, svg }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-8 items-center justify-center rounded-sm border-2 border-[#1C1C1C] text-[#5C4F3F] transition-colors hover:bg-[#1C1C1C] hover:text-[#EFE9E1]"
                >
                  {svg}
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#3D5A40]">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1.5 text-sm text-[#5C4F3F] transition-colors hover:text-[#2F5233] font-medium"
                    >
                      {"icon" in link && link.icon && (
                        <link.icon className="size-3.5 text-[#6B5944]" aria-hidden />
                      )}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t-2 border-[#1C1C1C] bg-[#D4C5B3]/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-[#6B5944] font-medium">
            © {new Date().getFullYear()} TechCareer OS. All rights reserved.
          </p>
          <p className="text-xs text-[#6B5944] font-medium">
            Built for students shipping real careers.
          </p>
        </div>
      </div>
    </footer>
  );
}
