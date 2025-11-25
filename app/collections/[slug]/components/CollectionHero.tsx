"use client"

import TagList from "@/components/tag-list"
import { motion } from "framer-motion"
import Image from "next/image"

interface CollectionHeroProps {
  title: string
  description: string
  coverImage: string
  tags: string[]
}

export default function CollectionHero({ title, description, coverImage, tags }: CollectionHeroProps) {
  return (
    <section className="relative h-[50vh] w-full">
      <Image
        src={coverImage || "/Morocco/morocco-8.webp?height=800&width=1920"}
        alt={title}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        className="absolute inset-0 flex flex-col justify-center items-center text-center p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl text-white mb-4">{title}</h1>
        <p className="text-white/90 text-lg max-w-2xl mb-6">{description}</p>
        <TagList tags={tags} variant="light" />
      </motion.div>
    </section>
  )
}
