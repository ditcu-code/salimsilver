import type { Metadata } from "next"

import CatalogPageClient from "./page.client"

import { BASE_URL } from "@/lib/constants"

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Jewelry Catalog",
    description:
      "Shop Salim Silver's full catalog of handcrafted silver rings, necklaces, bracelets, and accessories.",
  },
}

export default function CatalogPage() {
  return (
    <>
      <CatalogPageClient />
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
