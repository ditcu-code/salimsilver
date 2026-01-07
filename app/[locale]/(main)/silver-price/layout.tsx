import { FaqSection } from "@/components/features/faq-section"
import { SilverPriceAbout } from "./components/silver-price-about"
import { SilverPriceHeader } from "./components/silver-price-header"
import { FAQ_ITEMS } from "./constants"

export default function SilverPriceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-lg px-4 pt-30 pb-12 md:pb-18">
      <SilverPriceHeader />

      {children}

      <div className="mx-auto mt-20 max-w-2xl space-y-12">
        <FaqSection items={FAQ_ITEMS} className={"mt-20"} />
        <SilverPriceAbout />
      </div>
    </div>
  )
}
