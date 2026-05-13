import { Button } from "@/components/ui/button"
import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale,
} from "@/lib/seo"
import {
  ArrowRight,
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react"
import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"

type Props = {
  params: Promise<{ locale: string }>
}

const jobs = [
  {
    key: "silversmith",
    icon: Sparkles,
  },
  {
    key: "studioAssistant",
    icon: Users,
  },
  {
    key: "contentCreative",
    icon: Clock,
  },
] as const

const studentHighlights = [
  {
    key: "schedule",
    icon: CalendarDays,
  },
  {
    key: "documents",
    icon: FileText,
  },
  {
    key: "learning",
    icon: GraduationCap,
  },
] as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: "CareerPage.Metadata",
  })
  const canonicalUrl = constructCanonicalUrl(locale, "/career")

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternates("/career"),
    },
    openGraph: {
      type: "website",
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      siteName: "Salim Silver",
      locale: getOpenGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  }
}

export default async function CareerPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations("CareerPage")
  const talentPoolMessage = encodeURIComponent(t("TalentPool.message"))
  const studentMessage = encodeURIComponent(t("StudentInternship.message"))

  return (
    <div className="min-h-screen">
      <section className="bg-muted/40 border-border border-b px-4 pt-36 pb-16 md:px-8 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-primary mb-4 text-sm font-semibold tracking-[0.2em] uppercase">
              {t("Hero.eyebrow")}
            </p>
            <h1 className="font-display text-4xl leading-tight md:text-6xl">
              {t("Hero.title")}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
              {t("Hero.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-primary mb-2 text-sm font-medium">
              {t("Jobs.eyebrow")}
            </p>
            <h2 className="font-display text-3xl md:text-4xl">
              {t("Jobs.title")}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            {t("Jobs.description")}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {jobs.map(({ key, icon: Icon }) => (
            <article
              key={key}
              className="border-border bg-card flex h-full flex-col rounded-lg border p-6 shadow-sm"
            >
              <div className="text-primary mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="mb-5 space-y-3">
                <h3 className="text-xl font-semibold">
                  {t(`Jobs.items.${key}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`Jobs.items.${key}.description`)}
                </p>
              </div>
              <dl className="mt-auto space-y-3 border-t pt-5 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin
                    className="text-primary h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <dt className="sr-only">{t("Jobs.labels.location")}</dt>
                  <dd>{t(`Jobs.items.${key}.location`)}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <Clock
                    className="text-primary h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <dt className="sr-only">{t("Jobs.labels.type")}</dt>
                  <dd>{t(`Jobs.items.${key}.type`)}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 border-border border-y px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-primary mb-2 text-sm font-medium">
              {t("StudentInternship.eyebrow")}
            </p>
            <h2 className="font-display text-3xl md:text-4xl">
              {t("StudentInternship.title")}
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              {t("StudentInternship.description")}
            </p>
            <Button asChild className="mt-8 w-full md:w-auto">
              <Link href={`/contact?message=${studentMessage}`}>
                {t("StudentInternship.ctaLabel")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {studentHighlights.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="border-border bg-background rounded-lg border p-5"
              >
                <div className="text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-semibold">
                  {t(`StudentInternship.items.${key}.title`)}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t(`StudentInternship.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground px-4 py-16 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl">
              {t("TalentPool.title")}
            </h2>
            <p className="mt-4 text-primary-foreground/80 leading-relaxed">
              {t("TalentPool.description")}
            </p>
          </div>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-full md:w-auto"
          >
            <Link href={`/contact?message=${talentPoolMessage}`}>
              {t("TalentPool.ctaLabel")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: t("Metadata.title"),
            description: t("Metadata.description"),
            url: constructCanonicalUrl(locale, "/career"),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: jobs.map(({ key }, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: t(`Jobs.items.${key}.title`),
                description: t(`Jobs.items.${key}.description`),
              })),
            },
          }),
        }}
      />
    </div>
  )
}
