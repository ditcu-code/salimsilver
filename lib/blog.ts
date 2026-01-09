import { createClient } from "@/lib/supabase/server"
import type { Post } from "./types"

export async function getAllPosts(includeDrafts = false): Promise<Post[]> {
  const supabase = await createClient()

  let query = supabase.from("posts").select("*").order("published_at", { ascending: false })

  if (!includeDrafts) {
    query = query.eq("published", true)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching posts:", error)
    return []
  }

  return data as Post[]
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("posts")
    .select("*, author:users(*)")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching post by slug:", JSON.stringify(error, null, 2))
    return undefined
  }

  return data as Post
}

export async function getRecentPosts(limit = 3): Promise<Post[]> {
  const supabase = await createClient()

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

  return data as Post[]
}
