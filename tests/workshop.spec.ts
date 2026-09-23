import { expect, test, type Page } from "@playwright/test"

const tiktokVideoIds = [
  "7631175893511179540",
  "7644545194871835924",
  "7630290092782849301"
]

const instagramUrls = [
  "https://www.instagram.com/reel/DEoZ7RFSORY/",
  "https://www.instagram.com/reel/DbM0f2HzMt2/",
  "https://www.instagram.com/reel/DEq2UFBPMZv/"
]

async function stubTikTokPlayers(page: Page) {
  await page.route("https://www.tiktok.com/player/v1/**", (route) =>
    route.fulfill({ contentType: "text/html", body: "<html></html>" })
  )
}

async function stubInstagramEmbedScript(page: Page) {
  await page.route("https://www.instagram.com/embed.js**", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `
        window.instgrm = {
          Embeds: {
            process: function () {
              window.__instagramProcessCalls =
                (window.__instagramProcessCalls || 0) + 1;
            }
          }
        };
      `
    })
  )
}

test.describe("Workshop social media gallery", () => {
  test("renders every TikTok video with the official minimal player", async ({
    page
  }) => {
    await stubTikTokPlayers(page)
    await page.goto("/workshop")

    const gallery = page
      .getByRole("heading", { name: "Captured Moments" })
      .locator("xpath=ancestor::section")
    const players = gallery.locator('iframe[data-social-platform="tiktok"]')

    await expect(players).toHaveCount(3)

    for (const [index, videoId] of tiktokVideoIds.entries()) {
      await expect(players.nth(index)).toHaveAttribute(
        "src",
        `https://www.tiktok.com/player/v1/${videoId}?controls=1&progress_bar=0&timestamp=0&music_info=0&description=0&rel=0&autoplay=0&loop=0`
      )
      await expect(players.nth(index)).toHaveAttribute(
        "title",
        `Captured Moments ${index + 1}`
      )
      await expect(players.nth(index)).toHaveAttribute("loading", "lazy")
    }

    await expect(gallery.getByRole("region")).toHaveCount(0)
    await expect(gallery.getByRole("button")).toHaveCount(0)
    await expect(gallery.locator('[class*="rsme-"]')).toHaveCount(0)
  })

  test("renders the Indonesian Instagram grid with one official script", async ({
    page
  }) => {
    await stubInstagramEmbedScript(page)
    await page.goto("/id/workshop")

    const gallery = page
      .getByRole("heading", { name: "Momen Terabadikan" })
      .locator("xpath=ancestor::section")
    const items = gallery.locator('[data-social-platform="instagram"]')

    await expect(items).toHaveCount(3)
    await expect(
      page.locator('script[src="https://www.instagram.com/embed.js"]')
    ).toHaveCount(1)

    for (const [index, url] of instagramUrls.entries()) {
      await expect(
        items.nth(index).locator(`a[href^="${url}"]`).first()
      ).toBeVisible()
    }

    await expect
      .poll(() =>
        page.evaluate(
          () =>
            (
              window as Window & {
                __instagramProcessCalls?: number
              }
            ).__instagramProcessCalls ?? 0
        )
      )
      .toBeGreaterThan(0)
    await expect(gallery.getByRole("region")).toHaveCount(0)
    await expect(gallery.locator('[class*="rsme-"]')).toHaveCount(0)
  })
})
