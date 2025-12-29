import { SilverPriceAbout } from "./components/silver-price-about"
import { SilverPriceFaq } from "./components/silver-price-faq"
import { SilverPriceHeader } from "./components/silver-price-header"

export default function SilverPriceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-lg px-4 pt-30 pb-12 md:pb-18">
      <SilverPriceHeader />

      {children}

      <div className="mx-auto mt-20 max-w-2xl space-y-12">
        <SilverPriceAbout />
        <SilverPriceFaq />
      </div>
    </div>
  )
}
