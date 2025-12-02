import type { Metadata } from "next"

import FeaturedCollections from "@/components/blocks/featured-collections"
import CollectionsHeader from "./components/CollectionsHeader"

import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Browse Salim Silver's curated collections of handcrafted rings, necklaces, bracelets, and more.",
  alternates: {
    canonical: `${BASE_URL}/collections`,
  },
  openGraph: {
    title: "Collections",
    description:
      "Browse Salim Silver's curated collections of handcrafted rings, necklaces, bracelets, and more.",
    url: `${BASE_URL}/collections`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Collections",
    description:
      "Browse Salim Silver's curated collections of handcrafted rings, necklaces, bracelets, and more.",
  },
}

export default function CollectionsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <CollectionsHeader />
        <FeaturedCollections />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Collections",
            description:
              "Browse Salim Silver's curated collections of handcrafted rings, necklaces, bracelets, and more.",
            url: `${BASE_URL}/collections`,
          }),
        }}
      />
    </div>
  )
}
