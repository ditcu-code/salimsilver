import { constructCanonicalUrl, getOpenGraphLocale } from "@/lib/seo"
import type { Metadata } from "next"

import { createClient } from "@/lib/supabase/server"
import { PriceFallbackCard } from "./components/price-cards"
import { SilverPriceDisplay } from "./components/silver-price-display"
import { FAQ_ITEMS } from "./constants"

export const revalidate = 1800 // Revalidate every 30 minutes

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const canonicalUrl = constructCanonicalUrl(locale, "/silver-price")

  return {
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
      "Silver Price Rupiah",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Harga Perak Hari Ini | Update Terbaru per Gram (IDR)",
      description:
        "Cek harga perak murni hari ini dalam Rupiah. Data terupdate real-time untuk panduan beli dan investasi perak Anda.",
      url: canonicalUrl,
      locale: getOpenGraphLocale(locale),
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
}

export default async function SilverPricePage({ params }: Props) {
  const { locale } = await params
  const supabase = await createClient()

  // Fetch latest silver price summary (cached)
  const { data: summaryData } = await supabase
    .from("silver_price_summary")
    .select("price_idr, price_24h_ago, updated_at")
    .eq("id", 1)
    .single()

  let priceContent

  if (!summaryData) {
    // Fallback if cache is empty (e.g. before first cron run)
    // We could fallback to old query, but showing fallback card is safer/simpler
    priceContent = <PriceFallbackCard />
  } else {
    // Convert from kg to per gram (divide by 1000)
    const currentPrice = summaryData.price_idr / 1000
    // Use 24h ago price if available, otherwise fallback to current
    const previousPrice = summaryData.price_24h_ago
      ? summaryData.price_24h_ago / 1000
      : currentPrice

    priceContent = (
      <SilverPriceDisplay
        currentPrice={currentPrice}
        previousPrice={previousPrice}
        lastUpdated={summaryData.updated_at}
      />
    )
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
          url: constructCanonicalUrl(locale, "/silver-price"),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
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
