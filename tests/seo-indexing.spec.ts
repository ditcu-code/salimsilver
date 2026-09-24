import { expect, test, type Page } from "@playwright/test"

const PRODUCT_SLUG = "triangle-monarch-1768810408463"
const COLLECTION_SLUG = "earrings"
const POST_SLUG =
  "benarkah-budaya-kerajinan-perak-kotagede-dimulai-sejak-senopati"

const canonical = (page: Page) => page.locator('link[rel="canonical"]')
const alternate = (page: Page, locale: string) =>
  page.locator(`link[rel="alternate"][hreflang="${locale}"]`)
const openGraphUrl = (page: Page) => page.locator('meta[property="og:url"]')
const openGraphLocale = (page: Page) =>
  page.locator('meta[property="og:locale"]')

async function schemas(page: Page) {
  const contents = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents()

  return contents.map((content) => JSON.parse(content))
}

test.describe("SEO locale indexing policy", () => {
  test("keeps translated informational pages self-canonical", async ({
    page
  }) => {
    await page.goto("/nl/about")

    await expect(canonical(page)).toHaveAttribute(
      "href",
      "https://salimsilver.com/nl/about"
    )
    await expect(alternate(page, "en")).toHaveCount(1)
    await expect(alternate(page, "id")).toHaveCount(1)
    await expect(alternate(page, "nl")).toHaveCount(1)
  })

  test("consolidates untranslated catalog and product locales to English", async ({
    page
  }) => {
    await page.goto("/id/catalog")
    await expect(canonical(page)).toHaveAttribute(
      "href",
      "https://salimsilver.com/catalog"
    )
    await expect(alternate(page, "en")).toHaveCount(1)
    await expect(alternate(page, "id")).toHaveCount(0)
    await expect(alternate(page, "nl")).toHaveCount(0)

    await page.goto(`/nl/product/${PRODUCT_SLUG}`)
    await expect(canonical(page)).toHaveAttribute(
      "href",
      `https://salimsilver.com/product/${PRODUCT_SLUG}`
    )
    await expect(alternate(page, "en")).toHaveCount(1)
    await expect(alternate(page, "id")).toHaveCount(0)
    await expect(alternate(page, "nl")).toHaveCount(0)
  })

  test("consolidates untranslated collection locales to English", async ({
    page
  }) => {
    await page.goto("/nl/collections")
    await expect(canonical(page)).toHaveAttribute(
      "href",
      "https://salimsilver.com/collections"
    )
    await expect(alternate(page, "nl")).toHaveCount(0)

    await page.goto(`/id/collections/${COLLECTION_SLUG}`)
    await expect(canonical(page)).toHaveAttribute(
      "href",
      `https://salimsilver.com/collections/${COLLECTION_SLUG}`
    )
    await expect(alternate(page, "en")).toHaveCount(1)
    await expect(alternate(page, "id")).toHaveCount(0)
    await expect(alternate(page, "nl")).toHaveCount(0)
  })

  test("keeps English and Indonesian blog pages while consolidating Dutch", async ({
    page
  }) => {
    await page.goto(`/id/blog/${POST_SLUG}`)
    await expect(canonical(page)).toHaveAttribute(
      "href",
      `https://salimsilver.com/id/blog/${POST_SLUG}`
    )
    await expect(alternate(page, "en")).toHaveCount(1)
    await expect(alternate(page, "id")).toHaveCount(1)
    await expect(alternate(page, "nl")).toHaveCount(0)

    await page.goto(`/nl/blog/${POST_SLUG}`)
    await expect(canonical(page)).toHaveAttribute(
      "href",
      `https://salimsilver.com/blog/${POST_SLUG}`
    )
    await expect(alternate(page, "nl")).toHaveCount(0)
  })

  test("canonicalizes shared jewelry query state to the product page", async ({
    page
  }) => {
    await page.goto(
      `/nl/collections/${COLLECTION_SLUG}?jewelry=${PRODUCT_SLUG}`
    )

    await expect(canonical(page)).toHaveAttribute(
      "href",
      `https://salimsilver.com/product/${PRODUCT_SLUG}`
    )
    await expect(alternate(page, "en")).toHaveAttribute(
      "href",
      `https://salimsilver.com/product/${PRODUCT_SLUG}`
    )
    await expect(alternate(page, "id")).toHaveCount(0)
    await expect(alternate(page, "nl")).toHaveCount(0)
  })

  test("uses the product canonical URL in social and structured metadata", async ({
    page
  }) => {
    const productUrl = `https://salimsilver.com/product/${PRODUCT_SLUG}`
    await page.goto(`/nl/product/${PRODUCT_SLUG}`)

    await expect(openGraphUrl(page)).toHaveAttribute("content", productUrl)
    await expect(openGraphLocale(page)).toHaveAttribute("content", "en_US")
    const pageSchemas = await schemas(page)
    const product = pageSchemas.find((schema) => schema["@type"] === "Product")
    const breadcrumbs = pageSchemas.find(
      (schema) => schema["@type"] === "BreadcrumbList"
    )

    expect(product.offers.url).toBe(productUrl)
    expect(breadcrumbs.itemListElement.at(-1).item).toBe(productUrl)
  })

  test("uses the collection canonical URL in structured metadata", async ({
    page
  }) => {
    const collectionUrl = `https://salimsilver.com/collections/${COLLECTION_SLUG}`
    await page.goto(`/id/collections/${COLLECTION_SLUG}`)

    await expect(openGraphUrl(page)).toHaveAttribute("content", collectionUrl)
    await expect(openGraphLocale(page)).toHaveAttribute("content", "en_US")
    const pageSchemas = await schemas(page)
    const collection = pageSchemas.find(
      (schema) => schema["@type"] === "CollectionPage"
    )
    const breadcrumbs = pageSchemas.find(
      (schema) => schema["@type"] === "BreadcrumbList"
    )

    expect(collection.url).toBe(collectionUrl)
    expect(breadcrumbs.itemListElement.at(-1).item).toBe(collectionUrl)
  })

  test("uses the blog canonical URL in structured metadata", async ({
    page
  }) => {
    const postUrl = `https://salimsilver.com/blog/${POST_SLUG}`
    await page.goto(`/nl/blog/${POST_SLUG}`)

    await expect(openGraphUrl(page)).toHaveAttribute("content", postUrl)
    await expect(openGraphLocale(page)).toHaveAttribute("content", "en_US")
    const pageSchemas = await schemas(page)
    const article = pageSchemas.find((schema) => schema["@type"] === "Article")
    const breadcrumbs = pageSchemas.find(
      (schema) => schema["@type"] === "BreadcrumbList"
    )

    expect(article.mainEntityOfPage["@id"]).toBe(postUrl)
    expect(breadcrumbs.itemListElement.at(-1).item).toBe(postUrl)
  })

  test("uses the informational canonical URL in store structured data", async ({
    page
  }) => {
    const storeUrl = "https://salimsilver.com/nl/store-location"
    await page.goto("/nl/store-location")

    const pageSchemas = await schemas(page)
    const store = pageSchemas.find(
      (schema) => schema["@type"] === "JewelryStore"
    )

    expect(store["@id"]).toBe(storeUrl)
    expect(store.url).toBe(storeUrl)
  })
})

