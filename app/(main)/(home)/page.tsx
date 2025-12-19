import type { Metadata } from "next"

export const dynamic = "force-static"

import CTASection from "@/components/blocks/cta-section"
import FeaturedCollections from "@/components/blocks/featured-collections"
import { LayoutGridDemo } from "@/components/layout/layout-image-grid"
import { getFeaturedCollections } from "@/lib/collections"
import { HeroGallery } from "./components/hero-gallery"
import IntroductionSection from "./components/introduction-section"

import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Handcrafted Javanese Silver Jewelry",
  description:
    "Explore Salim Silver's handcrafted rings, necklaces, and bracelets inspired by Javanese heritage and made in Kotagede, Yogyakarta.",
  alternates: {
    canonical: `${BASE_URL}/`,
  },
  openGraph: {
    type: "website",
    title: "Handcrafted Javanese Silver Jewelry",
    description:
      "Explore Salim Silver's handcrafted rings, necklaces, and bracelets inspired by Javanese heritage and made in Kotagede, Yogyakarta.",
    url: `${BASE_URL}/`,
    siteName: "Salim Silver",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handcrafted Javanese Silver Jewelry",
    description:
      "Explore Salim Silver's handcrafted rings, necklaces, and bracelets inspired by Javanese heritage and made in Kotagede, Yogyakarta.",
  },
}

export default async function Home() {
  const featuredCollections = await getFeaturedCollections()
  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <HeroGallery />

      <IntroductionSection />

      {/* Layout Grid Section */}
      <LayoutGridDemo />

      {/* Call to Action */}
      <CTASection
        title="Custom Designs & Wholesale"
        description="Looking for a unique piece or interested in stocking our jewelry? We offer custom design services and wholesale partnerships."
        ctaLabel="Inquire Now"
        ctaHref="/contact"
      />

      <FeaturedCollections
        title="Featured Collections"
        description="Explore our curated selection of handcrafted silver jewelry"
        ctaLabel="View All Collections"
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
            image: `${BASE_URL}/images/hero-background.png`,
            "@id": `${BASE_URL}`,
            url: BASE_URL,
            telephone: "+62 896 7197 7699",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kebohan KG 3/547, Purbayan, Kotagede",
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
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "08:00",
              closes: "16:00",
            },
          }),
        }}
      />
    </div>
  )
}
