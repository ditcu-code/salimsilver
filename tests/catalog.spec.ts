import { expect, test } from "@playwright/test"

test.describe("Catalog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/catalog")
  })

  test("category filtering", async ({ page }) => {
    // Wait for the gallery to load
    const gallery = page.locator(".react-photo-album")
    await expect(gallery).toBeVisible()

    // Check "All Jewelry" is active initially
    const allBtn = page.getByRole("button", { name: "All Jewelry" })
    await expect(allBtn).toHaveClass(/bg-primary/)

    // Target specifically the category filter buttons within the container
    // Based on CategoryFilters.tsx class structure
    const filtersContainer = page.locator(".overflow-x-auto.no-scrollbar")
    const categoryButtons = filtersContainer.locator("button")

    // Check if we have more than just "All Jewelry"
    const count = await categoryButtons.count()
    console.log(`Found ${count} category buttons.`)

    // If we have a second button (meaning we have collections)
    if (count > 1) {
      const secondButton = categoryButtons.nth(1)
      const categoryName = await secondButton.innerText()
      console.log(`Clicking category: ${categoryName}`)

      await secondButton.click()

      // Expect the clicked button to become active
      await expect(secondButton).toHaveClass(/bg-primary/)
      // Expect "All" to be inactive
      await expect(allBtn).toHaveClass(/bg-secondary/)
    } else {
      console.log("Skipping filtering test: Only 'All Jewelry' category found.")
    }
  })

  test("product card navigation", async ({ page }) => {
    const firstProduct = page
      .locator('.react-photo-album a[href^="/product/"]')
      .first()
    await expect(firstProduct).toBeVisible()

    const href = await firstProduct.getAttribute("href")
    if (!href) throw new Error("Product card is missing its href")
    await firstProduct.click()

    await expect(page).toHaveURL(new RegExp(`${href}$`))
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://salimsilver.com${href}`
    )
  })
})
