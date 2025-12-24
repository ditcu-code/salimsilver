import type { Metadata } from "next"

import { PolaroidGallery } from "@/components/blocks/polaroid-gallery"
import { ReelsGallery } from "@/components/blocks/reels-gallery"
import { BASE_URL } from "@/lib/constants"
import { RegistrationForm } from "./components/registration-form"
import { WorkshopDetails } from "./components/workshop-details"
import { WorkshopHero } from "./components/workshop-hero"
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
            <div className="mb-8 lg:hidden">
              <h2 className="mb-4 font-serif text-3xl font-bold">Start Now</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Secure your slot for an unforgettable experience.
              </p>
            </div>
            <RegistrationForm />
          </div>
        </div>
      </div>

      <PolaroidGallery images={studentsImages} className="bg-stone-50 dark:bg-neutral-900/50" />
      <ReelsGallery reels={reels} className="mb-12" />
    </div>
  )
}
