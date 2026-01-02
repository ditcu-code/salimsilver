-- Create enum type for silver price source
CREATE TYPE public.price_source_type AS ENUM ('goldprice', 'bullion_rates', 'metals_dev');

-- Add new column
ALTER TABLE public.silver_prices ADD COLUMN source public.price_source_type;

-- Backfill data
-- Assuming is_api = true was only keying off metals_dev
UPDATE public.silver_prices SET source = 'metals_dev' WHERE is_api = true;
-- Assuming is_api = false was goldprice (primary) or bullion_rates (scraper), but defaulting to goldprice as requested/planned
UPDATE public.silver_prices SET source = 'goldprice' WHERE is_api = false;

-- Make source required
ALTER TABLE public.silver_prices ALTER COLUMN source SET NOT NULL;

-- Drop old column
ALTER TABLE public.silver_prices DROP COLUMN is_api;
