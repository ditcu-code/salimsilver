"use client"

import { motion } from "framer-motion"

import { useTranslations } from "next-intl"

export default function ValuesSection() {
  const t = useTranslations("AboutPage.Values")
  const keys = ["tradition", "quality", "sustainability"]

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          className="font-display mb-8 text-center text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {t("title")}
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3">
          {keys.map((key, index) => (
            <motion.div
              key={key}
              className="text-primary dark:text-primary-secondary bg-primary-secondary dark:bg-primary rounded-3xl p-8 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-primary-secondary dark:text-primary-foreground mb-4 text-2xl">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-primary-secondary dark:text-primary-foreground">
                {t(`items.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
