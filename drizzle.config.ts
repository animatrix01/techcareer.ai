import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Yeh line ensure karegi ki Drizzle .env.local file ko read kare
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});