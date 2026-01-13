-- Add 'tradingview' to the price_source_type enum
ALTER TYPE public.price_source_type ADD VALUE IF NOT EXISTS 'tradingview';
