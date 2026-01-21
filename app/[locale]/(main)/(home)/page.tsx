import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export const dynamic = "force-static"

import CTASection from "@/components/blocks/cta-section"
import FeaturedCollections from "@/components/blocks/featured-collections"
import { LayoutGridDemo } from "@/components/layout/layout-image-grid"
import { getFeaturedCollections } from "@/lib/collections"
import { HeroGallery } from "./components/hero-gallery"
import IntroductionSection from "./components/introduction-section"

import { BASE_URL } from "@/lib/constants"
import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale,
} from "@/lib/seo"

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "HomePage.Metadata" })
  const canonicalUrl = constructCanonicalUrl(locale, "/")

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternates(),
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: "Salim Silver",
      locale: getOpenGraphLocale(locale),
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

export default async function Home({ params }: Props) {
  const { locale } = await params
  const featuredCollections = await getFeaturedCollections()
  const t = await getTranslations("HomePage")

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <HeroGallery />

      <IntroductionSection />

      {/* Layout Grid Section */}
      <LayoutGridDemo />

      {/* Call to Action */}
      <CTASection
        title={t("CTA.title")}
        description={t("CTA.description")}
        ctaLabel={t("CTA.ctaLabel")}
        ctaHref="/contact"
      />

      <FeaturedCollections
        title={t("Featured.title")}
        description={t("Featured.description")}
        ctaLabel={t("Featured.ctaLabel")}
        ctaHref="/catalog"
        sectionClassName="lg:mt-32 mb-32 z-10 mt-20"
        collections={featuredCollections}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JewelryStore",
            name: "Salim Silver",
            priceRange: "$$",
            description: t("Metadata.description"),
            image: `${BASE_URL}/images/hero-background.png`,
            "@id": constructCanonicalUrl(locale, "/"),
            url: constructCanonicalUrl(locale, "/"),
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
            sameAs: ["https://www.instagram.com/salimsilverofficial/"],
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
              closes: "16:00",
            },
          }),
        }}
      />
    </div>
  )
}
