import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale,
} from "@/lib/seo"
import {
  calculateDisplayPrices,
  getSilverPriceSummary,
} from "@/lib/silver-price"
import type { Metadata } from "next"

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
      absolute:
        "Harga Perak Hari Ini per Gram dalam Rupiah (IDR) | Salim Silver",
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
      "Harga Perak Minggu Lalu",
      "Harga Perak Bulan Lalu",
      "Harga Perak 6 Bulan Lalu",
      "Harga Perak 1 Tahun Lalu",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternates("/silver-price"),
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
  const summaryData = await getSilverPriceSummary()
  const displayPrices = calculateDisplayPrices(summaryData)

  let priceContent

  if (!displayPrices) {
    // Fallback if cache is empty (e.g. before first cron run)
    // We could fallback to old query, but showing fallback card is safer/simpler
    priceContent = <PriceFallbackCard />
  } else {
    priceContent = (
      <SilverPriceDisplay
        currentPrice={displayPrices.currentPrice}
        previousPrice={displayPrices.previousPrice}
        price7d={displayPrices.price7d}
        price30d={displayPrices.price30d}
        price180d={displayPrices.price180d}
        price1y={displayPrices.price1y}
        lastUpdated={displayPrices.lastUpdated}
      />
    )
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: "Silver Price per Gram",
        description:
          "Current price of fine silver (999) per gram in Indonesian Rupiah (IDR).",
        image: "https://salimsilver.com/api/og/silver-price",
        brand: {
          "@type": "Brand",
          name: "Salim Silver",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: displayPrices ? displayPrices.currentPrice : "0",
          availability: "https://schema.org/InStock",
          priceValidUntil: new Date(
            Date.now() + 24 * 60 * 60 * 1000,
          ).toISOString(),
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
