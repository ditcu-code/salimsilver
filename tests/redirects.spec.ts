import { expect, test } from "@playwright/test"

test.describe("legacy redirects", () => {
  for (const source of ["/product-catalog", "/product-catalog/"]) {
    test(`${source} permanently redirects to /catalog`, async ({ request }) => {
      let target = source

      for (
        let redirects = 0;
        redirects < 2 && target !== "/catalog";
        redirects++
      ) {
        const response = await request.get(target, { maxRedirects: 0 })
        expect(response.status()).toBe(308)

        const location = response.headers().location
        expect(location).toBeTruthy()
        target = new URL(location!, response.url()).pathname
      }

      expect(target).toBe("/catalog")
    })
  }
})
