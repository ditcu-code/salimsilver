import { Clock3, Mail, Phone } from "lucide-react"
import type { Metadata } from "next"
import type { ReactNode } from "react"

import CTASection from "@/components/blocks/cta-section"
import StoreLocationSection from "@/components/blocks/store-location-section"
import StoreHero from "./components/StoreHero"

import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Visit Salim Silver | Store Location",
  description:
    "Find the Salim Silver workshop in Kotagede, Yogyakarta. Plan your visit, get directions, and arrange a studio tour.",
  alternates: {
    canonical: `${BASE_URL}/store-location`,
  },
  openGraph: {
    type: "website",
    title: "Visit Salim Silver | Store Location",
    description:
      "Find the Salim Silver workshop in Kotagede, Yogyakarta. Plan your visit, get directions, and arrange a studio tour.",
    url: `${BASE_URL}/store-location`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Salim Silver | Store Location",
    description:
      "Find the Salim Silver workshop in Kotagede, Yogyakarta. Plan your visit, get directions, and arrange a studio tour.",
  },
}

export default function StoreLocationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {/* Hero Section */}
      <StoreHero />

      {/* Content Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid gap-12 md:grid-cols-[1.2fr,0.8fr]">
          {/* Left Column: What to Expect */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-display mb-4">Experience the Craft</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Discover where every Salim Silver piece comes to life. Step into our Kotagede
                workshop, see the tools we use each day, and pick up your order directly from the
                artisans who crafted it.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-card/60 p-8 shadow-sm backdrop-blur">
              <h3 className="text-xl font-display mb-4">What to expect</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>Guided walk-through of our traditional tools and techniques</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>See works in progress and one-of-a-kind pieces being made</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <span>
                    Pick up online orders or discuss custom designs in person with our designers
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Quick Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-display mb-4">Quick Information</h3>
            <div className="grid gap-4">
              <InfoCard
                icon={<Clock3 className="text-primary" size={20} />}
                title="Plan Your Visit"
                description="Let us know before you arrive so we can prepare a guided look at the studio."
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
        ctaLabel="Contact the Studio"
        ctaHref="/contact"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JewelryStore",
            name: "Salim Silver",
            image: `${BASE_URL}/images/hero-background.png`,
            "@id": `${BASE_URL}/store-location`,
            url: `${BASE_URL}/store-location`,
            telephone: "+62 896 7197 7699",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kebohan KG 3/547, Purbayan, Kotagede",
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
    <div className="flex gap-4 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-primary/20">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </p>
        <div className="text-foreground font-medium">{description}</div>
      </div>
    </div>
  )
}
