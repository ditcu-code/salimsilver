import { routing } from "@/i18n/navigation"
import { BASE_URL } from "@/lib/constants"

/**
 * Constructs a canonical URL with the correct locale prefix.
 * @param locale The current locale (e.g., 'en', 'id', 'nl')
 * @param path The path to the page (e.g., '/blog', '/about'). Should start with / if not empty.
 * @returns The full canonical URL.
 */
export function constructCanonicalUrl(
  locale: string,
  path: string = ""
): string {
  const isDefaultLocale = locale === routing.defaultLocale
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
  // But if it's non-default locale (e.g. /id or /nl), we want the locale root.

  // HOWEVER, valid URLs are:
  // https://salimsilver.com (en home)
  // https://salimsilver.com/id (id home)
  // https://salimsilver.com/nl (nl home)
  // https://salimsilver.com/catalog (en catalog)
  // https://salimsilver.com/id/catalog (id catalog)
  // https://salimsilver.com/nl/catalog (nl catalog)

  return `${BASE_URL}${localePath}${normalizedPath}`
}

type Locale = (typeof routing.locales)[number]

const LOCALE_MAP = {
  en: "en_US",
  id: "id_ID",
  nl: "nl_NL"
} satisfies Record<Locale, string>

/**
 * Returns the Open Graph locale string (e.g., 'en_US', 'id_ID', 'nl_NL') for a given locale code.
 * Defaults to 'en_US' if not found.
 * @param locale The short locale code (e.g., 'en', 'id', 'nl')
 * @returns The full Open Graph locale string.
 */
export function getOpenGraphLocale(locale: string): string {
  return LOCALE_MAP[locale as Locale] || LOCALE_MAP[routing.defaultLocale]
}

/**
 * Returns the alternate language URLs for a given path.
 * Used for the `alternates.languages` metadata property to generate hreflang tags.
 * @param path The path to the page (e.g., '/about', '/product/slug').
 */
export function getAlternates(path: string = "") {
  const alternates = routing.locales.reduce<Record<string, string>>(
    (languages, locale) => {
      languages[locale] = constructCanonicalUrl(locale, path)
      return languages
    },
    {}
  )

  alternates["x-default"] = constructCanonicalUrl(routing.defaultLocale, path)

  return alternates
}
