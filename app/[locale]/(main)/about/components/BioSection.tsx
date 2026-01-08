"use client"

import { motion } from "framer-motion"
import { Award, Globe, Users } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function BioSection() {
  const t = useTranslations("AboutPage.Bio")

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          className="relative overflow-hidden rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Image
            src="/images/priyana-jatmika-salim-with-his-loupe.webp"
            alt={t("imageAlt")}
            width={600}
            height={800}
            className="h-auto w-full"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display mb-6 text-3xl md:text-4xl">{t("title")}</h2>
          <div className="text-muted-foreground mb-6 space-y-4">
            <p>{t("p1")}</p>
            <p>
              {t.rich("p2", {
                bold: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <p>
              {t.rich("p3", {
                italic: (chunks) => <em>{chunks}</em>,
              })}
            </p>
            <p>
              {t.rich("p4", {
                bold: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </div>
          <div className="flex flex-col flex-wrap gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Award size={20} className="text-primary" />
              <span className="text-primary">{t("badges.craftsmanship")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={20} className="text-primary" />
              <span className="text-primary">{t("badges.ethical")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} className="text-primary" />
              <span className="text-primary">{t("badges.collective")}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
