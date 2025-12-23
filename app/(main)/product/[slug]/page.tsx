import type { Metadata } from "next"
import { notFound } from "next/navigation"

import ProductDetail from "@/components/blocks/product-detail"
import { getJewelryBySlug } from "@/lib/collections"
import { BASE_URL } from "@/lib/constants"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getJewelryBySlug(slug)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  const title = `${product.title} - Salim Silver`
  const description = product.description || "Handcrafted silver jewelry from Salim Silver."
  const images =
    product.images && product.images.length > 0 ? [product.images[0].src] : ["/opengraph-image"]

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/product/${slug}`,
    },
    openGraph: {
      title,
      description,
      images,
      url: `${BASE_URL}/product/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getJewelryBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <ProductDetail product={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.images?.map((img) => img.src) || [],
            weight: product.weightGrams
              ? {
                  "@type": "QuantitativeValue",
                  value: product.weightGrams,
                  unitCode: "GRM",
                }
              : undefined,
            material: product.material,
            sku: product.slug,
            brand: {
              "@type": "Brand",
              name: "Salim Silver",
            },
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              url: `${BASE_URL}/product/${product.slug}`,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Collections",
                item: `${BASE_URL}/collections`,
              },
              ...(product.collectionSlug
                ? [
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: product.collectionSlug
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" "),
                      item: `${BASE_URL}/collections/${product.collectionSlug}`,
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: product.title,
                      item: `${BASE_URL}/product/${product.slug}`,
                    },
                  ]
                : [
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: product.title,
                      item: `${BASE_URL}/product/${product.slug}`,
                    },
                  ]),
            ],
          }),
        }}
      />
    </>
  )
}
