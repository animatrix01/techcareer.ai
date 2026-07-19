ALTER TABLE "resumes" DROP CONSTRAINT "resumes_created_by_users_clerk_user_id_fk";
--> statement-breakpoint
ALTER TABLE "roadmaps" DROP CONSTRAINT "roadmaps_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "roadmaps" ADD COLUMN "clerk_user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "roadmaps" ADD COLUMN "target_role" text NOT NULL;--> statement-breakpoint
ALTER TABLE "roadmaps" ADD COLUMN "current_skills" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "roadmaps" ADD CONSTRAINT "roadmaps_clerk_user_id_users_clerk_user_id_fk" FOREIGN KEY ("clerk_user_id") REFERENCES "public"."users"("clerk_user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roadmaps" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "roadmaps" DROP COLUMN "title";