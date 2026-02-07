import {
  calculateDisplayPrices,
  getGoldPriceHistory,
  getGoldPriceSummary,
} from "@/lib/gold-price"
import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale,
} from "@/lib/seo"
import type { Metadata } from "next"

import { PriceFallbackCard } from "@/components/features/metal-price/metal-price-card"
import { MetalPriceDisplay } from "@/components/features/metal-price/metal-price-display"
import { GOLD_FAQ_ITEMS } from "./constants"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const canonicalUrl = constructCanonicalUrl(locale, "/gold-price")

  return {
    title: {
      absolute:
        "Harga Emas Hari Ini per Gram dalam Rupiah (IDR) | Salim Silver",
    },
    description:
      "Pantau harga emas murni terbaru hari ini dalam Rupiah (IDR). Data harga per gram yang akurat dan terupdate untuk investasi Anda.",
    keywords: [
      "Harga Emas Hari Ini",
      "Harga Emas per Gram",
      "Harga Emas Antam",
      "Harga Emas Rupiah",
      "Investasi Emas",
      "Gold Price Indonesia",
      "Harga Gold per Gram",
      "Jual Beli Emas",
      "Harga Emas Murni",
      "Grafik Harga Emas",
      "Harga Emas Terbaru",
      "Gold Price Rupiah",
      "Harga Emas Minggu Lalu",
      "Harga Emas Bulan Lalu",
      "Harga Emas 6 Bulan Lalu",
      "Harga Emas 1 Tahun Lalu",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternates("/gold-price"),
    },
    openGraph: {
      title: "Harga Emas Hari Ini | Update Terbaru per Gram (IDR)",
      description:
        "Cek harga emas murni hari ini dalam Rupiah. Data terupdate real-time untuk panduan beli dan investasi emas Anda.",
      url: canonicalUrl,
      locale: getOpenGraphLocale(locale),
      type: "website",
      images: [
        {
          url: "/api/og/gold-price",
          width: 1200,
          height: 630,
          alt: "Harga Emas Hari Ini di Salim Silver",
        },
      ],
    },
  }
}

import { constructLocalizedPath } from "@/lib/utils"

export default async function GoldPricePage({ params }: Props) {
  const { locale } = await params
  const summaryData = await getGoldPriceSummary()
  const displayPrices = calculateDisplayPrices(summaryData)
  const chartData = await getGoldPriceHistory(30)

  let priceContent

  if (!displayPrices) {
    // Fallback if cache is empty
    priceContent = (
      <PriceFallbackCard
        title="Harga Emas"
        description="Kami saat ini tidak dapat mengambil harga emas terbaru. Silakan periksa kembali nanti."
      />
    )
  } else {
    priceContent = (
      <MetalPriceDisplay
        displayPrices={displayPrices}
        chartData={chartData}
        enableTaxToggle={false}
        relatedMetal={{
          name: "Perak",
          href: constructLocalizedPath(locale, "/silver-price"),
        }}
      />
    )
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: "Gold Price per Gram",
        description:
          "Current price of fine gold (999) per gram in Indonesian Rupiah (IDR).",
        image: "https://salimsilver.com/api/og/gold-price",
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
          url: constructCanonicalUrl(locale, "/gold-price"),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: GOLD_FAQ_ITEMS.map((item) => ({
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
