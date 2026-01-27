"use client"

import { PageHero } from "@/components/ui/page-hero"
import { useTranslations } from "next-intl"

export function WorkshopHero() {
  const t = useTranslations("WorkshopPage.Hero")

  return (
    <PageHero
      title={t("title")}
      subtitle={t("description")}
      imageSrc="/images/tatah-cincin.webp"
      imageAlt={t("imageAlt")}
      imageTitle={t("imageTitle")}
    />
  )
}
