"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const commentSchema = z.object({
  postId: z.string().uuid(),
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment is too long"),
  guestName: z.string().optional(),
  guestEmail: z.string().email("Invalid email").optional().or(z.literal("")),
})

export type CommentFormState = {
  success?: boolean
  message?: string
  errors?: {
    content?: string[]
    guestName?: string[]
    guestEmail?: string[]
  }
}

export async function addComment(
  prevState: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const supabase = await createClient()

  const validatedFields = commentSchema.safeParse({
    postId: formData.get("postId"),
    content: formData.get("content"),
    guestName: formData.get("guestName"),
    guestEmail: formData.get("guestEmail"),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    }
  }

  const { postId, content, guestName, guestEmail } = validatedFields.data

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const commentData = {
    post_id: postId,
    content,
    user_id: user?.id,
    guest_name: user ? user.user_metadata.full_name : guestName,
    guest_email: user ? user.email : guestEmail || null,
  }

  const { error } = await supabase.from("blog_comments").insert(commentData)

  if (error) {
    console.error("Error adding comment:", error)
    return {
      success: false,
      message: "Failed to add comment. Please try again.",
    }
  }

  revalidatePath(`/blog/[slug]`, "page") // We'll need to handle the dynamic path correctly or just revalidate the specific path if passed

  return {
    success: true,
    message: "Comment added successfully!",
  }
}

export async function getComments(postId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blog_comments")
    .select("*, user:users(*)")
    .eq("post_id", postId)
    .eq("is_approved", true)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching comments:", error)
    return []
  }

  return data
}
