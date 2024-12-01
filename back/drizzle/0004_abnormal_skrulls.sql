CREATE TABLE IF NOT EXISTS "report" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"date" bigint,
	"content" text,
	"reporter" varchar(255),
	"reported" varchar(255)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_reporter_products_id_fk" FOREIGN KEY ("reporter") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "report" ADD CONSTRAINT "report_reported_products_id_fk" FOREIGN KEY ("reported") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
