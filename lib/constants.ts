// Use the production domain by default so Open Graph tags don't point at the protected Vercel preview URL.
export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://salimsilver.com"
export const SUPABASE_CATALOG_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/catalog`

export const GOOGLE_REVIEW_URL = "https://g.page/r/Ccp8F6XYiXlcEBM/review"

export const GETYOURGUIDE_REVIEW_URL =
  "https://www.getyourguide.com/scan-review-qr?activity_id=1494967&utm_medium=offline&utm_source=supplier_review_link&utm_campaign=supplier_review_qrcode&utm_content=1494967"

export const TRIPADVISOR_REVIEW_URL =
  "https://www.tripadvisor.com/Attraction_Review-g14782503-d34570158-Reviews-Salim_Silver-Yogyakarta_Yogyakarta_Region_Java.html"
