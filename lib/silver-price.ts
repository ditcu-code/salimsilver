import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { unstable_cache } from "next/cache"
import { SilverPriceSummary } from "./types"

export const getSilverPriceSummary = unstable_cache(
  async (): Promise<SilverPriceSummary | null> => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase environment variables missing")
      }

      const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

      const { data, error } = await supabase
        .from("silver_price_summary")
        .select("*")
        .eq("id", 1)
        .single()

      if (error) {
        console.error("Supabase Error in getSilverPriceSummary:", error)
        throw error
      }

      return data as SilverPriceSummary
    } catch (e) {
      console.error("Exception in getSilverPriceSummary:", e)
      throw e
    }
  },
  ["silver-price-summary"],
  {
    revalidate: 1800, // 30 minutes
    tags: ["silver-price-summary"],
  },
)

export interface DisplayPrices {
  currentPrice: number
  previousPrice: number
  price7d: number
  price30d: number
  price180d: number
  price1y: number
  lastUpdated: string
}

export function calculateDisplayPrices(
  summary: SilverPriceSummary | null,
): DisplayPrices | null {
  if (!summary) return null

  // Convert from kg to per gram (divide by 1000)
  const currentPrice = summary.price_idr / 1000

  // Use 24h ago price if available, otherwise fallback to current
  const previousPrice = summary.price_24h_ago
    ? summary.price_24h_ago / 1000
    : currentPrice

  // Use 7d ago price if available, otherwise fallback to 24h ago price (and if that's missing, current)
  // This provides a cascading fallback
  const price7d = summary.price_7d_ago
    ? summary.price_7d_ago / 1000
    : previousPrice
  const price30d = summary.price_30d_ago
    ? summary.price_30d_ago / 1000
    : price7d
  const price180d = summary.price_180d_ago
    ? summary.price_180d_ago / 1000
    : price30d
  const price1y = summary.price_1y_ago ? summary.price_1y_ago / 1000 : price180d

  return {
    currentPrice,
    previousPrice,
    price7d,
    price30d,
    price180d,
    price1y,
    lastUpdated: summary.updated_at,
  }
}
