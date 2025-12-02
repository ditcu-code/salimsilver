"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import type { ReactNode } from "react"

import AnimatedButton from "@/components/ui/animated-button"
import { cn } from "@/lib/utils"

interface CTASectionProps {
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  buttonVariant?: "primary" | "secondary" | "outline"
  icon?: ReactNode
  sectionClassName?: string
  paddingClassName?: string
  containerClassName?: string
}

export default function CTASection({
  title,
  description,
  ctaLabel,
  ctaHref,
  buttonVariant = "primary",
  icon = <ArrowRight size={18} />,
  sectionClassName,
  paddingClassName,
  containerClassName = "max-w-7xl mx-auto text-center",
}: CTASectionProps) {
  const resolvedSectionClasses =
    sectionClassName ?? "min-w-[90%] justify-self-center mr-4 ml-4 py-12 my-12 md:py-20 md:my-20"
  const resolvedPaddingClasses = paddingClassName ?? "px-4 md:px-8"

  return (
    <section
      className={cn(
        "rounded-3xl border border-border bg-secondary/30",
        resolvedPaddingClasses,
        resolvedSectionClasses,
      )}
    >
      <motion.div
        className={containerClassName}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl mb-6 font-display">{title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">{description}</p>
        <AnimatedButton href={ctaHref} variant={buttonVariant} icon={icon}>
          {ctaLabel}
        </AnimatedButton>
      </motion.div>
    </section>
  )
}
