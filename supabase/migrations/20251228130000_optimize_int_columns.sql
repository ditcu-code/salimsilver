-- Optimize integer columns to smallint (int2) to save storage

-- jewelry table
ALTER TABLE "public"."jewelry" 
  ALTER COLUMN "production_year" TYPE smallint,
  ALTER COLUMN "crafting_time_hours" TYPE smallint;

-- jewelry_images table
ALTER TABLE "public"."jewelry_images" 
  ALTER COLUMN "display_order" TYPE smallint;
