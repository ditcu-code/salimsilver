import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"
import { PriceCard, PriceFallbackCard } from "./components/price-cards"

export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: {
    absolute: "Harga Perak Hari Ini per Gram dalam Rupiah (IDR) | Salim Silver",
  },
  description:
    "Pantau harga perak murni terbaru hari ini dalam Rupiah (IDR). Data harga per gram yang akurat dan terupdate untuk investasi Anda.",
  keywords: [
    "Harga Perak Hari Ini",
    "Harga Perak per Gram",
    "Harga Perak Antam",
    "Investasi Perak",
    "Silver Price Indonesia",
    "Harga Silver per Gram",
    "Jual Beli Perak",
  ],
  alternates: {
    canonical: "/silver-price",
  },
  openGraph: {
    title: "Harga Perak Hari Ini | Update Terbaru per Gram (IDR)",
    description:
      "Cek harga perak murni hari ini dalam Rupiah. Data terupdate real-time untuk panduan beli dan investasi perak Anda.",
    url: "/silver-price",
    locale: "id_ID",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Silver Price per Gram",
  description: "Current price of fine silver (999) per gram in Indonesian Rupiah (IDR).",
  image: "https://salimsilver.com/opengraph-image", // Assuming this exists or falls back to default
  brand: {
    "@type": "Brand",
    name: "Salim Silver",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "IDR",
    availability: "https://schema.org/InStock",
    priceValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Valid for 24h
  },
}

export default async function SilverPricePage() {
  const supabase = await createClient()

  // Fetch latest silver price
  const { data: latestData } = await supabase
    .from("silver_prices")
    .select("price_idr, updated_at")
    .order("updated_at", { ascending: false })
    .limit(1)
    .single()

  // Fallback if no data
  if (!latestData) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-24 md:py-32">
        <PriceFallbackCard />
      </div>
    )
  }

  // Fetch yesterday's price (approx 24h ago)
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const { data: yesterdayData } = await supabase
    .from("silver_prices")
    .select("price_idr")
    .lte("updated_at", twentyFourHoursAgo)
    .order("updated_at", { ascending: false })
    .limit(1)
    .single()

  const currentPrice = latestData.price_idr
  const previousPrice = yesterdayData?.price_idr || currentPrice

  return (
    <div className="container mx-auto max-w-lg px-4 pt-30 pb-12 md:pb-18">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-2 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Harga Perak
          </h1>
          <p className="text-muted-foreground text-lg">
            Update harga perak murni terkini dalam Rupiah.
          </p>
        </div>

        <PriceCard
          currentPrice={currentPrice}
          previousPrice={previousPrice}
          lastUpdated={latestData.updated_at}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </div>
  )
}
