import type { Metadata } from "next"

import { PolaroidGallery } from "@/components/blocks/polaroid-gallery"
import { ReelsGallery } from "@/components/blocks/reels-gallery"
import { BASE_URL } from "@/lib/constants"
import { RegistrationForm } from "./components/registration-form"
import { WorkshopDetails } from "./components/workshop-details"
import { WorkshopHero } from "./components/workshop-hero"
import { WorkshopReasons } from "./components/workshop-reasons"
import { WorkshopSteps } from "./components/workshop-steps"
import { reels, studentsImages } from "./constants"

export const metadata: Metadata = {
  title: "Silversmith Jewelry Workshop in Kotagede, Yogyakarta",
  description:
    "Join our 3-hour hands-on silversmithing workshop in Kotagede, Yogyakarta. Learn the steps of creating traditional silver jewelry from master artisans.",
  alternates: {
    canonical: `${BASE_URL}/workshop`,
  },
  openGraph: {
    title: "Silversmith Jewelry Workshop - Create Your Own Silver Jewelry",
    description:
      "Join our 3-hour hands-on silversmithing workshop in Kotagede, Yogyakarta. Learn the steps of creating traditional silver jewelry from master artisans.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silversmith Jewelry Workshop - Create Your Own Silver Jewelry",
    description:
      "Join our 3-hour hands-on silversmithing workshop in Kotagede, Yogyakarta. Learn the steps of creating traditional silver jewelry from master artisans.",
  },
}

export default function WorkshopPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <WorkshopHero />

      <div className="container mx-auto px-4 pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: Information & Steps */}
          <div className="space-y-12">
            <div>
              <h2 className="mb-3 font-serif text-3xl leading-none font-bold text-neutral-900 dark:text-neutral-50">
                How It Works
              </h2>
              <p className="mb-8 text-neutral-600 dark:text-neutral-400">
                Embark on a three-hour creative journey where you&apos;ll master the fundamental
                stages of traditional silver craftsmanship.
              </p>
              <WorkshopSteps />
            </div>

            <WorkshopDetails />
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div id="registration-form" className="mb-8 lg:hidden">
              <h2 className="mb-4 font-serif text-3xl font-bold">Start Now</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Secure your slot for an unforgettable experience.
              </p>
            </div>
            <RegistrationForm />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/80 p-4 backdrop-blur-md md:hidden dark:border-stone-800 dark:bg-stone-900/80">
        <a
          href="#registration-form"
          className="flex w-full items-center justify-center rounded-full bg-stone-900 py-3 font-medium text-white shadow-lg dark:bg-stone-50 dark:text-stone-900"
        >
          Book Your Workshop
        </a>
      </div>

      <WorkshopReasons />
      <PolaroidGallery images={studentsImages} />
      <ReelsGallery reels={reels} className="mb-12" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Silversmith Jewelry Workshop",
            description:
              "Join our 3-hour hands-on silversmithing workshop in Kotagede, Yogyakarta. Learn the steps of creating traditional silver jewelry from master artisans.",
            provider: {
              "@type": "Organization",
              name: "Salim Silver",
              sameAs: "https://salimsilver.com",
            },
            educationalLevel: "Beginner",
            teaches: "Traditional Javanese Silversmithing",
            offers: {
              "@type": "Offer",
              category: "Workshop",
              url: `${BASE_URL}/workshop`,
              availability: "https://schema.org/InStock",
              price: "500000",
              priceCurrency: "IDR",
              seller: {
                "@type": "Organization",
                name: "Salim Silver",
              },
            },
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Onsite",
              courseWorkload: "PT3H",
              location: {
                "@type": "Place",
                name: "Salim Silver Workshop",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Kebohan KG 3/547, Purbayan, Kotagede",
                  addressLocality: "Yogyakarta City",
                  addressRegion: "Special Region of Yogyakarta",
                  postalCode: "55173",
                  addressCountry: "ID",
                },
              },
            },
          }),
        }}
      />
    </div>
  )
}
