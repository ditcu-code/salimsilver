import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export async function POST(request: Request) {
  const { postId } = await request.json().catch(() => ({ postId: null }))

  if (typeof postId !== "string" || !UUID_RE.test(postId)) {
    return NextResponse.json({ message: "Invalid post id" }, { status: 400 })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { message: "Supabase service role is not configured" },
      { status: 500 },
    )
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  const { error } = await supabase.rpc("increment_post_views", {
    post_id: postId,
  })

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
