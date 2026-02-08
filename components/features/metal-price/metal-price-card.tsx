"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Triangle } from "lucide-react"

import { AnimatePresence, m as motion } from "framer-motion"
import { AnimatedCurrency } from "./animated-currency"
import { usePriceTrend } from "./use-price-trend"

interface MetalPriceCardProps {
  includeTax: boolean
  currentPriceDisplay: number
  previousPriceDisplay: number
  lastUpdated: string
}

export function MetalPriceCard({
  includeTax,
  currentPriceDisplay,
  previousPriceDisplay,
  lastUpdated,
}: MetalPriceCardProps) {
  const { priceChange, percentageChange, isUp, isSame, showPercentage } =
    usePriceTrend(currentPriceDisplay, previousPriceDisplay)

  const trendColor = isSame
    ? "bg-muted text-muted-foreground"
    : isUp
      ? "bg-green-500/10 text-green-600 dark:text-green-400"
      : "bg-red-500/10 text-red-600 dark:text-red-400"

  const TrendIcon = Triangle

  const gradientClass = isSame
    ? "via-primary/60"
    : isUp
      ? "via-green-500/60"
      : "via-red-500/60"

  const isLongNumber = Math.floor(currentPriceDisplay).toString().length >= 7

  return (
    <Card className="bg-card border-border/50 relative overflow-hidden rounded-xl border shadow-lg">
      {/* Subtle gradient accent at the top */}
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent to-transparent opacity-50 ${gradientClass}`}
      />

      <CardHeader className="pt-8 pb-2 text-center" />

      <CardContent className="space-y-8 px-8 pb-8">
        {/* Main Price Display */}
        <div className="space-y-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-baseline justify-center gap-1">
              <span
                className={`text-foreground font-sans font-bold tracking-tight ${
                  isLongNumber ? "md:text-5xl text-4xl" : "md:text-6xl text-5xl"
                }`}
              >
                <AnimatedCurrency value={currentPriceDisplay} />
              </span>
              <span className="text-muted-foreground text-lg font-medium sm:text-xl">
                / gram
              </span>
            </div>
            <motion.div
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: includeTax ? 1 : 0,
                height: includeTax ? "auto" : 0,
              }}
              className="overflow-hidden"
            >
              <span className="text-muted-foreground block text-xs font-medium">
                (Termasuk PPN 11%)
              </span>
            </motion.div>
          </div>

          {/* Trend Pill */}
          <div className="flex justify-center">
            <motion.div
              layout
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium ${trendColor}`}
            >
              {!isSame && (
                <TrendIcon
                  className={`h-3 w-3 fill-current ${!isUp && "rotate-180"}`}
                />
              )}
              <div className="flex gap-1 font-sans font-bold">
                {isSame ? (
                  "Harga Stabil"
                ) : (
                  <>
                    <span>{isUp ? "Naik" : "Turun"}</span>
                    <div className="relative h-5 overflow-hidden">
                      <AnimatePresence mode="popLayout" initial={false}>
                        {showPercentage ? (
                          <motion.span
                            key="percentage"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                            className="block tabular-nums"
                          >
                            {Math.abs(percentageChange).toFixed(2)}%
                          </motion.span>
                        ) : (
                          <motion.span
                            key="nominal"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                            className="block tabular-nums"
                          >
                            <AnimatedCurrency value={Math.abs(priceChange)} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="border-border/60 w-full border-t" />
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 md:gap-8 gap-4 pt-6">
          <div className="space-y-1 text-center">
            <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Harga Kemarin
            </p>
            <p className="text-xl font-semibold tracking-tight tabular-nums">
              <AnimatedCurrency value={previousPriceDisplay} />
            </p>
          </div>
          <div className="space-y-1 text-center">
            <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              Update Terakhir
            </p>
            <div className="text-foreground text-sm font-medium">
              {new Date(lastUpdated).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                timeZone: "Asia/Jakarta",
              })}
            </div>
            <div className="text-muted-foreground -mt-1 text-xs">
              {new Date(lastUpdated).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Jakarta",
              })}{" "}
              WIB
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface PriceFallbackCardProps {
  title: string
  description: string
}

export function PriceFallbackCard({
  title,
  description,
}: PriceFallbackCardProps) {
  return (
    <Card className="border-border/50 bg-card shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="font-display text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
