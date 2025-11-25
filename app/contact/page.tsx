"use client"

import ContactFormSection from "./components/ContactFormSection"
import ContactHero from "./components/ContactHero"
import ContactInfo from "./components/ContactInfo"
import FAQSection from "./components/FAQSection"
import FeaturedCollectionsSection from "./components/FeaturedCollectionsSection"

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
      <FeaturedCollectionsSection />
    </div>
  )
}

