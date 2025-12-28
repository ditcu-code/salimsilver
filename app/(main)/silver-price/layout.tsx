import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "Harga Perak Hari Ini per Gram dalam Rupiah (IDR) | Salim Silver",
  },
  description:
    "Pantau harga perak murni terbaru hari ini dalam Rupiah (IDR). Data harga per gram yang akurat dan terupdate untuk investasi Anda.",
  keywords: [
    "Harga Perak Hari Ini",
    "Harga Perak per Gram",
    "Harga Perak Antam",
    "Harga Perak Rupiah",
    "Investasi Perak",
    "Silver Price Indonesia",
    "Harga Silver per Gram",
    "Jual Beli Perak",
    "Harga Perak Murni",
    "Grafik Harga Perak",
    "Harga Perak Terbaru",
  ],
  alternates: {
    canonical: "/silver-price",
  },
  openGraph: {
    title: "Harga Perak Hari Ini | Update Terbaru per Gram (IDR)",
    description:
      "Cek harga perak murni hari ini dalam Rupiah. Data terupdate real-time untuk panduan beli dan investasi perak Anda.",
    url: "/silver-price",
    locale: "id_ID",
    type: "website",
  },
}

export default function SilverPriceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto max-w-lg px-4 pt-30 pb-12 md:pb-18">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="space-y-2 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Harga Perak
          </h1>
          <p className="text-muted-foreground text-lg">
            Update harga perak murni terkini dalam Rupiah.
          </p>
        </div>

        {/* Dynamic Content (Price Display) */}
        {children}

        {/* Content Section for SEO */}
        <div className="mx-auto mt-20 max-w-2xl space-y-12">
          <section>
            <Card className="border-muted bg-muted/30 text-center shadow-none">
              <CardHeader className="items-center pb-3">
                <CardTitle className="text-xl">Tentang Harga Perak Murni Hari Ini</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed text-balance">
                  Data harga kami mengacu pada standar pasar logam mulia internasional (Fine Silver
                  999) dan dikonversi ke Rupiah (IDR) secara real-time. Informasi ini ditujukan
                  sebagai referensi akurat bagi investor, kolektor, dan pengrajin perak, khususnya
                  di pusat kerajinan Kotagede, Yogyakarta. Pastikan Anda memantau tren harga sebelum
                  bertransaksi untuk keputusan terbaik.
                </p>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="mb-6 text-xl font-semibold">Frequently Asked Questions (FAQ)</h2>
            <Accordion className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Apakah harga perak ini sudah termasuk PPN?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Secara default, harga yang ditampilkan adalah harga dasar (belum termasuk PPN).
                    Anda dapat menggunakan tombol toggle di atas untuk melihat harga termasuk PPN
                    11% sesuai ketentuan PMK No. 48 Tahun 2023.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Seberapa sering harga perak diperbarui?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Sistem kami memantau pergerakan harga perak dunia dan melakukan pembaruan data
                    secara berkala setiap 4 jam sekali untuk memastikan Anda mendapatkan informasi
                    yang paling relevan dengan kondisi pasar saat ini.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Apakah saya bisa membeli perak fisik di Salim Silver?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Tentu saja. Salim Silver adalah pengrajin perak asli Kotagede yang menyediakan
                    berbagai koleksi perhiasan perak handmade berkualitas tinggi (Sterling Silver
                    925). Anda dapat melihat koleksi Cincin, Kalung, dan Gelang kami melalui katalog
                    di website ini atau berkunjung langsung ke galeri kami di Yogyakarta.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </div>
    </div>
  )
}
