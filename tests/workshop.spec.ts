import { expect, test, type Page } from "@playwright/test"

const tiktokVideoIds = [
  "7631175893511179540",
  "7644545194871835924",
  "7630290092782849301"
]

async function stubTikTokEmbedScript(page: Page) {
  await page.route("https://www.tiktok.com/embed.js**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: ""
    })
  )
}

test.describe("Workshop social media gallery", () => {
  test("mounts only the selected TikTok embed", async ({ page }) => {
    await stubTikTokEmbedScript(page)
    await page.goto("/workshop")

    const gallery = page
      .getByRole("heading", { name: "Captured Moments" })
      .locator("xpath=ancestor::section")
    const embeds = gallery.locator(".rsme-tiktok-embed")

    await expect(embeds).toHaveCount(1)
    await expect(embeds.locator("blockquote.tiktok-embed")).toHaveAttribute(
      "data-video-id",
      tiktokVideoIds[0]
    )
    await expect(gallery.getByText("1 / 3", { exact: true })).toBeVisible()

    await gallery.getByRole("button", { name: "Next video" }).click()

    await expect(embeds).toHaveCount(1)
    await expect(embeds.locator("blockquote.tiktok-embed")).toHaveAttribute(
      "data-video-id",
      tiktokVideoIds[1]
    )
    await expect(gallery.getByText("2 / 3", { exact: true })).toBeVisible()

    await gallery.getByRole("button", { name: "Previous video" }).click()

    await expect(embeds.locator("blockquote.tiktok-embed")).toHaveAttribute(
      "data-video-id",
      tiktokVideoIds[0]
    )
  })

  test("localizes the TikTok carousel controls", async ({ page }) => {
    await stubTikTokEmbedScript(page)
    await page.goto("/nl/workshop")

    const gallery = page
      .getByRole("heading", { name: "Vastgelegde momenten" })
      .locator("xpath=ancestor::section")

    await expect(
      gallery.getByRole("button", { name: "Vorige video" })
    ).toBeVisible()
    await expect(
      gallery.getByRole("button", { name: "Volgende video" })
    ).toBeVisible()
  })

  test("keeps the Indonesian Instagram gallery as a grid", async ({ page }) => {
    await page.route("https://www.instagram.com/embed.js", (route) =>
      route.fulfill({
        contentType: "application/javascript",
        body: ""
      })
    )
    await page.goto("/id/workshop")

    const gallery = page
      .getByRole("heading", { name: "Momen Terabadikan" })
      .locator("xpath=ancestor::section")

    await expect(gallery.locator(".rsme-instagram-embed")).toHaveCount(3)
    await expect(gallery.getByRole("region")).toHaveCount(0)
  })
})
