import { updateSession } from "@/lib/supabase/middleware"
import createMiddleware from "next-intl/middleware"
import { NextRequest } from "next/server"

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "id"],

  // Used when no locale matches
  defaultLocale: "en",

  // The default locale is not prefixed
  localePrefix: "as-needed",
})

const NON_LOCALIZED_PATHNAMES = [
  "/admin",
  "/links",
  "/gmaps-review",
  "/maintenance",
  "/login",
  "/register",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/auth",
]

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Detect locale
  const locale = pathname.match(/^\/(id|en)/)?.[1] || "en"

  // Clone request headers and set X-Locale
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("X-Locale", locale)

  // Create a new request with updated headers
  const localizedRequest = new NextRequest(request, {
    headers: requestHeaders,
  })

  // Skip next-intl for API routes and non-localized paths
  if (
    pathname.startsWith("/api") ||
    NON_LOCALIZED_PATHNAMES.some((path) => pathname.startsWith(path))
  ) {
    return await updateSession(localizedRequest)
  }

  const response = intlMiddleware(localizedRequest)
  return await updateSession(localizedRequest, response)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
