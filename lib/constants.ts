// Use the production domain by default so Open Graph tags don't point at the protected Vercel preview URL.
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://salimsilver.com"
export const SUPABASE_CATALOG_URL = "https://twipnraxqejrjpfjoeyx.supabase.co/storage/v1/object/public/catalog"
