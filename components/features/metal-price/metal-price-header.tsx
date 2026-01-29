"use client"

import { cn } from "@/lib/utils"
import { useEffect } from "react"

interface MetalPriceHeaderProps {
  title: string
  description: string
  className?: string
}

export function MetalPriceHeader({
  title,
  description,
  className,
}: MetalPriceHeaderProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className={cn("mb-5 space-y-2 text-center", className)}>
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h1>
      <p className="text-muted-foreground text-base md:text-lg">
        {description}
      </p>
    </div>
  )
}
