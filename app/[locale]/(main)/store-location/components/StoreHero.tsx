"use client"

import { useTranslations } from "next-intl"

import AnimatedButton from "@/components/ui/animated-button"
import { PageHero } from "@/components/ui/page-hero"

export default function StoreHero() {
  const t = useTranslations("StoreLocationPage.Hero")

  return (
    <PageHero
      title={t("title")}
      subtitle={t("description")}
      eyebrow={t("subtitle")}
      imageSrc="/images/store-front.webp"
      imageAlt="Salim Silver Workshop"
      className="h-[50vh] min-h-[500px]"
    >
      <AnimatedButton href="#location" variant="primary" className="px-8">
        {t("ctaLabel")}
      </AnimatedButton>
    </PageHero>
  )
}
