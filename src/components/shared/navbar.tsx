"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
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

function BrandMark() {
  return (
    <span className="flex items-center gap-0.5" aria-hidden>
      <span className="h-3 w-[3px] rounded-full bg-[#2F5233]" />
      <span className="h-3 w-[3px] rounded-full bg-[#3D5A40]" />
      <span className="h-3 w-[3px] rounded-full bg-[#6B5944]" />
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
          className="absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2 overflow-hidden rounded-sm border-2 border-[#1C1C1C] bg-[#EFE9E1] shadow-[4px_4px_0px_0px_rgba(28,28,28,0.2)]"
        >
          <div className="p-1.5">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <Link
                  key={f.label}
                  href={f.href}
                  className="flex items-center gap-3 rounded-sm px-3 py-2 transition-colors hover:bg-[#D4C5B3]"
                >
                  <div className={cn("flex size-7 shrink-0 items-center justify-center rounded-sm", f.color)}>
                    <Icon className="size-3.5" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1C1C1C]">{f.label}</p>
                    <p className="text-[11px] text-[#6B5944]">{f.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="border-t-2 border-[#1C1C1C]/20 bg-[#D4C5B3]/30 px-4 py-2.5">
            <Link href="/dashboard" className="text-xs font-semibold text-[#2F5233] hover:text-[#3D5A40]">
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
            /* ── COLLAPSED: retro solid pill ── */
            <motion.nav
              key="collapsed"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto flex w-fit items-center gap-1 rounded-sm border-2 border-[#1C1C1C] bg-[#EFE9E1] px-2 py-1.5 shadow-[2px_2px_0px_0px_rgba(28,28,28,0.25)]"
              aria-label="Primary"
            >
              {/* Brand */}
              <Link
                href="/"
                className="flex items-center gap-1.5 rounded-sm px-3 py-1 text-[13px] font-bold text-[#1C1C1C] transition-colors hover:bg-[#D4C5B3]"
              >
                <BrandMark />
                <span>TechCareer OS</span>
              </Link>

              {/* Divider */}
              <div className="h-4 w-px bg-[#1C1C1C]/20" />

              {/* Home */}
              <Link
                href="/"
                className="flex items-center gap-1 rounded-sm px-3 py-1 text-[13px] font-medium text-[#5C4F3F] transition-colors hover:bg-[#D4C5B3] hover:text-[#1C1C1C]"
              >
                <Home className="size-3.5" />
                <span>Home</span>
              </Link>

              {/* Divider */}
              <div className="h-4 w-px bg-[#1C1C1C]/20" />

              {/* Dashboard / Start free */}
              {isSignedIn ? (
                <Link
                  href="/dashboard"
                  className="rounded-sm bg-[#2F5233] px-4 py-1 text-[13px] font-semibold text-[#EFE9E1] shadow-sm transition-all hover:bg-[#3D5A40]"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="rounded-sm bg-[#2F5233] px-4 py-1 text-[13px] font-semibold text-[#EFE9E1] shadow-sm transition-all hover:bg-[#3D5A40]"
                >
                  Start free
                </Link>
              )}
            </motion.nav>
          ) : (
            /* ── EXPANDED: retro full navbar ── */
            <motion.nav
              key="expanded"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-12 w-full max-w-5xl items-center justify-between gap-2 rounded-sm border-2 border-[#1C1C1C] bg-[#EFE9E1] px-5 shadow-[2px_2px_0px_0px_rgba(28,28,28,0.15)]"
              aria-label="Primary"
            >
              {/* Brand */}
              <Link
                href="/"
                className="flex shrink-0 items-center gap-1.5 text-sm font-bold tracking-tight text-[#1C1C1C] transition-opacity hover:opacity-70"
              >
                <BrandMark />
                <span>TechCareer OS</span>
              </Link>

              {/* Center nav */}
              <div className="hidden items-center gap-1 md:flex">
                <Link href="/" className="flex items-center gap-1 rounded-sm px-3.5 py-1.5 text-[13px] font-medium text-[#5C4F3F] transition-colors hover:bg-[#D4C5B3] hover:text-[#1C1C1C]">
                  <Home className="size-3.5" />
                  <span>Home</span>
                </Link>

                <div ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((v) => !v)}
                    className="flex items-center gap-1 rounded-sm px-3.5 py-1.5 text-[13px] font-medium text-[#5C4F3F] transition-colors hover:bg-[#D4C5B3] hover:text-[#1C1C1C]"
                  >
                    Features
                    <ChevronDown className={cn("size-3 transition-transform duration-200", dropdownOpen && "rotate-180")} />
                  </button>
                  <FeaturesDropdown open={dropdownOpen} />
                </div>

                <Link href="/tools/builder/templates" className="rounded-sm px-3.5 py-1.5 text-[13px] font-medium text-[#5C4F3F] transition-colors hover:bg-[#D4C5B3] hover:text-[#1C1C1C]">
                  Templates
                </Link>
                <Link href="/tools/roadmap" className="rounded-sm px-3.5 py-1.5 text-[13px] font-medium text-[#5C4F3F] transition-colors hover:bg-[#D4C5B3] hover:text-[#1C1C1C]">
                  Roadmaps
                </Link>
                <Link href="#faq" className="rounded-sm px-3.5 py-1.5 text-[13px] font-medium text-[#5C4F3F] transition-colors hover:bg-[#D4C5B3] hover:text-[#1C1C1C]">
                  FAQ
                </Link>
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                {!isSignedIn ? (
                  <>
                    <Link href="/login" className="hidden rounded-sm px-3.5 py-1.5 text-[13px] font-medium text-[#5C4F3F] transition-colors hover:bg-[#D4C5B3] hover:text-[#1C1C1C] sm:block">
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="rounded-sm bg-[#2F5233] px-5 py-1.5 text-[13px] font-semibold text-[#EFE9E1] shadow-sm transition-all hover:bg-[#3D5A40]"
                    >
                      <span className="sm:hidden">Start</span>
                      <span className="hidden sm:inline">Start free</span>
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/dashboard"
                    className="rounded-sm bg-[#2F5233] px-5 py-1.5 text-[13px] font-semibold text-[#EFE9E1] shadow-sm transition-all hover:bg-[#3D5A40]"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
