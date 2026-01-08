"use client"

import { useTranslations } from "next-intl"

import { motion } from "framer-motion"
import Image from "next/image"

import AnimatedButton from "@/components/ui/animated-button"

export default function StoreHero() {
  const t = useTranslations("StoreLocationPage.Hero")

  return (
    <section className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] flex h-[60vh] min-h-[500px] w-screen items-center justify-center overflow-hidden">
      <Image
        src="/images/store-front.webp"
        alt="Salim Silver Workshop"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-white/80 uppercase">
          {t("subtitle")}
        </p>
        <h1 className="font-display mb-6 text-5xl md:text-7xl">{t("title")}</h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
          {t("description")}
        </p>
        <div className="mt-8">
          <AnimatedButton href="#location" variant="primary" className="px-8">
            {t("ctaLabel")}
          </AnimatedButton>
        </div>
      </motion.div>
    </section>
  )
}
