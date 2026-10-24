"use client"

import { useMemo, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Compass, Info } from "lucide-react"
import {
  KOTAGEDE_POIS,
  WALKING_TRAILS,
  POI,
  WalkingTrail,
  POICategory,
  getTrailPois
} from "@/lib/data/kotagede-guide"
import KotagedeMap from "@/components/features/walking-tour/kotagede-map"
import { POICard } from "@/components/features/walking-tour/poi-card"
import { TrailSwitcher } from "@/components/features/walking-tour/trail-switcher"
import { CategoryFilter } from "@/components/features/walking-tour/category-filter"

export default function KotagedeGuideClient() {
  const t = useTranslations("KotagedeGuidePage")
  const mapFrameRef = useRef<HTMLDivElement>(null)

  const [selectedPoi, setSelectedPoi] = useState<POI | null>(
    KOTAGEDE_POIS[0] // Default to Salim Silver
  )
  const [activeTrail, setActiveTrail] = useState<WalkingTrail | null>(
    WALKING_TRAILS[0] // Default to Royal & Heritage Loop
  )
  const [selectedCategory, setSelectedCategory] = useState<POICategory | "all">(
    "all"
  )

  // Filter POIs based on active trail or selected category
  const filteredPois = useMemo(() => {
    if (activeTrail) {
      return getTrailPois(activeTrail)
    }
    if (selectedCategory === "all") {
      return KOTAGEDE_POIS
    }
    return KOTAGEDE_POIS.filter(
      (p) => p.category === selectedCategory || p.id === "salim-silver"
    )
  }, [activeTrail, selectedCategory])

  const handleTrailChange = (trail: WalkingTrail | null) => {
    setActiveTrail(trail)
    if (trail) {
      setSelectedCategory("all")
      const firstStop = KOTAGEDE_POIS.find((p) => p.id === trail.stopIds[0])
      if (firstStop) setSelectedPoi(firstStop)
    }
  }

  const handleCategoryChange = (cat: POICategory | "all") => {
    const nextPois =
      cat === "all"
        ? KOTAGEDE_POIS
        : KOTAGEDE_POIS.filter(
            (poi) => poi.category === cat || poi.id === "salim-silver"
          )

    setSelectedCategory(cat)
    setActiveTrail(null)
    setSelectedPoi((currentPoi) =>
      currentPoi && nextPois.some((poi) => poi.id === currentPoi.id)
        ? currentPoi
        : (nextPois[0] ?? null)
    )
  }

  return (
    <div
      data-testid="kotagede-guide"
      className="mx-auto min-h-screen min-w-0 max-w-7xl overflow-x-clip px-3 pt-24 pb-10 sm:px-4 sm:pt-28 sm:pb-12 md:px-8 md:pt-32 md:pb-16"
    >
      {/* Top Header */}
      <div className="mb-5 max-w-3xl sm:mb-8">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Compass size={14} />
          <span>{t("Hero.badge")}</span>
        </div>
        <h1 className="font-display text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {t("Hero.title")}
        </h1>
        <p className="mt-3 text-base text-muted-foreground md:text-lg">
          {t("Hero.description")}
        </p>
      </div>

      {/* Main Interactive Guide Layout */}
      <div className="grid min-w-0 gap-5 sm:gap-6 lg:grid-cols-12">
        {/* Left Column: Filter + Map + Trail Switcher (7 cols on desktop) */}
        <div className="min-w-0 space-y-3 sm:space-y-4 lg:col-span-7 xl:col-span-8">
          {/* Category Filter Pills */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />

          {/* Interactive Vector Map (MapLibre GL) */}
          <div
            ref={mapFrameRef}
            data-testid="kotagede-map-frame"
            className="relative h-[min(68svh,32rem)] min-h-[430px] w-full overflow-hidden rounded-2xl border border-border shadow-lg sm:h-[500px] sm:min-h-[450px] sm:rounded-3xl md:h-[540px] [&:fullscreen]:h-screen [&:fullscreen]:max-h-none [&:fullscreen]:min-h-screen [&:fullscreen]:w-screen [&:fullscreen]:rounded-none [&:fullscreen]:border-0"
          >
            <KotagedeMap
              pois={filteredPois}
              selectedPoi={selectedPoi}
              onSelectPoi={setSelectedPoi}
              activeTrail={activeTrail}
              fullscreenTargetRef={mapFrameRef}
            />

            {selectedPoi && (
              <div
                data-map-overlay="poi-details"
                className="absolute inset-x-2 bottom-2 z-20 h-[min(62%,22rem)] lg:hidden"
              >
                <POICard
                  poi={selectedPoi}
                  onClose={() => setSelectedPoi(null)}
                  variant="sheet"
                />
              </div>
            )}
          </div>

          {/* Trail Switcher Presets */}
          <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
            <TrailSwitcher
              activeTrail={activeTrail}
              onSelectTrail={handleTrailChange}
            />
          </div>
        </div>

        {/* Right Column: Selected POI Details & Stop List (5 cols on desktop) */}
        <div className="min-w-0 space-y-4 sm:space-y-6 lg:col-span-5 xl:col-span-4">
          {/* Active POI Detail Card */}
          <div className="hidden lg:block">
            <POICard
              poi={selectedPoi}
              onClose={() => setSelectedPoi(null)}
              variant="card"
            />
          </div>

          {/* Trail Stops Quick List */}
          <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {activeTrail
                  ? t("MapControls.trailStops")
                  : t("MapControls.allSpots")}
              </h3>
              <span className="text-xs text-muted-foreground">
                {filteredPois.length} {t("MapControls.locations")}
              </span>
            </div>

            <div
              data-testid="poi-itinerary"
              className="max-h-[280px] space-y-2 overflow-y-auto overscroll-contain pr-1"
            >
              {filteredPois.map((poi, idx) => {
                const isSelected = selectedPoi?.id === poi.id
                const isSalim = poi.id === "salim-silver"

                return (
                  <button
                    key={poi.id}
                    data-poi-id={poi.id}
                    onClick={() => setSelectedPoi(poi)}
                    className={`flex min-h-11 w-full cursor-pointer items-center justify-between rounded-xl border p-2.5 text-left transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-xs"
                        : "border-border/60 hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                          isSalim
                            ? "bg-amber-600 text-white"
                            : isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="truncate text-xs font-semibold text-foreground">
                          {t(`POIs.${poi.nameKey}.name`)}
                        </span>
                        {poi.complexId === "royal-complex" && (
                          <span className="truncate text-[10px] font-medium text-amber-700 dark:text-amber-400">
                            {t("MapControls.royalComplexBadge")}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {isSalim
                        ? t("MapControls.base")
                        : `${poi.walkingMinutesFromSalim}m`}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quick Cultural Advice Card */}
          <div className="rounded-2xl border border-border/80 bg-linear-to-br from-amber-500/10 via-card to-background p-4 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400">
                <Info size={16} />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-foreground">
                  {t("CulturalTips.title")}
                </h4>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {t("CulturalTips.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
