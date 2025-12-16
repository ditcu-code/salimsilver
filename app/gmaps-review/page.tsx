"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ReviewRedirectPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  const reviewUrl = "https://g.page/r/Ccp8F6XYiXlcEBM/review"

  useEffect(() => {
    // Timer countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Redirect after 5 seconds
    const redirectTimer = setTimeout(() => {
      router.push(reviewUrl)
    }, 5000)

    return () => {
      clearInterval(timer)
      clearTimeout(redirectTimer)
    }
  }, [router, reviewUrl])

  const handleRedirect = () => {
    router.push(reviewUrl)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-10 text-center">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-primary flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star, i) => (
            <motion.div
              key={star}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
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
            We would be honored by a 5-star review. Your support keeps our tradition of Javanese
            craftsmanship alive.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Button
            size="lg"
            onClick={handleRedirect}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg font-medium transition-all"
          >
            Leave a Review Now
          </Button>

          <p className="text-muted-foreground animate-pulse text-sm">
            Redirecting you to Google Reviews in {countdown} seconds...
          </p>
        </div>
      </div>
    </div>
  )
}
