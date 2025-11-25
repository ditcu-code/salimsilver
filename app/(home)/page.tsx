import type { Metadata } from "next"

import CTASection from "@/components/blocks/cta-section"
import FeaturedCollections from "@/components/blocks/featured-collections"
import { HeroGallery } from "@/app/(home)/components/hero-gallery"
import IntroductionSection from "@/app/(home)/components/introduction-section"
import { LayoutGridDemo } from "@/components/layout/layout-image-grid"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.salimsilver.com"

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Handcrafted Javanese Silver Jewelry",
    description:
      "Explore Salim Silver's handcrafted rings, necklaces, and bracelets inspired by Javanese heritage and made in Kotagede, Yogyakarta.",
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
        sectionClassName="min-w-[90%] justify-self-center mr-4 ml-4 py-20 lg:my-20 sm:mt-0 sm:mb-20 z-10"
        paddingClassName="px-2 md:px-8"
      />

      <FeaturedCollections
        title="Featured Collections"
        description="Explore our curated selection of handcrafted silver jewelry"
        ctaLabel="View All Collections"
        ctaHref="/catalog"
        sectionClassName="lg:mt-32 mb-32 z-10 mt-20"
      />
    </div>
  )
}
