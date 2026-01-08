"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export default function CatalogHeader() {
  const t = useTranslations("CatalogPage.Header")

  return (
    <motion.div
      className="m-10 text-center md:m-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="font-display mb-4 text-4xl md:text-5xl">{t("title")}</h1>
      <p className="text-muted-foreground mx-auto max-w-2xl">{t("description")}</p>
    </motion.div>
  )
}
