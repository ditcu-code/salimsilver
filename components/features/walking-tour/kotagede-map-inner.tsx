"use client"

import { useCallback, useEffect, useRef, useState, type RefObject } from "react"
import * as maplibregl from "maplibre-gl"
import type { Map as MapLibreMap, Marker } from "maplibre-gl"

// Configure static same-origin worker for Next.js bundler compatibility
if (typeof window !== "undefined") {
  maplibregl.setWorkerUrl("/scripts/maplibre-gl-worker.mjs")
}
import {
  POI,
  SALIM_SILVER_LOCATION,
  WalkingTrail,
  ROYAL_COMPLEX_POLYGON
} from "@/lib/data/kotagede-guide"
import {
  Compass,
  LocateFixed,
  Maximize2,
  Minimize2,
  RotateCcw,
  Footprints
} from "lucide-react"

interface KotagedeMapInnerProps {
  pois: POI[]
  selectedPoi: POI | null
  onSelectPoi: (poi: POI | null) => void
  activeTrail: WalkingTrail | null
  fullscreenTargetRef?: RefObject<HTMLElement | null>
}

const CARTO_STYLE =
  "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
const MAP_EDGE_CLEARANCE_PX = 8

export default function KotagedeMapInner({
  pois,
  selectedPoi,
  onSelectPoi,
  activeTrail,
  fullscreenTargetRef
}: KotagedeMapInnerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const markersRef = useRef<Marker[]>([])
  const userMarkerRef = useRef<Marker | null>(null)
  const watchIdRef = useRef<number | null>(null)

  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  )
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [canFullscreen, setCanFullscreen] = useState(false)
  const [cameraState, setCameraState] = useState<"moving" | "idle">("idle")

  const getFullscreenTarget = useCallback(
    () => fullscreenTargetRef?.current ?? mapContainerRef.current,
    [fullscreenTargetRef]
  )

  const getMapOverlayOcclusion = useCallback(() => {
    const mapContainer = mapContainerRef.current
    const overlay = getFullscreenTarget()?.querySelector<HTMLElement>(
      '[data-map-overlay="poi-details"]'
    )
    if (!mapContainer || !overlay) return 0

    const mapBounds = mapContainer.getBoundingClientRect()
    const overlayBounds = overlay.getBoundingClientRect()
    if (overlayBounds.height === 0) return 0

    return Math.max(0, Math.ceil(mapBounds.bottom - overlayBounds.top))
  }, [getFullscreenTarget])

  const getMapHeaderOcclusion = useCallback(() => {
    const header = document.querySelector<HTMLElement>("header")
    if (!header || document.fullscreenElement) return 0

    return Math.max(0, Math.ceil(header.getBoundingClientRect().bottom))
  }, [])

  const getSelectedPoiOffset = useCallback(() => {
    const overlayOcclusion = getMapOverlayOcclusion()
    if (overlayOcclusion === 0) return 0

    const headerOcclusion = getMapHeaderOcclusion()
    return (
      Math.round((headerOcclusion - overlayOcclusion) / 2) -
      MAP_EDGE_CLEARANCE_PX
    )
  }, [getMapHeaderOcclusion, getMapOverlayOcclusion])

  // Initialize MapLibre
  useEffect(() => {
    if (!mapContainerRef.current) return

    maplibregl.setWorkerUrl("/scripts/maplibre-gl-worker.mjs")

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: CARTO_STYLE,
      center: SALIM_SILVER_LOCATION,
      zoom: 16.2,
      minZoom: 14,
      maxZoom: 19,
      pitch: 28,
      attributionControl: false
    })

    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      "bottom-right"
    )

    map.on("load", () => {
      mapRef.current = map
      setIsMapLoaded(true)
    })

    const handleMoveStart = () => setCameraState("moving")
    const handleMoveEnd = () => setCameraState("idle")
    map.on("movestart", handleMoveStart)
    map.on("moveend", handleMoveEnd)

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation?.clearWatch(watchIdRef.current)
      }
      map.off("movestart", handleMoveStart)
      map.off("moveend", handleMoveEnd)
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const fullscreenTarget = getFullscreenTarget()
    setCanFullscreen(
      Boolean(fullscreenTarget?.requestFullscreen && document.exitFullscreen)
    )

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === getFullscreenTarget())
      requestAnimationFrame(() => mapRef.current?.resize())
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [getFullscreenTarget])

  // Create markers whenever pois or selectedPoi changes
  useEffect(() => {
    const map = mapRef.current
    if (!map || !isMapLoaded) return

    // Clear previous markers
    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    pois.forEach((poi) => {
      const isSelected = selectedPoi?.id === poi.id
      const isSalim = poi.id === "salim-silver"

      const el = document.createElement("div")
      el.className = "cursor-pointer group transition-transform duration-200"

      if (isSalim) {
        // Prominent Salim Silver marker with downward needle tip
        el.innerHTML = `
          <div class="relative flex flex-col items-center origin-bottom transition-transform duration-200 group">
            <span class="absolute -top-1 -right-1 z-10 flex h-3.5 w-3.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
            </span>
            <div class="relative flex items-center justify-center h-11 w-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 border-2 border-white shadow-2xl text-white transform transition group-hover:scale-110 ${
              isSelected ? "scale-115 ring-4 ring-amber-400/60" : ""
            }">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9z"/></svg>
            </div>
            <div class="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[8px] border-t-amber-700 -mt-[1px]"></div>
            <div class="absolute -top-6 bg-stone-900/90 text-amber-300 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md whitespace-nowrap border border-amber-500/30 pointer-events-none">
              Salim Silver
            </div>
          </div>
        `
      } else {
        // Category marker colors & needle tip
        let badgeBg = "bg-stone-700"
        let triangleBorder = "border-t-stone-700"
        let iconSvg = ""

        if (poi.category === "heritage") {
          badgeBg = "bg-amber-700"
          triangleBorder = "border-t-amber-700"
          iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v11H9z"/></svg>`
        } else if (poi.category === "architecture") {
          badgeBg = "bg-teal-700"
          triangleBorder = "border-t-teal-700"
          iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
        } else if (poi.category === "culinary") {
          badgeBg = "bg-rose-700"
          triangleBorder = "border-t-rose-700"
          iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" x2="6" y1="1" y2="4"/><line x1="10" x2="10" y1="1" y2="4"/><line x1="14" x2="14" y1="1" y2="4"/></svg>`
        } else {
          badgeBg = "bg-indigo-700"
          triangleBorder = "border-t-indigo-700"
          iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="M15 13 9 7l4-4 6 6z"/></svg>`
        }

        el.innerHTML = `
          <div class="relative flex flex-col items-center origin-bottom transition-transform duration-200 group">
            <div class="relative flex items-center justify-center h-8 w-8 rounded-full ${badgeBg} border-2 border-white shadow-lg text-white transform transition group-hover:scale-125 ${
              isSelected ? "scale-125 ring-4 ring-primary/40 ring-offset-1" : ""
            }">
              ${iconSvg}
            </div>
            <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] ${triangleBorder} -mt-[1px]"></div>
          </div>
        `
      }

      el.addEventListener("click", (e) => {
        e.stopPropagation()
        onSelectPoi(poi)
      })

      const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
        .setLngLat(poi.coordinates)
        .addTo(map)

      markersRef.current.push(marker)
    })
  }, [pois, selectedPoi, isMapLoaded, onSelectPoi])

  // Render Royal Complex enclosed perimeter boundary
  useEffect(() => {
    const map = mapRef.current
    if (!map || !isMapLoaded) return

    const sourceId = "royal-complex-source"
    const fillLayerId = "royal-complex-fill"
    const strokeLayerId = "royal-complex-stroke"

    const existingSource = map.getSource(sourceId) as
      | maplibregl.GeoJSONSource
      | undefined
    if (existingSource) {
      existingSource.setData(ROYAL_COMPLEX_POLYGON)
      return
    }

    map.addSource(sourceId, {
      type: "geojson",
      data: ROYAL_COMPLEX_POLYGON
    })

    map.addLayer({
      id: fillLayerId,
      type: "fill",
      source: sourceId,
      paint: {
        "fill-color": "#b45309",
        "fill-opacity": 0.1
      }
    })

    map.addLayer({
      id: strokeLayerId,
      type: "line",
      source: sourceId,
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#b45309",
        "line-width": 2,
        "line-dasharray": [4, 2],
        "line-opacity": 0.8
      }
    })
  }, [isMapLoaded])

  // Update Route Polyline when activeTrail changes
  useEffect(() => {
    const map = mapRef.current
    if (!map || !isMapLoaded) return

    const sourceId = "trail-route-source"
    const layerId = "trail-route-layer"
    const casingLayerId = "trail-route-casing"

    if (map.getLayer(layerId)) map.removeLayer(layerId)
    if (map.getLayer(casingLayerId)) map.removeLayer(casingLayerId)
    if (map.getSource(sourceId)) map.removeSource(sourceId)

    if (activeTrail) {
      map.addSource(sourceId, {
        type: "geojson",
        data: activeTrail.routeGeoJson
      })

      // Route Casing (shadow / border)
      map.addLayer({
        id: casingLayerId,
        type: "line",
        source: sourceId,
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 7,
          "line-opacity": 0.9
        }
      })

      // Main colored line
      map.addLayer({
        id: layerId,
        type: "line",
        source: sourceId,
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": activeTrail.color,
          "line-width": 4.5,
          "line-opacity": 0.95
        }
      })

      // Fit bounds to trail coordinates
      const coords = activeTrail.routeGeoJson.geometry.coordinates
      if (coords.length > 0) {
        const bounds = new maplibregl.LngLatBounds()
        coords.forEach((c) => bounds.extend(c as [number, number]))
        const overlayOcclusion = getMapOverlayOcclusion()
        const headerOcclusion = getMapHeaderOcclusion()
        map.setPadding({ top: 0, right: 0, bottom: 0, left: 0 })
        map.fitBounds(bounds, {
          padding:
            overlayOcclusion > 0
              ? {
                  top: headerOcclusion + 16,
                  bottom: overlayOcclusion + 24,
                  left: 32,
                  right: 32
                }
              : { top: 80, bottom: 80, left: 60, right: 60 },
          maxZoom: 17,
          duration: 1000
        })
      }
    }
  }, [activeTrail, getMapHeaderOcclusion, getMapOverlayOcclusion, isMapLoaded])

  // Center camera on selected POI
  useEffect(() => {
    const map = mapRef.current
    if (!map || !selectedPoi) return

    map.flyTo({
      center: selectedPoi.coordinates,
      zoom: 17,
      pitch: 35,
      offset: [0, getSelectedPoiOffset()],
      essential: true,
      duration: 800
    })
  }, [getSelectedPoiOffset, selectedPoi])

  // Geolocation handler
  const handleToggleLocate = useCallback(() => {
    const map = mapRef.current
    if (!map) return

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.")
      return
    }

    if (isLocating) {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current)
        watchIdRef.current = null
      }
      userMarkerRef.current?.remove()
      userMarkerRef.current = null
      setIsLocating(false)
      setUserLocation(null)
      return
    }

    setIsLocating(true)

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.longitude,
          pos.coords.latitude
        ]
        setUserLocation(coords)

        if (!userMarkerRef.current) {
          const el = document.createElement("div")
          el.innerHTML = `
            <div class="relative flex items-center justify-center">
              <span class="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-blue-400 opacity-75"></span>
              <div class="h-4 w-4 rounded-full bg-blue-600 border-2 border-white shadow-md"></div>
            </div>
          `
          userMarkerRef.current = new maplibregl.Marker({ element: el })
            .setLngLat(coords)
            .addTo(map)
        } else {
          userMarkerRef.current.setLngLat(coords)
        }

        map.flyTo({
          center: coords,
          zoom: 17.5,
          duration: 600
        })
      },
      (err) => {
        console.warn("Geolocation watch error:", err)
        setIsLocating(false)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000
      }
    )
  }, [isLocating])

  const handleResetToSalim = useCallback(() => {
    const map = mapRef.current
    if (!map) return
    map.flyTo({
      center: SALIM_SILVER_LOCATION,
      zoom: 16.5,
      pitch: 28,
      offset: [0, getSelectedPoiOffset()],
      duration: 800
    })
    onSelectPoi(pois.find((p) => p.id === "salim-silver") || null)
  }, [getSelectedPoiOffset, onSelectPoi, pois])

  const toggleFullscreen = () => {
    const fullscreenTarget = getFullscreenTarget()
    if (!fullscreenTarget) return
    if (!document.fullscreenElement) {
      fullscreenTarget.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }

  return (
    <div
      ref={mapContainerRef}
      data-camera-state={cameraState}
      className="relative h-full min-h-[400px] w-full overflow-hidden bg-muted/20 sm:min-h-[450px]"
    >
      {/* MapLibre CSS */}
      <link rel="stylesheet" href="/styles/maplibre-gl.css" />

      {/* MapLibre DOM Target */}
      <div className="absolute inset-0 h-full w-full" />

      {/* Floating Control Buttons */}
      <div className="absolute top-24 right-2 z-10 flex flex-row gap-2 lg:top-4 lg:right-4 lg:flex-col">
        {/* Reset to Salim Silver */}
        <button
          onClick={handleResetToSalim}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-border bg-background/90 text-foreground shadow-md backdrop-blur transition hover:scale-105 hover:bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          title="Center on Salim Silver"
          aria-label="Center on Salim Silver"
        >
          <RotateCcw size={18} />
        </button>

        {/* Locate Me Button */}
        <button
          onClick={handleToggleLocate}
          className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border shadow-md backdrop-blur transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
            isLocating
              ? "animate-pulse border-blue-500 bg-blue-600 text-white"
              : "border-border bg-background/90 text-foreground hover:bg-background"
          }`}
          title={isLocating ? "Stop GPS" : "Locate Me"}
          aria-label={isLocating ? "Stop location tracking" : "Locate me"}
        >
          <LocateFixed size={18} />
        </button>

        {/* Fullscreen */}
        {canFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-border bg-background/90 text-foreground shadow-md backdrop-blur transition hover:scale-105 hover:bg-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Map"}
            aria-label={
              isFullscreen ? "Exit fullscreen map" : "Open fullscreen map"
            }
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        )}
      </div>

      {/* Map Legend Overlay in Bottom Left */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 rounded-xl border border-border/80 bg-background/90 px-3 py-1.5 text-[11px] shadow-sm backdrop-blur">
        <span className="flex items-center gap-1 font-medium text-amber-700 dark:text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-600" />
          Heritage
        </span>
        <span className="flex items-center gap-1 font-medium text-teal-700 dark:text-teal-400">
          <span className="h-2 w-2 rounded-full bg-teal-600" />
          Architecture
        </span>
        <span className="flex items-center gap-1 font-medium text-rose-700 dark:text-rose-400">
          <span className="h-2 w-2 rounded-full bg-rose-600" />
          Culinary
        </span>
        <span className="flex items-center gap-1 font-medium text-amber-600 dark:text-amber-500">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          Salim Base
        </span>
      </div>
    </div>
  )
}
