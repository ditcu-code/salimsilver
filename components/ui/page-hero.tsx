"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"

interface PageHeroProps {
  title: string
  subtitle?: string
  eyebrow?: string
  imageSrc: string
  imageAlt: string
  imageTitle?: string
  priority?: boolean
  className?: string
  children?: React.ReactNode
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  imageSrc,
  imageAlt,
  imageTitle,
  priority = true,
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] h-[40vh] min-h-[300px] w-screen md:h-[50vh]",
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        title={imageTitle}
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        className="absolute inset-0 mt-12 flex flex-col items-center justify-center p-4 text-center md:mt-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {eyebrow && (
          <p className="mb-4 text-sm font-semibold tracking-[0.2em] text-white/80 uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display mb-4 text-4xl text-white md:text-5xl">{title}</h1>
        {subtitle && <p className="max-w-2xl text-lg text-white/90">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </motion.div>
    </section>
  )
}
