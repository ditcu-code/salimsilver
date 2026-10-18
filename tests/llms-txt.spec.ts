import { expect, test } from "@playwright/test"

const REQUIRED_URLS = [
  "https://salimsilver.com/catalog",
  "https://salimsilver.com/collections",
  "https://salimsilver.com/workshop",
  "https://salimsilver.com/about",
  "https://salimsilver.com/store-location",
  "https://salimsilver.com/contact",
  "https://salimsilver.com/blog",
  "https://salimsilver.com/silver-price",
  "https://salimsilver.com/gold-price",
  "https://salimsilver.com/id",
  "https://salimsilver.com/nl"
]

test("serves a valid root llms.txt resource", async ({ request }) => {
  const response = await request.get("/llms.txt", { maxRedirects: 0 })

  expect(response.status()).toBe(200)
  expect(response.headers()["content-type"]).toContain("text/plain")

  const body = await response.text()

  expect(body.length).toBeGreaterThan(50)
  expect(body.trimStart().split(/\r?\n/, 1)[0]).toBe("# Salim Silver")
  expect(body).toMatch(/^> .+/m)
  expect(body).toMatch(/^## .+/m)
  expect(body).toMatch(/^- \[.+\]\(https:\/\/.+\): .+/m)

  for (const url of REQUIRED_URLS) {
    expect(body).toContain(`](${url})`)
  }

  expect(body).not.toMatch(/<!doctype|<html/i)
})
