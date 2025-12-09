"use client"

import type { Collection } from "@/lib/types"

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


  return (
    <div className="min-h-screen">
      <CollectionHero
        title={collection.title}
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