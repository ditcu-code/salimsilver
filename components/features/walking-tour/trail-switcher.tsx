"use client"

import { Footprints } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import {
  getTrailDistanceMeters,
  getTrailWalkingMinutes,
  WalkingTrail,
  WALKING_TRAILS
} from "@/lib/data/kotagede-guide"

interface TrailSwitcherProps {
  activeTrail: WalkingTrail | null
  onSelectTrail: (trail: WalkingTrail | null) => void
}

export function TrailSwitcher({
  activeTrail,
  onSelectTrail
}: TrailSwitcherProps) {
  const t = useTranslations("KotagedeGuidePage")
  const locale = useLocale()
  const distanceFormatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("MapControls.selectTrail")}
        </h4>
        {activeTrail && (
          <button
            onClick={() => onSelectTrail(null)}
            className="flex min-h-11 cursor-pointer items-center rounded-lg px-2 text-xs text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {t("MapControls.clearTrail")}
          </button>
        )}
      </div>

      <div className="hide-scrollbar -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
        {WALKING_TRAILS.map((trail) => {
          const isSelected = activeTrail?.id === trail.id
          const title = t(`Trails.${trail.id}.title`)
          const description = t(`Trails.${trail.descriptionKey}.description`)
          const walkingMinutes = getTrailWalkingMinutes(trail)
          const distanceKilometers = getTrailDistanceMeters(trail) / 1000
          const [minimumExperience, maximumExperience] = trail.experienceMinutes

          return (
            <button
              key={trail.id}
              data-testid={`trail-${trail.id}`}
              onClick={() => onSelectTrail(isSelected ? null : trail)}
              className={`flex min-h-40 w-[min(82vw,20rem)] shrink-0 snap-start cursor-pointer flex-col rounded-xl border p-3 text-left transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:min-h-0 sm:w-auto ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border bg-card hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: trail.color }}
                />
                <span
                  data-testid={`trail-walking-${trail.id}`}
                  className="text-[11px] font-medium text-muted-foreground"
                >
                  {t("MapControls.walkingTime", {
                    minutes: walkingMinutes
                  })}
                </span>
              </div>
              <h5 className="mt-1 font-semibold text-foreground text-xs leading-tight">
                {title}
              </h5>
              <p
                data-testid={`trail-description-${trail.id}`}
                className="mt-1 text-[11px] leading-relaxed text-muted-foreground"
              >
                {description}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <Footprints size={12} className="text-primary" />
                  {t("MapControls.distanceKilometers", {
                    distance: distanceFormatter.format(distanceKilometers)
                  })}
                </span>
                <span>•</span>
                <span
                  data-testid={`trail-places-${trail.id}`}
                  className="whitespace-nowrap"
                >
                  {t("MapControls.places", { count: trail.stopIds.length })}
                </span>
                <span>•</span>
                <span
                  data-testid={`trail-round-trip-${trail.id}`}
                  className="whitespace-nowrap"
                >
                  {t("MapControls.roundTrip")}
                </span>
                <span
                  data-testid={`trail-experience-${trail.id}`}
                  className="w-full font-medium text-foreground/80"
                >
                  {t("MapControls.experienceTime", {
                    minimum: minimumExperience,
                    maximum: maximumExperience
                  })}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
