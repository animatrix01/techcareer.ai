-- Add projects column to resumes table
ALTER TABLE "resumes" ADD COLUMN "projects" jsonb DEFAULT '[]'::jsonb;
