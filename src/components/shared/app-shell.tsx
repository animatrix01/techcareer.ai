"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/shared/footer";
import { Navbar } from "@/components/shared/navbar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isLandingPage = pathname === "/";
  const isEditorPage = pathname.startsWith("/tools/builder/editor");

  // Landing page and auth pages manage their own layout
  if (isAuthPage || isLandingPage) {
    return <>{children}</>;
  }

  // Builder editor: keep its own slate bg, but block the global gradient with bg-slate-50
  if (isEditorPage) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar isLanding={false} />
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  return (
    <>
      <Navbar isLanding={false} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
