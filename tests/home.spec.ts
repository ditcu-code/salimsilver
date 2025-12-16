import { expect, test } from "@playwright/test"

test("has title", async ({ page }) => {
  await page.goto("/")

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Salim Silver/)
})

test("catalog link navigation", async ({ page }) => {
  await page.goto("/")

  // Click the catalog link.
  await page.getByRole("link", { name: "Catalog" }).first().click()

  // Expects page to have a heading with the name of Catalog.
  await expect(page.getByRole("heading", { name: /Catalog/ })).toBeVisible()
})
