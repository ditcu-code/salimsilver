"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

interface Step {
  id: number
  key: string
  image: string
  detailCount?: number
}

const steps: Step[] = [
  {
    id: 1,
    key: "step1",
    image: "/images/workshop-steps/step-1.webp",
  },
  {
    id: 2,
    key: "step2",
    image: "/images/workshop-steps/step-2.webp",
  },
  {
    id: 3,
    key: "step3",
    image: "/images/workshop-steps/step-3.webp",
  },
  {
    id: 4,
    key: "step4",
    image: "/images/workshop-steps/step-4.webp",
    detailCount: 5,
  },
  {
    id: 5,
    key: "step5",
    image: "/images/workshop-steps/step-5.webp",
  },
  {
    id: 6,
    key: "step6",
    image: "/images/workshop-steps/step-6.webp",
    detailCount: 3,
  },
  {
    id: 7,
    key: "step7",
    image: "/images/workshop-steps/step-7.webp",
  },
]

export function WorkshopSteps() {
  const t = useTranslations("WorkshopPage.Steps.list")

  return (
    <div className="relative space-y-12 pl-4 before:absolute before:inset-0 before:left-[35px] before:h-full before:w-[2px] before:bg-neutral-200 dark:before:bg-neutral-800">
      {steps.map((step) => (
        <div key={step.id} className="relative flex gap-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-neutral-50 shadow-sm ring-4 ring-white dark:bg-neutral-50 dark:text-neutral-900 dark:ring-neutral-950">
            <span className="font-bold">{step.id}</span>
          </div>
          <div className="flex-1">
            <h3 className="my-2 text-2xl leading-none font-semibold!">{t(`${step.key}.title`)}</h3>
            <p className="mb-4 max-w-prose text-sm text-neutral-600 dark:text-neutral-400">
              {t(`${step.key}.description`)}
            </p>
            {step.detailCount && (
              <ul className="mt-3 mb-4 list-disc space-y-1 pl-4 text-sm text-neutral-600 dark:text-neutral-400">
                {Array.from({ length: step.detailCount }).map((_, idx) => (
                  <li key={idx}>{t(`${step.key}.details.${idx}`)}</li>
                ))}
              </ul>
            )}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-50">
              <Image
                src={step.image}
                alt={`Step ${step.id} - ${t(`${step.key}.title`)}`}
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
