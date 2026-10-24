"use client"

import { motion } from "framer-motion"
import { Compass, Footprints, MapPin, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export default function KotagedeWalkBanner() {
  const t = useTranslations("KotagedeGuidePage")

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-r from-primary/10 via-background to-primary/5 p-6 md:p-10 shadow-sm"
      >
        {/* Background ambient accents */}
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Footprints size={14} />
              <span>{t("Hero.badge")}</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              {t("Hero.title")}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {t("Hero.description")}
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/kotagede-guide"
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow transition hover:opacity-95"
            >
              <Compass size={16} />
              <span>{t("MapControls.selectTrail")}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
