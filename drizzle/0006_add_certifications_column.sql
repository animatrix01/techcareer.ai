-- Add certifications column to resumes table
-- Run this in Supabase SQL Editor

ALTER TABLE resumes ADD COLUMN IF NOT EXISTS certifications jsonb DEFAULT '[]'::jsonb;
