-- Create silver_prices table with ID as PK (supporting history)
create table if not exists public.silver_prices (
    id uuid default gen_random_uuid() primary key,
    price_usd numeric not null,
    price_idr numeric not null,
    source text not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.silver_prices enable row level security;

-- Create policies
create policy "Allow public read access"
    on public.silver_prices
    for select
    to public
    using (true);

create policy "Allow service role to insert/update"
    on public.silver_prices
    for all
    to service_role
    using (true)
    with check (true);

-- Create index for performance on updated_at
create index if not exists idx_silver_prices_updated_at 
    on public.silver_prices (updated_at desc);

-- Enable extensions for scheduling
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Schedule the job
-- Jakarta Time (UTC+7): 05:00, 13:00, 21:00
-- UTC Time: 22:00, 06:00, 14:00
-- Cron: 0 6,14,22 * * *

-- NOTE: Replace 'YOUR_PROJECT_REF' and 'YOUR_ANON_KEY' with actual values in production.
select cron.schedule(
    'fetch-silver-price-schedule',
    '0 6,14,22 * * *',
    $$
    select
        net.http_post(
            url:='https://YOUR_PROJECT_REF.supabase.co/functions/v1/fetch-silver-price',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
        ) as request_id;
    $$
);
