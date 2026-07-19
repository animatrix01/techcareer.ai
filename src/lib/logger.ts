/**
 * Production-safe logging utility.
 *
 * Prevents raw database errors, connection strings, and stack traces
 * from being logged to production dashboards where they could leak
 * sensitive information.
 *
 * In development: logs everything verbosely.
 * In production: sanitizes and structures error messages.
 */

const IS_DEV = process.env.NODE_ENV === "development";

type LogLevel = "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

/**
 * Sanitize error objects before logging in production.
 * Strips connection strings, passwords, and sensitive keys.
 */
function sanitizeError(error: unknown): string {
  if (!error) return "Unknown error";

  let message = error instanceof Error ? error.message : String(error);

  // Strip sensitive patterns
  message = message
    .replace(/postgres:\/\/[^\s]+/gi, "postgres://[REDACTED]")
    .replace(/mongodb(\+srv)?:\/\/[^\s]+/gi, "mongodb://[REDACTED]")
    .replace(/mysql:\/\/[^\s]+/gi, "mysql://[REDACTED]")
    .replace(/password[=:]\s*["']?[^"'\s]+["']?/gi, "password=[REDACTED]")
    .replace(/api[_-]?key[=:]\s*["']?[^"'\s]+["']?/gi, "api_key=[REDACTED]")
    .replace(/secret[=:]\s*["']?[^"'\s]+["']?/gi, "secret=[REDACTED]")
    .replace(/token[=:]\s*["']?[^"'\s]+["']?/gi, "token=[REDACTED]");

  return message;
}

/**
 * Log an informational message.
 */
export function logInfo(message: string, context?: LogContext): void {
  if (IS_DEV) {
    console.log(`[INFO] ${message}`, context || "");
  } else {
    // In production, send to your logging service (Datadog, Logtail, etc.)
    // For now, structured console.log is fine for Vercel logs
    console.log(JSON.stringify({ level: "info", message, ...context, timestamp: new Date().toISOString() }));
  }
}

/**
 * Log a warning (non-fatal issue).
 */
export function logWarn(message: string, context?: LogContext): void {
  if (IS_DEV) {
    console.warn(`[WARN] ${message}`, context || "");
  } else {
    console.warn(JSON.stringify({ level: "warn", message, ...context, timestamp: new Date().toISOString() }));
  }
}

/**
 * Log an error safely (sanitizes sensitive data in production).
 */
export function logError(message: string, error?: unknown, context?: LogContext): void {
  const sanitized = error ? sanitizeError(error) : undefined;

  if (IS_DEV) {
    // Development: show full error with stack
    console.error(`[ERROR] ${message}`, { error, ...context });
  } else {
    // Production: sanitized message only, no stack
    console.error(
      JSON.stringify({
        level: "error",
        message,
        error: sanitized,
        ...context,
        timestamp: new Date().toISOString(),
      })
    );
  }
}

/**
 * Log successful database operations (useful for auditing).
 */
export function logDbOperation(operation: string, context?: LogContext): void {
  if (IS_DEV) {
    console.log(`[DB] ${operation}`, context || "");
  }
  // In production, optionally send to audit log service
}
