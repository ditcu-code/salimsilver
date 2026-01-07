"use client"

import { ContactForm } from "@/components/features/contact-form"
import { motion } from "framer-motion"

export default function ContactFormSection() {
  return (
    <motion.div
      className="bg-primary-foreground border-border rounded-3xl border p-8 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="font-display mb-1 text-3xl">Send a Message</h2>
      <p className="text-muted-foreground mb-6 text-xs">
        You will receive a response within 24 hours.
      </p>
      <ContactForm />
    </motion.div>
  )
}
