"use client"

import AnimatedButton from "@/components/ui/animated-button"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-3xl md:text-4xl">Something went wrong</h2>
        <p className="text-muted-foreground mx-auto mb-8 max-w-md">
          We apologize for the inconvenience. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <AnimatedButton onClick={reset} variant="outline" icon={<ArrowLeft size={16} />}>
            Try again
          </AnimatedButton>
          <AnimatedButton href="/" variant="outline" icon={<ArrowLeft size={16} />}>
            Return Home
          </AnimatedButton>
        </div>
      </motion.div>
    </div>
  )
}
