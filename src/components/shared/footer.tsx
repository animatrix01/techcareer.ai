import Link from "next/link";

const footerLinks = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-indigo-200/50 bg-gradient-to-r from-violet-50/40 via-white to-amber-50/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="space-y-1">
          <p className="text-sm font-semibold tracking-tight text-slate-900">
            TechCareer OS
          </p>
          <p className="text-sm text-slate-600">
            Built for students shipping real careers.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-slate-600 transition-colors hover:text-indigo-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-indigo-100/80 bg-white/50">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-slate-500 sm:text-left">
            © {new Date().getFullYear()} TechCareer OS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
