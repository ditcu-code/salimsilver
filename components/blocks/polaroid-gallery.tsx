"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"

interface PolaroidGalleryProps {
  images: string[]
  className?: string
  title?: string
  studentAlt?: string
}

export function PolaroidGallery({
  images,
  className,
  title = "Our Happy Students",
  studentAlt = "Salim Silver Jewelry Making Workshop Student",
}: PolaroidGalleryProps) {
  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-primary mb-8 text-center font-serif text-3xl">
          {title}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative rotate-0 transition-transform duration-300 odd:rotate-1 even:-rotate-1 hover:z-10 hover:scale-105"
            >
              <div className="bg-white p-3 pb-8 shadow-md transition-shadow duration-300 group-hover:shadow-xl dark:bg-stone-100">
                <div className="relative aspect-300/213 overflow-hidden bg-stone-200 grayscale transition-all duration-500 group-hover:grayscale-0">
                  <Image
                    src={src}
                    alt={`${studentAlt} ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
