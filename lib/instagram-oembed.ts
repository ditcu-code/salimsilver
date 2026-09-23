import { DomUtils, parseDocument } from "htmlparser2"

const DEFAULT_INSTAGRAM_OEMBED_ENDPOINT =
  "https://graph.facebook.com/v25.0/instagram_oembed"
const INSTAGRAM_OEMBED_REVALIDATE_SECONDS = 86_400
const INSTAGRAM_OEMBED_TIMEOUT_MS = 5_000

const ALLOWED_INSTAGRAM_EMBED_TAGS = new Set([
  "a",
  "blockquote",
  "div",
  "g",
  "p",
  "path",
  "svg"
])
const URL_ATTRIBUTES = new Set([
  "action",
  "formaction",
  "href",
  "src",
  "xlink:href"
])
const UNSAFE_URL_SCHEME = /^\s*(?:data|javascript|vbscript):/i
const UNSAFE_STYLE_VALUE =
  /(?:expression\s*\(|url\s*\(\s*["']?\s*(?:data|javascript|vbscript):)/i

type InstagramOEmbedResponse = {
  provider_name?: unknown
  html?: unknown
}

function normalizePathname(pathname: string) {
  return pathname.replace(/\/+$/, "")
}

function isOfficialInstagramPermalink(
  permalink: string | undefined,
  requestedUrl: string
) {
  if (!permalink) return false

  try {
    const parsedPermalink = new URL(permalink)
    const parsedRequestedUrl = new URL(requestedUrl)
    const isInstagramHost = ["instagram.com", "www.instagram.com"].includes(
      parsedPermalink.hostname
    )

    return (
      parsedPermalink.protocol === "https:" &&
      isInstagramHost &&
      normalizePathname(parsedPermalink.pathname) ===
        normalizePathname(parsedRequestedUrl.pathname)
    )
  } catch {
    return false
  }
}

function isValidInstagramEmbedHtml(html: string, requestedUrl: string) {
  const document = parseDocument(html, {
    lowerCaseAttributeNames: true,
    lowerCaseTags: true
  })
  const elements = DomUtils.findAll(() => true, document)
  const rootElements = elements.filter((element) => element.parent === document)

  if (rootElements.length !== 1) return false

  const root = rootElements[0]
  const classNames = root.attribs.class?.split(/\s+/) ?? []
  const embedVersion = root.attribs["data-instgrm-version"]

  if (
    root.name !== "blockquote" ||
    !classNames.includes("instagram-media") ||
    !/^\d+$/.test(embedVersion ?? "") ||
    !isOfficialInstagramPermalink(
      root.attribs["data-instgrm-permalink"],
      requestedUrl
    )
  ) {
    return false
  }

  for (const element of elements) {
    if (!ALLOWED_INSTAGRAM_EMBED_TAGS.has(element.name)) return false

    for (const [attributeName, attributeValue] of Object.entries(
      element.attribs
    )) {
      if (attributeName.startsWith("on")) return false
      if (
        URL_ATTRIBUTES.has(attributeName) &&
        UNSAFE_URL_SCHEME.test(attributeValue)
      ) {
        return false
      }
      if (
        attributeName === "style" &&
        UNSAFE_STYLE_VALUE.test(attributeValue)
      ) {
        return false
      }
    }
  }

  return document.children.every((node) => {
    if (node === root || node.type === "comment") return true
    return node.type === "text" && node.data.trim().length === 0
  })
}

export async function getInstagramEmbedHtml(
  url: string,
  fetcher: typeof fetch = fetch,
  timeoutMs = INSTAGRAM_OEMBED_TIMEOUT_MS
): Promise<string | null> {
  const endpoint = new URL(
    process.env.INSTAGRAM_OEMBED_ENDPOINT ?? DEFAULT_INSTAGRAM_OEMBED_ENDPOINT
  )
  endpoint.searchParams.set("url", url)
  endpoint.searchParams.set("omitscript", "true")
  endpoint.searchParams.set("maxwidth", "540")

  const abortController = new AbortController()
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const deadline = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(
      () => {
        const error = new DOMException(
          "Instagram oEmbed request timed out",
          "AbortError"
        )
        abortController.abort(error)
        reject(error)
      },
      Math.max(1, timeoutMs)
    )
  })

  try {
    const response = await Promise.race([
      fetcher(endpoint, {
        next: { revalidate: INSTAGRAM_OEMBED_REVALIDATE_SECONDS },
        signal: abortController.signal
      }),
      deadline
    ])

    if (!response.ok) return null

    const data = (await Promise.race([
      response.json(),
      deadline
    ])) as InstagramOEmbedResponse

    if (
      data.provider_name !== "Instagram" ||
      typeof data.html !== "string" ||
      data.html.trim().length === 0 ||
      !isValidInstagramEmbedHtml(data.html, url)
    ) {
      return null
    }

    return data.html
  } catch {
    return null
  } finally {
    clearTimeout(timeoutId)
  }
}
