"use client"

import { ObfuscatedEmail } from "@/components/features/obfuscated-email"
import { Facebook } from "@/components/icons/facebook"
import { Instagram } from "@/components/icons/instagram"
import { WhatsApp } from "@/components/icons/whatsapp"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl md:text-5xl mb-6 font-display">Get in Touch</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Whether you have a question about a piece, want to discuss a custom design, or just want to
        say hello, we are here to help.
      </p>

      <motion.div
        className="space-y-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3,
            },
          },
        }}
      >
        {[
          {
            icon: <Mail className="text-primary mt-1" size={20} />,
            title: "Email",
            content: <ObfuscatedEmail user="hello" domain="salimsilver.com" />,
          },
        ].map((item) => (
          <motion.div
            key={item.title}
            className="flex items-start gap-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {item.icon}
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <div className="text-primary/60">{item.content}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-xl mb-4 font-display">Follow Us</h3>
        <div className="flex flex-wrap gap-1">
          {[
            { icon: <Facebook size={26} />, label: "Facebook", href: "https://web.facebook.com/SalimSilverArt" },
            { icon: <Instagram size={26} />, label: "Instagram", href: "https://www.instagram.com/salimsilverofficial/" },
            { icon: <WhatsApp size={26} />, label: "WhatsApp", href: "/api/whatsapp" },
          ].map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-secondary rounded-full transition-colors hover:bg-primary hover:text-primary-foreground"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
