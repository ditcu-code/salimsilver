import type { Metadata } from "next"

import { createClient } from "@/lib/supabase/server"
import { PriceFallbackCard } from "./components/price-cards"
import { SilverPriceDisplay } from "./components/silver-price-display"

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
    "Harga Perak Rupiah",
    "Investasi Perak",
    "Silver Price Indonesia",
    "Harga Silver per Gram",
    "Jual Beli Perak",
    "Harga Perak Murni",
    "Grafik Harga Perak",
    "Harga Perak Terbaru",
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
    images: [
      {
        url: "/api/og/silver-price",
        width: 1200,
        height: 630,
        alt: "Harga Perak Hari Ini di Salim Silver",
      },
    ],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Silver Price per Gram",
      description: "Current price of fine silver (999) per gram in Indonesian Rupiah (IDR).",
      image: "https://salimsilver.com/api/og/silver-price",
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
            text: "Harga perak kami diperbarui secara berkala setiap 1 jam sekali mengikuti pergerakan pasar logam mulia dunia untuk memastikan akurasi data.",
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

  let priceContent

  if (!latestData) {
    priceContent = <PriceFallbackCard />
  } else {
    // Fetch yesterday's price (approx 24h ago)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

    const { data: yesterdayData } = await supabase
      .from("silver_prices")
      .select("price_idr")
      .lte("updated_at", twentyFourHoursAgo)
      .order("updated_at", { ascending: false })
      .limit(1)
      .single()

    // Convert from kg to per gram (divide by 1000)
    const currentPrice = latestData.price_idr / 1000
    const previousPrice = yesterdayData?.price_idr ? yesterdayData.price_idr / 1000 : currentPrice

    priceContent = (
      <SilverPriceDisplay
        currentPrice={currentPrice}
        previousPrice={previousPrice}
        lastUpdated={latestData.updated_at}
      />
    )
  }

  return (
    <div className="space-y-6">
      {priceContent}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
}
