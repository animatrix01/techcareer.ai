"use server";

import { db } from "./index";
import { sql } from "drizzle-orm";

/**
 * Wake up the database with a simple query.
 * Call this on page load for critical database operations.
 * Returns true if database is responsive, false otherwise.
 */
export async function warmupDatabase(): Promise<boolean> {
  try {
    // Simple SELECT 1 query to wake up the database
    await db.execute(sql`SELECT 1`);
    return true;
  } catch (error) {
    console.error("Database warmup failed:", error);
    return false;
  }
}
