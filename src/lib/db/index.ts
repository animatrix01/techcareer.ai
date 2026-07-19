import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

/**
 * Connection pooling configuration for serverless environments.
 *
 * In serverless (Vercel, Lambda), each function invocation creates a new
 * Node process. Without pooling, you'd quickly exhaust your database's
 * connection limit (typically 100 for hobby plans, 1000 for pro).
 *
 * Best practices:
 * 1. Use ?pgbouncer=true in DATABASE_URL (Neon/Supabase provide this)
 * 2. Set max connections low (10-20) to avoid pool exhaustion
 * 3. Use postgres-js prepare: false for pgBouncer compatibility
 * 4. Reuse the client globally across invocations (hot module caching)
 *
 * Example pooled connection strings:
 * - Neon: postgres://user:pass@host.neon.tech/db?sslmode=require&pgbouncer=true
 * - Supabase: postgres://user:pass@host.supabase.co:6543/postgres?pgbouncer=true
 */

// Singleton pattern — reuse the same client across hot-reloads in dev
// and across requests in production (critical for serverless perf)
const globalForDb = globalThis as unknown as { pgClient?: ReturnType<typeof postgres> };

const client = globalForDb.pgClient ?? postgres(connectionString, {
  prepare: false,          // REQUIRED for pgBouncer transaction pooling mode
  max: 10,                 // Max 10 connections per serverless instance
  idle_timeout: 20,        // Close idle connections after 20s
  connect_timeout: 10,     // Fail fast on connection issues
  max_lifetime: 60 * 30,   // Recycle connections every 30 min
  ssl: { rejectUnauthorized: false }, // Required for Neon/Supabase TLS
  onnotice: () => {},      // Suppress PostgreSQL notices (INFO logs)
});

if (process.env.NODE_ENV !== "production") {
  globalForDb.pgClient = client;
}

export const db = drizzle(client, { schema });