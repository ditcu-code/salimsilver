import { Clock3, Mail, Phone } from "lucide-react"
import type { Metadata } from "next"
import type { ReactNode } from "react"

import CTASection from "@/components/blocks/cta-section"
import StoreLocationSection from "@/components/blocks/store-location-section"
import StoreHero from "./components/StoreHero"

import { BASE_URL, SUPABASE_CATALOG_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Visit Salim Silver | Store & Workshop",
  description:
    "Visit our Kotagede store and workshop. Shop our handcrafted silver collection and see the artisans at work in one location.",
  alternates: {
    canonical: `${BASE_URL}/store-location`,
  },
  openGraph: {
    type: "website",
    title: "Visit Salim Silver | Store & Workshop",
    description:
      "Visit our Kotagede store and workshop. Shop our handcrafted silver collection and see the artisans at work in one location.",
    url: `${BASE_URL}/store-location`,
    siteName: "Salim Silver",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Salim Silver | Store & Workshop",
    description:
      "Visit our Kotagede store and workshop. Shop our handcrafted silver collection and see the artisans at work in one location.",
  },
}

export default function StoreLocationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* Hero Section */}
      <StoreHero />

      {/* Content Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr,0.8fr]">
          {/* Left Column: What to Expect */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display mb-4 text-3xl">The Workshop & Store</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                A &quot;hidden gem&quot; deliberately located away from the main commercial streets.
                You will enter a traditional Javanese compound that functions as a &quot;living
                museum,&quot; seamlessly blending our domestic residence with the active silver
                workshop.
              </p>
            </div>

            <div className="border-border bg-card/60 rounded-3xl border p-8 shadow-sm backdrop-blur">
              <h3 className="font-display mb-4 text-2xl">What to expect</h3>
              <ul className="text-muted-foreground space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-primary mt-3 h-1.5 w-1.5 shrink-0 rounded-full" />
                  <span>Browse our complete collection of ready-to-wear jewelry</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary mt-3 h-1.5 w-1.5 shrink-0 rounded-full" />
                  <span>See works in progress and one-of-a-kind pieces being made</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary mt-3 h-1.5 w-1.5 shrink-0 rounded-full" />
                  <span>Try on pieces and consult with our team on custom designs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Quick Info */}
          <div className="space-y-6">
            <h3 className="font-display mb-4 text-2xl">Quick Information</h3>
            <div className="grid gap-4">
              <InfoCard
                icon={<Clock3 className="text-primary" size={20} />}
                title="Plan Your Visit"
                description="Let us know before you arrive so we can prepare a guided look at the workshop."
              />
              <InfoCard
                icon={<Phone className="text-primary" size={20} />}
                title="Call Us"
                description="+62 896 7197 7699"
              />
              <InfoCard
                icon={<Mail className="text-primary" size={20} />}
                title="Email"
                description="hello@salimsilver.com"
              />
            </div>
          </div>
        </div>
      </section>

      <div id="location">
        <StoreLocationSection />
      </div>

      <CTASection
        title="Schedule Your Visit"
        description="Tell us when you'd like to stop by, and we’ll make sure the workshop is ready for you."
        ctaLabel="Contact the Workshop"
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
              streetAddress: "Gg. Platina - Kebohan KG 3/547, Purbayan, Kotagede",
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

interface InfoCardProps {
  icon: ReactNode
  title: string
  description: ReactNode
}

function InfoCard({ icon, title, description }: InfoCardProps) {
  return (
    <div className="border-border bg-card hover:border-primary/20 flex gap-4 rounded-3xl border p-5 transition-colors">
      <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-sm font-semibold tracking-wide uppercase">
          {title}
        </p>
        <div className="text-foreground font-medium">{description}</div>
      </div>
    </div>
  )
}
