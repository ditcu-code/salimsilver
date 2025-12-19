import type { Metadata } from "next"

import { BASE_URL } from "@/lib/constants"
import Image from "next/image"
import { RegistrationForm } from "./components/registration-form"
import { WorkshopSteps } from "./components/workshop-steps"

export const metadata: Metadata = {
  title: "Silversmith Jewelry Workshop in Kotagede, Yogyakarta",
  description:
    "Join our 3-hour hands-on silversmithing workshop in Kotagede, Yogyakarta. Learn the 7 steps of creating traditional silver jewelry from master artisans.",
  alternates: {
    canonical: `${BASE_URL}/workshop`,
  },
  openGraph: {
    title: "Silversmith Jewelry Workshop - Create Your Own Silver Jewelry",
    description:
      "Join our 3-hour hands-on silversmithing workshop in Kotagede, Yogyakarta. Learn the 7 steps of creating traditional silver jewelry from master artisans.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silversmith Jewelry Workshop - Create Your Own Silver Jewelry",
    description:
      "Join our 3-hour hands-on silversmithing workshop in Kotagede, Yogyakarta. Learn the 7 steps of creating traditional silver jewelry from master artisans.",
  },
}

export default function WorkshopPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] flex-col justify-center bg-neutral-900 py-24 text-center text-neutral-50">
        <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
          <Image
            src="/images/tatah-cincin.webp"
            alt="Menatah Cincin diatas Jabung"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight md:text-6xl">
            Silversmith Workshop
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-300 md:text-xl">
            Experience the art of Javanese silversmithing. Create your own masterpiece in the heart
            of Kotagede directly solely with the master.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: Information & Steps */}
          <div className="space-y-12">
            <div>
              <h2 className="mb-3 font-serif text-3xl leading-none font-bold text-neutral-900 dark:text-neutral-50">
                How It Works
              </h2>
              <p className="mb-8 text-neutral-600 dark:text-neutral-400">
                Embark on a three-hour creative journey where you'll master the seven fundamental
                stages of traditional silver craftsmanship.
              </p>
              <WorkshopSteps />
            </div>

            <div className="rounded-2xl bg-neutral-100 p-8 dark:bg-neutral-900">
              <h3 className="mb-4 font-serif text-2xl font-bold">Important Notes</h3>
              <ul className="list-inside list-disc space-y-2 text-neutral-600 dark:text-neutral-400">
                <li>Open Mon - Sat</li>
                <li>Morning Session: 08:30 - 11:30</li>
                <li>Afternoon Session: 12:30 - 15:30</li>
                <li>Price includes silver up to 5 grams</li>
                <li>Full equipment provided</li>
              </ul>
            </div>
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
    </div>
  )
}
