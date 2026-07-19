"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth, UserButton } from "@clerk/nextjs";
import { ChevronDown, FilePenLine, ScanSearch, Route, Sparkles, LayoutTemplate, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
  { icon: FilePenLine, label: "Resume Builder", description: "Build ATS-ready resumes", href: "/tools/builder", color: "text-emerald-600 bg-emerald-50" },
  { icon: ScanSearch, label: "Resume Analyzer", description: "Score & fix your resume", href: "/tools/analyzer", color: "text-sky-600 bg-sky-50" },
  { icon: Route, label: "Career Roadmaps", description: "AI-powered learning paths", href: "/tools/roadmap", color: "text-teal-600 bg-teal-50" },
  { icon: Sparkles, label: "AI Enhancement", description: "Improve with AI suggestions", href: "/tools/builder", color: "text-violet-600 bg-violet-50" },
  { icon: LayoutTemplate, label: "ATS Templates", description: "20+ premium templates", href: "/tools/builder/templates", color: "text-amber-600 bg-amber-50" },
];

function BrandLogo() {
  return (
    <span className="flex items-center gap-2">
      <Image
        src="/nextcareerlogo.png"
        alt="NextCareer logo"
        width={44}
        height={44}
        className="h-11 w-11 object-contain"
        priority
      />
      <span className="font-semibold text-[15px] tracking-tight text-ink">NextCareer AI</span>
    </span>
  );
}

function FeaturesDropdown({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.98 }}
          transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-paper/95 backdrop-blur-xl shadow-float"
        >
          <div className="p-2">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.label}
                  href={f.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-cream/80"
                >
                  <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", f.color)}>
                    <Icon className="size-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{f.label}</p>
                    <p className="text-xs text-muted-foreground">{f.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="border-t border-border bg-cream/50 px-4 py-3">
            <Link href="/dashboard" className="text-xs font-semibold text-indigo hover:text-indigo-soft transition-colors">
              Go to Dashboard →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Navbar({ isLanding = false }: { isLanding?: boolean }) {
  const { isSignedIn } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track scroll position
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close dropdown when collapsing
  useEffect(() => {
    if (scrolled) setDropdownOpen(false);
  }, [scrolled]);

  const isCollapsed = scrolled;

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="flex justify-center px-4 pt-3 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait" initial={false}>
          {isCollapsed ? (
            /* ── COLLAPSED: modern solid pill ── */
            <motion.nav
              key="collapsed"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto flex w-fit items-center gap-1 rounded-full border border-border bg-paper/70 backdrop-blur-xl px-2 py-1.5 shadow-soft"
              aria-label="Primary"
            >
              {/* Brand */}
              <Link
                href="/"
                className="flex items-center rounded-full px-2 py-1 transition-colors hover:bg-muted"
              >
                <BrandLogo />
              </Link>

              {/* Divider */}
              <div className="h-4 w-px bg-border" />

              {/* Home */}
              <Link
                href="/"
                className="flex items-center gap-1 rounded-full px-3 py-1 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-ink"
              >
                <Home className="size-3.5" />
                <span>Home</span>
              </Link>

              {/* Divider */}
              <div className="h-4 w-px bg-border" />

              {/* Dashboard / Start free */}
              {isSignedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="btn-primary !py-1 !px-4 !text-[13px]"
                  >
                    Dashboard
                  </Link>
                  <UserButton />
                </>
              ) : (
                <Link
                  href="/register"
                  className="btn-primary !py-1 !px-4 !text-[13px]"
                >
                  Start free
                </Link>
              )}
            </motion.nav>
          ) : (
            /* ── EXPANDED: modern full navbar ── */
            <motion.nav
              key="expanded"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-12 w-full max-w-5xl items-center justify-between gap-2 rounded-full border border-border bg-paper/70 backdrop-blur-xl px-5 shadow-soft"
              aria-label="Primary"
            >
              {/* Brand */}
              <Link
                href="/"
                className="flex shrink-0 items-center transition-opacity hover:opacity-70"
              >
                <BrandLogo />
              </Link>

              {/* Center nav */}
              <div className="hidden items-center gap-1 md:flex">
                <Link href="/" className="flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-ink">
                  <Home className="size-3.5" />
                  <span>Home</span>
                </Link>

                <div ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-ink"
                  >
                    Features
                    <ChevronDown className={cn("size-3 transition-transform duration-200", dropdownOpen && "rotate-180")} />
                  </button>
                  <FeaturesDropdown open={dropdownOpen} />
                </div>

                <Link href="/tools/builder/templates" className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-ink">
                  Templates
                </Link>
                <Link href="/tools/roadmap" className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-ink">
                  Roadmaps
                </Link>
                <Link href="/faq" className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-ink">
                  FAQ
                </Link>
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                {!isSignedIn ? (
                  <>
                    <Link href="/login" className="hidden btn-ghost !py-1.5 !px-3.5 !text-[13px] sm:inline-flex">
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="btn-primary !py-1.5 !px-5 !text-[13px]"
                    >
                      <span className="sm:hidden">Start</span>
                      <span className="hidden sm:inline">Start free</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/dashboard"
                      className="btn-primary !py-1.5 !px-5 !text-[13px]"
                    >
                      Dashboard
                    </Link>
                    <UserButton />
                  </>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
