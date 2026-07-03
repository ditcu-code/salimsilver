import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale
} from "@/lib/seo"
import {
  calculateDisplayPrices,
  getSilverPriceHistory,
  getSilverPriceSummary
} from "@/lib/silver-price"
import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PriceFallbackCard } from "@/components/features/metal-price/metal-price-card"
import { MetalPriceDisplay } from "@/components/features/metal-price/metal-price-display"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: "SilverPricePage.Metadata"
  })
  const canonicalUrl = constructCanonicalUrl(locale, "/silver-price")

  return {
    title: {
      absolute: t("title")
    },
    description: t("description"),
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
      "Harga Perak 1 Tahun Lalu"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternates("/silver-price")
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalUrl,
      locale: getOpenGraphLocale(locale),
      type: "website",
      images: [
        {
          url: "/api/og/silver-price",
          width: 1200,
          height: 630,
          alt: t("ogAlt")
        }
      ]
    }
  }
}

import { constructLocalizedPath } from "@/lib/utils"

export default async function SilverPricePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("SilverPricePage")
  const summaryData = await getSilverPriceSummary()
  const displayPrices = calculateDisplayPrices(summaryData)
  const chartData = await getSilverPriceHistory(180)

  let priceContent

  if (!displayPrices) {
    // Fallback if cache is empty
    priceContent = (
      <PriceFallbackCard
        title={t("page.fallbackTitle")}
        description={t("page.fallbackDescription")}
      />
    )
  } else {
    priceContent = (
      <MetalPriceDisplay
        displayPrices={displayPrices}
        chartData={chartData}
        relatedMetal={{
          name: t("page.relatedMetalName"),
          href: constructLocalizedPath(locale, "/gold-price")
        }}
      />
    )
  }

  const faqItems = [
    {
      question: t("FAQs.updateFrequency.question"),
      answer: t("FAQs.updateFrequency.answer")
    },
    {
      question: t("FAQs.source.question"),
      answer: t("FAQs.source.answer")
    },
    {
      question: t("FAQs.localVsInternational.question"),
      answer: t("FAQs.localVsInternational.answer")
    }
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    ]
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
