"use client"

import { useTranslations } from "next-intl"
import { ChevronRight, Footprints, MapPin, Route } from "lucide-react"
import {
  getTrailPois,
  getTrailWalkingMinutes,
  WALKING_TRAILS,
  type POI,
  type POICategory,
  type WalkingTrail
} from "@/lib/data/kotagede-guide"

export type MobileGuideView =
  | "choose"
  | "route"
  | "stops"
  | "place-preview"
  | "place-details"
  | "places"
  | "tips"

export interface MobileGuidePanelProps {
  view: MobileGuideView
  activeTrail: WalkingTrail | null
  selectedPoi: POI | null
  pois: POI[]
  category: POICategory | "all"
  onViewChange: (view: MobileGuideView) => void
  onSelectWalk: (trail: WalkingTrail) => void
  onExploreAll: () => void
  onSelectPoi: (poi: POI) => void
  onSelectCategory: (category: POICategory | "all") => void
}

export function MobileGuidePanel({
  view,
  activeTrail,
  selectedPoi,
  onViewChange,
  onSelectWalk,
  onExploreAll,
  onSelectPoi
}: MobileGuidePanelProps) {
  const t = useTranslations("KotagedeGuidePage")
  const trailPois = activeTrail ? getTrailPois(activeTrail) : []
  const firstStop = trailPois[1]
  const isExpanded = view === "choose" || view === "stops"

  return (
    <section
      data-testid="mobile-guide-panel"
      data-map-overlay="mobile-guide-panel"
      aria-label={t("Mobile.panelLabel")}
      className={`absolute inset-x-2 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-20 flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card/98 shadow-2xl backdrop-blur lg:hidden ${
        isExpanded ? "max-h-[min(50dvh,22rem)]" : "max-h-[min(38dvh,16rem)]"
      }`}
    >
      <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between gap-2 border-b border-border/70 bg-card/98 px-3 py-2">
        <span className="flex min-w-0 items-center gap-2 text-xs font-semibold text-foreground">
          <Route
            size={15}
            className="shrink-0 text-primary"
            aria-hidden="true"
          />
          <span className="truncate">
            {view === "choose"
              ? t("Mobile.chooseTitle")
              : view === "stops"
                ? t("Mobile.stopsTitle")
                : t("Mobile.mapTitle")}
          </span>
        </span>
        {view !== "choose" && (
          <button
            type="button"
            data-testid="mobile-open-walks"
            onClick={() => onViewChange("choose")}
            className="min-h-11 shrink-0 rounded-lg px-2 text-xs font-semibold text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            {t("Mobile.walks")}
          </button>
        )}
      </div>

      <div className="min-h-0 overflow-y-auto overscroll-contain p-3">
        {view === "choose" && (
          <div data-testid="mobile-walk-picker" className="space-y-2">
            {WALKING_TRAILS.map((trail) => {
              const stops = getTrailPois(trail)
              const finish = stops.at(-1)

              return (
                <button
                  key={trail.id}
                  type="button"
                  data-walk-id={trail.id}
                  onClick={() => onSelectWalk(trail)}
                  className="flex min-h-14 w-full cursor-pointer items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-left transition hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: trail.color }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm leading-tight font-semibold text-foreground">
                      {t(`Trails.${trail.id}.title`)}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                      {t("MapControls.walkingTime", {
                        minutes: getTrailWalkingMinutes(trail)
                      })}
                      {" · "}
                      {t("MapControls.places", { count: stops.length })}
                      {finish &&
                        ` · ${t("Mobile.endsAt", {
                          destination: t(`POIs.${finish.nameKey}.name`)
                        })}`}
                    </span>
                  </span>
                  <ChevronRight
                    size={17}
                    className="shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                </button>
              )
            })}
            <button
              type="button"
              onClick={onExploreAll}
              className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-3 text-xs font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <MapPin size={15} aria-hidden="true" />
              {t("Mobile.exploreAll")}
            </button>
          </div>
        )}

        {view === "route" && activeTrail && (
          <div data-testid="mobile-route-summary" className="space-y-2">
            <div className="flex min-w-0 items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm leading-tight font-bold text-foreground">
                  {t(`Trails.${activeTrail.id}.title`)}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                  {t("MapControls.places", { count: trailPois.length })}
                  {firstStop &&
                    ` · ${t("Mobile.firstStop", {
                      destination: t(`POIs.${firstStop.nameKey}.name`)
                    })}`}
                </p>
              </div>
              <Footprints
                size={18}
                className="shrink-0 text-primary"
                aria-hidden="true"
              />
            </div>
            <button
              type="button"
              onClick={() => onViewChange("stops")}
              className="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-primary px-3 text-xs font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {t("Mobile.viewStops")}
            </button>
          </div>
        )}

        {view === "stops" && activeTrail && (
          <div data-testid="mobile-stops" className="space-y-2">
            <p className="text-sm font-semibold text-foreground">
              {t(`Trails.${activeTrail.id}.title`)}
            </p>
            <p
              data-testid={`mobile-trail-description-${activeTrail.id}`}
              className="text-xs leading-relaxed text-muted-foreground"
            >
              {t(`Trails.${activeTrail.descriptionKey}.description`)}
            </p>
            <p
              data-testid={`mobile-trail-endpoints-${activeTrail.id}`}
              className="text-[11px] leading-relaxed font-medium text-foreground"
            >
              {t("MapControls.routeStartEnd", {
                destination: trailPois.at(-1)
                  ? t(`POIs.${trailPois.at(-1)!.nameKey}.name`)
                  : ""
              })}
            </p>
            {trailPois.map((poi, index) => (
              <button
                key={poi.id}
                type="button"
                data-poi-id={poi.id}
                onClick={() => onSelectPoi(poi)}
                className="flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2 text-left text-xs focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 font-medium text-foreground">
                  {t(`POIs.${poi.nameKey}.name`)}
                </span>
                {poi.id === activeTrail.endStopId && (
                  <span className="shrink-0 text-[10px] font-semibold text-primary">
                    {t("MapControls.finish")}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {view === "place-preview" && selectedPoi && (
          <div
            data-testid="mobile-place-preview"
            className="flex min-h-12 items-center gap-2"
          >
            <MapPin
              size={19}
              className="shrink-0 text-primary"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">
                {t(`POIs.${selectedPoi.nameKey}.name`)}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {selectedPoi.id === "salim-silver"
                  ? t("MapControls.startingBase")
                  : t("MapControls.fromSalim", {
                      minutes: selectedPoi.walkingMinutesFromSalim,
                      distance: selectedPoi.distanceMeters
                    })}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
