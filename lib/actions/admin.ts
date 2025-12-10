'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// --- Jewelry Actions ---

export async function createJewelry(formData: FormData) {
  const supabase = await createClient()
  
  const rawData = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    collection_id: formData.get('collection_id'),
    material: formData.get('material'),
    material_purity: formData.get('material_purity'),
    weight_grams: formData.get('weight_grams') ? parseFloat(formData.get('weight_grams') as string) : null,
    status: formData.get('status'),
  }

  const { data, error } = await supabase
    .from('jewelry')
    .insert(rawData)
    .select('id')
    .single()

  if (error) {
    throw new Error('Failed to create jewelry: ' + error.message)
  }

  revalidatePath('/admin/jewelry')
  return { success: true, id: data.id }
}

export async function updateJewelry(id: string, formData: FormData) {
    const supabase = await createClient()
    
    const rawData = {
      title: formData.get('title'), // string
      slug: formData.get('slug'),
      description: formData.get('description'),
      collection_id: formData.get('collection_id'),
      material: formData.get('material'),
      material_purity: formData.get('material_purity'),
      weight_grams: formData.get('weight_grams') ? parseFloat(formData.get('weight_grams') as string) : null,
      status: formData.get('status'),
    }
  
    const { error } = await supabase
      .from('jewelry')
      .update(rawData)
      .eq('id', id)
  
    if (error) {
      throw new Error('Failed to update jewelry: ' + error.message)
    }
  
    revalidatePath('/admin/jewelry')
    revalidatePath(`/admin/jewelry/${id}`)
    return { success: true }
}

export async function deleteJewelry(id: string) {
    const supabase = await createClient()

    // Delete images from storage first? 
    // Ideally we should used DB triggers or manual cleanup, but for now relies on cascade for DB records.
    // Storage cleanup is separate. We'll skip complex storage cleanup for this iteration unless requested.

    const { error } = await supabase
        .from('jewelry')
        .delete()
        .eq('id', id)
    
    if (error) {
        throw new Error('Failed to delete jewelry')
    }

    revalidatePath('/admin/jewelry')
}

// --- Image Actions ---
// We'll handle image uploads via client-side directly to storage for better UX (progress bars),
// but we need an action to save the DB record for the image.

export async function saveJewelryImage(jewelryId: string, imagePath: string) {
    const supabase = await createClient()

    // Get current max display order
    const { data: maxOrder } = await supabase
        .from('jewelry_images')
        .select('display_order')
        .eq('jewelry_id', jewelryId)
        .order('display_order', { ascending: false })
        .limit(1)
        .single()
    
    const nextOrder = (maxOrder?.display_order ?? -1) + 1

    // Assuming we have a public URL or just storing the path. 
    // The schema has `src`. Let's store the public URL.
    const { data: { publicUrl } } = supabase.storage.from('catalog').getPublicUrl(imagePath)

    const { error } = await supabase
        .from('jewelry_images')
        .insert({
            jewelry_id: jewelryId,
            src: publicUrl,
            display_order: nextOrder
        })
    
    if (error) throw error
    revalidatePath(`/admin/jewelry/${jewelryId}`)
}

export async function deleteJewelryImage(imageId: string) {
    const supabase = await createClient()

    // 1. Get the image src to find the storage path
    const { data: image, error: fetchError } = await supabase
        .from('jewelry_images')
        .select('src')
        .eq('id', imageId)
        .single()

    if (fetchError) {
        throw new Error('Failed to find image to delete')
    }

    if (image?.src) {
        // Extract path from public URL
        // Format: .../storage/v1/object/public/catalog/jewelryId/timestamp.webp
        // or relative path if stored not as full URL (schema says src is publicUrl from saveJewelryImage)
        
        // We know it's in 'catalog' bucket. 
        // If src is a full URL, we need to extract the part after 'catalog/'
        const parts = image.src.split('/catalog/')
        if (parts.length === 2) {
            const storagePath = parts[1]
            const { error: storageError } = await supabase.storage
                .from('catalog')
                .remove([storagePath])
            
            if (storageError) {
                 console.error('Failed to delete file from storage:', storageError)
                 // decided to continue to delete DB record even if storage fails, 
                 // to avoid "zombie" records in UI.
            }
        }
    }

    const { error } = await supabase.from('jewelry_images').delete().eq('id', imageId)
    if (error) throw error
    revalidatePath('/admin/jewelry')
}

// --- Collection Actions ---

export async function createCollection(formData: FormData) {
    const supabase = await createClient()

    const rawData = {
        title: formData.get('title'),
        slug: formData.get('slug'),
        description: formData.get('description'),
        featured: formData.get('featured') === 'on',
        // cover_image_id handled separately or assumes existing image ID?
        // Ideally we select from existing images or upload new.
        // For simplicity, let's say we just create the record first.
    }

    const { data, error } = await supabase
        .from('collections')
        .insert(rawData)
        .select('id')
        .single()

    if (error) {
        throw new Error('Failed to create collection: ' + error.message)
    }

    revalidatePath('/admin/collections')
    return { success: true, id: data.id }
}

export async function updateCollection(id: string, formData: FormData) {
    const supabase = await createClient()

    const rawData = {
        title: formData.get('title'),
        slug: formData.get('slug'),
        description: formData.get('description'),
        featured: formData.get('featured') === 'on',
    }

    const { error } = await supabase
        .from('collections')
        .update(rawData)
        .eq('id', id)

    if (error) {
        throw new Error('Failed to update collection: ' + error.message)
    }

    revalidatePath('/admin/collections')
    revalidatePath(`/admin/collections/${id}`)
    return { success: true }
}

export async function deleteCollection(id: string) {
    const supabase = await createClient()

    // 1. Ensure "Unassigned" collection exists
    let { data: unassignedCollection, error: fetchError } = await supabase
        .from('collections')
        .select('id')
        .eq('slug', 'unassigned')
        .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "Row not found"
        throw new Error('Failed to check for unassigned collection')
    }

    if (!unassignedCollection) {
        // Create if it doesn't exist
        const { data: newCollection, error: createError } = await supabase
            .from('collections')
            .insert({
                title: 'Unassigned',
                slug: 'unassigned',
                description: 'Items from deleted collections',
                featured: false
            })
            .select('id')
            .single()
        
        if (createError) {
            throw new Error('Failed to create unassigned collection: ' + createError.message)
        }
        unassignedCollection = newCollection
    }

    // 2. Move jewelry to "Unassigned" collection
    if (unassignedCollection) {
        // Prevent moving items if we are deleting the 'unassigned' collection itself (anti-pattern but safe guard)
        if (unassignedCollection.id !== id) {
            const { error: updateError } = await supabase
                .from('jewelry')
                .update({ collection_id: unassignedCollection.id })
                .eq('collection_id', id)
            
            if (updateError) {
                 throw new Error('Failed to move jewelry to unassigned collection')
            }
        }
    }

    // 3. Delete the collection
    const { error } = await supabase.from('collections').delete().eq('id', id)
    if (error) throw new Error('Failed to delete collection')
    
    revalidatePath('/admin/collections')
    revalidatePath('/admin/jewelry') // Refresh jewelry list as collection names changed
}

export async function setCollectionCoverImage(collectionId: string, imageId: string) {
    const supabase = await createClient()
    const { error } = await supabase
        .from('collections')
        .update({ cover_image_id: imageId })
        .eq('id', collectionId)
    
    if (error) throw error
    revalidatePath(`/admin/collections/${collectionId}`)
}
