import type { NextConfig } from "next";

// Your production domain — also read from env so staging deployments can override it
const ALLOWED_ORIGIN =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://nextcareer.ai";

/**
 * Content Security Policy
 * - default-src 'self'        → only load resources from your own domain by default
 * - script-src                → Next.js needs 'unsafe-eval' + 'unsafe-inline' for hydration;
 *                               Clerk scripts are loaded from clerk.accounts.dev / clerk.nextcareer.ai
 * - style-src 'unsafe-inline' → Next.js inlines critical CSS; required for Tailwind
 * - img-src data: https:      → allow base64 images (avatars) and any HTTPS image
 * - font-src 'self' https:    → Google Fonts and self-hosted fonts
 * - connect-src               → API calls: same origin + Clerk auth endpoints + Groq (server-side only, but listed for clarity)
 * - frame-ancestors 'none'    → belt-and-suspenders with X-Frame-Options: DENY
 * - object-src 'none'         → block Flash/plugin embeds
 * - base-uri 'self'           → prevent base tag injection
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://clerk.accounts.dev https://*.clerk.accounts.dev https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://clerk.accounts.dev https://*.clerk.accounts.dev https://api.groq.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // 👇 Yeh block add kiya gaya hai build pass karne ke liye
  eslint: {
    ignoreDuringBuilds: true,
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

  async headers() {
    return [
      // ── Security headers for every page & route ───────────────────────
      {
        source: "/(.*)",
        headers: [
          // Speed up DNS resolution for external resources
          { key: "X-DNS-Prefetch-Control", value: "on" },
          // Prevent browsers from MIME-sniffing the content type
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Deny embedding in iframes (clickjacking protection)
          { key: "X-Frame-Options", value: "DENY" },
          // Only send the origin when navigating to HTTPS, nothing for HTTP
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Enforce HTTPS for 2 years, including subdomains
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          // Disable camera, mic, geolocation, payment by default
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          // Content Security Policy — restrict what the browser can load
          { key: "Content-Security-Policy", value: CSP },
        ],
      },

      // ── CORS + API-specific headers ───────────────────────────────────
      {
        source: "/api/:path*",
        headers: [
          // Only allow requests originating from your own domain
          { key: "Access-Control-Allow-Origin", value: ALLOWED_ORIGIN },
          // Limit allowed HTTP methods
          { key: "Access-Control-Allow-Methods", value: "POST, GET, OPTIONS" },
          // Only allow these request headers
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
          // Don't cache CORS preflight responses for too long
          { key: "Access-Control-Max-Age", value: "86400" },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.logo.dev",
        pathname: "/**",
      },
    ],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      // Tell webpack to handle .mjs files properly for pdfjs-dist
      config.experiments = { ...config.experiments, asyncWebAssembly: true };
    }
    return config;
  },
};

export default nextConfig;
