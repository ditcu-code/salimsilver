"use client"

import FeaturedCollections from "@/components/featured-collections"
import CollectionsHeader from "./components/CollectionsHeader"

export default function CollectionsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <CollectionsHeader />
        <FeaturedCollections />
      </div>
    </div>
  )
}
