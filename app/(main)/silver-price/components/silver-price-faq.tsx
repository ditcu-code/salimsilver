import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-motion"
import { cn } from "@/lib/utils"

interface SilverPriceFaqProps {
  className?: string
}

export function SilverPriceFaq({ className }: SilverPriceFaqProps) {
  return (
    <section className={cn(className)}>
      <h2 className="mb-6 text-2xl font-semibold">Frequently Asked Questions (FAQ)</h2>
      <Accordion className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-left">
            Apakah harga perak ini sudah termasuk PPN?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Secara default, harga yang ditampilkan adalah harga dasar (belum termasuk PPN). Anda
              dapat menggunakan tombol toggle di atas untuk melihat harga termasuk PPN 11% sesuai
              ketentuan PMK No. 48 Tahun 2023.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-left">
            Seberapa sering harga perak diperbarui?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sistem kami memantau pergerakan harga perak dunia dan melakukan pembaruan data secara
              berkala setiap 1 jam sekali untuk memastikan Anda mendapatkan informasi yang paling
              relevan dengan kondisi pasar saat ini.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-left">
            Apakah saya bisa membeli perak fisik di Salim Silver?
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tentu saja. Salim Silver adalah pengrajin perak asli Kotagede yang menyediakan
              berbagai koleksi perhiasan perak handmade berkualitas tinggi (Sterling Silver 925).
              Anda dapat melihat koleksi Cincin, Kalung, dan Gelang kami melalui katalog di website
              ini atau berkunjung langsung ke galeri kami di Yogyakarta.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
