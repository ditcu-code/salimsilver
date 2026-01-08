"use client"

import { Clock, CreditCard, Hammer, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

export function WorkshopDetails() {
  const t = useTranslations("WorkshopPage.Details")

  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-50/50 p-8 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-900/50">
      <div className="bg-primary/5 absolute -top-12 -right-12 h-64 w-64 rounded-full blur-3xl" />

      <h3 className="mb-6 font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">
        {t("title")}
      </h3>

      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-200/50 text-stone-600 dark:bg-stone-800/50 dark:text-stone-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-stone-900 dark:text-stone-50">{t("hours.title")}</h4>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              {t("hours.days")}
              <br />
              {t("hours.morning")}
              <br />
              {t("hours.afternoon")}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-200/50 text-stone-600 dark:bg-stone-800/50 dark:text-stone-400">
            <Hammer className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-stone-900 dark:text-stone-50">{t("includes.title")}</h4>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              {t("includes.description")}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-200/50 text-stone-600 dark:bg-stone-800/50 dark:text-stone-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-stone-900 dark:text-stone-50">{t("flexible.title")}</h4>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              {t("flexible.description")}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone-200/50 text-stone-600 dark:bg-stone-800/50 dark:text-stone-400">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-stone-900 dark:text-stone-50">{t("payment.title")}</h4>
            <p className="text-sm text-stone-600 dark:text-stone-400">{t("payment.description")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
