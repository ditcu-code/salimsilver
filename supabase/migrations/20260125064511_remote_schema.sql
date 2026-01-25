create type "public"."showcase_enum" as enum ('meja 1', 'meja 2', 'meja 3', 'meja 4', 'lemari 1', 'lemari 2', 'lemari 3', 'lemari 4', 'lemari 5', 'lemari 6', 'lemari 7', 'lemari 8', 'etalase besar 1', 'etalase besar 2', 'etalase besar 3', 'etalase besar 4', 'etalase kecil 1', 'etalase kecil 2', 'etalase kecil 3', 'etalase kecil 4', 'etalase kecil 5', 'etalase kecil 6', 'etalase kecil 7', 'etalase kecil 8', 'etalase kecil 9', 'etalase kecil 10', 'etalase kecil 11', 'etalase kecil 12', 'etalase kecil 13', 'etalase kecil 14', 'default');

alter table "public"."jewelry" drop constraint "check_jewelry_category_enum";

drop index if exists "public"."idx_jewelry_showcase";

alter table "public"."jewelry" add column "labor_cost" numeric default 0;

alter table "public"."jewelry" add column "profit_margin" numeric default 25;

alter table "public"."jewelry" add column "stock" smallint default 0;

alter table "public"."jewelry" alter column "showcase" set default 'default'::public.showcase_enum;

alter table "public"."jewelry" alter column "showcase" set data type public.showcase_enum using "showcase"::public.showcase_enum;

CREATE INDEX idx_jewelry_showcase ON public.jewelry USING btree (showcase);

alter table "public"."jewelry" add constraint "check_jewelry_category_enum" CHECK ((category = ANY (ARRAY['ring'::text, 'bracelet'::text, 'pendant'::text, 'brooch'::text, 'collectible'::text, 'earring'::text, 'necklace'::text]))) not valid;

alter table "public"."jewelry" validate constraint "check_jewelry_category_enum";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.recalculate_jewelry_prices()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
    current_silver_price_kg numeric;
BEGIN
    -- Fetch the latest silver price (assuming id=1 is the singleton row)
    SELECT price_idr INTO current_silver_price_kg FROM public.silver_price_summary WHERE id = 1 LIMIT 1;

    -- Only update if we have a valid silver price
    IF current_silver_price_kg IS NOT NULL THEN
        UPDATE public.jewelry
        SET price = ROUND( ((COALESCE(weight_grams, 0) * (current_silver_price_kg / 1000.0)) + COALESCE(labor_cost, 0)) * (1 + COALESCE(profit_margin, 25)/100.0) )
        WHERE weight_grams IS NOT NULL; 
    END IF;
END;
$function$
;


  create policy "Public Access Models Bucket"
  on "storage"."objects"
  as permissive
  for all
  to public
using ((bucket_id = 'models'::text))
with check ((bucket_id = 'models'::text));



