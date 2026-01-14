


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA "pg_catalog";






CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "hypopg" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "index_advisor" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."jewelry_status" AS ENUM (
    'available',
    'sold',
    'reserved',
    'hidden'
);


ALTER TYPE "public"."jewelry_status" OWNER TO "postgres";


CREATE TYPE "public"."material_type" AS ENUM (
    'gold',
    'silver',
    'copper',
    'brass'
);


ALTER TYPE "public"."material_type" OWNER TO "postgres";


CREATE TYPE "public"."price_source_type" AS ENUM (
    'goldprice',
    'bullion_rates',
    'metals_dev',
    'tradingview'
);


ALTER TYPE "public"."price_source_type" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
begin
  insert into public.users (id, full_name, avatar_url, email, role)
  values (
    new.id,
    -- Fallback to metadata full_name, then email username, then 'New User'
    coalesce(
        new.raw_user_meta_data->>'full_name', 
        split_part(new.email, '@', 1),
        'New User'
    ),
    new.raw_user_meta_data->>'avatar_url',
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."increment_post_views"("post_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'public'
    AS $$
BEGIN
  UPDATE public.posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$;


ALTER FUNCTION "public"."increment_post_views"("post_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."admins" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."admins" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."collections" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "cover_image_id" "uuid",
    "featured" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "created_by" "uuid"
);


ALTER TABLE "public"."collections" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."jewelry" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "collection_id" "uuid",
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "material" "public"."material_type",
    "material_purity" "text",
    "weight_grams" numeric,
    "crafting_time_hours" smallint,
    "production_year" smallint,
    "status" "public"."jewelry_status" DEFAULT 'available'::"public"."jewelry_status",
    "variants" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "created_by" "uuid"
);


ALTER TABLE "public"."jewelry" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."jewelry_images" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "jewelry_id" "uuid",
    "src" "text" NOT NULL,
    "display_order" smallint DEFAULT 0,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "created_by" "uuid"
);


ALTER TABLE "public"."jewelry_images" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."posts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "excerpt" "text",
    "content" "text",
    "cover_image_url" "text",
    "meta_title" "text",
    "meta_description" "text",
    "published" boolean DEFAULT false,
    "published_at" timestamp with time zone,
    "tags" "text"[] DEFAULT '{}'::"text"[],
    "featured" boolean DEFAULT false,
    "author_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "views" integer DEFAULT 0
);


ALTER TABLE "public"."posts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."silver_price_summary" (
    "id" integer NOT NULL,
    "price_idr" integer NOT NULL,
    "price_24h_ago" integer,
    "price_7d_ago" integer,
    "price_30d_ago" integer,
    "price_1y_ago" integer,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "price_180d_ago" integer,
    CONSTRAINT "silver_price_summary_id_check" CHECK (("id" = 1))
);


ALTER TABLE "public"."silver_price_summary" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."silver_prices" (
    "price_idr" integer NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "source" "public"."price_source_type" NOT NULL
);


ALTER TABLE "public"."silver_prices" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "full_name" "text" NOT NULL,
    "avatar_url" "text",
    "email" "text",
    "role" "text" DEFAULT 'customer'::"text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."users" OWNER TO "postgres";


ALTER TABLE ONLY "public"."admins"
    ADD CONSTRAINT "admins_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."collections"
    ADD CONSTRAINT "collections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."collections"
    ADD CONSTRAINT "collections_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."jewelry_images"
    ADD CONSTRAINT "jewelry_images_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."jewelry"
    ADD CONSTRAINT "jewelry_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."jewelry"
    ADD CONSTRAINT "jewelry_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."silver_price_summary"
    ADD CONSTRAINT "silver_price_summary_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."silver_prices"
    ADD CONSTRAINT "silver_prices_pkey" PRIMARY KEY ("updated_at");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_collections_cover_image_id" ON "public"."collections" USING "btree" ("cover_image_id");



CREATE INDEX "idx_collections_created_by" ON "public"."collections" USING "btree" ("created_by");



CREATE INDEX "idx_jewelry_collection_id" ON "public"."jewelry" USING "btree" ("collection_id");



CREATE INDEX "idx_jewelry_created_by" ON "public"."jewelry" USING "btree" ("created_by");



CREATE INDEX "idx_jewelry_images_created_by" ON "public"."jewelry_images" USING "btree" ("created_by");



CREATE INDEX "idx_jewelry_images_jewelry_id" ON "public"."jewelry_images" USING "btree" ("jewelry_id");



CREATE INDEX "idx_posts_author_id" ON "public"."posts" USING "btree" ("author_id");



CREATE INDEX "idx_silver_prices_updated_at" ON "public"."silver_prices" USING "btree" ("updated_at" DESC);



