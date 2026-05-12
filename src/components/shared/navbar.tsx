"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#cta", label: "Get started" },
];

function BrandMark() {
  return (
    <span className="flex items-center gap-0.5" aria-hidden>
      <span className="h-3.5 w-1 rounded-full bg-rose-500" />
      <span className="h-3.5 w-1 rounded-full bg-amber-400" />
      <span className="h-3.5 w-1 rounded-full bg-violet-500" />
    </span>
  );
}

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <nav
          className={cn(
            "flex items-center justify-between gap-3 rounded-2xl border border-indigo-200/50 bg-white/75 px-4 py-3 shadow-sm",
            "shadow-[0_1px_0_rgba(79,70,229,0.06)] backdrop-blur-xl backdrop-saturate-150",
            "supports-[backdrop-filter]:bg-white/60"
          )}
          aria-label="Primary"
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-slate-900"
          >
            <BrandMark />
            <span>TechCareer OS</span>
          </Link>
          <div className="hidden flex-1 justify-center md:flex">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-600 transition-colors hover:text-indigo-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="#features"
              className="text-sm text-slate-600 transition-colors hover:text-indigo-700 md:hidden"
            >
              Features
            </Link>
            {!isSignedIn ? (
              <>
              <Button
                size="sm"
                variant="outline"
                className="hidden rounded-full border-indigo-200/90 bg-white/80 sm:inline-flex"
                asChild
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" className="rounded-full whitespace-nowrap shadow-sm shadow-indigo-500/20" asChild>
                <Link href="/register">
                  <span className="sm:hidden">Start</span>
                  <span className="hidden sm:inline">Start free</span>
                </Link>
              </Button>
              </>
            ) : (
              <Button size="sm" className="rounded-full whitespace-nowrap shadow-sm shadow-indigo-500/20" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
