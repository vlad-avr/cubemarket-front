CREATE TYPE "public"."role" AS ENUM('client', 'admin', 'superadmin');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role";