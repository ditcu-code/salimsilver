import { getAllCollections, getJewelryBySlug } from "@/lib/collections"
import type { Metadata } from "next"
import { Suspense } from "react"

import CatalogPageClient from "./page.client"

import { BASE_URL } from "@/lib/constants"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ jewelry?: string }>
}): Promise<Metadata> {
  const { jewelry } = await searchParams

  if (jewelry) {
    const item = await getJewelryBySlug(jewelry)
    if (item) {
      const title = `${item.title} - Salim Silver`
      const description = item.description || "Handcrafted silver jewelry from Salim Silver."
      const images = (item.images && item.images.length > 0) ? [item.images[0].src] : []

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          images,
          url: `${BASE_URL}/catalog?jewelry=${jewelry}`,
          siteName: "Salim Silver",
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images,
        },
      }
    }
  }

  return {
    title: "Jewelry Catalog",
    description:
      "Shop Salim Silver's full catalog of handcrafted silver rings, necklaces, bracelets, and accessories.",
    alternates: {
      canonical: `${BASE_URL}/catalog`,
    },
    openGraph: {
      type: "website",
      title: "Jewelry Catalog",
      description:
        "Shop Salim Silver's full catalog of handcrafted silver rings, necklaces, bracelets, and accessories.",
      url: `${BASE_URL}/catalog`,
      siteName: "Salim Silver",
    },
    twitter: {
      card: "summary_large_image",
      title: "Jewelry Catalog",
      description:
        "Shop Salim Silver's full catalog of handcrafted silver rings, necklaces, bracelets, and accessories.",
    },
  }
}

export default function CatalogPage() {
  return (
    <>
      <Suspense fallback={<CatalogLoadingState />}>
        <CatalogContent />
      </Suspense>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Jewelry Catalog",
            description:
              "Shop Salim Silver's full catalog of handcrafted silver rings, necklaces, bracelets, and accessories.",
            url: `${BASE_URL}/catalog`,
          }),
        }}
      />
    </>
  )
}

async function CatalogContent() {
  const collections = await getAllCollections({ includeJewelry: true })
  return <CatalogPageClient collections={collections} />
}

function CatalogLoadingState() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-3">
          <div className="h-9 w-48 rounded-full bg-muted animate-pulse" />
          <div className="h-5 w-80 max-w-full rounded-full bg-muted/70 animate-pulse" />
          <p className="text-sm text-muted-foreground">Loading catalog...</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-10 w-28 rounded-full bg-muted animate-pulse" />
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-border/50 bg-card"
            >
              <div className="h-52 bg-muted animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-5 w-32 rounded bg-muted animate-pulse" />
                <div className="h-4 w-24 rounded bg-muted/80 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
