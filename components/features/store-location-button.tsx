"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import Link from "next/link"

export function StoreLocationButton() {
  return (
    <Link href="/store-location">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="relative w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
        aria-label="Store Location"
      >
        <MapPin size={20} className="text-primary" />
      </motion.button>
    </Link>
  )
}
