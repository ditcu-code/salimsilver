"use client"

import { Button } from "@/components/ui/button"
import { GOOGLE_REVIEW_URL } from "@/lib/constants"
import { motion, useReducedMotion } from "framer-motion"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"

export default function ReviewRedirect() {
  const shouldReduceMotion = useReducedMotion()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const countdownTimer = window.setInterval(() => {
      setCountdown((current) => Math.max(current - 1, 0))
    }, 1000)

    const redirectTimer = window.setTimeout(() => {
      window.location.assign(GOOGLE_REVIEW_URL)
    }, 5000)

    return () => {
      window.clearInterval(countdownTimer)
      window.clearTimeout(redirectTimer)
    }
  }, [])

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-10 text-center">
      <div className="w-full max-w-2xl space-y-8">
        <div
          className="text-primary flex justify-center gap-2"
          aria-hidden="true"
        >
          {[1, 2, 3, 4, 5].map((star, index) => (
            <motion.div
              key={star}
              initial={{
                opacity: 0,
                scale: shouldReduceMotion ? 1 : 0,
                rotate: shouldReduceMotion ? 0 : -180
              }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }
              }
            >
              <Star className="h-8 w-8 fill-yellow-400" />
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          <h1 className="text-primary font-serif text-4xl font-medium text-balance md:text-5xl">
            A Heartfelt Thank You
          </h1>

          <p className="text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed text-balance md:text-xl">
            Thank you for spending time with us at Salim Silver.
          </p>

          <p className="text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed text-balance md:text-xl">
            We would be honored by a 5-star review. Your support keeps our
            tradition of Javanese craftsmanship alive.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-medium transition-all"
          >
            <a href={GOOGLE_REVIEW_URL}>Leave a Review Now</a>
          </Button>

          <p
            className="text-muted-foreground animate-pulse text-sm"
            aria-live="polite"
          >
            Redirecting you to Google Reviews in {countdown} seconds...
          </p>
        </div>
      </div>
    </main>
  )
}
