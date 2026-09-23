import { expect, test } from "@playwright/test"

import { getInstagramEmbedHtml } from "@/lib/instagram-oembed"

const instagramUrl = "https://www.instagram.com/reel/DEoZ7RFSORY/"
const officialHtml =
  '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DEoZ7RFSORY/"></blockquote>'

function instagramResponse(overrides: Record<string, unknown> = {}) {
  return {
    version: "1.0",
    author_name: "Salim Silver",
    author_url: "https://www.instagram.com/salimsilverofficial/",
    provider_name: "Instagram",
    provider_url: "https://www.instagram.com/",
    type: "rich",
    width: 540,
    html: officialHtml,
    ...overrides
  }
}

test.describe("Instagram oEmbed", () => {
  test("returns validated official markup and requests a cached script-free embed", async () => {
    let requestedUrl = ""
    let requestedInit: RequestInit | undefined
    const fetcher = (async (
      input: RequestInfo | URL,
      init?: RequestInit
    ) => {
      requestedUrl = String(input)
      requestedInit = init

      return Response.json(instagramResponse())
    }) as typeof fetch

    await expect(getInstagramEmbedHtml(instagramUrl, fetcher)).resolves.toBe(
      officialHtml
    )
    expect(requestedUrl).toBe(
      "https://graph.facebook.com/v25.0/instagram_oembed?url=https%3A%2F%2Fwww.instagram.com%2Freel%2FDEoZ7RFSORY%2F&omitscript=true&maxwidth=540"
    )
    expect(requestedInit).toMatchObject({
      next: { revalidate: 86_400 }
    })
  })

  test("rejects responses from another provider", async () => {
    const fetcher = (async () =>
      Response.json(
        instagramResponse({ provider_name: "Unexpected provider" })
      )) as typeof fetch

    await expect(getInstagramEmbedHtml(instagramUrl, fetcher)).resolves.toBeNull()
  })

  test("rejects malformed responses", async () => {
    const fetcher = (async () =>
      Response.json(instagramResponse({ html: null }))) as typeof fetch

    await expect(getInstagramEmbedHtml(instagramUrl, fetcher)).resolves.toBeNull()
  })

  test("rejects markup containing a script", async () => {
    const fetcher = (async () =>
      Response.json(
        instagramResponse({
          html: `${officialHtml}<script src="https://www.instagram.com/embed.js"></script>`
        })
      )) as typeof fetch

    await expect(getInstagramEmbedHtml(instagramUrl, fetcher)).resolves.toBeNull()
  })

  test("returns null for an unsuccessful response", async () => {
    const fetcher = (async () =>
      new Response("rate limited", { status: 429 })) as typeof fetch

    await expect(getInstagramEmbedHtml(instagramUrl, fetcher)).resolves.toBeNull()
  })

  test("returns null when the network request fails", async () => {
    const fetcher = (async () => {
      throw new TypeError("network unavailable")
    }) as typeof fetch

    await expect(getInstagramEmbedHtml(instagramUrl, fetcher)).resolves.toBeNull()
  })
})
