"use client"

import { PageHero } from "@/components/ui/page-hero"
import { useTranslations } from "next-intl"

export default function ContactHero() {
  const t = useTranslations("ContactPage.Hero")

  return (
    <PageHero
      title={t("title")}
      subtitle={t("subtitle")}
      imageSrc="/images/gebyok.webp"
      imageAlt={t("title")}
    />
  )
}
