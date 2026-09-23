const INSTAGRAM_OEMBED_ENDPOINT =
  "https://graph.facebook.com/v25.0/instagram_oembed"
const INSTAGRAM_OEMBED_REVALIDATE_SECONDS = 86_400

type InstagramOEmbedResponse = {
  provider_name?: unknown
  html?: unknown
}

export async function getInstagramEmbedHtml(
  url: string,
  fetcher: typeof fetch = fetch
): Promise<string | null> {
  const endpoint = new URL(INSTAGRAM_OEMBED_ENDPOINT)
  endpoint.searchParams.set("url", url)
  endpoint.searchParams.set("omitscript", "true")
  endpoint.searchParams.set("maxwidth", "540")

  try {
    const response = await fetcher(endpoint, {
      next: { revalidate: INSTAGRAM_OEMBED_REVALIDATE_SECONDS }
    })

    if (!response.ok) return null

    const data = (await response.json()) as InstagramOEmbedResponse

    if (
      data.provider_name !== "Instagram" ||
      typeof data.html !== "string" ||
      data.html.trim().length === 0 ||
      /<script[\s>]/i.test(data.html)
    ) {
      return null
    }

    return data.html
  } catch {
    return null
  }
}
