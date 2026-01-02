-- Create silver_price_summary table
CREATE TABLE public.silver_price_summary (
    id integer PRIMARY KEY CHECK (id = 1),
    price_idr integer NOT NULL,
    price_24h_ago integer,
    price_7d_ago integer,
    price_30d_ago integer,
    price_1y_ago integer,
    source public.price_source_type NOT NULL,
    updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now())
);

-- RLS Policies (assuming public read is desired)
ALTER TABLE public.silver_price_summary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.silver_price_summary
    FOR SELECT
    USING (true);

-- Only service role can insert/update (implicitly handled by not adding write policies for public/anon)
-- But we can add explicit policy for service role if needed, or rely on service role bypassing RLS.
