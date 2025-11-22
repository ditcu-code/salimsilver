import type { Collection, Photo } from "./types"

// Common metadata for photos
const defaultMetadata = {
  camera: "Sony Alpha A7 IV",
  lens: "24-70mm f/2.8",
  aperture: "f/8.0",
  shutterSpeed: "1/250",
  iso: "100",
  focalLength: "35mm",
  takenAt: new Date().toISOString().split("T")[0],
} as const

// Helper to generate placeholder photos for now
function getCollectionImages(collectionSlug: string, count: number): Photo[] {
  return Array.from({ length: count }, (_, i) => {
    const index = i + 1
    return {
      id: `${collectionSlug}-${index}`,
      src: `/images/${collectionSlug}-cover.png`, // Using cover as placeholder for all items for now
      width: 1200,
      height: 1200,
      alt: `${collectionSlug} item ${index}`,
      metadata: defaultMetadata,
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
    photos: getCollectionImages("rings", 8),
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
    photos: getCollectionImages("necklaces", 8),
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
    photos: getCollectionImages("bracelets", 8),
  },
]

// Export functions
export const getAllCollections = (): Collection[] => collections
export const getFeaturedCollections = (): Collection[] => collections.filter(collection => collection.featured)
export const getCollection = (slug: string): Collection | undefined => collections.find(collection => collection.slug === slug)
export const getAllTags = (): string[] => Array.from(new Set(collections.flatMap(collection => collection.tags)))
