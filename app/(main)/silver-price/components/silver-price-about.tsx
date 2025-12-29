import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SilverPriceAboutProps {
  className?: string
}

export function SilverPriceAbout({ className }: SilverPriceAboutProps) {
  return (
    <section className={cn(className)}>
      <Card className="border-muted bg-muted/30 text-center shadow-none">
        <CardHeader className="items-center pb-3">
          <CardTitle className="text-xl">Tentang Harga Perak Murni Hari Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed text-balance">
            Data harga kami mengacu pada standar pasar logam mulia internasional (Fine Silver 999)
            dan dikonversi ke Rupiah (IDR) secara real-time. Informasi ini ditujukan sebagai
            referensi akurat bagi investor, kolektor, dan pengrajin perak, khususnya di pusat
            kerajinan Kotagede, Yogyakarta. Pastikan Anda memantau tren harga sebelum bertransaksi
            untuk keputusan terbaik.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
