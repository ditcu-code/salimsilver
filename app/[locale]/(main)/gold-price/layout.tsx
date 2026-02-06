import { FaqSection } from "@/components/features/faq-section"
import { MetalPriceAbout } from "@/components/features/metal-price/metal-price-about"
import { MetalPriceHeader } from "@/components/features/metal-price/metal-price-header"
import { GOLD_FAQ_ITEMS } from "./constants"

export default function GoldPriceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full pt-30 pb-12 md:pb-18 px-8">
      <MetalPriceHeader
        title="Harga Emas Hari Ini"
        description="Update harga emas murni terkini dalam Rupiah."
        className="mb-6"
      />

      {children}

      <div className="mx-auto mt-20 max-w-2xl space-y-12">
        <FaqSection items={GOLD_FAQ_ITEMS} className={"mt-20"} />
        <MetalPriceAbout title="Tentang Harga Emas Murni Hari Ini">
          <p>
            Salim Silver menyajikan data harga emas murni (Fine Gold .999) yang
            bersumber dari pasar komoditas internasional. Harga ini adalah acuan
            dasar (spot price) yang transparan dan akurat.
          </p>
          <p className="mt-2">
            Harap dicatat bahwa harga ini berbeda dengan harga emas fisik
            (Antam/Pegadaian) karena belum termasuk biaya cetak, margin toko,
            dan pajak terkait. Gunakan data ini sebagai referensi investasi dan
            analisis pasar Anda.
          </p>
        </MetalPriceAbout>
      </div>
    </div>
  )
}
