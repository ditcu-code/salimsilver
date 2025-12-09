"use client"

import type { Collection } from "@/lib/types"
import { useEffect } from "react"
import CollectionGallery from "./components/CollectionGallery"
import CollectionHero from "./components/CollectionHero"
import CollectionInfo from "./components/CollectionInfo"
import OtherCollectionsSection from "./components/OtherCollectionsSection"

interface Props {
  collection: Collection
  featuredCollections: Collection[]
  initialJewelrySlug?: string
}

export function CollectionContent({ collection, featuredCollections, initialJewelrySlug }: Props) {
  useEffect(() => {
    console.log("Collection:", collection)
  }, [collection])

  return (
    <div className="min-h-screen">
      <CollectionHero
        title={collection.title}
        description={collection.description || ""}
        coverImage={collection.coverImage || ""}
      />
      <CollectionInfo
        description={collection.description || ""}
      />
      <CollectionGallery jewelryList={collection.jewelryList || []} />
      <OtherCollectionsSection collections={featuredCollections} />
    </div>
  )
} 