"use client"

import AnimatedButton from "@/components/ui/animated-button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function BlogReadMore() {
  return (
    <motion.div
      className="text-center mt-12 pt-8 border-t"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <AnimatedButton href="/blog" variant="primary" icon={<ArrowRight size={18} />}>
        Read More Stories
      </AnimatedButton>
    </motion.div>
  )
}
