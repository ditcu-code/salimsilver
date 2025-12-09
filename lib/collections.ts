import { createClient } from "@/lib/supabase/server"
import type { Collection, Jewelry } from "./types"

// Revalidate data every hour (3600 seconds) or as needed.
// Since we have an admin panel now, we might want shorter revalidation or use on-demand revalidation.
// For now, let's stick to a reasonable time or 0 for dynamic if we want instant updates.
// Given it's a catalog, maybe 60 seconds is fine.
export const revalidate = 60

// --- Data Fetching Functions ---

export async function getAllCollections(): Promise<Collection[]> {
  const supabase = await createClient()

  // 1. Fetch collections
  const { data: collections, error } = await supabase
    .from("collections")
    .select("*")
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

  // 3. To support Catalog page, we SHOULD fetch jewelry for these collections (or let catalog page fetch them separately? 
  // The current CatalogPageClient expects `jewelryList` to be present on the collection)
  // We'll fetch all jewelry for these collections.
  const collectionIds = collections.map(c => c.id)
  
  // Fetch jewelry
  const { data: allJewelry, error: jewelryError } = await supabase
    .from("jewelry")
    .select("*")
    .in("collection_id", collectionIds)
    .order("created_at", { ascending: false })
    
  // Fetch images for jewelry (needed for gallery)
  // We can fetch ALL images for these jewelry items
  let jewelryImagesMap: Record<string, any[]> = {}
  
  if (allJewelry && allJewelry.length > 0) {
      const jewelryIds = allJewelry.map(j => j.id)
      const { data: jImages } = await supabase
        .from("jewelry_images")
        .select("*")
        .in("jewelry_id", jewelryIds)
        .order("display_order")
        
      if (jImages) {
          jImages.forEach((img: any) => {
              if (!jewelryImagesMap[img.jewelry_id]) {
                  jewelryImagesMap[img.jewelry_id] = []
              }
              jewelryImagesMap[img.jewelry_id].push(img)
          })
      }
  }

  return collections.map((col: any) => {
    // Map jewelry for this collection
    const colJewelry = (allJewelry || [])
        .filter((j: any) => j.collection_id === col.id)
        .map((item: any) => {
            const itemImages = jewelryImagesMap[item.id] || []
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
                images: itemImages.map((img: any) => ({
                    id: img.id,
                    jewelryId: item.id,
                    src: img.src,
                    displayOrder: img.display_order,
                })),
                coverImage: cover, 
            }
        })

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



