import Image from "next/image"

interface Step {
  id: number
  title: string
  description: string
  details?: string[]
  image: string
}

const steps: Step[] = [
  {
    id: 1,
    title: "Pendaftaran dan Penjadwalan",
    description:
      "Peserta melakukan pendaftaran awal untuk menentukan tanggal dan waktu pelaksanaan workshop yang diinginkan.",
    image: "/images/workshop-steps/step-1.webp",
  },
  {
    id: 2,
    title: "Konsultasi dan Pemilihan Desain",
    description:
      "Tentukan desain cincin Anda. Anda boleh membawa desain sendiri atau memilih dari koleksi desain Salim Silver.",
    image: "/images/workshop-steps/step-2.webp",
  },
  {
    id: 3,
    title: "Pengukuran",
    description: "Proses pengukuran lingkar jari untuk memastikan cincin pas dan nyaman dipakai.",
    image: "/images/workshop-steps/step-3.webp",
  },
  {
    id: 4,
    title: "Proses Repoussé (Pengukiran)",
    description: "Tahap inti teknik repoussé yang terdiri dari 5 langkah spesifik:",
    details: [
      "Rancapan Awal: Mengukir sketsa motif",
      "Wudulan: Menciptakan volume (3D)",
      "Rancapan Akhir: Memperjelas detail",
      "Pengusapan: Menghaluskan motif",
      "Tatasan: Melubangi dan memotong",
    ],
    image: "/images/workshop-steps/step-4.webp",
  },
  {
    id: 5,
    title: "Pematrian (Penyambungan)",
    description:
      "Penyambungan logam untuk membentuk cincin. Dapat dilakukan sendiri dengan pengawasan ahli.",
    image: "/images/workshop-steps/step-5.webp",
  },
  {
    id: 6,
    title: "Finishing (Pemolesan)",
    description: "Menyempurnakan tampilan cincin:",
    details: ["Pengamplasan", "Pemolesan", "Oksidasi (Penghitaman motif)"],
    image: "/images/workshop-steps/step-6.webp",
  },
  {
    id: 7,
    title: "Administrasi",
    description: "Penyelesaian administrasi. Paket mencakup perak hingga 5 gram.",
    image: "/images/workshop-steps/step-7.webp",
  },
]

export function WorkshopSteps() {
  return (
    <div className="relative space-y-12 pl-4 before:absolute before:inset-0 before:left-[35px] before:h-full before:w-[2px] before:bg-neutral-200 dark:before:bg-neutral-800">
      {steps.map((step) => (
        <div key={step.id} className="relative flex gap-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-neutral-50 shadow-sm ring-4 ring-white dark:bg-neutral-50 dark:text-neutral-900 dark:ring-neutral-950">
            <span className="font-bold">{step.id}</span>
          </div>
          <div className="flex-1 pb-4">
            <h3 className="mb-2 text-xl leading-none font-medium">{step.title}</h3>
            <p className="mb-4 max-w-prose text-sm text-neutral-600 dark:text-neutral-400">
              {step.description}
            </p>
            {step.details && (
              <ul className="mt-3 mb-4 list-disc space-y-1 pl-4 text-sm text-neutral-600 dark:text-neutral-400">
                {step.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            )}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-50">
              <Image
                src={step.image}
                alt={`Tahap ${step.title} - Workshop Pembuatan Cincin di Salim Silver`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
