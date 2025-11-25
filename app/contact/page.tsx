import type { Metadata } from "next"

import FeaturedCollections from "@/components/blocks/featured-collections"

import ContactFormSection from "./components/ContactFormSection"
import ContactHero from "./components/ContactHero"
import ContactInfo from "./components/ContactInfo"
import FAQSection from "./components/FAQSection"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.salimsilver.com"

export const metadata: Metadata = {
  title: "Contact Salim Silver",
  description:
    "Get in touch with Salim Silver for custom designs, wholesale inquiries, or workshop visits in Kotagede, Yogyakarta.",
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    title: "Contact Salim Silver",
    description:
      "Get in touch with Salim Silver for custom designs, wholesale inquiries, or workshop visits in Kotagede, Yogyakarta.",
    url: `${baseUrl}/contact`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Salim Silver",
    description:
      "Get in touch with Salim Silver for custom designs, wholesale inquiries, or workshop visits in Kotagede, Yogyakarta.",
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <ContactHero />

      {/* Contact Section */}
      <section className="py-16 mt-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactFormSection />
        </div>
      </section>

      <FAQSection />
      <FeaturedCollections
        title="Featured Collections"
        description="Explore our latest creations"
        ctaLabel="View All Collections"
        ctaHref="/catalog"
        sectionClassName="mt-20 mb-20 py-20"
      />
    </div>
  )
}
