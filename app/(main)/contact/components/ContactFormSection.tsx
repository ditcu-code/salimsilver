"use client"

import { ContactForm } from "@/components/features/contact-form"
import { motion } from "framer-motion"

export default function ContactFormSection() {
  return (
    <motion.div
      className="bg-primary-foreground p-8 rounded-3xl shadow-sm border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-3xl mb-1 font-display">Send a Message</h2>
      <p className="text-xs text-muted-foreground mb-6">
        You will receive a response within 24 hours.
      </p>
      <ContactForm />
    </motion.div>
  )
}
