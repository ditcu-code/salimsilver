import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale
} from "@/lib/seo"
import KotagedeGuideClient from "./kotagede-guide-client"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: "KotagedeGuidePage.Metadata"
  })
  const canonicalUrl = constructCanonicalUrl(locale, "/kotagede-guide")

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternates("/kotagede-guide")
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

export default async function KotagedeGuidePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <KotagedeGuideClient />
}
