"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createPost(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const cover_image_url = formData.get("cover_image_url") as string
  const meta_title = formData.get("meta_title") as string
  const meta_description = formData.get("meta_description") as string
  const published = formData.get("published") === "true"
  const featured = formData.get("featured") === "true"
  // Parse tags from JSON string, default to empty array
  const tags = JSON.parse((formData.get("tags") as string) || "[]")

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      slug,
      content,
      excerpt,
      cover_image_url,
      meta_title,
      meta_description,
      published,
      published_at: published ? new Date().toISOString() : null,
      tags,
      featured,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating post:", error)
    throw new Error("Failed to create post")
  }

  revalidatePath("/blog")
  revalidatePath("/admin/blog")
  revalidatePath("/sitemap.xml")
  redirect("/admin/blog")
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const cover_image_url = formData.get("cover_image_url") as string
  const meta_title = formData.get("meta_title") as string
  const meta_description = formData.get("meta_description") as string
  const published = formData.get("published") === "true"
  const featured = formData.get("featured") === "true"
  const tags = JSON.parse((formData.get("tags") as string) || "[]")

  // Check if previously published to avoid overwriting published_at on minor edits
  // efficiently, we can just use a CASE in SQL or check here. 
  // For simplicity, we update published_at only if it wasn't published and now is.
  // But we don't have the old state here easily without fetching.
  // Let's just update `published_at` to NOW if it's being published.
  // Actually, standard behavior is: if publishing for the first time, set date.
  // Supabase update:
  const updateData: any = {
      title,
      slug,
      content,
      excerpt,
      cover_image_url,
      meta_title,
      meta_description,
      published,
      featured,
      tags,
      updated_at: new Date().toISOString(),
  }

  // If publishing, ensure published_at is set. 
  // We can't easily conditionally set it based on OLD state in a single update without fetching.
  // But we can check if `published_at` is null in the logic? 
  // Let's just fetch it first if we want to be precise, or just update it if `published` is true and we want to refresh date?
  // Let's assume user manages date via "published" toggle.
  // If published is true, we ensure published_at is set (if it was null? or always update?).
  // Let's just set it if it's true. Ideally we only set it if it was null.
  // For now, let's just not touch published_at unless we want to reset it.
  if (published) {
      // Logic: If we rely on triggers or just set it manually. 
      // Let's set it manually if it's missing (complex).
      // Simpler: Just update `updated_at`. Let published_at stay unless we specifically want to 'publish now'.
      // We will handle published_at in the Frontend/Formdata if we want to change it.
      // Or we can just leave it alone here. 
      // Let's fetch the existing post to check.
      const { data: existing } = await supabase.from("posts").select("published, published_at").eq("id", id).single()
      if (existing && !existing.published && published) {
         updateData.published_at = new Date().toISOString()
      }
  }

  const { error } = await supabase
    .from("posts")
    .update(updateData)
    .eq("id", id)

  if (error) {
    console.error("Error updating post:", error)
    throw new Error("Failed to update post")
  }

  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)
  revalidatePath("/admin/blog")
  revalidatePath("/sitemap.xml")
  redirect("/admin/blog")
}

export async function deletePost(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting post:", error)
    throw new Error("Failed to delete post")
  }

  revalidatePath("/blog")
  revalidatePath("/admin/blog")
  revalidatePath("/sitemap.xml")
}
