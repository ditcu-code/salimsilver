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
  let requestCount = 0

  await page.route("https://www.instagram.com/embed.js**", (route) =>
    route.fulfill(
      (() => {
        requestCount += 1

        return {
          contentType: "application/javascript",
          body: `
            window.instgrm = {
              Embeds: {
                process: function () {
                  window.__instagramProcessCalls =
                    (window.__instagramProcessCalls || 0) + 1;
                  window.__instagramProcessedCount =
                    document.querySelectorAll("blockquote.instagram-media").length;
                }
              }
            };
          `
        }
      })()
    )
  )

  return () => requestCount
}

async function getInstagramState(page: Page) {
  return page.evaluate(() => {
    const instagramWindow = window as Window & {
      __instagramProcessCalls?: number
      __instagramProcessedCount?: number
    }

    return {
      processCalls: instagramWindow.__instagramProcessCalls ?? 0,
      processedCount: instagramWindow.__instagramProcessedCount ?? 0
    }
  })
}

async function switchLanguage(page: Page, language: string) {
  await page.getByRole("button", { name: "Change Language" }).click()
  await page.getByRole("button", { name: new RegExp(language) }).click()
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

  test("keeps the official TikTok grid on the Dutch locale", async ({
    page
  }) => {
    await stubTikTokPlayers(page)
    await page.goto("/nl/workshop")

    const gallery = page
      .getByRole("heading", { name: "Vastgelegde momenten" })
      .locator("xpath=ancestor::section")

    await expect(
      gallery.locator('iframe[data-social-platform="tiktok"]')
    ).toHaveCount(3)
    await expect(gallery.getByRole("button")).toHaveCount(0)
  })

  test("renders and reprocesses deterministic Instagram embeds with a safe fallback", async ({
    page
  }) => {
    await stubTikTokPlayers(page)
    const getScriptRequestCount = await stubInstagramEmbedScript(page)
    await page.goto("/id/workshop")

    const gallery = page
      .getByRole("heading", { name: "Momen Terabadikan" })
      .locator("xpath=ancestor::section")
    const items = gallery.locator('[data-social-platform="instagram"]')

    await expect(items).toHaveCount(3)
    await expect(items.locator("blockquote.instagram-media")).toHaveCount(2)
    await expect(
      page.locator('script[src="https://www.instagram.com/embed.js"]')
    ).toHaveCount(1)

    await expect(
      items.nth(0).locator("blockquote.instagram-media")
    ).toHaveCount(1)
    await expect(
      items.nth(2).locator("blockquote.instagram-media")
    ).toHaveCount(1)

    const fallback = items.nth(1).getByRole("link", {
      name: "Lihat di Instagram"
    })
    await expect(fallback).toHaveAttribute("href", instagramUrls[1])
    await expect(fallback).toHaveAttribute("target", "_blank")
    await expect(fallback).toHaveAttribute("rel", "noopener noreferrer")

    await expect
      .poll(async () => (await getInstagramState(page)).processedCount)
      .toBe(2)
    const initialProcessCalls = (await getInstagramState(page)).processCalls
    expect(initialProcessCalls).toBeGreaterThan(0)
    expect(getScriptRequestCount()).toBe(1)

    await switchLanguage(page, "English")
    await expect(
      page.getByRole("heading", { name: "Captured Moments" })
    ).toBeVisible()
    await switchLanguage(page, "Indonesia")
    await expect(
      page.getByRole("heading", { name: "Momen Terabadikan" })
    ).toBeVisible()

    await expect
      .poll(async () => (await getInstagramState(page)).processCalls)
      .toBeGreaterThan(initialProcessCalls)
    await expect
      .poll(async () => (await getInstagramState(page)).processedCount)
      .toBe(2)
    expect(getScriptRequestCount()).toBe(1)

    await expect(gallery.getByRole("region")).toHaveCount(0)
    await expect(gallery.locator('[class*="rsme-"]')).toHaveCount(0)
  })
})
