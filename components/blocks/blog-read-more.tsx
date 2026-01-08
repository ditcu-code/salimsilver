"use client"

import AnimatedButton from "@/components/ui/animated-button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export default function BlogReadMore() {
  const t = useTranslations("JournalDetailPage.UI")

  return (
    <motion.div
      className="mt-12 border-t pt-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <AnimatedButton href="/blog" variant="primary" icon={<ArrowRight size={18} />}>
        {t("readMore")}
      </AnimatedButton>
    </motion.div>
  )
}
