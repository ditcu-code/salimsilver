import { BASE_URL } from "@/lib/constants"

/**
 * Constructs a canonical URL with the correct locale prefix.
 * @param locale The current locale (e.g., 'en', 'id')
 * @param path The path to the page (e.g., '/blog', '/about'). Should start with / if not empty.
 * @returns The full canonical URL.
 */
export function constructCanonicalUrl(locale: string, path: string = ""): string {
  const isDefaultLocale = locale === "en"
  const localePath = isDefaultLocale ? "" : `/${locale}`
  // Ensure path starts with / if it's not empty and doesn't have it
  const normalizedPath = path.length > 0 && !path.startsWith("/") ? `/${path}` : path

  // Remove trailing slash from path if present to avoid double slashes or inconsistency,
  // but we usually want no trailing slash for canonicals unless it's root.
  // However, the project seems to use no trailing slash for subpages.

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
