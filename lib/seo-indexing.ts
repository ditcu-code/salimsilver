import {
  constructCanonicalUrl,
  getAlternates,
  getOpenGraphLocale,
  type Locale
} from "@/lib/seo"

export type SeoRouteFamily = "static" | "blog" | "product" | "collection"

const INDEXABLE_LOCALES = {
  static: ["en", "id", "nl"],
  blog: ["en", "id"],
  product: ["en"],
  collection: ["en"]
} as const satisfies Record<SeoRouteFamily, readonly Locale[]>

export function getIndexableLocales(family: SeoRouteFamily): readonly Locale[] {
  return INDEXABLE_LOCALES[family]
}

export function getCanonicalLocale(
  family: SeoRouteFamily,
  requestedLocale: string
): Locale {
  const locales = getIndexableLocales(family)
  return locales.includes(requestedLocale as Locale)
    ? (requestedLocale as Locale)
    : locales[0]
}

export function getSeoAlternates(
  family: SeoRouteFamily,
  path: string
): Record<string, string> {
  return getAlternates(path, getIndexableLocales(family))
}

export function getCanonicalUrl(
  family: SeoRouteFamily,
  requestedLocale: string,
  path: string
): string {
  return constructCanonicalUrl(
    getCanonicalLocale(family, requestedLocale),
    path
  )
}

export function getSeoOpenGraphLocale(
  family: SeoRouteFamily,
  requestedLocale: string
): string {
  return getOpenGraphLocale(getCanonicalLocale(family, requestedLocale))
}
