import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest, response?: NextResponse) {
  let supabaseResponse =
    response ??
    NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // 1. Get the user from Supabase to refresh the auth token
  // 2. Protect /admin routes

  const path = request.nextUrl.pathname
  // Check for admin path (localized or not)
  // Matches /admin, /en/admin, /id/admin
  const isAdminPath = path === "/admin" || path.match(/^\/(en|id)\/admin/)
  const isLoginPath = path === "/login" || path.match(/^\/(en|id)\/login/)

  // Optimization: Check for session cookie before calling Supabase
  // The cookie name format is `sb-<project_ref>-auth-token`
  // We extract the project ref from the Supabase URL
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(
    /https?:\/\/([^.]+)\.supabase\.co/
  )?.[1]
  const cookieName = `sb-${projectRef}-auth-token`
  const hasSessionCookie = projectRef && request.cookies.has(cookieName)

  let user = null

  // Only call getUser() if:
  // 1. We have a session cookie (potential user)
  // 2. We are on a protected route (need to verify even if no cookie, to trigger redirect)
  // 3. We are on the login page (to redirect if already logged in)
  if (hasSessionCookie || isAdminPath || isLoginPath) {
    const {
      data: { user: supabaseUser },
    } = await supabase.auth.getUser()
    user = supabaseUser
  }

  // If accessing admin routes and not logged in, redirect to login
  if (isAdminPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  // If accessing login page and already logged in, redirect to admin
  if (isLoginPath && user) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
