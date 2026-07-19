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

  // Landing page and auth pages manage their own layout
  if (isAuthPage || isLandingPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar isLanding={false} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
