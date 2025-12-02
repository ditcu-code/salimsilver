import type { Metadata } from "next"

export const dynamic = 'force-static'

import { HeroGallery } from "@/app/(home)/components/hero-gallery"
import IntroductionSection from "@/app/(home)/components/introduction-section"
import CTASection from "@/components/blocks/cta-section"
import FeaturedCollections from "@/components/blocks/featured-collections"
import { LayoutGridDemo } from "@/components/layout/layout-image-grid"

import { BASE_URL } from "@/lib/constants"

const baseUrl = BASE_URL

export const metadata: Metadata = {
  title: "Handcrafted Javanese Silver Jewelry",
  description:
    "Explore Salim Silver's handcrafted rings, necklaces, and bracelets inspired by Javanese heritage and made in Kotagede, Yogyakarta.",
  alternates: {
    canonical: `${baseUrl}/`,
  },
  openGraph: {
    title: "Handcrafted Javanese Silver Jewelry",
    description:
      "Explore Salim Silver's handcrafted rings, necklaces, and bracelets inspired by Javanese heritage and made in Kotagede, Yogyakarta.",
    url: `${baseUrl}/`,
    images: [
      {
        url: `${baseUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Handcrafted Javanese Silver Jewelry",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Handcrafted Javanese Silver Jewelry",
    description:
      "Explore Salim Silver's handcrafted rings, necklaces, and bracelets inspired by Javanese heritage and made in Kotagede, Yogyakarta.",
    images: [`${baseUrl}/opengraph-image`],
  },
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Slider */}
      <HeroGallery />

      {/* Hero Section with Slider 
      <HeroSlider />*/}

      <IntroductionSection />

      {/* Dynamic Frame Section 
      <DynamicFrame />*/}

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
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JewelryStore",
            name: "Salim Silver",
            image: `${baseUrl}/images/hero-background.png`,
            "@id": `${baseUrl}`,
            url: baseUrl,
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
