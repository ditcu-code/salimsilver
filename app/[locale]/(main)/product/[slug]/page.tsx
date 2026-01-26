import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import ProductDetail from "@/components/blocks/product-detail"
import { getJewelryBySlug } from "@/lib/collections"
import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale,
} from "@/lib/seo"
export const revalidate = 86400

interface Props {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const t = await getTranslations({ locale, namespace: "ProductPage.Metadata" })
  const product = await getJewelryBySlug(slug)

  if (!product) {
    return {
      title: t("notFound"),
    }
  }

  const title = `${product.title} - Salim Silver`
  const description = product.description || t("fallbackDescription")
  const images =
    product.images && product.images.length > 0
      ? [product.images[0].src]
      : ["/opengraph-image"]

  const canonicalUrl = constructCanonicalUrl(locale, `/product/${slug}`)

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternates(`/product/${slug}`),
    },
    openGraph: {
      title,
      description,
      images,
      url: canonicalUrl,
      type: "website",
      locale: getOpenGraphLocale(locale),
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
  const { slug, locale } = await params
  const t = await getTranslations("ProductPage.Breadcrumbs")
  const product = await getJewelryBySlug(slug)

  if (!product) {
    notFound()
  }

  const productUrl = constructCanonicalUrl(locale, `/product/${product.slug}`)
  const collectionsUrl = constructCanonicalUrl(locale, "/collections")

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
              url: productUrl,
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
                name: t("collections"),
                item: collectionsUrl,
              },
              ...(product.collectionSlug
                ? [
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: product.collectionSlug
                        .split("-")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(" "),
                      item: constructCanonicalUrl(
                        locale,
                        `/collections/${product.collectionSlug}`,
                      ),
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      name: product.title,
                      item: productUrl,
                    },
                  ]
                : [
                    {
                      "@type": "ListItem",
                      position: 2,
                      name: product.title,
                      item: productUrl,
                    },
                  ]),
            ],
          }),
        }}
      />
    </>
  )
}
