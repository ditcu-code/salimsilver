import { unstable_cache } from "next/cache"

import { createCacheClient, createClient } from "@/lib/supabase/server"
import type { Collection, Jewelry } from "./types"

const COLLECTIONS_REVALIDATE_SECONDS = 300

type CollectionFetchOptions = {
  includeJewelry?: boolean
}

// --- Data Fetching Functions ---

export async function getAllCollections(options: CollectionFetchOptions = {}): Promise<Collection[]> {
  const includeJewelry = options.includeJewelry ?? false
  return includeJewelry ? cachedCollectionsWithJewelry() : cachedCollections()
}

const cachedCollections = unstable_cache(
  async () => buildCollections(false),
  ["collections-base"],
  { revalidate: COLLECTIONS_REVALIDATE_SECONDS },
)

const cachedCollectionsWithJewelry = unstable_cache(
  async () => buildCollections(true),
  ["collections-with-jewelry"],
  { revalidate: COLLECTIONS_REVALIDATE_SECONDS },
)

async function buildCollections(includeJewelry: boolean): Promise<Collection[]> {
  const supabase = createCacheClient()

  // 1. Fetch collections
  const { data: collections, error } = await supabase
    .from("collections")
    .select("*")
    .neq("slug", "unassigned") // Hide unassigned collection
    .order("title")

  if (error) {
    console.error("Error fetching collections:", error)
    return []
  }

  if (!collections || collections.length === 0) return []

  // 2. Fetch cover images manually
  const coverImageIds = collections.map(c => c.cover_image_id).filter(Boolean)
  let coverImagesMap: Record<string, string> = {}
  
  if (coverImageIds.length > 0) {
    const { data: images } = await supabase
      .from("jewelry_images")
      .select("id, src")
      .in("id", coverImageIds)
    
    if (images) {
      images.forEach((img: any) => {
        coverImagesMap[img.id] = img.src
      })
    }
  }

  const collectionIds = collections.map(c => c.id)

  let jewelryByCollection: Record<string, Jewelry[]> = {}

  // Fetch just the cover image per jewelry item to reduce payload size for catalog loads
  if (includeJewelry && collectionIds.length > 0) {
    const { data: allJewelry, error: jewelryError } = await supabase
      .from("jewelry")
      .select(`
        id,
        collection_id,
        slug,
        title,
        description,
        material,
        material_purity,
        weight_grams,
        crafting_time_hours,
        production_year,
        status,
        variants,
        jewelry_images (
          id,
          jewelry_id,
          src,
          display_order
        )
      `)
      .in("collection_id", collectionIds)
      .order("created_at", { ascending: false })
      .order("display_order", { foreignTable: "jewelry_images", ascending: true })
      .limit(1, { foreignTable: "jewelry_images" })
    
    if (jewelryError) {
      console.error("Error fetching jewelry items:", jewelryError)
    }

    if (allJewelry && allJewelry.length > 0) {
      jewelryByCollection = allJewelry.reduce<Record<string, Jewelry[]>>((acc, item: any) => {
        const images = (item.jewelry_images || []).sort(
          (a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0),
        )

        const mapped: Jewelry = {
          id: item.id,
          collectionId: item.collection_id,
          slug: item.slug,
          title: item.title,
          description: item.description,
          material: item.material,
          materialPurity: item.material_purity,
          weightGrams: item.weight_grams,
          craftingTimeHours: item.crafting_time_hours,
          productionYear: item.production_year,
          status: item.status,
          variants: item.variants,
          images: images.map((img: any) => ({
            id: img.id,
            jewelryId: item.id,
            src: img.src,
            displayOrder: img.display_order,
          })),
          coverImage: images[0]?.src || "",
        }

        if (!acc[item.collection_id]) acc[item.collection_id] = []
        acc[item.collection_id].push(mapped)
        return acc
      }, {})
    }
  }

  return collections.map((col: any) => {
    const colJewelry = includeJewelry ? jewelryByCollection[col.id] || [] : undefined

    return {
      id: col.id,
      slug: col.slug,
      title: col.title,
      description: col.description,
      featured: col.featured,
      coverImageId: col.cover_image_id,
      coverImage: coverImagesMap[col.cover_image_id] || "",
      jewelryList: colJewelry,
    }
  })
}

