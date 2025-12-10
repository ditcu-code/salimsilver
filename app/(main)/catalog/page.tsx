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

export default async function CatalogPage() {
  const collections = await getAllCollections()
  return (
    <>
      <Suspense>
        <CatalogPageClient collections={collections} />
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