ALTER TABLE ONLY "public"."admins"
    ADD CONSTRAINT "admins_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."collections"
    ADD CONSTRAINT "collections_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."collections"
    ADD CONSTRAINT "fk_collection_cover_image" FOREIGN KEY ("cover_image_id") REFERENCES "public"."jewelry_images"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."jewelry"
    ADD CONSTRAINT "jewelry_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."jewelry"
    ADD CONSTRAINT "jewelry_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."jewelry_images"
    ADD CONSTRAINT "jewelry_images_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."jewelry_images"
    ADD CONSTRAINT "jewelry_images_jewelry_id_fkey" FOREIGN KEY ("jewelry_id") REFERENCES "public"."jewelry"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."posts"
    ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Admins can delete collections" ON "public"."collections" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins")));



CREATE POLICY "Admins can delete jewelry" ON "public"."jewelry" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins")));



CREATE POLICY "Admins can delete jewelry_images" ON "public"."jewelry_images" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins")));



CREATE POLICY "Admins can delete posts" ON "public"."posts" FOR DELETE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins")));



CREATE POLICY "Admins can insert collections" ON "public"."collections" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins")));



CREATE POLICY "Admins can insert jewelry" ON "public"."jewelry" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins")));



CREATE POLICY "Admins can insert jewelry_images" ON "public"."jewelry_images" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins")));



CREATE POLICY "Admins can insert posts" ON "public"."posts" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins")));



CREATE POLICY "Admins can update collections" ON "public"."collections" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins"))) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins")));



CREATE POLICY "Admins can update jewelry" ON "public"."jewelry" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins"))) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins")));



CREATE POLICY "Admins can update jewelry_images" ON "public"."jewelry_images" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins"))) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins")));



CREATE POLICY "Admins can update posts" ON "public"."posts" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins"))) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") IN ( SELECT "admins"."id"
   FROM "public"."admins")));



CREATE POLICY "Admins can view own admin data" ON "public"."admins" FOR SELECT TO "authenticated" USING (("id" = ( SELECT "auth"."uid"() AS "uid")));



CREATE POLICY "Allow public read access" ON "public"."silver_prices" FOR SELECT USING (true);



CREATE POLICY "Allow public read access on collections" ON "public"."collections" FOR SELECT USING (true);



CREATE POLICY "Allow public read access on jewelry" ON "public"."jewelry" FOR SELECT USING (true);



CREATE POLICY "Allow public read access on jewelry_images" ON "public"."jewelry_images" FOR SELECT USING (true);



CREATE POLICY "Allow service role to insert/update" ON "public"."silver_prices" TO "service_role" USING (true) WITH CHECK (true);



CREATE POLICY "Enable read access for all users" ON "public"."silver_price_summary" FOR SELECT USING (true);



CREATE POLICY "Public profiles are viewable by everyone." ON "public"."users" FOR SELECT USING (true);



CREATE POLICY "Users can insert their own profile." ON "public"."users" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can update own profile." ON "public"."users" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "View posts" ON "public"."posts" FOR SELECT USING ((("published" = true) OR (( SELECT "auth"."role"() AS "role") = 'authenticated'::"text")));



ALTER TABLE "public"."admins" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."collections" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."jewelry" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."jewelry_images" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."posts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."silver_price_summary" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."silver_prices" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";








GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
























































































































































































































GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON FUNCTION "public"."increment_post_views"("post_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."increment_post_views"("post_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_post_views"("post_id" "uuid") TO "service_role";






























GRANT ALL ON TABLE "public"."admins" TO "anon";
GRANT ALL ON TABLE "public"."admins" TO "authenticated";
GRANT ALL ON TABLE "public"."admins" TO "service_role";



GRANT ALL ON TABLE "public"."collections" TO "anon";
GRANT ALL ON TABLE "public"."collections" TO "authenticated";
GRANT ALL ON TABLE "public"."collections" TO "service_role";



GRANT ALL ON TABLE "public"."jewelry" TO "anon";
GRANT ALL ON TABLE "public"."jewelry" TO "authenticated";
GRANT ALL ON TABLE "public"."jewelry" TO "service_role";



GRANT ALL ON TABLE "public"."jewelry_images" TO "anon";
GRANT ALL ON TABLE "public"."jewelry_images" TO "authenticated";
GRANT ALL ON TABLE "public"."jewelry_images" TO "service_role";



GRANT ALL ON TABLE "public"."posts" TO "anon";
GRANT ALL ON TABLE "public"."posts" TO "authenticated";
GRANT ALL ON TABLE "public"."posts" TO "service_role";



GRANT ALL ON TABLE "public"."silver_price_summary" TO "anon";
GRANT ALL ON TABLE "public"."silver_price_summary" TO "authenticated";
GRANT ALL ON TABLE "public"."silver_price_summary" TO "service_role";



GRANT ALL ON TABLE "public"."silver_prices" TO "anon";
GRANT ALL ON TABLE "public"."silver_prices" TO "authenticated";
GRANT ALL ON TABLE "public"."silver_prices" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































