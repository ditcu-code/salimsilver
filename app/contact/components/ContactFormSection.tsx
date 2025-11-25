"use client"

import { ContactForm } from "@/components/contact-form"
import { motion } from "framer-motion"

export default function ContactFormSection() {
  return (
    <motion.div
      className="bg-primary dark:bg-primary-foreground p-8 rounded-2xl shadow-sm border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h2 className="text-2xl mb-6 font-cormorantGaramond">Send a Message</h2>
      <ContactForm />
    </motion.div>
  )
}
