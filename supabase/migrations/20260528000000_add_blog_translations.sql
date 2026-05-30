-- Add English translation columns to posts table
ALTER TABLE "public"."posts"
  ADD COLUMN "title_en" text,
  ADD COLUMN "excerpt_en" text,
  ADD COLUMN "content_en" text,
  ADD COLUMN "meta_title_en" text,
  ADD COLUMN "meta_description_en" text;
