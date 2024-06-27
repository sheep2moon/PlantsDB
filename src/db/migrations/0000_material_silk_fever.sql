DO $$ BEGIN
 CREATE TYPE "plant_features" AS ENUM('shadow', 'drought_resistant');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "standing" AS ENUM('Słoneczne', 'Półcień', 'Cień');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plantFeature" (
	"id" varchar(12) PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"icon_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plant" (
	"id" varchar(12) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"alt_names" text,
	"description" text NOT NULL,
	"hints" text,
	"flowering_months" json DEFAULT '{"from":4,"to":10}'::json,
	"height" json DEFAULT '{"from":25,"to":40}'::json,
	"water_needs" smallint DEFAULT 1 NOT NULL,
	"performance" smallint DEFAULT 2,
	"preffered_standing" "standing" DEFAULT 'Słoneczne' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plantVariants" (
	"plant_id" varchar(12) NOT NULL,
	"variant_id" varchar(12) NOT NULL,
	CONSTRAINT "plant_variant_id" PRIMARY KEY("plant_id","variant_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plantWithFeature" (
	"plant_id" varchar(12) NOT NULL,
	"feature_id" varchar(12) NOT NULL,
	CONSTRAINT "plantWithFeature_plant_id_feature_id_pk" PRIMARY KEY("plant_id","feature_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vegetable" (
	"id" varchar(12) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"alt_names" text,
	"description" text NOT NULL,
	"harvest_months" json DEFAULT '{"from":6,"to":8}'::json,
	"water_needs" smallint DEFAULT 1 NOT NULL,
	"earliness" smallint DEFAULT 2
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "account" (
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plantVariants" ADD CONSTRAINT "plantVariants_plant_id_plant_id_fk" FOREIGN KEY ("plant_id") REFERENCES "plant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plantVariants" ADD CONSTRAINT "plantVariants_variant_id_plant_id_fk" FOREIGN KEY ("variant_id") REFERENCES "plant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plantWithFeature" ADD CONSTRAINT "plantWithFeature_plant_id_plant_id_fk" FOREIGN KEY ("plant_id") REFERENCES "plant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plantWithFeature" ADD CONSTRAINT "plantWithFeature_feature_id_plantFeature_id_fk" FOREIGN KEY ("feature_id") REFERENCES "plantFeature"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
