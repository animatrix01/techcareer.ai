/**
 * Centralised rate limiting for all AI API routes.
 *
 * Uses Upstash Redis + @upstash/ratelimit with a sliding window algorithm.
 * All limits are per authenticated Clerk userId.
 *
 * Limits (free tier):
 *  - roadmap:        5  requests / hour   (most expensive — full roadmap generation)
 *  - analyzer:       10 requests / hour
 *  - parse-resume:   10 requests / hour
 *  - enhance-summary:20 requests / hour
 *  - suggest-skills: 20 requests / hour
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { logError } from "@/lib/logger";

// ── Redis client (reads UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN) ──
const redis = Redis.fromEnv();

// ── Per-endpoint limiters ─────────────────────────────────────────────────────
export const rateLimiters = {
  roadmap: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    prefix: "rl:roadmap",
    analytics: false,
  }),

  analyzer: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 h"),
    prefix: "rl:analyzer",
    analytics: false,
  }),

  parseResume: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 h"),
    prefix: "rl:parse-resume",
    analytics: false,
  }),

  enhanceSummary: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 h"),
    prefix: "rl:enhance-summary",
    analytics: false,
  }),

  suggestSkills: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "1 h"),
    prefix: "rl:suggest-skills",
    analytics: false,
  }),
} as const;

export type RateLimiterKey = keyof typeof rateLimiters;

/**
 * Check rate limit for a given endpoint + userId.
 *
 * Returns `null` if the request is allowed.
 * Returns a `NextResponse` (429) if the limit is exceeded — just return it from your route.
 *
 * Usage:
 * ```ts
 * const limited = await checkRateLimit("analyzer", userId);
 * if (limited) return limited;
 * ```
 */
export async function checkRateLimit(
  key: RateLimiterKey,
  userId: string
): Promise<NextResponse | null> {
  try {
    const { success, limit, remaining, reset } = await rateLimiters[key].limit(userId);

    if (!success) {
      const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000);
      return NextResponse.json(
        {
          ok: false,
          error: "Rate limit exceeded. Please slow down and try again later.",
          retryAfter: retryAfterSeconds,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": String(limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(reset),
            "Retry-After": String(retryAfterSeconds),
          },
        }
      );
    }

    // Allowed — return null so the caller can continue
    return null;
  } catch (err) {
    // If Redis is down, fail open (don't block the user) but log it
    logError("[rate-limit] Redis error — failing open", err);
    return null;
  }
}
