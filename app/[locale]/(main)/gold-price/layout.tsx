import { FaqSection } from "@/components/features/faq-section"
import { MetalPriceAbout } from "@/components/features/metal-price/metal-price-about"
import { MetalPriceHeader } from "@/components/features/metal-price/metal-price-header"
import { getTranslations, setRequestLocale } from "next-intl/server"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function GoldPriceLayout({ children, params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("GoldPricePage")

  const faqItems = [
    {
      value: "item-1",
      question: t("FAQs.updateFrequency.question"),
      answer: t("FAQs.updateFrequency.answer")
    },
    {
      value: "item-source",
      question: t("FAQs.source.question"),
      answer: t("FAQs.source.answer")
    },
    {
      value: "item-diff",
      question: t("FAQs.difference.question"),
      answer: t("FAQs.difference.answer")
    },
    {
      value: "item-2",
      question: t("FAQs.buyPhysical.question"),
      answer: t("FAQs.buyPhysical.answer")
    }
  ]

  return (
    <div className="w-full pt-30 pb-12 md:pb-18 px-8">
      <MetalPriceHeader
        title={t("layout.title")}
        description={t("layout.description")}
        className="mb-6"
      />

      {children}

      <div className="mx-auto mt-20 max-w-2xl space-y-12">
        <FaqSection items={faqItems} className={"mt-20"} />
        <MetalPriceAbout title={t("layout.aboutTitle")}>
          <p>{t("layout.aboutDescriptionParagraph1")}</p>
          <p className="mt-2">{t("layout.aboutDescriptionParagraph2")}</p>
        </MetalPriceAbout>
      </div>
    </div>
  )
}
