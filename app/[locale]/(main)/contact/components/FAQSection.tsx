"use client"

import { FaqSection } from "@/components/features/faq-section"
import { useTranslations } from "next-intl"

export default function FAQSection() {
  const t = useTranslations("ContactPage.FAQs")

  const FAQ_ITEMS = [
    {
      question: t("items.custom.question"),
      answer: t("items.custom.answer"),
    },
    {
      question: t("items.shipping.question"),
      answer: t("items.shipping.answer"),
    },
    {
      question: t("items.care.question"),
      answer: t("items.care.answer"),
    },
    {
      question: t("items.wholesale.question"),
      answer: t("items.wholesale.answer"),
    },
  ]

  return (
    <section className="mx-auto mt-20 mb-20 max-w-7xl px-4 md:px-8">
      <FaqSection items={FAQ_ITEMS} title={t("title")} />
    </section>
  )
}
