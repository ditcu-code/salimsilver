import { createServer } from "node:http"

const port = 3100

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://127.0.0.1:${port}`)

  if (requestUrl.pathname === "/health") {
    response.writeHead(200, { "content-type": "text/plain" })
    response.end("ok")
    return
  }

  if (requestUrl.pathname !== "/instagram_oembed") {
    response.writeHead(404)
    response.end()
    return
  }

  const instagramUrl = requestUrl.searchParams.get("url")

  if (!instagramUrl || instagramUrl.includes("DbM0f2HzMt2")) {
    response.writeHead(503, { "content-type": "application/json" })
    response.end(JSON.stringify({ error: "fixture unavailable" }))
    return
  }

  const safeUrl = escapeHtml(instagramUrl)
  const html = `<blockquote class="instagram-media" data-instgrm-permalink="${safeUrl}?utm_source=ig_embed" data-instgrm-version="14"><div><a href="${safeUrl}">View this post on Instagram</a></div></blockquote>`

  response.writeHead(200, { "content-type": "application/json" })
  response.end(
    JSON.stringify({
      version: "1.0",
      author_name: "Salim Silver",
      author_url: "https://www.instagram.com/salimsilverofficial/",
      provider_name: "Instagram",
      provider_url: "https://www.instagram.com/",
      type: "rich",
      width: 540,
      html
    })
  )
})

server.listen(port, "127.0.0.1")

function closeServer() {
  server.close(() => process.exit(0))
}

process.on("SIGINT", closeServer)
process.on("SIGTERM", closeServer)
