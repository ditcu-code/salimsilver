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
    title: "Reservation & Scheduling",
    description: "Secure your workshop slot via our online reservation.",
    image: "/images/workshop-steps/step-1.webp",
  },
  {
    id: 2,
    title: "Design Exploration",
    description:
      "Pour your creativity into a real sketch. You're free to bring your own design or adapt from Salim Silver's classic motifs.",
    image: "/images/workshop-steps/step-2.webp",
  },
  {
    id: 3,
    title: "Precision Measurement",
    description:
      "Time to measure your finger size accurately, ensuring your handmade ring fits comfortably.",
    image: "/images/workshop-steps/step-3.webp",
  },
  {
    id: 4,
    title: "The Art of Engraving (Repoussé)",
    description:
      "Dive into the signature Kotagede metal engraving technique. You'll learn 5 detailed stages with our experts:",
    details: [
      "Initial Sketch: Etching the basic motif outline",
      "Embossing (Wudulan): Creating 3D volume from the back",
      "Detailing: Sharpening details and texture",
      "Smoothing: Refining the relief surface",
      "Cutout (Tatasan): Piercing technique to enhance the silhouette",
    ],
    image: "/images/workshop-steps/step-4.webp",
  },
  {
    id: 5,
    title: "Soldering",
    description:
      "Joining the silver sheet into a complete ring form. You can do it yourself or let our experts help you.",
    image: "/images/workshop-steps/step-5.webp",
  },
  {
    id: 6,
    title: "Finishing Touches",
    description:
      "Make your creation shine. This process determines the final luster and character of your jewelry:",
    details: [
      "Sanding for a smooth surface",
      "Polishing for maximum shine",
      "Oxidation (optional) for an elegant antique look",
    ],
    image: "/images/workshop-steps/step-6.webp",
  },
  {
    id: 7,
    title: "It's a Wrap!",
    description: "Your handmade silver ring is ready to wear and take home.",
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
          <div className="flex-1">
            <h3 className="my-2 text-2xl leading-none font-semibold!">{step.title}</h3>
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
