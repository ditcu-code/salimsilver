// Use the production domain by default so Open Graph tags don't point at the protected Vercel preview URL.
export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://salimsilver.com"
export const SUPABASE_CATALOG_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/catalog`

export const GOOGLE_REVIEW_URL = "https://g.page/r/Ccp8F6XYiXlcEBM/review"

export const TRIPADVISOR_REVIEW_URL =
  "https://www.tripadvisor.com/Attraction_Review-g14782503-d34570158-Reviews-Salim_Silver-Yogyakarta_Yogyakarta_Region_Java.html"
