"use client"

import type { Collection } from "@/lib/types"
import { useEffect } from "react"
import CollectionGallery from "./components/CollectionGallery"
import CollectionHero from "./components/CollectionHero"
import CollectionInfo from "./components/CollectionInfo"
import OtherCollectionsSection from "./components/OtherCollectionsSection"

interface Props {
  collection: Collection
}

export function CollectionContent({ collection }: Props) {
  useEffect(() => {
    console.log("Collection:", collection)
  }, [collection])

  return (
    <div className="min-h-screen">
      <CollectionHero
        title={collection.title}
        description={collection.description}
        coverImage={collection.coverImage}
        tags={collection.tags}
      />
      <CollectionInfo
        fullDescription={collection.fullDescription}
        description={collection.description}
      />
      <CollectionGallery photos={collection.photos} />
      <OtherCollectionsSection />
    </div>
  )
} 