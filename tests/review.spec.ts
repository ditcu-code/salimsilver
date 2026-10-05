import { expect, test } from "@playwright/test"
import { GOOGLE_REVIEW_URL, TRIPADVISOR_REVIEW_URL } from "../lib/constants"

const GETYOURGUIDE_REVIEW_URL =
  "https://www.getyourguide.com/scan-review-qr?activity_id=1494967&utm_medium=offline&utm_source=supplier_review_link&utm_campaign=supplier_review_qrcode&utm_content=1494967"

test("review page offers every review platform", async ({ page }) => {
  await page.goto("/review")

  await expect(
    page.getByRole("heading", { name: "A Heartfelt Thank You" })
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "Leave a review on Google Reviews" })
  ).toHaveAttribute("href", GOOGLE_REVIEW_URL)
  await expect(
    page.getByRole("link", { name: "Leave a review on TripAdvisor" })
  ).toHaveAttribute("href", TRIPADVISOR_REVIEW_URL)
  await expect(
    page.getByRole("link", { name: "Leave a review on GetYourGuide" })
  ).toHaveAttribute("href", GETYOURGUIDE_REVIEW_URL)
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

test("targeted GetYourGuide platform automatically navigates after five seconds", async ({
  page
}) => {
  await page.clock.install()
  await page.route(GETYOURGUIDE_REVIEW_URL, (route) => route.abort())
  await page.goto("/review?platform=getyourguide")

  const reviewRequest = page.waitForRequest(GETYOURGUIDE_REVIEW_URL)
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

test("dedicated Google review page restores the original experience", async ({
  page
}) => {
  await page.clock.install()
  const response = await page.goto("/gmaps-review")

  expect(response?.status()).toBe(200)
  await expect(page).toHaveURL(/\/gmaps-review$/)
  await expect(
    page.getByRole("heading", { name: "A Heartfelt Thank You" })
  ).toBeVisible()
  await expect(
    page.getByText("Thank you for spending time with us at Salim Silver.")
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "Leave a Review Now" })
  ).toHaveAttribute("href", GOOGLE_REVIEW_URL)
  await expect(
    page.getByText("Redirecting you to Google Reviews in 5 seconds...")
  ).toBeVisible()
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/gmaps-review$/
  )
})

test("dedicated Google review page redirects after five seconds", async ({
  page
}) => {
  await page.clock.install()
  await page.route(GOOGLE_REVIEW_URL, (route) => route.abort())
  await page.goto("/gmaps-review")

  const reviewRequest = page.waitForRequest(GOOGLE_REVIEW_URL)
  await page.clock.fastForward(5000)

  await reviewRequest
})

test("review Open Graph image is available", async ({ request }) => {
  const response = await request.get("/review/opengraph-image")

  expect(response.status()).toBe(200)
  expect(response.headers()["content-type"]).toContain("image/jpeg")
  expect((await response.body()).length).toBeGreaterThan(0)
})

test("dedicated Google review Open Graph image is available", async ({
  request
}) => {
  const response = await request.get("/gmaps-review/opengraph-image")

  expect(response.status()).toBe(200)
  expect(response.headers()["content-type"]).toContain("image/jpeg")
  expect((await response.body()).length).toBeGreaterThan(0)
})
