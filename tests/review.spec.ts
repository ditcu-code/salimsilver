import { expect, test } from "@playwright/test"
import { GOOGLE_REVIEW_URL, TRIPADVISOR_REVIEW_URL } from "../lib/constants"

test("review page offers both review platforms", async ({ page }) => {
  await page.goto("/review")

  await expect(
    page.getByRole("heading", { name: "Share your experience" })
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "Leave a review on Google Reviews" })
  ).toHaveAttribute("href", GOOGLE_REVIEW_URL)
  await expect(
    page.getByRole("link", { name: "Leave a review on TripAdvisor" })
  ).toHaveAttribute("href", TRIPADVISOR_REVIEW_URL)
  await expect(page.getByText(/Redirecting to/)).toHaveCount(0)
})

test("targeted platform starts a cancelable countdown", async ({ page }) => {
  await page.clock.install()
  await page.goto("/review?platform=tripadvisor")

  await page.getByRole("button", { name: "Cancel" }).click()
  await expect(
    page.getByRole("link", { name: "Leave a review on TripAdvisor" })
  ).toHaveAttribute("data-state", "selected")
  await page.clock.fastForward(6000)

  await expect(page).toHaveURL(/\/review\?platform=tripadvisor$/)
  await expect(page.getByText(/Redirecting to/)).toHaveCount(0)
})

test("targeted platform automatically navigates after five seconds", async ({
  page
}) => {
  await page.clock.install()
  await page.route(GOOGLE_REVIEW_URL, (route) => route.abort())
  await page.goto("/review?platform=google")

  const reviewRequest = page.waitForRequest(GOOGLE_REVIEW_URL)
  await page.clock.fastForward(5000)

  await reviewRequest
})

test("invalid and repeated platform parameters show the neutral chooser", async ({
  page
}) => {
  await page.goto("/review?platform=google&platform=tripadvisor")

  await expect(page.locator('[data-state="selected"]')).toHaveCount(0)
  await expect(page.getByText(/Redirecting to/)).toHaveCount(0)
})

test("legacy review route returns a 301 redirect", async ({ request }) => {
  const response = await request.get("/gmaps-review", { maxRedirects: 0 })

  expect(response.status()).toBe(301)
  const location = response.headers().location
  expect(location).toBeTruthy()
  expect(new URL(location!, "http://localhost:3000").pathname).toBe("/review")
  expect(
    new URL(location!, "http://localhost:3000").searchParams.get("platform")
  ).toBe("google")
})

test("legacy review route resolves to the Google-targeted chooser", async ({
  page
}) => {
  await page.goto("/gmaps-review")

  await expect(page).toHaveURL(/\/review\?platform=google$/)
})

test("review Open Graph image is available", async ({ request }) => {
  const response = await request.get("/review/opengraph-image")

  expect(response.status()).toBe(200)
  expect(response.headers()["content-type"]).toContain("image/jpeg")
  expect((await response.body()).length).toBeGreaterThan(0)
})
