-- Add indexes for better query performance
-- These will significantly speed up GET requests

-- Index on created_by column (used in all user queries)
CREATE INDEX IF NOT EXISTS resumes_created_by_idx ON resumes (created_by);

-- Index on resume_id column (used for individual resume lookups)
CREATE INDEX IF NOT EXISTS resumes_resume_id_idx ON resumes (resume_id);

-- Index on user_email column 
CREATE INDEX IF NOT EXISTS resumes_user_email_idx ON resumes (user_email);

-- Composite index for user queries with ordering
CREATE INDEX IF NOT EXISTS resumes_created_by_updated_at_idx ON resumes (created_by, updated_at DESC);

-- Index for roadmaps table
CREATE INDEX IF NOT EXISTS roadmaps_clerk_user_id_idx ON roadmaps (clerk_user_id);