import { FaqSection } from "@/components/features/faq-section"
import { MetalPriceAbout } from "@/components/features/metal-price/metal-price-about"
import { MetalPriceHeader } from "@/components/features/metal-price/metal-price-header"
import { getTranslations, setRequestLocale } from "next-intl/server"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function SilverPriceLayout({
  children,
  params
}: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("SilverPricePage")

  const faqItems = [
    {
      value: "item-2",
      question: t("FAQs.updateFrequency.question"),
      answer: t("FAQs.updateFrequency.answer")
    },
    {
      value: "item-source",
      question: t("FAQs.source.question"),
      answer: t("FAQs.source.answer")
    },
    {
      value: "item-5",
      question: t("FAQs.localVsInternational.question"),
      answer: t("FAQs.localVsInternational.answer")
    }
  ]

  return (
    <div className="w-full pt-30 pb-12 md:pb-18 px-8">
      <MetalPriceHeader
        title={t("layout.title")}
        description={t("layout.description")}
      />

      {children}

      <div className="mx-auto mt-20 max-w-2xl space-y-12">
        <FaqSection items={faqItems} className={"mt-20"} />
        <MetalPriceAbout title={t("layout.aboutTitle")}>
          <p className="text-muted-foreground text-sm leading-relaxed text-balance">
            {t("layout.aboutDescription")}
          </p>
        </MetalPriceAbout>
      </div>
    </div>
  )
}
