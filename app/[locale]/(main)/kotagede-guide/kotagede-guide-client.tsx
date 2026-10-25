"use client"

import { useEffect, useMemo, useRef, useState } from "react"
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
import {
  MobileGuidePanel,
  type MobileGuideView
} from "@/components/features/walking-tour/mobile-guide-panel"

export default function KotagedeGuideClient() {
  const t = useTranslations("KotagedeGuidePage")
  const guideRef = useRef<HTMLDivElement>(null)
  const mapFrameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    guideRef.current?.setAttribute("data-hydrated", "true")
  }, [])

  const [selectedPoi, setSelectedPoi] = useState<POI | null>(
    KOTAGEDE_POIS[0] // Default to Salim Silver
  )
  const [activeTrail, setActiveTrail] = useState<WalkingTrail | null>(
    WALKING_TRAILS[0] // Default to Royal Mataram Walk
  )
  const [selectedCategory, setSelectedCategory] = useState<POICategory | "all">(
    "all"
  )
  const [mobileView, setMobileView] = useState<MobileGuideView>("choose")

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

  const handleMobileWalkChoice = (trail: WalkingTrail) => {
    setActiveTrail(trail)
    setSelectedCategory("all")
    setSelectedPoi(
      KOTAGEDE_POIS.find((poi) => poi.id === trail.stopIds[0]) ?? null
    )
    setMobileView("route")
  }

  const handleMobileExploreAll = () => {
    setActiveTrail(null)
    setSelectedCategory("all")
    setSelectedPoi(KOTAGEDE_POIS[0])
    setMobileView("place-preview")
  }

  const handleSelectPoi = (poi: POI | null) => {
    setSelectedPoi(poi)
    if (poi) setMobileView("place-preview")
  }

  return (
    <div
      ref={guideRef}
      data-testid="kotagede-guide"
      className="mx-auto min-h-dvh min-w-0 max-w-none overflow-x-clip lg:min-h-screen lg:max-w-7xl lg:px-8 lg:pt-32 lg:pb-16"
    >
      {/* Top Header */}
      <div className="sr-only max-w-3xl lg:not-sr-only lg:mb-8">
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
      <div className="grid min-w-0 gap-0 lg:grid-cols-12 lg:gap-6">
        {/* Left Column: Filter + Map + Trail Switcher (7 cols on desktop) */}
        <div className="min-w-0 lg:col-span-7 lg:space-y-4 xl:col-span-8">
          {/* Category Filter Pills */}
          <div className="hidden lg:block">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
            />
          </div>

          {/* Interactive Vector Map (MapLibre GL) */}
          <div
            ref={mapFrameRef}
            data-testid="kotagede-map-frame"
            className="relative h-dvh min-h-0 w-full overflow-hidden border-0 shadow-none lg:h-[540px] lg:min-h-[450px] lg:rounded-3xl lg:border lg:border-border lg:shadow-lg [&:fullscreen]:h-screen [&:fullscreen]:max-h-none [&:fullscreen]:min-h-screen [&:fullscreen]:w-screen [&:fullscreen]:rounded-none [&:fullscreen]:border-0"
          >
            <KotagedeMap
              pois={filteredPois}
              selectedPoi={selectedPoi}
              onSelectPoi={handleSelectPoi}
              activeTrail={activeTrail}
              fullscreenTargetRef={mapFrameRef}
            />

            <div className="pointer-events-none absolute top-24 left-3 z-10 max-w-[40vw] rounded-full border border-border/70 bg-background/90 px-3 py-2 shadow-sm backdrop-blur lg:hidden">
              <span className="block truncate text-xs font-semibold text-foreground">
                {t("Mobile.mapTitle")}
              </span>
            </div>

            <MobileGuidePanel
              view={mobileView}
              activeTrail={activeTrail}
              selectedPoi={selectedPoi}
              pois={filteredPois}
              category={selectedCategory}
              onViewChange={setMobileView}
              onSelectWalk={handleMobileWalkChoice}
              onExploreAll={handleMobileExploreAll}
              onSelectPoi={handleSelectPoi}
              onSelectCategory={handleCategoryChange}
            />
          </div>

          {/* Trail Switcher Presets */}
          <div className="hidden rounded-2xl border border-border bg-card p-4 shadow-xs lg:block">
            <TrailSwitcher
              activeTrail={activeTrail}
              onSelectTrail={handleTrailChange}
            />
          </div>
        </div>

        {/* Right Column: Selected POI Details & Stop List (5 cols on desktop) */}
        <div className="hidden min-w-0 space-y-6 lg:col-span-5 lg:block xl:col-span-4">
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
                    data-route-finish={
                      activeTrail && poi.id === activeTrail.endStopId
                        ? "true"
                        : undefined
                    }
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
                        {activeTrail?.endStopId === poi.id && (
                          <span className="text-[10px] font-semibold text-primary">
                            {t("MapControls.finish")}
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
