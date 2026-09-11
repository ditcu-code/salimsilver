"use client"

import { Button } from "@/components/ui/button"
import { GOOGLE_REVIEW_URL, TRIPADVISOR_REVIEW_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "framer-motion"
import { Star } from "lucide-react"
import { useEffect, useState, type ComponentType, type SVGProps } from "react"

export type ReviewPlatform = "google" | "tripadvisor"

interface ReviewSelectionProps {
  initialPlatform: ReviewPlatform | null
}

interface PlatformDetails {
  name: string
  shortName: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

const platformDetails: Record<ReviewPlatform, PlatformDetails> = {
  google: {
    name: "Google Reviews",
    shortName: "Google Reviews",
    href: GOOGLE_REVIEW_URL,
    icon: GoogleIcon
  },
  tripadvisor: {
    name: "TripAdvisor",
    shortName: "TripAdvisor",
    href: TRIPADVISOR_REVIEW_URL,
    icon: TripAdvisorIcon
  }
}

const platforms = Object.entries(platformDetails) as Array<
  [ReviewPlatform, PlatformDetails]
>

export function ReviewSelection({ initialPlatform }: ReviewSelectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const [countdown, setCountdown] = useState<number | null>(
    initialPlatform ? 5 : null
  )
  const [autoRedirectEnabled, setAutoRedirectEnabled] = useState(
    Boolean(initialPlatform)
  )

  useEffect(() => {
    if (!initialPlatform || !autoRedirectEnabled) return

    const countdownTimer = window.setInterval(() => {
      setCountdown((current) =>
        current === null ? null : Math.max(current - 1, 0)
      )
    }, 1000)

    const redirectTimer = window.setTimeout(() => {
      window.location.assign(platformDetails[initialPlatform].href)
    }, 5000)

    return () => {
      window.clearInterval(countdownTimer)
      window.clearTimeout(redirectTimer)
    }
  }, [autoRedirectEnabled, initialPlatform])

  const cancelAutoRedirect = () => {
    setAutoRedirectEnabled(false)
    setCountdown(null)
  }

  const stopAutoRedirect = () => {
    setAutoRedirectEnabled(false)
  }

  const animation = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: "easeOut" as const }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-10 text-center">
      <motion.div
        className="w-full max-w-2xl space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={animation}
      >
        <header className="space-y-4">
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
        </header>

        <section
          className="mx-auto grid max-w-xl gap-5 sm:grid-cols-2"
          aria-label="Choose a review platform"
        >
          {platforms.map(([platform, details], index) => {
            const Icon = details.icon
            const isSelected = initialPlatform === platform

            return (
              <motion.div
                key={platform}
                className="space-y-2"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...animation,
                  delay: shouldReduceMotion ? 0 : 0.18 + index * 0.1
                }}
              >
                <motion.a
                  href={details.href}
                  aria-label={`Leave a review on ${details.name}`}
                  data-state={isSelected ? "selected" : "idle"}
                  onClick={stopAutoRedirect}
                  whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                  className={cn(
                    "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring flex min-h-16 w-full items-center justify-center gap-3 rounded-full px-5 py-3 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                    isSelected && "ring-primary/20 ring-4"
                  )}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span>{details.name}</span>
                </motion.a>
              </motion.div>
            )
          })}
        </section>

        {initialPlatform && autoRedirectEnabled && countdown !== null ? (
          <motion.div
            className="space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={animation}
          >
            <p
              className="text-muted-foreground animate-pulse text-sm"
              aria-live="polite"
            >
              Redirecting to {platformDetails[initialPlatform].shortName} in{" "}
              {countdown} seconds.
            </p>
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={cancelAutoRedirect}
            >
              Cancel
            </Button>
          </motion.div>
        ) : (
          <p className="text-muted-foreground text-sm">
            Choose the platform you prefer. You will continue in the same tab.
          </p>
        )}
      </motion.div>
    </main>
  )
}

function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#4285F4"
        d="M21.35 12.22c0-.74-.07-1.45-.19-2.13H12v4.03h5.24a4.48 4.48 0 0 1-1.94 2.94v2.62h3.14c1.84-1.69 2.91-4.19 2.91-7.46Z"
      />
      <path
        fill="#34A853"
        d="M12 21.72c2.63 0 4.84-.87 6.45-2.36l-3.14-2.62c-.87.58-1.98.93-3.31.93-2.53 0-4.68-1.71-5.45-4.01H3.3v2.69A9.74 9.74 0 0 0 12 21.72Z"
      />
      <path
        fill="#FBBC05"
        d="M6.55 13.66A5.86 5.86 0 0 1 6.24 12c0-.58.11-1.14.31-1.66V7.65H3.3A9.73 9.73 0 0 0 2.28 12c0 1.57.38 3.06 1.02 4.35l3.25-2.69Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.33c1.43 0 2.71.49 3.72 1.45l2.79-2.79A9.35 9.35 0 0 0 12 2.28 9.74 9.74 0 0 0 3.3 7.65l3.25 2.69c.77-2.3 2.92-4.01 5.45-4.01Z"
      />
    </svg>
  )
}

function TripAdvisorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" {...props}>
      <path
        d="M16 20.5A34.7 34.7 0 0 1 32 17a34.7 34.7 0 0 1 16 3.5"
        fill="none"
        stroke="#111827"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <circle cx="19" cy="34" r="12" fill="#34E0A1" />
      <circle cx="45" cy="34" r="12" fill="#34E0A1" />
      <circle cx="19" cy="34" r="7" fill="white" />
      <circle cx="45" cy="34" r="7" fill="white" />
      <circle cx="19" cy="34" r="3.5" fill="#111827" />
      <circle cx="45" cy="34" r="3.5" fill="#111827" />
      <path d="m32 36-5 7h10l-5-7Z" fill="#F97316" />
      <path
        d="M29 34a9 9 0 0 1 6 0"
        fill="none"
        stroke="#111827"
        strokeWidth="3"
      />
    </svg>
  )
}
