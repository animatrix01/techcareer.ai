"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Logo } from "../atoms";
import { FilePenLine, ScanSearch, Route, Sparkles, LayoutTemplate } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const products = [
  { 
    icon: FilePenLine, 
    label: "Resume Builder", 
    description: "Build ATS-ready resumes", 
    href: "/tools/builder", 
    color: "text-emerald-600 bg-emerald-50" 
  },
  { 
    icon: ScanSearch, 
    label: "Resume Analyzer", 
    description: "Score & fix your resume", 
    href: "/tools/analyzer", 
    color: "text-sky-600 bg-sky-50" 
  },
  { 
    icon: Route, 
    label: "Career Roadmaps", 
    description: "AI-powered learning paths", 
    href: "/tools/roadmap", 
    color: "text-teal-600 bg-teal-50" 
  },
  { 
    icon: Sparkles, 
    label: "AI Enhancement", 
    description: "Improve with AI suggestions", 
    href: "/tools/builder", 
    color: "text-violet-600 bg-violet-50" 
  },
  { 
    icon: LayoutTemplate, 
    label: "ATS Templates", 
    description: "20+ premium templates", 
    href: "/tools/builder/templates", 
    color: "text-amber-600 bg-amber-50" 
  },
];

function ProductsDropdown({ open }: { open: boolean }) {
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
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <Link
                  key={product.label}
                  href={product.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-cream/80"
                >
                  <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", product.color)}>
                    <Icon className="size-4" aria-hidden />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{product.label}</p>
                    <p className="text-xs text-muted-foreground">{product.description}</p>
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

export function Nav() {
  const { isSignedIn } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Smooth scroll helper
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(1180px,calc(100%-2rem))]">
      <div className="flex items-center justify-between rounded-full border border-border bg-paper/70 px-3 py-2 pl-5 backdrop-blur-xl shadow-soft">
        <Logo />
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className="hover:text-ink transition-colors flex items-center gap-1"
            >
              Product
              <svg 
                className={cn("size-3 transition-transform duration-200", dropdownOpen && "rotate-180")} 
                viewBox="0 0 12 12" 
                fill="none"
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <ProductsDropdown open={dropdownOpen} />
          </div>
          <a href="#workflow" onClick={(e) => smoothScroll(e, '#workflow')} className="hover:text-ink transition-colors">Workflow</a>
          <Link href="/tools/builder/templates" className="hover:text-ink transition-colors">Templates</Link>
          <Link href="/faq" className="hover:text-ink transition-colors">FAQ</Link>
          <a href="#stories" onClick={(e) => smoothScroll(e, '#stories')} className="hover:text-ink transition-colors">Stories</a>
        </nav>
        <div className="flex items-center gap-2">
          {isSignedIn ? (
            <Link href="/dashboard" className="btn-primary">
              Dashboard
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </Link>
          ) : (
            <>
              <Link href="/login" className="hidden sm:inline-flex btn-ghost">Sign in</Link>
              <Link href="/register" className="btn-primary">
                Start free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
