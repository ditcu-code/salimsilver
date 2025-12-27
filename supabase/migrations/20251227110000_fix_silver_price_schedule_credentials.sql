select cron.schedule(
    'fetch-silver-price-schedule',
    '0 6,14,22 * * *',
    $$
    select
        net.http_post(
            url:='https://ckrypbqakgmeujbdmeks.supabase.co/functions/v1/fetch-silver-price',
            headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrcnlwYnFha2dtZXVqYmRtZWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NDE4NTYsImV4cCI6MjA4MTQxNzg1Nn0.hBzRsLZigHz071VTE_m6RN68R1E90MmwTNtmM8Ct7fs"}'::jsonb
        ) as request_id;
    $$
);
