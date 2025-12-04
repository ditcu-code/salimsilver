import type { Collection, Jewelry } from "./types"

// Helper to generate placeholder photos for now
function getCollectionImages(collectionSlug: string, count: number): Jewelry[] {
  return Array.from({ length: count }, (_, i) => {
    const index = i + 1
    return {
      id: `${collectionSlug}-${index}`,
      src: `/images/${collectionSlug}-cover.png`, // Using cover as placeholder for all items for now
      width: 1200,
      height: 1200,
      alt: `${collectionSlug} item ${index}`,
      title: `${collectionSlug.charAt(0).toUpperCase() + collectionSlug.slice(1)} Item ${index}`,
      description: `Beautiful handcrafted ${collectionSlug} with intricate silver details.`,
      material: "Sterling Silver 925",
      dimensions: {
        width: 20,
        height: 15,
        units: "mm",
      },
      weightGrams: 5.2,
      priceUsd: 120,
    }
  })
}

// Collections data
const collections: Collection[] = [
  {
    id: "1",
    slug: "rings",
    title: "Rings",
    description: "Handcrafted silver rings",
    fullDescription:
      "Our collection of handcrafted silver rings features intricate designs inspired by traditional Javanese craftsmanship. Each piece is a unique statement of elegance.",
    coverImage: "/images/rings-cover.png",
    tags: ["Silver", "Rings", "Handcrafted"],
    featured: true,
    jewelryList: getCollectionImages("rings", 8),
  },
  {
    id: "2",
    slug: "necklaces",
    title: "Necklaces",
    description: "Elegant silver necklaces",
    fullDescription:
      "Discover our range of sterling silver necklaces, from delicate chains to bold statement pieces. Perfect for any occasion.",
    coverImage: "/images/necklaces-cover.png",
    tags: ["Silver", "Necklaces", "Pendants"],
    featured: true,
    jewelryList: getCollectionImages("necklaces", 8),
  },
  {
    id: "3",
    slug: "bracelets",
    title: "Bracelets",
    description: "Artisan silver bracelets",
    fullDescription:
      "Adorn your wrists with our artisan silver bracelets. Featuring woven patterns and gemstone accents.",
    coverImage: "/images/bracelets-cover.png",
    tags: ["Silver", "Bracelets", "Cuffs"],
    featured: true,
    jewelryList: getCollectionImages("bracelets", 8),
  },
]

// Export functions
export const getAllCollections = (): Collection[] => collections
export const getFeaturedCollections = (): Collection[] =>
  collections.filter((collection) => collection.featured)
export const getCollection = (slug: string): Collection | undefined =>
  collections.find((collection) => collection.slug === slug)
export const getAllTags = (): string[] =>
  Array.from(new Set(collections.flatMap((collection) => collection.tags)))
