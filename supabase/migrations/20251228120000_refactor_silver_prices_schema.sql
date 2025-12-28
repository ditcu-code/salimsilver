-- Refactor silver_prices table

-- Drop columns that are no longer needed
ALTER TABLE silver_prices DROP COLUMN IF EXISTS price_usd;
ALTER TABLE silver_prices DROP COLUMN IF EXISTS source;

-- Convert price_idr to 4-byte integer (int4)
-- We use ROUND() to ensure we store the nearest integer value before casting
ALTER TABLE silver_prices 
  ALTER COLUMN price_idr TYPE integer 
  USING ROUND(price_idr)::integer;

-- Remove ID and make updated_at the primary key
ALTER TABLE silver_prices DROP CONSTRAINT IF EXISTS silver_prices_pkey;
ALTER TABLE silver_prices DROP COLUMN IF EXISTS id;
ALTER TABLE silver_prices ADD PRIMARY KEY (updated_at);

-- Update cron schedule to run every 4 hours starting at 5 AM WIB (22:00 UTC previous day)
-- WIB is UTC+7.
-- 05:00 WIB = 22:00 UTC
-- 09:00 WIB = 02:00 UTC
-- 13:00 WIB = 06:00 UTC
-- 17:00 WIB = 10:00 UTC
-- 21:00 WIB = 14:00 UTC
-- 01:00 WIB = 18:00 UTC
select cron.schedule(
    'fetch-silver-price-schedule',
    '0 2,6,10,14,18,22 * * *',
    $$
    select
        net.http_post(
            url:='https://ckrypbqakgmeujbdmeks.supabase.co/functions/v1/fetch-silver-price',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrcnlwYnFha2dtZXVqYmRtZWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NDE4NTYsImV4cCI6MjA4MTQxNzg1Nn0.hBzRsLZigHz071VTE_m6RN68R1E90MmwTNtmM8Ct7fs"}'::jsonb
        ) as request_id;
    $$
);
