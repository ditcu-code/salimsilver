import type { Metadata } from "next"

import ContactFormSection from "./components/ContactFormSection"
import ContactHero from "./components/ContactHero"
import ContactInfo from "./components/ContactInfo"
import FAQSection from "./components/FAQSection"

import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Contact Salim Silver",
  description:
    "Get in touch with Salim Silver for custom designs, wholesale inquiries, or workshop visits in Kotagede, Yogyakarta.",
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    type: "website",
    title: "Contact Salim Silver",
    description:
      "Get in touch with Salim Silver for custom designs, wholesale inquiries, or workshop visits in Kotagede, Yogyakarta.",
    url: `${BASE_URL}/contact`,
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
              image: `${BASE_URL}/images/catalog/hand-carved-silver-pearl-brooch-salimsilver.png`,
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
