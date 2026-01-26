"use client"

import { ContactForm } from "@/components/features/contact-form"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

import { useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

export default function ContactFormSection() {
  const t = useTranslations("ContactPage.Form")
  const searchParams = useSearchParams()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchParams.get("message")) {
      // Small delay to ensure layout is stable
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }, 100)
    }
  }, [searchParams])

  return (
    <motion.div
      ref={sectionRef}
      className="bg-primary-foreground border-border rounded-3xl border p-8 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="font-display mb-1 text-3xl">{t("title")}</h2>
      <p className="text-muted-foreground mb-6 text-xs">{t("description")}</p>
      <ContactForm />
    </motion.div>
  )
}
