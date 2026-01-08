"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function HeroSection() {
  const t = useTranslations("AboutPage.Hero")

  return (
    <section className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] h-[50vh] w-screen">
      <Image
        src="/images/private-collection-priyana-jatmika-salim.webp"
        alt="About Salim Silver"
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-display mb-4 text-4xl text-white md:text-5xl">{t("title")}</h1>
        <p className="max-w-2xl text-lg text-white/90">{t("description")}</p>
      </motion.div>
    </section>
  )
}
