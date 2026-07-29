"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Compass, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

const guideImages = [
  {
    src: "/images/store-location/street-sign.webp",
    altKey: "step1",
    step: "01"
  },
  {
    src: "/images/store-location/heritage-alley.webp",
    altKey: "step2",
    step: "02"
  },
  {
    src: "/images/store-location/store-entrance.webp",
    altKey: "step3",
    step: "03"
  }
]

export default function LocationVisualGuide() {
  const t = useTranslations("StoreLocationPage.VisualGuide")
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setActiveImageIndex(index)
  const closeLightbox = () => setActiveImageIndex(null)

  const handleNext = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % guideImages.length)
    }
  }

  const handlePrev = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex(
        (activeImageIndex - 1 + guideImages.length) % guideImages.length
      )
    }
  }

  return (
    <section className="bg-muted/40 border-y border-border/60 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-primary/10 text-primary mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
          >
            <Compass size={14} />
            <span>{t("subtitle")}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base md:text-lg"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {guideImages.map((item, index) => {
            const stepKey = `steps.${item.altKey}`
            return (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group border-border/80 bg-card hover:border-primary/40 relative flex flex-col overflow-hidden rounded-3xl border shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                {/* Image Container */}
                <div
                  className="relative aspect-3/4 w-full cursor-pointer overflow-hidden bg-stone-100 dark:bg-stone-800"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={item.src}
                    alt={t(`${stepKey}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-stone-900/80 text-white backdrop-blur-md border border-white/20 px-3.5 py-1 text-xs font-semibold tracking-wider rounded-full shadow-md">
                      {t(`${stepKey}.badge`)}
                    </span>
                  </div>

                  {/* Expand Overlay */}
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <span className="bg-white/90 dark:bg-stone-900/90 text-foreground p-3 rounded-full shadow-lg backdrop-blur-sm transform scale-90 transition-transform duration-300 group-hover:scale-100">
                      <Maximize2 size={18} />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-display text-primary/40 text-xl font-bold">
                      {item.step}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {t(`${stepKey}.title`)}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(`${stepKey}.description`)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>

            {/* Image & Caption */}
            <div
              className="relative max-h-[85vh] max-w-4xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh] w-[85vw] max-w-3xl overflow-hidden rounded-2xl">
                <Image
                  src={guideImages[activeImageIndex].src}
                  alt={t(
                    `steps.${guideImages[activeImageIndex].altKey}.title`
                  )}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mt-4 text-center text-white">
                <h4 className="font-display text-xl font-medium">
                  {t(`steps.${guideImages[activeImageIndex].altKey}.title`)}
                </h4>
                <p className="mt-1 text-sm text-white/70 max-w-lg">
                  {t(
                    `steps.${guideImages[activeImageIndex].altKey}.description`
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
