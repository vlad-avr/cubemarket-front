CREATE TABLE IF NOT EXISTS "products" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"leftover" integer NOT NULL,
	"description" varchar,
	"picture" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar NOT NULL,
	"balance" integer NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
