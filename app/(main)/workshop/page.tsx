import type { Metadata } from "next"

import { PolaroidGallery } from "@/components/blocks/polaroid-gallery"
import { ReelsGallery } from "@/components/blocks/reels-gallery"
import { BASE_URL } from "@/lib/constants"
import { Clock, CreditCard, Hammer } from "lucide-react"
import Image from "next/image"
import { RegistrationForm } from "./components/registration-form"
import { WorkshopSteps } from "./components/workshop-steps"

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
  const guestImages = [
    "/workshop-students/workshop-student-01.webp",
    "/workshop-students/workshop-student-02.webp",
    "/workshop-students/workshop-student-03.webp",
    "/workshop-students/workshop-student-04.webp",
    "/workshop-students/workshop-student-05.webp",
    "/workshop-students/workshop-student-06.webp",
    "/workshop-students/workshop-student-07.webp",
    "/workshop-students/workshop-student-08.webp",
    "/workshop-students/workshop-student-09.webp",
    "/workshop-students/workshop-student-10.webp",
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] flex min-h-[50vh] w-screen flex-col justify-center bg-neutral-900 py-24 text-center text-neutral-50">
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

      <div className="container mx-auto px-4 pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: Information & Steps */}
          <div className="space-y-12">
            <div>
              <h2 className="mb-3 font-serif text-3xl leading-none font-bold text-neutral-900 dark:text-neutral-50">
                How It Works
              </h2>
              <p className="mb-8 text-neutral-600 dark:text-neutral-400">
                Embark on a three-hour creative journey where you'll master the fundamental stages
                of traditional silver craftsmanship.
              </p>
              <WorkshopSteps />
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-50/50 p-8 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-900/50">
              <div className="bg-primary/5 absolute -top-12 -right-12 h-64 w-64 rounded-full blur-3xl" />

              <h3 className="mb-6 font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">
                Important Details
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-200/50 text-stone-600 dark:bg-stone-800/50 dark:text-stone-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 dark:text-stone-50">Opening Hours</h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      Monday - Saturday
                      <br />
                      Morning: 08:30 - 11:30
                      <br />
                      Afternoon: 12:30 - 15:30
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-200/50 text-stone-600 dark:bg-stone-800/50 dark:text-stone-400">
                    <Hammer className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 dark:text-stone-50">Includes</h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      5 grams of silver and full equipment usage
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-200/50 text-stone-600 dark:bg-stone-800/50 dark:text-stone-400">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 dark:text-stone-50">Payment</h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      Cash, Bank Transfer, QRIS, Credit/Debit Cards (upon completion)
                    </p>
                  </div>
                </div>
              </div>
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

      <ReelsGallery
        reels={[
          "https://www.instagram.com/reel/DEoZ7RFSORY/",
          "https://www.instagram.com/reel/DErmKOjyZ3t/",
          "https://www.instagram.com/reel/DEq2UFBPMZv/",
        ]}
      />
      <PolaroidGallery images={guestImages} className="mb-16 bg-stone-50 dark:bg-neutral-900/50" />
    </div>
  )
}
