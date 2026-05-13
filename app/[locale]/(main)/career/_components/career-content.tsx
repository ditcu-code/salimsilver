"use client"

import AnimatedButton from "@/components/ui/animated-button"
import { motion, Variants } from "framer-motion"
import {
  ArrowRight,
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  MapPin,
  Sparkles,
  Users
} from "lucide-react"
import { useTranslations } from "next-intl"

const jobs = [
  {
    key: "silversmith",
    icon: Sparkles
  },
  {
    key: "studioAssistant",
    icon: Users
  },
  {
    key: "contentCreative",
    icon: Clock
  }
] as const

const studentHighlights = [
  {
    key: "schedule",
    icon: CalendarDays
  },
  {
    key: "documents",
    icon: FileText
  },
  {
    key: "learning",
    icon: GraduationCap
  }
] as const

interface CareerContentProps {
  talentPoolMessage: string
  studentMessage: string
}

export default function CareerContent({
  talentPoolMessage,
  studentMessage
}: CareerContentProps) {
  const t = useTranslations("CareerPage")
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen selection:bg-primary selection:text-primary-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/40 border-border border-b px-4 pt-36 pb-16 md:px-8 md:pt-48 md:pb-32">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="text-primary mb-6 block text-sm font-semibold tracking-[0.3em] uppercase">
              {t("Hero.eyebrow")}
            </span>
            <h1 className="font-display text-5xl leading-[1.1] md:text-7xl lg:text-8xl">
              {t("Hero.title")}
            </h1>
            <p className="text-muted-foreground mt-8 max-w-2xl text-xl leading-relaxed">
              {t("Hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <span className="text-primary mb-3 block text-sm font-medium tracking-wider">
              {t("Jobs.eyebrow")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl">
              {t("Jobs.title")}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
            {t("Jobs.description")}
          </p>
        </motion.div>

        {jobs.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-3"
          >
            {jobs.map(({ key, icon: Icon }) => (
              <motion.article
                key={key}
                variants={itemVariants}
                className="group border-border bg-card hover:border-primary/20 relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="text-primary group-hover:scale-110 mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 transition-transform duration-500">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="mb-8 space-y-4">
                  <h3 className="font-display text-2xl group-hover:text-primary transition-colors">
                    {t(`Jobs.items.${key}.title`)}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 text-base leading-relaxed">
                    {t(`Jobs.items.${key}.description`)}
                  </p>
                </div>
                <dl className="mt-auto flex flex-wrap gap-x-6 gap-y-3 border-t pt-6 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-primary/60 h-4 w-4" />
                    <dd>{t(`Jobs.items.${key}.location`)}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-primary/60 h-4 w-4" />
                    <dd>{t(`Jobs.items.${key}.type`)}</dd>
                  </div>
                </dl>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="border-border bg-muted/20 relative flex flex-col items-center justify-center rounded-3xl border border-dashed py-24 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-primary/5 opacity-50" />
            <div className="relative z-10">
              <div className="bg-primary/10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <Sparkles className="text-primary h-10 w-10 animate-pulse" />
              </div>
              <h3 className="font-display text-3xl">{t("Jobs.emptyTitle")}</h3>
              <p className="text-muted-foreground mt-4 max-w-md px-6 text-lg leading-relaxed">
                {t("Jobs.emptyDescription")}
              </p>
            </div>
          </motion.div>
        )}
      </section>

      {/* Internship Section */}
      <section className="bg-secondary/30 border-border border-y px-4 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary mb-3 block text-sm font-medium tracking-wider">
              {t("StudentInternship.eyebrow")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl">
              {t("StudentInternship.title")}
            </h2>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
              {t("StudentInternship.description")}
            </p>
            <div className="mt-10">
              <AnimatedButton
                href={`/contact?message=${encodeURIComponent(studentMessage)}`}
                variant="primary"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                {t("StudentInternship.ctaLabel")}
              </AnimatedButton>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-3"
          >
            {studentHighlights.map(({ key, icon: Icon }) => (
              <motion.div
                key={key}
                variants={itemVariants}
                className="bg-background hover:border-primary/20 group rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-primary mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl">
                  {t(`StudentInternship.items.${key}.title`)}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {t(`StudentInternship.items.${key}.description`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Talent Pool Section */}
      <section className="px-4 py-24 md:px-8 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-primary text-primary-foreground relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-8 py-16 md:px-16 md:py-24"
        >
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-6xl leading-tight">
                {t("TalentPool.title")}
              </h2>
              <p className="mt-6 text-xl text-primary-foreground/80 leading-relaxed">
                {t("TalentPool.description")}
              </p>
            </div>
            <div className="shrink-0">
              <AnimatedButton
                href={`/contact?message=${encodeURIComponent(talentPoolMessage)}`}
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 px-10 py-5 text-lg font-semibold"
                icon={<ArrowRight className="h-5 w-5" />}
              >
                {t("TalentPool.ctaLabel")}
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
