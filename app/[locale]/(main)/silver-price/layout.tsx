import { FaqSection } from "@/components/features/faq-section"
import { MetalPriceAbout } from "@/components/features/metal-price/metal-price-about"
import { MetalPriceHeader } from "@/components/features/metal-price/metal-price-header"
import { SILVER_FAQ_ITEMS } from "./constants"

export default function SilverPriceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full pt-30 pb-12 md:pb-18 px-8">
      <MetalPriceHeader
        title="Harga Perak Hari Ini"
        description="Update harga perak murni terkini dalam Rupiah."
      />

      {children}

      <div className="mx-auto mt-20 max-w-2xl space-y-12">
        <FaqSection items={SILVER_FAQ_ITEMS} className={"mt-20"} />
        <MetalPriceAbout title="Tentang Harga Perak Hari Ini">
          <p className="text-muted-foreground text-sm leading-relaxed text-balance">
            Data harga kami mengacu pada standar pasar logam mulia internasional
            (Fine Silver 999) dan dikonversi ke Rupiah (IDR) secara real-time.
            Informasi ini ditujukan sebagai referensi akurat bagi investor,
            kolektor, dan pengrajin perak, khususnya di pusat kerajinan perak
            Kotagede, Yogyakarta. Pastikan Anda memantau tren harga sebelum
            bertransaksi untuk keputusan terbaik.
          </p>
        </MetalPriceAbout>
      </div>
    </div>
  )
}
