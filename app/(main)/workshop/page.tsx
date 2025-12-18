import type { Metadata } from "next"
import { RegistrationForm } from "./components/registration-form"
import { WorkshopSteps } from "./components/workshop-steps"

export const metadata: Metadata = {
  title: "Silversmith Workshop - Salim Silver",
  description:
    "Join our hands-on silversmithing workshop in Kotagede, Yogyakarta. Create your own silver jewelry guided by master artisans.",
}

export default function WorkshopPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[50vh] flex-col justify-center bg-neutral-900 py-24 text-center text-neutral-50">
        <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
          {/* Placeholder for workshop hero image - using a pattern or abstract for now if no image is ready */}
          <div className="h-full w-full bg-neutral-800" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="mb-6 font-serif text-5xl font-bold tracking-tight md:text-6xl">
            Silversmith Workshop
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-300 md:text-xl">
            Experience the art of Javanese silversmithing. Create your own masterpiece in the heart
            of Kotagede.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: Information & Steps */}
          <div className="space-y-12">
            <div>
              <h2 className="mb-3 font-serif text-3xl leading-none font-bold text-neutral-900 dark:text-neutral-50">
                Alur Kegiatan Workshop
              </h2>
              <p className="mb-8 text-neutral-600 dark:text-neutral-400">
                Temukan proses pembuatan perhiasan perak tradisional melalui 7 tahapan komprehensif.
                Durasi workshop disesuaikan dengan sesi yang Anda pilih.
              </p>
              <WorkshopSteps />
            </div>

            <div className="rounded-2xl bg-neutral-100 p-8 dark:bg-neutral-900">
              <h3 className="mb-4 font-serif text-xl font-bold">Informasi Penting</h3>
              <ul className="list-inside list-disc space-y-2 text-neutral-600 dark:text-neutral-400">
                <li>Buka Senin - Sabtu</li>
                <li>Sesi Pagi: 08:30 - 11:30</li>
                <li>Sesi Siang: 12:30 - 15:30</li>
                <li>Harga termasuk bahan perak hingga 5 gram</li>
                <li>Peralatan lengkap disediakan</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="mb-8 lg:hidden">
              <h2 className="mb-4 font-serif text-3xl font-bold">Mulai Sekarang</h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Amankan slot Anda untuk pengalaman tak terlupakan ini.
              </p>
            </div>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  )
}
