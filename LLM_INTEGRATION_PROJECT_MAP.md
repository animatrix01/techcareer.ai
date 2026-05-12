# Career Operating System - Full Project Map for LLM Integration

This document is a practical handoff for implementing AI features with LLMs, LangChain, and LangGraph in this codebase with minimal breakage and fewer security mistakes.

## 1) Tech Stack Snapshot

- Framework: Next.js (App Router) + React + TypeScript
- Styling/UI: Tailwind, Framer Motion, Radix UI, Lucide
- Auth: Clerk
- Database: PostgreSQL + Drizzle ORM
- State: Zustand
- Rich Text: TipTap
- Current AI status: mostly mocked client-side flows (no real LLM provider integration yet)

## 2) Top-Level Folder Structure

- `src/` - Main application code
- `public/` - Static assets
- `drizzle.config.ts` - Drizzle config
- `plan.md` - Product/feature planning notes
- `.env` - Local environment variables (must stay private)
- `.next/` - Build artifacts (generated, should stay untracked)
- `clerk/.tmp/` - Clerk local temp artifacts (sensitive, should remain untracked)

## 3) Frontend Structure (Routes + UI)

## App Router (`src/app`)

- `layout.tsx` - Global app wrapper (`ClerkProvider`)
- `page.tsx` - Landing page

### Auth

- `(auth)/login/[[...login]]/page.tsx`
- `(auth)/register/[[...register]]/page.tsx`

### Dashboard

- `(dashboard)/dashboard/page.tsx` - User dashboard
- `dashboard/resume/[resumeId]/page.tsx` - Resume editor/workspace

### Tools Section

- `tools/layout.tsx` - Shared tools layout

#### Analyzer flow
- `tools/analyzer/page.tsx` - Upload/start
- `tools/analyzer/scanning/page.tsx` - Simulated scan/loading
- `tools/analyzer/results/page.tsx` - Score + recommendations

#### Builder flow
- `tools/builder/page.tsx` - Builder entry
- `tools/builder/templates/page.tsx` - Template selection
- `tools/builder/upload/page.tsx` - Upload flow
- `tools/builder/verify/page.tsx` - Parsed/verification step
- `tools/builder/editor/layout.tsx`
- `tools/builder/editor/[step]/page.tsx` - Multi-step editor

#### Roadmap flow
- `tools/roadmap/page.tsx` - Input goals
- `tools/roadmap/building/page.tsx` - Simulated generation
- `tools/roadmap/path/page.tsx` - Output timeline/path

## Reusable UI Components (`src/components`)

- `shared/` - Navbar, footer, app shell
- `landing/` - Hero, feature grid, CTA
- `features/builder/` - Builder-specific widgets (sortable projects, rich text, preview, etc.)

## 4) Backend Structure (APIs + Server Logic)

## Existing API routes

- `src/app/api/webhooks/clerk/route.ts`
  - Handles Clerk webhooks
  - Verifies Svix signatures
  - On `user.created`, inserts user into DB

No other production API routes currently exist for AI operations.

## Middleware

- `src/middleware.ts`
  - Clerk middleware enabled
  - Protects `/dashboard(.*)` and `/tools(.*)`
  - Redirects unauthenticated users to `/login`

## Server actions

- `src/actions/resume.ts`
  - `createNewResume`
  - `saveResumeData`
  - Uses server-side Clerk auth and DB ownership checks

## 5) Database Layer

## DB client and schema

- `src/lib/db/index.ts` - Drizzle + Postgres client
- `src/lib/db/schema.ts` - Tables:
  - `users`
  - `resumes`
  - `roadmaps`

## Drizzle config

- `drizzle.config.ts` - schema + out + DB credentials source

## Current DB usage points

- `src/actions/resume.ts`
- `src/app/api/webhooks/clerk/route.ts`

## 6) Auth and Identity Flow

- App provider in `src/app/layout.tsx`
- Route guard in `src/middleware.ts`
- Auth pages under `src/app/(auth)/...`
- Server auth checks in `src/actions/resume.ts`
- Webhook user sync in `src/app/api/webhooks/clerk/route.ts`

## 7) Environment Variables and Secret Keys

Expected env variables (names only):

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- `DATABASE_URL`
- `WEBHOOK_SECRET`

