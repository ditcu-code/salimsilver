import type { Metadata } from "next"

import CTASection from "@/components/blocks/cta-section"

import BioSection from "./components/BioSection"
import HeroSection from "./components/HeroSection"
import TimelineSection from "./components/TimelineSection"
import ValuesSection from "./components/ValuesSection"

import { BASE_URL, SUPABASE_CATALOG_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "About Salim Silver",
  description:
    "Meet Salim Silver: artisans crafting Javanese-inspired silver jewelry in Kotagede. Discover our heritage, values, and craftsmanship.",
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
  openGraph: {
    type: "website",
    title: "About Salim Silver",
    description:
      "Meet Salim Silver: artisans crafting Javanese-inspired silver jewelry in Kotagede. Discover our heritage, values, and craftsmanship.",
    url: `${BASE_URL}/about`,
    siteName: "Salim Silver"
  },
  twitter: {
    card: "summary_large_image",
    title: "About Salim Silver",
    description:
      "Meet Salim Silver: artisans crafting Javanese-inspired silver jewelry in Kotagede. Discover our heritage, values, and craftsmanship.",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BioSection />
      <TimelineSection />
      <ValuesSection />
      <CTASection
        title="Visit Our Workshop"
        description="Experience the magic of silver crafting firsthand. Book a tour or a jewelry-making class."
        ctaLabel="Book a Visit"
        ctaHref="/contact"
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
              description: "Artisans crafting Javanese-inspired silver jewelry in Kotagede.",
              image: `${SUPABASE_CATALOG_URL}/baroque-pearl-citrine-silver-brooch.webp`,
              telephone: "+62 896 7197 7699",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kebohan KG 3/547, Purbayan, Kotagede",
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
