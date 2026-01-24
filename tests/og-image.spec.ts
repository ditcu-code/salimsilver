import { expect, test } from "@playwright/test"

test("opengraph image is accessible and has correct content type", async ({
  request,
}) => {
  const response = await request.get("/opengraph-image")

  // Verify status is 200 OK
  expect(response.status()).toBe(200)

  // Verify content type is image/jpeg
  const contentType = response.headers()["content-type"]
  expect(contentType).toBe("image/jpeg")

  // Verify content length is greater than 0
  const body = await response.body()
  expect(body.length).toBeGreaterThan(0)
})
