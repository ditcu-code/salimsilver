import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { SUPABASE_CATALOG_URL } from "@/lib/constants"
import { constructCanonicalUrl, getOpenGraphLocale } from "@/lib/seo"
import ContactFormSection from "./components/ContactFormSection"
import ContactHero from "./components/ContactHero"
import ContactInfo from "./components/ContactInfo"
import FAQSection from "./components/FAQSection"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "ContactPage.Metadata" })
  const canonicalUrl = constructCanonicalUrl(locale, "/contact")

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
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

export default async function ContactPage() {
  const t = await getTranslations("ContactPage.Metadata")

  return (
    <div className="min-h-screen">
      <ContactHero />

      {/* Contact Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <ContactInfo />
          <ContactFormSection />
        </div>
      </section>

      <FAQSection />
      {/* <FeaturedCollections
        title="Featured Collections"
        description="Explore our latest creations"
        ctaLabel="View All Collections"
        ctaHref="/catalog"
        sectionClassName="mt-20 mb-20 py-20"
        /> */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            mainEntity: {
              "@type": "JewelryStore",
              name: "Salim Silver",
              image: `${SUPABASE_CATALOG_URL}/baroque-pearl-citrine-silver-brooch.webp`,
              telephone: "+62 896 7197 7699",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+62 896 7197 7699",
                contactType: "customer service",
                areaServed: "ID",
                availableLanguage: ["English", "Indonesian"],
              },
              address: {
                "@type": "PostalAddress",
                streetAddress: "Gg. Platina KG 3/547 - Kebohan, Purbayan, Kotagede",
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