Where they matter:

- `WEBHOOK_SECRET` is read in `src/app/api/webhooks/clerk/route.ts`
- Clerk keys are used by Clerk runtime/provider
- `DATABASE_URL` should be used by DB client/config (not hardcoded)

## 8) Security Risks and Vulnerabilities to Fix First

High-priority:

1. Hardcoded DB credentials in source:
   - `src/lib/db/index.ts`
   - `drizzle.config.ts`
2. Sensitive local artifacts present:
   - `.env`
   - `clerk/.tmp/keyless.json`
3. Massive generated artifacts showing in git status:
   - `.next/*` should remain ignored/untracked

Medium-priority:

4. No explicit rate limiting on API routes
5. Webhook dedup/idempotency not enforced (possible duplicate event processing)
6. Inconsistent central policy for API auth checks

Best practice reminders:

- Never commit `.env`, `.tmp` auth artifacts, or generated build output.
- Keep all secrets in environment variables only.
- Add server-side validation for all AI inputs/outputs.
- Add strict schema validation (Zod) for model responses before DB writes.

## 9) Current AI-Related Behavior (What Is Mocked)

These are currently simulation-heavy and ideal for real LLM wiring:

- `src/app/tools/analyzer/scanning/page.tsx`
- `src/app/tools/analyzer/results/page.tsx`
- `src/app/tools/builder/upload/page.tsx`
- `src/app/tools/builder/verify/page.tsx`
- `src/app/tools/roadmap/building/page.tsx`
- `src/app/tools/roadmap/path/page.tsx`
- `src/app/dashboard/resume/[resumeId]/page.tsx` ("Enhance with AI" entry point)

## 10) Recommended LLM/LangChain/LangGraph File Structure

Add these folders/files:

- `src/lib/llm/client.ts` - LLM provider client setup (OpenAI/Anthropic/etc.)
- `src/lib/llm/prompts/` - Prompt templates per feature
- `src/lib/llm/schemas.ts` - Zod output contracts
- `src/lib/llm/guards.ts` - Prompt injection and unsafe content checks

- `src/lib/ai/analyzer.ts` - Resume analysis orchestrator
- `src/lib/ai/resume-enhancer.ts` - Bullet/section enhancement
- `src/lib/ai/roadmap-generator.ts` - Roadmap generation logic
- `src/lib/ai/graph/roadmap.graph.ts` - LangGraph multi-step graph workflow

New API routes:

- `src/app/api/ai/analyzer/route.ts`
- `src/app/api/ai/extract-resume/route.ts`
- `src/app/api/ai/enhance-bullet/route.ts`
- `src/app/api/ai/roadmap/route.ts`

## 11) Suggested Frontend-Backend Wiring Plan

1. Replace fake timers in analyzer/builder/roadmap screens with API calls.
2. Keep progress UI, but stream or poll real job status from server.
3. Add optimistic UI only where safe; all final writes should be server validated.
4. Keep all provider calls server-side; never call model APIs directly from client.

## 12) DB Extensions for AI Observability (Recommended)

Add tables for:

- `ai_jobs` - request lifecycle and status
- `ai_generations` - prompt/model metadata, token usage, cost tracking
- `ai_feedback_events` - user accept/reject/edit signal capture

This makes debugging and quality iteration much easier once LangGraph flows are live.

## 13) Implementation Checklist Before Writing AI Code

- [ ] Move DB URLs from hardcoded strings to `DATABASE_URL`
- [ ] Ensure `.env`, `.next`, and `clerk/.tmp` are ignored and not committed
- [ ] Add rate limiting for `src/app/api/ai/*`
- [ ] Add Zod schemas for all AI response payloads
- [ ] Add input sanitation and maximum size checks for resume text uploads
- [ ] Add logging and error boundaries around model calls
- [ ] Add fallback behavior when model fails or times out

## 14) Short Summary

This project already has strong UI flows for analyzer, builder, and roadmap tools, but AI behavior is mostly mocked. The safest path is to add a dedicated server-side AI layer (`src/lib/llm` + `src/lib/ai`), expose feature-specific API routes, and wire current pages to these endpoints. Before implementation, fix secret handling and hardcoded DB credentials, then add rate limiting and strict schema validation to avoid security and reliability issues.