export async function getFeaturedCollections(): Promise<Collection[]> {
  const supabase = await createClient()
  const { data: collections, error } = await supabase
    .from("collections")
    .select("*")
    .eq("featured", true)
    .neq("slug", "unassigned") // Hide unassigned from featured
    
  if (error) {
    console.error("Error fetching featured collections:", error)
    return []
  }
  
  if (!collections || collections.length === 0) return []

  const coverImageIds = collections.map(c => c.cover_image_id).filter(Boolean)
  let coverImagesMap: Record<string, string> = {}
  
  if (coverImageIds.length > 0) {
    const { data: images } = await supabase
      .from("jewelry_images")
      .select("id, src")
      .in("id", coverImageIds)
    
    if (images) {
      images.forEach((img: any) => {
        coverImagesMap[img.id] = img.src
      })
    }
  }

  return collections.map((col: any) => ({
    id: col.id,
    slug: col.slug,
    title: col.title,
    description: col.description,
    featured: col.featured,
    coverImageId: col.cover_image_id,
    coverImage: coverImagesMap[col.cover_image_id] || "",
  }))
}

export async function getCollection(slug: string): Promise<Collection | undefined> {
  const supabase = await createClient()

  if (slug === 'unassigned') return undefined; // Explicitly hide

  const { data: collection, error } = await supabase
    .from("collections")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !collection) {
    console.error("Error fetching collection:", error)
    return undefined
  }

  // Fetch cover image
  let coverImage = ""
  if (collection.cover_image_id) {
      const { data: img } = await supabase.from("jewelry_images").select("src").eq("id", collection.cover_image_id).single()
      if (img) coverImage = img.src
  }

  // Fetch jewelry items
  const { data: jewelryItems, error: jewelryError } = await supabase
    .from("jewelry")
    .select("*")
    .eq("collection_id", collection.id)
    .order("created_at", { ascending: false })

  if (jewelryError) {
    console.error("Error fetching jewelry items:", jewelryError)
  }
  
  let mappedJewelry: Jewelry[] = []
  
  if (jewelryItems && jewelryItems.length > 0) {
      const jewelryIds = jewelryItems.map((j: any) => j.id)
      const { data: jImages } = await supabase
        .from("jewelry_images")
        .select("*")
        .in("jewelry_id", jewelryIds)
        
      let jewelryImagesMap: Record<string, any[]> = {}
      if (jImages) {
          jImages.forEach((img: any) => {
              if (!jewelryImagesMap[img.jewelry_id]) jewelryImagesMap[img.jewelry_id] = []
              jewelryImagesMap[img.jewelry_id].push(img)
          })
      }
      
      mappedJewelry = jewelryItems.map((item: any) => {
        const itemImages = (jewelryImagesMap[item.id] || []).sort((a: any, b: any) => a.display_order - b.display_order)
        const itemCover = itemImages[0]?.src || ""
    
        return {
          id: item.id,
          collectionId: item.collection_id,
          slug: item.slug,
          title: item.title,
          description: item.description,
          material: item.material,
          materialPurity: item.material_purity,
          weightGrams: item.weight_grams,
          craftingTimeHours: item.crafting_time_hours,
          productionYear: item.production_year,
          status: item.status,
          variants: item.variants,
          images: itemImages.map((img: any) => ({
            id: img.id,
            jewelryId: item.id,
            src: img.src,
            displayOrder: img.display_order,
          })),
          coverImage: itemCover, 
        }
      })
  }

  return {
    id: collection.id,
    slug: collection.slug,
    title: collection.title,
    description: collection.description,
    featured: collection.featured,
    coverImageId: collection.cover_image_id,
    coverImage: coverImage, 
    jewelryList: mappedJewelry,
  }
}

export async function getJewelryBySlug(slug: string): Promise<Jewelry | undefined> {
  const supabase = await createClient()
  const { data: item, error } = await supabase
    .from("jewelry")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error || !item) {
    console.error("Error fetching jewelry by slug:", error)
    return undefined
  }

  // Fetch images
  const { data: images } = await supabase
    .from("jewelry_images")
    .select("*")
    .eq("jewelry_id", item.id)
    .order("display_order")

  const itemImages = (images || []).map((img: any) => ({
    id: img.id,
    jewelryId: item.id,
    src: img.src,
    displayOrder: img.display_order,
  }))

  const cover = itemImages[0]?.src || ""

  return {
    id: item.id,
    collectionId: item.collection_id,
    slug: item.slug,
    title: item.title,
    description: item.description,
    material: item.material,
    materialPurity: item.material_purity,
    weightGrams: item.weight_grams,
    craftingTimeHours: item.crafting_time_hours,
    productionYear: item.production_year,
    status: item.status,
    variants: item.variants,
    images: itemImages,
    coverImage: cover,
  }
}

