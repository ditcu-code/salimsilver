"use client"

import { PageHero } from "@/components/ui/page-hero"
import { useTranslations } from "next-intl"

export default function HeroSection() {
  const t = useTranslations("AboutPage.Hero")

  return (
    <PageHero
      title={t("title")}
      subtitle={t("description")}
      imageSrc="/images/private-collection-priyana-jatmika-salim.webp"
      imageAlt="About Salim Silver"
    />
  )
}
