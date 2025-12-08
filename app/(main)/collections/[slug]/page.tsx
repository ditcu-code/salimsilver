import { getCollection, getFeaturedCollections } from "@/lib/collections"
import { notFound } from "next/navigation"
import { CollectionContent } from "./collection-content"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function CollectionPage({ params }: Props) {
  // Ensure params is properly awaited
  const { slug } = await params
  const collection = await getCollection(slug)
  const featuredCollections = await getFeaturedCollections()

  if (!collection) {
    notFound()
  }

  return <CollectionContent collection={collection} featuredCollections={featuredCollections} />
}
