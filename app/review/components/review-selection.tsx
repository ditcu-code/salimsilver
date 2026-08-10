"use client"

import { Button } from "@/components/ui/button"
import { GOOGLE_REVIEW_URL, TRIPADVISOR_REVIEW_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Check, Clock3, Star } from "lucide-react"
import { useEffect, useState, type ComponentType, type SVGProps } from "react"

export type ReviewPlatform = "google" | "tripadvisor"

interface ReviewSelectionProps {
  initialPlatform: ReviewPlatform | null
}

interface PlatformDetails {
  name: string
  shortName: string
  description: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

const platformDetails: Record<ReviewPlatform, PlatformDetails> = {
  google: {
    name: "Google Reviews",
    shortName: "Google Reviews",
    description: "Share your visit with people searching for us on Google.",
    href: GOOGLE_REVIEW_URL,
    icon: GoogleIcon
  },
  tripadvisor: {
    name: "TripAdvisor",
    shortName: "TripAdvisor",
    description: "Help travelers discover our workshop and showroom.",
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
    <main className="bg-background text-foreground relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-6 sm:px-6 sm:py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-primary/10 absolute -top-32 -left-24 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-accent/20 absolute right-0 -bottom-40 h-120 w-120 rounded-full blur-3xl" />
      </div>

      <motion.div
        className="mx-auto w-full max-w-4xl"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={animation}
      >
        <header className="mx-auto mb-5 max-w-2xl text-center sm:mb-8">
          <div
            className="mb-2.5 flex justify-center gap-1.5 sm:mb-4 sm:gap-2"
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4].map((star) => (
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
                        delay: star * 0.1,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                      }
                }
              >
                <Star className="size-6 fill-yellow-400 text-yellow-400 sm:size-8" />
              </motion.div>
            ))}
          </div>

          <h1 className="font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl md:text-5xl">
            A Heartfelt Thank You
          </h1>
          <p className="text-muted-foreground mx-auto mt-2 max-w-xl text-sm leading-relaxed text-balance sm:text-base md:text-lg">
            Thank you for spending time with us at Salim Silver. We would be
            honored by a 5-star review. Your support keeps our tradition of
            Javanese craftsmanship alive.
          </p>
        </header>

        <section
          className="grid gap-3 sm:gap-4 md:grid-cols-2"
          aria-label="Choose a review platform"
        >
          {platforms.map(([platform, details], index) => {
            const Icon = details.icon
            const isSelected = initialPlatform === platform

            return (
              <motion.a
                key={platform}
                href={details.href}
                aria-label={`Leave a review on ${details.name}`}
                data-state={isSelected ? "selected" : "idle"}
                onClick={stopAutoRedirect}
                className={cn(
                  "group bg-card text-card-foreground focus-visible:ring-ring relative flex min-h-0 flex-col rounded-2xl border p-4 shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:min-h-64 sm:rounded-3xl sm:p-7",
                  isSelected
                    ? "border-primary ring-primary/15 ring-4"
                    : "border-border hover:border-primary/45"
                )}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...animation,
                  delay: shouldReduceMotion ? 0 : 0.18 + index * 0.1
                }}
              >
                <div className="mb-2.5 flex items-center justify-between gap-3 sm:mb-8 sm:items-start sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="border-border bg-background flex size-11 shrink-0 items-center justify-center rounded-xl border shadow-sm sm:size-16 sm:rounded-2xl">
                      <Icon className="size-6.5 sm:size-10" aria-hidden="true" />
                    </div>
                    <h2 className="font-display text-lg font-semibold leading-tight sm:hidden">
                      {details.name}
                    </h2>
                  </div>
                  {isSelected ? (
                    <span className="bg-primary text-primary-foreground flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold sm:gap-1.5 sm:px-3 sm:py-1">
                      <Check className="size-3.5" />
                      Selected
                    </span>
                  ) : null}
                </div>

                <div className="mt-auto">
                  <h2 className="font-display hidden text-2xl font-semibold sm:block">
                    {details.name}
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed sm:mt-2 sm:text-base">
                    {details.description}
                  </p>
                  <span className="text-primary mt-3 inline-flex items-center gap-1.5 text-sm font-semibold sm:mt-5 sm:gap-2">
                    Leave a review
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.a>
            )
          })}
        </section>

        {initialPlatform && autoRedirectEnabled && countdown !== null ? (
          <motion.div
            className="border-border bg-card/90 mx-auto mt-4 flex max-w-xl flex-col items-center justify-between gap-3 rounded-xl border p-3 text-center shadow-sm backdrop-blur sm:mt-6 sm:flex-row sm:rounded-2xl sm:p-4 sm:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={animation}
            aria-live="polite"
          >
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-full sm:size-10">
                <Clock3 className="size-4 sm:size-5" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed">
                Redirecting to {platformDetails[initialPlatform].shortName} in{" "}
                <strong>{countdown} seconds</strong>.
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={cancelAutoRedirect}
            >
              Cancel
            </Button>
          </motion.div>
        ) : (
          <p className="text-muted-foreground mt-4 text-center text-xs sm:mt-6 sm:text-sm">
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
