import { PostForm } from "@/components/admin/post-form"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

interface AdminEditPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function AdminEditPostPage({ params }: AdminEditPostPageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: post } = await supabase.from("posts").select("*").eq("id", id).single()

  if (!post) {
    notFound()
  }

  return <PostForm post={post} isEditing />
}
