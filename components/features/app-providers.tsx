"use client"

import { LazyMotion, domAnimation } from "framer-motion"
import dynamic from "next/dynamic"
import { ReactNode } from "react"

const SoundEffects = dynamic(() => import("@/hooks/use-hammer-sound"), {
  ssr: false,
})

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <SoundEffects />
      {children}
    </LazyMotion>
  )
}
