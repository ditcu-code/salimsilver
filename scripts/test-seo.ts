import { constructCanonicalUrl } from "@/lib/seo"

// Mock process.env.NEXT_PUBLIC_SITE_URL since we are running this in a script
process.env.NEXT_PUBLIC_SITE_URL = "https://salimsilver.com"

const tests = [
  { locale: "en", path: "/", expected: "https://salimsilver.com" },
  { locale: "en", path: "/about", expected: "https://salimsilver.com/about" },
  { locale: "id", path: "/", expected: "https://salimsilver.com/id" },
  {
    locale: "id",
    path: "/about",
    expected: "https://salimsilver.com/id/about",
  },
  {
    locale: "en",
    path: "/catalog",
    expected: "https://salimsilver.com/catalog",
  },
  {
    locale: "en",
    path: "catalog",
    expected: "https://salimsilver.com/catalog",
  }, // test missing leading slash
  {
    locale: "en",
    path: "/catalog/",
    expected: "https://salimsilver.com/catalog",
  }, // test trailing slash removal
  {
    locale: "id",
    path: "/catalog/",
    expected: "https://salimsilver.com/id/catalog",
  },
]

console.log("Running SEO Canonical URL Tests...\n")

let passed = 0
let failed = 0

tests.forEach(({ locale, path, expected }) => {
  const result = constructCanonicalUrl(locale, path)
  if (result === expected) {
    console.log(`✅ [${locale}] "${path}" -> ${result}`)
    passed++
  } else {
    console.error(
      `❌ [${locale}] "${path}" expected ${expected}, got ${result}`,
    )
    failed++
  }
})

console.log(`\nTests passed: ${passed}`)
console.log(`Tests failed: ${failed}`)

if (failed > 0) process.exit(1)
