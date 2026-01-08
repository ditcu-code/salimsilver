"use client"

import { motion } from "framer-motion"

import { useTranslations } from "next-intl"

export default function TimelineSection() {
  const t = useTranslations("AboutPage.Timeline")
  const years = ["1930", "1952", "1985", "1987", "1990", "2017", "Present"]

  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-4 py-24 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="font-display mb-4 text-4xl md:text-5xl">{t("title")}</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">{t("description")}</p>
      </motion.div>

      <div className="relative">
        <div className="bg-primary/30 absolute top-0 bottom-0 left-[15px] w-px -translate-x-1/2 md:left-1/2 md:translate-x-0" />

        <div className="space-y-12 md:space-y-24">
          {years.map((year, index) => (
            <motion.div
              key={year}
              className={`relative flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-0 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Timeline Node */}
              <div className="bg-background absolute top-0 left-[15px] z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center md:top-1/2 md:left-1/2 md:-translate-y-1/2">
                <div className="bg-primary h-3 w-3 rotate-45" />
              </div>

              {/* Content Side */}
              <div className="w-full pl-12 md:w-1/2 md:px-16">
                <div
                  className={`relative flex w-full flex-col ${index % 2 === 0 ? "md:items-start md:text-left" : "md:items-end md:text-right"}`}
                >
                  <span
                    className={`font-display text-primary/20 absolute -z-10 -translate-y-8 transform text-6xl select-none max-md:right-0 md:-translate-y-12 md:text-8xl ${
                      index % 2 === 0 ? "md:right-0" : "md:left-0"
                    }`}
                  >
                    {year}
                  </span>
                  <h3 className="font-display text-primary mb-3 text-2xl md:text-3xl">
                    {t(`items.${year}.title`)}
                  </h3>
                  <p className="text-primary/80 max-w-md leading-relaxed">
                    {t(`items.${year}.description`)}
                  </p>
                </div>
              </div>

              {/* Empty Side for Desktop Balance */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
