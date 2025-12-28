"use client"

import { motion, useSpring, useTransform } from "framer-motion"
import { useEffect } from "react"

export function useFormattedCurrency(val: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(val)
}

export function AnimatedCurrency({ value }: { value: number }) {
  const spring = useSpring(value, { stiffness: 60, damping: 15, mass: 1 })
  const displayValue = useTransform(spring, (current) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Math.round(current))
  })

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return <motion.span>{displayValue}</motion.span>
}
