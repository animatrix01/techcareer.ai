import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import { AppShell } from "@/components/shared/app-shell";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import "../styles/print.css";
import "../styles/animations.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "NextCareer AI",
    template: "%s · NextCareer AI",
  },
  description:
    "A calm, focused workspace for resumes, feedback, and career roadmaps — built for tech students.",
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f5f3ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} flex min-h-screen flex-col font-sans text-foreground antialiased`}
      >
        <ClerkProvider>
          <AppShell>{children}</AppShell>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
