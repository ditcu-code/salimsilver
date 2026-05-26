import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale
} from "@/lib/seo"
import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import CareerContent from "./_components/career-content"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: "CareerPage.Metadata"
  })
  const canonicalUrl = constructCanonicalUrl(locale, "/career")

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternates("/career")
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: "Salim Silver",
      locale: getOpenGraphLocale(locale)
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description")
    }
  }
}

export default async function CareerPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("CareerPage")
  const talentPoolMessage = t("TalentPool.message")
  const studentMessage = t("StudentInternship.message")

  return (
    <CareerContent
      talentPoolMessage={talentPoolMessage}
      studentMessage={studentMessage}
    />
  )
}
