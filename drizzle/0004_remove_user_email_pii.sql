-- Migration: Remove userEmail PII from resumes table
-- Reason: user_email is redundant (created_by / clerk_user_id is the ownership key),
--         stores PII unnecessarily, and the index makes it trivially dumpable.
--         Ownership is fully enforced via created_by = clerk_user_id.

-- Drop the index first (required before dropping the column)
DROP INDEX IF EXISTS resumes_user_email_idx;

-- Remove the column
ALTER TABLE resumes DROP COLUMN IF EXISTS user_email;
