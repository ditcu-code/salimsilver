"use client"

import { useTranslations } from "next-intl"

import FeaturedCollections from "@/components/blocks/featured-collections"
import AnimatedButton from "@/components/ui/animated-button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import type { Collection } from "@/lib/types"

interface Props {
  collections: Collection[]
}

export default function OtherCollectionsSection({ collections }: Props) {
  const t = useTranslations("CollectionDetailPage.OtherCollections")

  return (
    <section className="mt-20 mb-20 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-primary font-display mb-4 text-3xl md:text-4xl">{t("title")}</h2>
          <p className="text-primary mx-auto max-w-2xl">{t("subtitle")}</p>
        </motion.div>
        <FeaturedCollections collections={collections} />
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <AnimatedButton href="/catalog" variant="primary" icon={<ArrowRight size={18} />}>
            {t("cta")}
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  )
}
