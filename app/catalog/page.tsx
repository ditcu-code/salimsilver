import type { Metadata } from "next"

import CatalogPageClient from "./page.client"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.salimsilver.com"

export const metadata: Metadata = {
  title: "Jewelry Catalog",
  description:
    "Shop Salim Silver's full catalog of handcrafted silver rings, necklaces, bracelets, and accessories.",
  alternates: {
    canonical: `${baseUrl}/catalog`,
  },
  openGraph: {
    title: "Jewelry Catalog",
    description:
      "Shop Salim Silver's full catalog of handcrafted silver rings, necklaces, bracelets, and accessories.",
    url: `${baseUrl}/catalog`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Jewelry Catalog",
    description:
      "Shop Salim Silver's full catalog of handcrafted silver rings, necklaces, bracelets, and accessories.",
  },
}

export default function CatalogPage() {
  return <CatalogPageClient />
}
