import { Gem, Hammer, Sparkles } from "lucide-react"
import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import CTASection from "@/components/blocks/cta-section"
import StoreLocationSection from "@/components/blocks/store-location-section"
import StoreHero from "./components/StoreHero"

import { BASE_URL, SUPABASE_CATALOG_URL } from "@/lib/constants"
import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale,
} from "@/lib/seo"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: "StoreLocationPage.Metadata",
  })
  const canonicalUrl = constructCanonicalUrl(locale, "/store-location")

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternates("/store-location"),
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: "Salim Silver",
      locale: getOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  }
}

export default async function StoreLocationPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("StoreLocationPage")

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <StoreHero />

      {/* Content Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h2 className="font-display text-3xl md:text-4xl">
              {t("Content.title")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("Content.description")}
            </p>
          </div>

          <div className="border-border bg-card/60 relative overflow-hidden rounded-3xl border p-8 shadow-sm backdrop-blur md:p-10">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-linear-to-br from-primary/10 to-transparent blur-3xl" />

            <h3 className="font-display mb-8 text-2xl">
              {t("Expectations.title")}
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <Gem size={20} />
                </div>
                <p className="text-foreground font-medium">
                  {t("Expectations.items.browse")}
                </p>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <Hammer size={20} />
                </div>
                <p className="text-foreground font-medium">
                  {t("Expectations.items.works")}
                </p>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <Sparkles size={20} />
                </div>
                <p className="text-foreground font-medium">
                  {t("Expectations.items.consult")}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div id="location">
        <StoreLocationSection />
      </div>

      <CTASection
        title={t("CTA.title")}
        description={t("CTA.description")}
        ctaLabel={t("CTA.ctaLabel")}
        ctaHref="/contact"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JewelryStore",
            name: "Salim Silver",
            image: `${SUPABASE_CATALOG_URL}/baroque-pearl-citrine-silver-brooch.webp`,
            "@id": `${BASE_URL}/store-location`,
            url: `${BASE_URL}/store-location`,
            telephone: "+62 896 7197 7699",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Gg. Platina KG 3/547 - Kebohan, Purbayan, Kotagede",
              addressLocality: "Yogyakarta City",
              addressRegion: "Special Region of Yogyakarta",
              postalCode: "55173",
              addressCountry: "ID",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -7.8273171,
              longitude: 110.4019932,
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "08:00",
              closes: "16:30",
            },
          }),
        }}
      />
    </div>
  )
}