test.describe("locale-aware internal links", () => {
  test("keeps catalog, blog, and collection cards in the active locale", async ({
    page
  }) => {
    await page.goto("/nl/catalog")
    await expect(
      page.locator('main a[href^="/nl/product/"]').first()
    ).toBeVisible()
    await expect(page.locator('main a[href^="/product/"]')).toHaveCount(0)

    await page.goto("/id/blog")
    await expect(
      page.locator('main a[href^="/id/blog/"]').first()
    ).toBeVisible()
    await expect(page.locator('main a[href^="/blog/"]')).toHaveCount(0)

    await page.goto("/nl/collections")
    await expect(
      page.locator('main a[href^="/nl/collections/"]').first()
    ).toBeVisible()
    await expect(page.locator('main a[href^="/collections/"]')).toHaveCount(0)
  })

  test("keeps footer, breadcrumb, and back links in the active locale", async ({
    page
  }) => {
    await page.goto("/nl/about")
    const footer = page.locator("footer")
    await expect(footer.locator('a[href="/nl/catalog"]')).toHaveCount(1)
    await expect(footer.locator('a[href="/nl"]')).toHaveCount(1)

    await page.goto(`/nl/product/${PRODUCT_SLUG}`)
    const breadcrumbs = page.getByRole("navigation", { name: "Breadcrumb" })
    await expect(breadcrumbs.locator('a[href="/nl"]')).toHaveCount(1)
    await expect(breadcrumbs.locator('a[href="/nl/collections"]')).toHaveCount(
      1
    )

    await page.goto(`/id/blog/${POST_SLUG}`)
    await expect(
      page.getByRole("link", { name: "Kembali ke Jurnal" })
    ).toHaveAttribute("href", "/id/blog")
  })

  test("renders crawlable language links for the current path", async ({
    page
  }) => {
    await page.goto("/about")

    const options = page.getByRole("menu", {
      name: "Language options",
      includeHidden: true
    })
    await expect(options.locator('a[href="/about"]')).toHaveCount(1)
    await expect(options.locator('a[href="/id/about"]')).toHaveCount(1)
    await expect(options.locator('a[href="/nl/about"]')).toHaveCount(1)

    await page.getByRole("button", { name: "Change Language" }).click()
    await expect(
      options.getByRole("menuitem", { name: "Indonesia" })
    ).toBeVisible()
    await expect(
      options.getByRole("menuitem", { name: "Nederlands" })
    ).toBeVisible()
  })
})
