"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import Link from "next/link"

export function StoreLocationButton() {
  return (
    <Link href="/store-location">
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="bg-secondary text-secondary-foreground hover:bg-secondary/80 relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors"
        aria-label="Store Location"
      >
        <MapPin size={20} className="text-primary" />
      </motion.button>
    </Link>
  )
}
