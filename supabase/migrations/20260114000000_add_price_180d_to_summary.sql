-- Add price_180d_ago column to silver_price_summary
ALTER TABLE public.silver_price_summary
ADD COLUMN price_180d_ago integer;
