"use client"

import { BookOpen, Landmark, Medal } from "lucide-react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils"

const reasons = [
  {
    key: "storyteller",
    icon: BookOpen,
  },
  {
    key: "venue",
    icon: Landmark,
  },
  {
    key: "masters",
    icon: Medal,
  },
]

export function WorkshopReasons({ className }: { className?: string }) {
  const t = useTranslations("WorkshopPage.Reasons")

  return (
    <section className={cn("mt-12", className)}>
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.key}
              className="group flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 dark:bg-neutral-800">
                <reason.icon className="h-8 w-8 text-stone-900 dark:text-stone-100" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold text-neutral-900 dark:text-neutral-50">
                {t(`${reason.key}.title`)}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {t(`${reason.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
