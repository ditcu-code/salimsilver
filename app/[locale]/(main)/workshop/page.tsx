import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { PolaroidGallery } from "@/components/blocks/polaroid-gallery"
import { ReelsGallery } from "@/components/blocks/reels-gallery"
import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale,
} from "@/lib/seo"
import { RegistrationForm } from "./components/registration-form"
import { WorkshopDetails } from "./components/workshop-details"
import { WorkshopHero } from "./components/workshop-hero"
import { WorkshopReasons } from "./components/workshop-reasons"
import { WorkshopSteps } from "./components/workshop-steps"
import { reels, studentsImages } from "./constants"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: "WorkshopPage.Metadata",
  })
  const canonicalUrl = constructCanonicalUrl(locale, "/workshop")

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternates("/workshop"),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: "Salim Silver",
      locale: getOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    keywords: [
      "Silversmithing Workshop",
      "Jewelry Making Workshop",
      "Traditional Silversmithing",
      "Silver Jewelry Making",
      "Yogyakarta Workshop",
      "Silversmithing Course",
      "Jewelry Making Course",
      "Traditional Silversmithing Course",
      "Silver Jewelry Making Course",
      "Yogyakarta Course",
      "Workshop Perhiasan Perak",
      "Kursus Perhiasan Perak",
      "Workshop Perak Kotagede",
    ],
  }
}

export default async function WorkshopPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("WorkshopPage")
  const tMeta = await getTranslations("WorkshopPage.Metadata")
  const workshopUrl = constructCanonicalUrl(locale, "/workshop")

  return (
    <div className="flex min-h-screen flex-col">
      <WorkshopHero />
      <WorkshopReasons className="hidden md:block" />

      <div className="container mx-auto px-4 pt-16 pb-8 md:pt-24 md:pb-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: Information & Steps */}
          <div className="space-y-12">
            <div>
              <h2 className="mb-3 font-serif text-3xl leading-none font-bold text-neutral-900 dark:text-neutral-50">
                {t("Steps.title")}
              </h2>
              <p className="mb-8 text-neutral-600 dark:text-neutral-400">
                {t("Steps.subtitle")}
              </p>
              <WorkshopSteps />
            </div>

            <WorkshopDetails />
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div id="registration-form" className="mb-8 lg:hidden">
              <h2 className="mb-4 font-serif text-3xl font-bold">
                {t("Registration.startNow")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                {t("Registration.secureSlot")}
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
          {t("Registration.mobileButton")}
        </a>
      </div>

      <PolaroidGallery
        images={studentsImages}
        title={t("PolaroidGallery.title")}
        studentAlt={t("PolaroidGallery.studentAlt")}
      />
      <ReelsGallery reels={reels} className="mb-12" title={t("Reels.title")} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Silversmith Jewelry Workshop",
            description: tMeta("description"),
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
              url: workshopUrl,
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
                  streetAddress:
                    "Gg. Platina KG 3/547 - Kebohan, Purbayan, Kotagede",
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
