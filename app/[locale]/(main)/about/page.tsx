import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import CTASection from "@/components/blocks/cta-section"

import BioSection from "./components/BioSection"
import HeroSection from "./components/HeroSection"
import TimelineSection from "./components/TimelineSection"
import ValuesSection from "./components/ValuesSection"

import { BASE_URL, SUPABASE_CATALOG_URL } from "@/lib/constants"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "AboutPage.Metadata" })

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}/about`,
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}/about`,
      siteName: "Salim Silver",
      locale: locale === "en" ? "en_US" : "id_ID",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/opengraph-image"],
    },
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("AboutPage")
  const tMeta = await getTranslations("AboutPage.Metadata")

  return (
    <div className="min-h-screen">
      <HeroSection />
      <BioSection />
      <TimelineSection />
      <ValuesSection />
      <CTASection
        title={t("CTA.title")}
        description={t("CTA.description")}
        ctaLabel={t("CTA.ctaLabel")}
        ctaHref="/workshop"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            mainEntity: {
              "@type": "JewelryStore",
              name: "Salim Silver",
              description: tMeta("schemaDescription"),
              image: `${SUPABASE_CATALOG_URL}/baroque-pearl-citrine-silver-brooch.webp`,
              telephone: "+62 896 7197 7699",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Gg. Platina - Kebohan KG 3/547, Purbayan, Kotagede",
                addressLocality: "Yogyakarta City",
                addressRegion: "Special Region of Yogyakarta",
                postalCode: "55173",
                addressCountry: "ID",
              },
            },
          }),
        }}
      />
    </div>
  )
}
