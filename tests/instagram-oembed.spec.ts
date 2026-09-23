import { expect, test } from "@playwright/test"

import { getInstagramEmbedHtml } from "@/lib/instagram-oembed"

const instagramUrl = "https://www.instagram.com/reel/DEoZ7RFSORY/"
const officialHtml =
  '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DEoZ7RFSORY/?utm_source=ig_embed" data-instgrm-version="14"><div><a href="https://www.instagram.com/reel/DEoZ7RFSORY/">View this post on Instagram</a></div></blockquote>'

const getInstagramEmbedHtmlWithTimeout = getInstagramEmbedHtml as (
  url: string,
  fetcher: typeof fetch,
  timeoutMs: number
) => Promise<string | null>

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
    const fetcher = (async (input: RequestInfo | URL, init?: RequestInit) => {
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

    await expect(
      getInstagramEmbedHtml(instagramUrl, fetcher)
    ).resolves.toBeNull()
  })

  test("rejects malformed responses", async () => {
    const fetcher = (async () =>
      Response.json(instagramResponse({ html: null }))) as typeof fetch

    await expect(
      getInstagramEmbedHtml(instagramUrl, fetcher)
    ).resolves.toBeNull()
  })

  test("rejects markup containing a script", async () => {
    const fetcher = (async () =>
      Response.json(
        instagramResponse({
          html: `${officialHtml}<script src="https://www.instagram.com/embed.js"></script>`
        })
      )) as typeof fetch

    await expect(
      getInstagramEmbedHtml(instagramUrl, fetcher)
    ).resolves.toBeNull()
  })

  test("rejects slash-delimited script markup", async () => {
    const fetcher = (async () =>
      Response.json(
        instagramResponse({
          html: `${officialHtml}<script/>globalThis.__oembedExecuted = true</script>`
        })
      )) as typeof fetch

    await expect(
      getInstagramEmbedHtml(instagramUrl, fetcher)
    ).resolves.toBeNull()
  })

  test("rejects event-handler attributes", async () => {
    const fetcher = (async () =>
      Response.json(
        instagramResponse({
          html: officialHtml.replace(
            "<blockquote",
            '<blockquote onclick="globalThis.__oembedExecuted = true"'
          )
        })
      )) as typeof fetch

    await expect(
      getInstagramEmbedHtml(instagramUrl, fetcher)
    ).resolves.toBeNull()
  })

  test("rejects unsafe URL schemes", async () => {
    const fetcher = (async () =>
      Response.json(
        instagramResponse({
          html: officialHtml.replace(
            'href="https://www.instagram.com/reel/DEoZ7RFSORY/"',
            'href="javascript:globalThis.__oembedExecuted = true"'
          )
        })
      )) as typeof fetch

    await expect(
      getInstagramEmbedHtml(instagramUrl, fetcher)
    ).resolves.toBeNull()
  })

  test("rejects control-character-obfuscated unsafe URL schemes", async () => {
    const fetcher = (async () =>
      Response.json(
        instagramResponse({
          html: officialHtml.replace(
            'href="https://www.instagram.com/reel/DEoZ7RFSORY/"',
            'href="java&#x0A;script:globalThis.__oembedExecuted = true"'
          )
        })
      )) as typeof fetch

    await expect(
      getInstagramEmbedHtml(instagramUrl, fetcher)
    ).resolves.toBeNull()
  })

  test("rejects embed links to non-Instagram hosts", async () => {
    const fetcher = (async () =>
      Response.json(
        instagramResponse({
          html: officialHtml.replace(
            'href="https://www.instagram.com/reel/DEoZ7RFSORY/"',
            'href="https://example.com/phishing"'
          )
        })
      )) as typeof fetch

    await expect(
      getInstagramEmbedHtml(instagramUrl, fetcher)
    ).resolves.toBeNull()
  })

  test("rejects unsupported URL-bearing attributes", async () => {
    const fetcher = (async () =>
      Response.json(
        instagramResponse({
          html: officialHtml.replace(
            "<a href=",
            '<a ping="https://example.com/track" href='
          )
        })
      )) as typeof fetch

    await expect(
      getInstagramEmbedHtml(instagramUrl, fetcher)
    ).resolves.toBeNull()
  })

  test("rejects non-Instagram embed markup", async () => {
    const fetcher = (async () =>
      Response.json(
        instagramResponse({ html: "<div>Not an Instagram embed</div>" })
      )) as typeof fetch

    await expect(
      getInstagramEmbedHtml(instagramUrl, fetcher)
    ).resolves.toBeNull()
  })

  test("returns null for an unsuccessful response", async () => {
    const fetcher = (async () =>
      new Response("rate limited", { status: 429 })) as typeof fetch

    await expect(
      getInstagramEmbedHtml(instagramUrl, fetcher)
    ).resolves.toBeNull()
  })

  test("returns null when the network request fails", async () => {
    const fetcher = (async () => {
      throw new TypeError("network unavailable")
    }) as typeof fetch

    await expect(
      getInstagramEmbedHtml(instagramUrl, fetcher)
    ).resolves.toBeNull()
  })

  test("returns null when the configured endpoint is malformed", async () => {
    const previousEndpoint = process.env.INSTAGRAM_OEMBED_ENDPOINT
    process.env.INSTAGRAM_OEMBED_ENDPOINT = "not a valid URL"

    const fetcher = (async () =>
      Response.json(instagramResponse())) as typeof fetch

    try {
      const result = await getInstagramEmbedHtml(instagramUrl, fetcher)
      expect(result).toBeNull()
    } finally {
      if (previousEndpoint === undefined) {
        delete process.env.INSTAGRAM_OEMBED_ENDPOINT
      } else {
        process.env.INSTAGRAM_OEMBED_ENDPOINT = previousEndpoint
      }
    }
  })

  test("returns null when fetching exceeds the deadline", async () => {
    const fetcher = (async () => {
      await new Promise((resolve) => setTimeout(resolve, 50))
      return Response.json(instagramResponse())
    }) as typeof fetch

    await expect(
      getInstagramEmbedHtmlWithTimeout(instagramUrl, fetcher, 10)
    ).resolves.toBeNull()
  })

  test("returns null when reading the response exceeds the deadline", async () => {
    const fetcher = (async () =>
      ({
        ok: true,
        json: async () => {
          await new Promise((resolve) => setTimeout(resolve, 50))
          return instagramResponse()
        }
      }) as Response) as typeof fetch

    await expect(
      getInstagramEmbedHtmlWithTimeout(instagramUrl, fetcher, 10)
    ).resolves.toBeNull()
  })
})
