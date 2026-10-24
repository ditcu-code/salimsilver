"use client"

import Image from "next/image"
import {
  Clock,
  Compass,
  ExternalLink,
  Footprints,
  Info,
  Landmark,
  X
} from "lucide-react"
import { useTranslations } from "next-intl"
import { POI } from "@/lib/data/kotagede-guide"
import { cn } from "@/lib/utils"

interface POICardProps {
  poi: POI | null
  onClose: () => void
  variant?: "card" | "sheet"
}

export function POICard({ poi, onClose, variant = "card" }: POICardProps) {
  const t = useTranslations("KotagedeGuidePage")

  if (!poi) return null

  const isSalim = poi.id === "salim-silver"
  const title = t(`POIs.${poi.nameKey}.name`)
  const description = t(`POIs.${poi.nameKey}.description`)
  const tips = t(`POIs.${poi.nameKey}.tips`)
  const isSheet = variant === "sheet"

  return (
    <article
      data-testid="poi-details"
      data-variant={variant}
      aria-label={title}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-card/95 shadow-xl backdrop-blur transition-all",
        isSheet &&
          "h-full overflow-y-auto overscroll-contain bg-card/98 shadow-2xl"
      )}
    >
      {isSheet && (
        <div className="sticky top-0 z-20 flex h-5 items-center justify-center bg-card/95 backdrop-blur">
          <span className="h-1 w-10 rounded-full bg-muted-foreground/30" />
        </div>
      )}

      {/* Close Button */}
      {isSheet && (
        <button
          onClick={onClose}
          className="absolute top-4 right-2 z-30 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-background/90 text-muted-foreground shadow-sm backdrop-blur transition hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:right-3"
          aria-label="Close details"
        >
          <X size={18} />
        </button>
      )}

      {/* Hero Image */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-muted",
          isSheet ? "h-24 sm:h-28" : "h-44"
        )}
      >
        {poi.imageUrl ? (
          <Image
            src={poi.imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div
            data-testid="poi-image-fallback"
            className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/15 via-muted to-background text-primary/60"
          >
            <Landmark size={42} strokeWidth={1.5} aria-hidden="true" />
            <span className="sr-only">{title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm ${
              poi.category === "heritage"
                ? "bg-amber-700"
                : poi.category === "architecture"
                  ? "bg-teal-700"
                  : poi.category === "culinary"
                    ? "bg-rose-700"
                    : "bg-amber-600"
            }`}
          >
            {t(`MapControls.${poi.category}`)}
          </span>

          {!isSalim && (
            <span className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
              <Clock size={11} />
              {poi.walkingMinutesFromSalim} {t("MapControls.minsWalkShort")} (
              {poi.distanceMeters}m)
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "p-4 md:p-5",
          isSheet &&
            "px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:p-4"
        )}
      >
        <div className="mb-2">
          <h3 className="font-display text-lg font-bold text-foreground">
            {title}
          </h3>
          {isSalim ? (
            <p className="text-xs font-semibold text-primary">
              {t("MapControls.startingBase")}
            </p>
          ) : (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Footprints size={12} className="text-primary shrink-0" />
              <span>
                {t("MapControls.fromSalim", {
                  minutes: poi.walkingMinutesFromSalim,
                  distance: poi.distanceMeters
                })}
              </span>
            </p>
          )}
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
          {description}
        </p>

        {/* Enclosed Complex Callout */}
        {poi.complexId === "royal-complex" && (
          <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-amber-600/25 bg-amber-500/10 p-2.5 text-xs text-amber-950 dark:text-amber-200">
            <Landmark
              size={15}
              className="mt-0.5 shrink-0 text-amber-700 dark:text-amber-400"
            />
            <div>
              <p className="font-semibold text-amber-900 dark:text-amber-100">
                {t("MapControls.royalComplexTitle")}
              </p>
              <p className="mt-0.5 leading-relaxed text-[11px] text-amber-800/80 dark:text-amber-200/80">
                {t("MapControls.royalComplexDescription")}
              </p>
            </div>
          </div>
        )}

        {/* Cultural / Visitor Etiquette Tip */}
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-2.5 text-xs text-amber-900 dark:text-amber-200">
          <Info
            size={14}
            className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
          />
          <p className="leading-snug">
            <strong className="font-semibold">
              {t("MapControls.culturalTip")}:
            </strong>{" "}
            {tips}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-4 flex items-center gap-2">
          <a
            href={poi.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground shadow transition hover:opacity-95"
          >
            <Compass size={14} />
            <span>{t("MapControls.openInGoogleMaps")}</span>
            <ExternalLink size={12} className="opacity-70" />
          </a>
        </div>
      </div>
    </article>
  )
}
