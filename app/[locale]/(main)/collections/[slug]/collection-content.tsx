"use client"

import type { Collection } from "@/lib/types"

import CollectionGallery from "./components/CollectionGallery"
import CollectionHero from "./components/CollectionHero"
import OtherCollectionsSection from "./components/OtherCollectionsSection"

interface Props {
  collection: Collection
  featuredCollections: Collection[]
}

export function CollectionContent({ collection, featuredCollections }: Props) {
  return (
    <div className="min-h-screen">
      <CollectionHero
        title={collection.title}
        description={collection.description || ""}
        coverImage={collection.coverImage || ""}
      />
      <CollectionGallery jewelryList={collection.jewelryList || []} />
      <OtherCollectionsSection collections={featuredCollections} />
    </div>
  )
}
