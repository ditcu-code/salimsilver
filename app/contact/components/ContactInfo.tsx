"use client"

import { motion } from "framer-motion"
import { Instagram, Mail, MapPin, Phone } from "lucide-react"

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl md:text-5xl mb-6 font-display">Get in Touch</h1>
      <p className="text-primary/60 mb-8 max-w-md">
        Whether you have a question about a piece, want to discuss a custom design, or just want to
        say hello, we're here to help.
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
            content: "hello@salimsilver.com",
          },
          {
            icon: <MapPin className="text-primary mt-1" size={20} />,
            title: "Workshop",
            content: "Kotagede, Yogyakarta, Indonesia",
          },
          {
            icon: <Phone className="text-primary mt-1" size={20} />,
            title: "Phone",
            content: "+62 812 3456 7890",
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
              <p className="text-primary/60">{item.content}</p>
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
            { icon: <Instagram size={26} />, label: "Instagram", href: "https://www.instagram.com/salimsilverofficial/" },
            // { icon: <Twitter size={26} />, label: "Twitter", href: "#" },
            // { icon: <Facebook size={26} />, label: "Facebook", href: "#" },
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
