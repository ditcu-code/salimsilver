import { DomUtils, parseDocument } from "htmlparser2"

const DEFAULT_INSTAGRAM_OEMBED_ENDPOINT =
  "https://graph.facebook.com/v25.0/instagram_oembed"
const INSTAGRAM_OEMBED_REVALIDATE_SECONDS = 86_400
const INSTAGRAM_OEMBED_TIMEOUT_MS = 5_000

const ALLOWED_INSTAGRAM_EMBED_ATTRIBUTES: Readonly<
  Record<string, ReadonlySet<string>>
> = {
  a: new Set(["href", "style", "target"]),
  blockquote: new Set([
    "class",
    "data-instgrm-captioned",
    "data-instgrm-permalink",
    "data-instgrm-version",
    "style"
  ]),
  div: new Set(["style"]),
  g: new Set(["fill", "fill-rule", "stroke", "stroke-width", "transform"]),
  p: new Set(["style"]),
  path: new Set(["d"]),
  svg: new Set([
    "height",
    "version",
    "viewbox",
    "width",
    "xmlns",
    "xmlns:xlink"
  ])
}
const URL_ATTRIBUTES = new Set([
  "action",
  "formaction",
  "href",
  "src",
  "xlink:href"
])
const UNSAFE_STYLE_VALUE =
  /(?:expression\s*\(|url\s*\(\s*["']?\s*(?:data|javascript|vbscript):)/i

type InstagramOEmbedResponse = {
  provider_name?: unknown
  html?: unknown
}

function normalizePathname(pathname: string) {
  return pathname.replace(/\/+$/, "")
}

function isInstagramHostname(hostname: string) {
  return hostname === "instagram.com" || hostname.endsWith(".instagram.com")
}

function isSafeInstagramUrl(value: string) {
  try {
    const parsedUrl = new URL(value)

    return (
      parsedUrl.protocol === "https:" && isInstagramHostname(parsedUrl.hostname)
    )
  } catch {
    return false
  }
}

function isOfficialInstagramPermalink(
  permalink: string | undefined,
  requestedUrl: string
) {
  if (!permalink) return false

  try {
    const parsedPermalink = new URL(permalink)
    const parsedRequestedUrl = new URL(requestedUrl)

    return (
      isSafeInstagramUrl(permalink) &&
      parsedRequestedUrl.protocol === "https:" &&
      isInstagramHostname(parsedRequestedUrl.hostname) &&
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
    const allowedAttributes = ALLOWED_INSTAGRAM_EMBED_ATTRIBUTES[element.name]

    if (!allowedAttributes) return false

    for (const [attributeName, attributeValue] of Object.entries(
      element.attribs
    )) {
      if (attributeName.startsWith("on")) return false
      if (!allowedAttributes.has(attributeName)) return false
      if (
        URL_ATTRIBUTES.has(attributeName) &&
        !isSafeInstagramUrl(attributeValue)
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
  let endpoint: URL

  try {
    endpoint = new URL(
      process.env.INSTAGRAM_OEMBED_ENDPOINT ?? DEFAULT_INSTAGRAM_OEMBED_ENDPOINT
    )
  } catch {
    return null
  }

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
