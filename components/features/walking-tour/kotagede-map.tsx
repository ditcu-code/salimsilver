"use client"

import dynamic from "next/dynamic"
import type { RefObject } from "react"
import { POI, WalkingTrail } from "@/lib/data/kotagede-guide"
import { Compass } from "lucide-react"

interface KotagedeMapProps {
  pois: POI[]
  selectedPoi: POI | null
  onSelectPoi: (poi: POI | null) => void
  activeTrail: WalkingTrail | null
  fullscreenTargetRef?: RefObject<HTMLElement | null>
  onMapStatusChange?: (status: "ready" | "unavailable") => void
}

const KotagedeMapInner = dynamic(() => import("./kotagede-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center bg-muted/30 sm:min-h-[450px]">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <Compass className="h-8 w-8 animate-spin text-primary" />
        <p className="px-6 text-center text-xs font-medium">
          Loading Kotagede Interactive Map...
        </p>
      </div>
    </div>
  )
})

export default function KotagedeMap(props: KotagedeMapProps) {
  return <KotagedeMapInner {...props} />
}
