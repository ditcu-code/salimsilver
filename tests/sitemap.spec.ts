import { expect, test, type APIRequestContext } from "@playwright/test"

const BASE_URL = "https://salimsilver.com"

type SitemapEntry = {
  url: string
  lastModified?: string
}

const informationalPaths = [
  "",
  "/silver-price",
  "/gold-price",
  "/workshop",
  "/about",
  "/career",
  "/contact",
  "/store-location"
]

const staticPaths = [
  ...informationalPaths.flatMap((path) => [
    path || "/",
    `/id${path}`,
    `/nl${path}`
  ]),
  "/catalog",
  "/collections",
  "/blog",
  "/id/blog"
]

function parseSitemap(xml: string): SitemapEntry[] {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => {
    const block = match[1]
    const url = block.match(/<loc>(.*?)<\/loc>/)?.[1]
    const lastModified = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]

    if (!url) throw new Error(`Sitemap entry has no loc: ${block}`)
    return { url, lastModified }
  })
}

async function loadSitemap(request: APIRequestContext) {
  const response = await request.get("/sitemap.xml")
  expect(response.status()).toBe(200)
  const xml = await response.text()
  return { xml, entries: parseSitemap(xml) }
}

test.describe("canonical sitemap", () => {
  test("only publishes locale variants that are eligible for indexing", async ({
    request
  }) => {
    const { xml, entries } = await loadSitemap(request)
    const urls = entries.map((entry) => entry.url)

    expect(new Set(urls).size).toBe(urls.length)
    expect(xml).not.toContain("<changefreq>")
    expect(xml).not.toContain("<priority>")

    for (const path of informationalPaths) {
      expect(urls).toContain(`${BASE_URL}${path}`)
      expect(urls).toContain(`${BASE_URL}/id${path}`)
      expect(urls).toContain(`${BASE_URL}/nl${path}`)
    }

    expect(urls).toContain(`${BASE_URL}/catalog`)
    expect(urls).not.toContain(`${BASE_URL}/id/catalog`)
    expect(urls).not.toContain(`${BASE_URL}/nl/catalog`)

    expect(urls).toContain(`${BASE_URL}/collections`)
    expect(urls).not.toContain(`${BASE_URL}/id/collections`)
    expect(urls).not.toContain(`${BASE_URL}/nl/collections`)

    expect(urls).toContain(`${BASE_URL}/blog`)
    expect(urls).toContain(`${BASE_URL}/id/blog`)
    expect(urls).not.toContain(`${BASE_URL}/nl/blog`)

    const dynamicUrls = urls.filter(
      (url) => !staticPaths.includes(new URL(url).pathname)
    )
    expect(dynamicUrls.length).toBeGreaterThan(0)
    expect(
      dynamicUrls.every((url) => !new URL(url).pathname.startsWith("/nl/"))
    ).toBe(true)
    expect(
      dynamicUrls
        .filter((url) => new URL(url).pathname.startsWith("/id/"))
        .every((url) => new URL(url).pathname.startsWith("/id/blog/"))
    ).toBe(true)
  })

  test("uses real timestamps only for dynamic content", async ({ request }) => {
    const { entries } = await loadSitemap(request)

    for (const entry of entries) {
      const path = new URL(entry.url).pathname
      if (staticPaths.includes(path)) {
        expect(entry.lastModified, path).toBeUndefined()
      } else {
        expect(entry.lastModified, path).toBeTruthy()
        expect(Number.isNaN(Date.parse(entry.lastModified!)), path).toBe(false)
      }
    }
  })

  test("every published URL is non-redirecting, indexable, and self-canonical", async ({
    request
  }) => {
    const { entries } = await loadSitemap(request)

    for (let index = 0; index < entries.length; index += 8) {
      const batch = entries.slice(index, index + 8)
      await Promise.all(
        batch.map(async ({ url }) => {
          const path = new URL(url).pathname
          const response = await request.get(path, {
            maxRedirects: 0,
            headers: {
              Cookie: "NEXT_LOCALE=en",
              "Accept-Language": "en"
            }
          })
          expect(response.status(), path).toBe(200)

          const html = await response.text()
          expect(html, path).not.toMatch(
            /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i
          )

          const canonical = html.match(
            /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
          )?.[1]
          expect(canonical, path).toBe(url)
        })
      )
    }
  })
})
