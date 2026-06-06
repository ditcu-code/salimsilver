"use client"

import AnimatedButton from "@/components/ui/animated-button"
import { Link } from "@/i18n/navigation"
import { motion, Variants } from "framer-motion"
import { ArrowRight, Gem, Hammer, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

function FiligreeMandala() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="mx-auto h-56 w-56 md:h-72 md:w-72 text-primary/10 dark:text-primary/20"
      fill="none"
      stroke="url(#silverGradient)"
      strokeWidth="1"
    >
      <defs>
        <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C0C0C0" />
          <stop offset="25%" stopColor="#E8E8E8" />
          <stop offset="50%" stopColor="#A9A9A9" />
          <stop offset="75%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#808080" />
        </linearGradient>
      </defs>

      {/* Concentric decorative circles */}
      <circle
        cx="100"
        cy="100"
        r="95"
        strokeDasharray="3,3"
        strokeWidth="0.75"
      />
      <circle cx="100" cy="100" r="88" strokeWidth="1" />
      <circle
        cx="100"
        cy="100"
        r="84"
        strokeDasharray="1,2"
        strokeWidth="0.5"
      />

      {/* Main Filigree curved petals */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24
        return (
          <path
            key={i}
            d="M100 12 C115 35, 85 45, 100 60 C115 75, 85 85, 100 100"
            transform={`rotate(${angle} 100 100)`}
            strokeWidth="0.5"
            opacity="0.85"
          />
        )
      })}

      {/* Beading ring */}
      <circle
        cx="100"
        cy="100"
        r="60"
        strokeDasharray="2,2"
        strokeWidth="0.75"
      />

      {/* Second tier petal loops */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 360) / 12
        return (
          <circle
            key={i}
            cx="100"
            cy="70"
            r="8"
            transform={`rotate(${angle} 100 100)`}
            strokeWidth="0.75"
            opacity="0.9"
          />
        )
      })}

      {/* Inner core */}
      <circle cx="100" cy="100" r="50" strokeWidth="1.25" />
      <circle
        cx="100"
        cy="100"
        r="28"
        strokeDasharray="2,2"
        strokeWidth="0.75"
      />
      <circle cx="100" cy="100" r="12" strokeWidth="0.75" />
      <circle cx="100" cy="100" r="3" fill="url(#silverGradient)" />
    </svg>
  )
}

export default function LocalizedNotFound() {
  const t = useTranslations("NotFoundPage")

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  }

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center px-4 py-28 text-center relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-2xl"
      >
        {/* Interactive Filigree Icon and 404 text */}
        <motion.div
          variants={itemVariants}
          className="relative flex items-center justify-center mb-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="hover:scale-105 transition-transform duration-500 cursor-pointer"
          >
            <FiligreeMandala />
          </motion.div>

          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 select-none pointer-events-none">
            <span className="font-sans text-6xl md:text-7xl font-extralight tracking-widest text-primary/80 dark:text-primary/90">
              404
            </span>
          </div>
        </motion.div>

        {/* Poetic Subtitles and Copy */}
        <div className="space-y-4">
          <motion.p
            variants={itemVariants}
            className="text-xs uppercase tracking-[0.25em] text-primary/60 dark:text-primary/80 font-medium"
          >
            {t("subtitle")}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-display text-primary text-4xl md:text-5xl font-semibold tracking-wide"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg mx-auto"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Core Call to Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-center items-center gap-4 pt-8 sm:flex-row"
        >
          <AnimatedButton href="/" icon={<ArrowRight size={16} />}>
            {t("homeButton")}
          </AnimatedButton>
          <AnimatedButton href="/catalog" variant="outline">
            {t("catalogButton")}
          </AnimatedButton>
        </motion.div>

        {/* Suggestion Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-primary/10"
        >
          <p className="text-sm text-muted-foreground/80 tracking-wider mb-6">
            {t("suggestedTitle")}
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto sm:grid-cols-4">
            <Link
              href="/catalog?category=rings"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-primary/10 bg-primary/2 hover:bg-primary/5 hover:border-primary/30 transition-all group"
            >
              <Sparkles className="h-5 w-5 mb-2 text-primary/70 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs font-medium tracking-wide text-foreground">
                {t("collections.rings")}
              </span>
            </Link>
            <Link
              href="/catalog?category=pendants"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-primary/10 bg-primary/2 hover:bg-primary/5 hover:border-primary/30 transition-all group"
            >
              <Gem className="h-5 w-5 mb-2 text-primary/70 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs font-medium tracking-wide text-foreground">
                {t("collections.necklaces")}
              </span>
            </Link>
            <Link
              href="/catalog?category=bracelets"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-primary/10 bg-primary/2 hover:bg-primary/5 hover:border-primary/30 transition-all group"
            >
              <Sparkles
                className="h-5 w-5 mb-2 text-primary/70 group-hover:scale-110 transition-transform duration-300"
                strokeDasharray="3 3"
              />
              <span className="text-xs font-medium tracking-wide text-foreground">
                {t("collections.bracelets")}
              </span>
            </Link>
            <Link
              href="/workshop"
              className="flex flex-col items-center justify-center p-4 rounded-xl border border-primary/10 bg-primary/2 hover:bg-primary/5 hover:border-primary/30 transition-all group"
            >
              <Hammer className="h-5 w-5 mb-2 text-primary/70 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs font-medium tracking-wide text-foreground">
                {t("collections.workshop")}
              </span>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
