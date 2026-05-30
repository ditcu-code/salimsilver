import { createClient } from "@/lib/supabase/server"
import type { Post } from "./types"

/**
 * Dynamically overrides standard fields with localized versions if they exist
 * and the requested locale is not Indonesian (id).
 */
export function localizePost(post: Post, locale?: string): Post {
  if (locale === "id") return post

  const title = post.title_en || post.title
  const excerpt = post.excerpt_en || post.excerpt
  const content = post.content_en || post.content
  const meta_title = post.meta_title_en || post.meta_title || title
  const meta_description = post.meta_description_en || post.meta_description || excerpt

  return {
    ...post,
    title,
    excerpt: excerpt || undefined,
    content: content || undefined,
    meta_title: meta_title || undefined,
    meta_description: meta_description || undefined
  }
}

export async function getAllPosts(
  localeOrIncludeDrafts?: string | boolean,
  includeDrafts = false
): Promise<Post[]> {
  const supabase = await createClient()
  let locale: string | undefined = undefined
  let drafts = includeDrafts

  if (typeof localeOrIncludeDrafts === "boolean") {
    drafts = localeOrIncludeDrafts
  } else {
    locale = localeOrIncludeDrafts
  }

  let query = supabase
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false })

  if (!drafts) {
    query = query.eq("published", true)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  const posts = data as Post[]
  return posts.map((post) => localizePost(post, locale))
}

export async function getPostBySlug(
  slug: string,
  locale?: string
): Promise<Post | undefined> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("posts")
    .select("*, author:users(*)")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error(
      "Error fetching post by slug:",
      JSON.stringify(error, null, 2)
    )
    return undefined
  }

  return localizePost(data as Post, locale)
}

export async function getRecentPosts(
  limitOrLocale?: number | string,
  locale?: string
): Promise<Post[]> {
  const supabase = await createClient()
  let limit = 3
  let activeLocale = locale

  if (typeof limitOrLocale === "string") {
    activeLocale = limitOrLocale
  } else if (typeof limitOrLocale === "number") {
    limit = limitOrLocale
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching recent posts:", error)
    return []
  }

  const posts = data as Post[]
  return posts.map((post) => localizePost(post, activeLocale))
}
