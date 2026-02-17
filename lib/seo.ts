import { BASE_URL } from "@/lib/constants"

/**
 * Constructs a canonical URL with the correct locale prefix.
 * @param locale The current locale (e.g., 'en', 'id')
 * @param path The path to the page (e.g., '/blog', '/about'). Should start with / if not empty.
 * @returns The full canonical URL.
 */
export function constructCanonicalUrl(
  locale: string,
  path: string = "",
): string {
  const isDefaultLocale = locale === "en"
  const localePath = isDefaultLocale ? "" : `/${locale}`

  // Ensure path starts with / if it's not empty
  let normalizedPath = path
  if (path.length > 0 && !path.startsWith("/")) {
    normalizedPath = `/${path}`
  }

  // Remove trailing slash from path if it exists and isn't just "/"
  if (normalizedPath.length > 1 && normalizedPath.endsWith("/")) {
    normalizedPath = normalizedPath.slice(0, -1)
  }

  // If path is just "/" or empty, we don't need to append anything if it's default locale
  // But if it's non-default locale (e.g. /id), we want /id

  // HOWEVER, valid URLs are:
  // https://salimsilver.com (en home)
  // https://salimsilver.com/id (id home)
  // https://salimsilver.com/catalog (en catalog)
  // https://salimsilver.com/id/catalog (id catalog)

  return `${BASE_URL}${localePath}${normalizedPath}`
}

const LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  id: "id_ID",
}

/**
 * Returns the Open Graph locale string (e.g., 'en_US', 'id_ID') for a given locale code.
 * Defaults to 'en_US' if not found.
 * @param locale The short locale code (e.g., 'en', 'id')
 * @returns The full Open Graph locale string.
 */
export function getOpenGraphLocale(locale: string): string {
  return LOCALE_MAP[locale] || "en_US"
}

/**
 * Returns the alternate language URLs for a given path.
 * Used for the `alternates.languages` metadata property to generate hreflang tags.
 * @param path The path to the page (e.g., '/about', '/product/slug').
 */
export function getAlternates(path: string = "") {
  return {
    en: constructCanonicalUrl("en", path),
    id: constructCanonicalUrl("id", path),
    "x-default": constructCanonicalUrl("en", path),
  }
}
