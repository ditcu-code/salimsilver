import {
  calculateDisplayPrices,
  getGoldPriceHistory,
  getGoldPriceSummary
} from "@/lib/gold-price"
import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale
} from "@/lib/seo"
import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PriceFallbackCard } from "@/components/features/metal-price/metal-price-card"
import { MetalPriceDisplay } from "@/components/features/metal-price/metal-price-display"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "GoldPricePage.Metadata" })
  const canonicalUrl = constructCanonicalUrl(locale, "/gold-price")

  return {
    title: {
      absolute: t("title")
    },
    description: t("description"),
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
      "Harga Emas 24 Karat"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternates("/gold-price")
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: canonicalUrl,
      locale: getOpenGraphLocale(locale),
      type: "website",
      images: [
        {
          url: "/api/og/gold-price",
          width: 1200,
          height: 630,
          alt: t("ogAlt")
        }
      ]
    }
  }
}

import { constructLocalizedPath } from "@/lib/utils"

export default async function GoldPricePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("GoldPricePage")
  const summaryData = await getGoldPriceSummary()
  const displayPrices = calculateDisplayPrices(summaryData)
  const chartData = await getGoldPriceHistory(30)

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
          href: constructLocalizedPath(locale, "/silver-price")
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
      question: t("FAQs.difference.question"),
      answer: t("FAQs.difference.answer")
    },
    {
      question: t("FAQs.buyPhysical.question"),
      answer: t("FAQs.buyPhysical.answer")
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
