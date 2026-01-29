
-- Create gold_prices table
CREATE TABLE IF NOT EXISTS "public"."gold_prices" (
    "price_idr" integer NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    "source" "public"."price_source_type" NOT NULL
);

ALTER TABLE "public"."gold_prices" OWNER TO "postgres";

ALTER TABLE ONLY "public"."gold_prices"
    ADD CONSTRAINT "gold_prices_pkey" PRIMARY KEY ("updated_at");

CREATE INDEX "idx_gold_prices_updated_at" ON "public"."gold_prices" USING "btree" ("updated_at" DESC);


-- Create gold_price_summary table
CREATE TABLE IF NOT EXISTS "public"."gold_price_summary" (
    "id" integer NOT NULL,
    "price_idr" integer NOT NULL,
    "price_24h_ago" integer,
    "price_7d_ago" integer,
    "price_30d_ago" integer,
    "price_180d_ago" integer,
    "price_1y_ago" integer,
    "updated_at" timestamp with time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL,
    CONSTRAINT "gold_price_summary_id_check" CHECK (("id" = 1))
);

ALTER TABLE "public"."gold_price_summary" OWNER TO "postgres";

ALTER TABLE ONLY "public"."gold_price_summary"
    ADD CONSTRAINT "gold_price_summary_pkey" PRIMARY KEY ("id");


-- RLS Policies

ALTER TABLE "public"."gold_prices" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."gold_price_summary" ENABLE ROW LEVEL SECURITY;

-- Allow public read access to gold_prices
CREATE POLICY "Allow public read access" ON "public"."gold_prices" FOR SELECT USING (true);

-- Allow service role to insert/update gold_prices
CREATE POLICY "Allow service role to insert/update" ON "public"."gold_prices" TO "service_role" USING (true) WITH CHECK (true);

-- Enable read access for all users to gold_price_summary
CREATE POLICY "Enable read access for all users" ON "public"."gold_price_summary" FOR SELECT USING (true);

-- Service role policies for summary are implicitly enabled by bypassing RLS, but explicit policy is fine too if needed for authenticated service role users (usually service_role key bypasses RLS).
-- However, for completeness if we wanted:
-- CREATE POLICY "Allow service role to all on summary" ON "public"."gold_price_summary" TO "service_role" USING (true) WITH CHECK (true);
