import { createClient } from "@/lib/supabase/server"
import { PriceFallbackCard } from "./components/price-cards"
import { SilverPriceDisplay } from "./components/silver-price-display"

export const revalidate = 3600 // Revalidate every hour

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Silver Price per Gram",
      description: "Current price of fine silver (999) per gram in Indonesian Rupiah (IDR).",
      image: "https://salimsilver.com/opengraph-image",
      brand: {
        "@type": "Brand",
        name: "Salim Silver",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
        priceValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Apakah harga perak ini sudah termasuk PPN?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Secara default, harga yang ditampilkan belum termasuk PPN. Anda dapat mengaktifkan opsi 'Termasuk PPN 11%' untuk melihat harga setelah pajak.",
          },
        },
        {
          "@type": "Question",
          name: "Seberapa sering harga perak diperbarui?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Harga perak kami diperbarui secara berkala setiap 4 jam sekali mengikuti pergerakan pasar logam mulia dunia untuk memastikan akurasi data.",
          },
        },
        {
          "@type": "Question",
          name: "Apakah saya bisa membeli perak fisik di Salim Silver?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ya, Salim Silver menyediakan berbagai perhiasan perak handmade berkualitas tinggi khas Kotagede. Anda bisa memesan langsung melalui katalog website kami.",
          },
        },
      ],
    },
  ],
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
    return <PriceFallbackCard />
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
    <>
      <SilverPriceDisplay
        currentPrice={currentPrice}
        previousPrice={previousPrice}
        lastUpdated={latestData.updated_at}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
