-- Schedule the new job

-- Add is_api column (boolean) for efficiency (1 byte vs ~14 bytes for text)
-- false = Scraper (default), true = API
ALTER TABLE "public"."silver_prices" DROP COLUMN IF EXISTS "source";
ALTER TABLE "public"."silver_prices" ADD COLUMN IF NOT EXISTS "is_api" boolean DEFAULT false;

select cron.schedule(
  'fetch-silver-price-schedule', -- name of the cron job
  '55 * * * *',          -- runs at minute 55 (5 mins before hour)
  $$
  do language plpgsql '
  begin
    -- Sleep for random 0-10 minutes (0-600 seconds)
    -- This distributes execution between XX:55 and XX:05
    perform pg_sleep(floor(random() * 600));

    perform net.http_post(
      url:=''https://project-ref.supabase.co/functions/v1/fetch-silver-price'',
      headers:=''{"Content-Type": "application/json", "Authorization": "Bearer SERVICE_ROLE_KEY"}''::jsonb
    );
  end;
  ';
  $$
);
