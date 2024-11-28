CREATE TABLE IF NOT EXISTS "transactions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"amount_sold" integer NOT NULL,
	"amount_payed" integer NOT NULL,
	"product" varchar(255),
	"buyer" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "price" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_product_products_id_fk" FOREIGN KEY ("product") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_buyer_users_id_fk" FOREIGN KEY ("buyer") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
