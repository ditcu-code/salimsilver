import { readFileSync } from "fs"
import { ImageResponse } from "next/og"
import { join } from "path"

// Robust font fetching function
async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error("failed to load font data")
}

export async function generateOgImage(title: string, description: string) {
  const bgPath = join(process.cwd(), "public/images/og-background.jpg")
  const bgBuffer = readFileSync(bgPath)
  const bgBase64 = `data:image/jpeg;base64,${bgBuffer.toString("base64")}`

  // Load fonts
  const [cormorantFont, latoFont] = await Promise.all([
    loadGoogleFont("Cormorant Garamond:wght@700", title),
    loadGoogleFont("Lato:wght@400", `Salim Silver ${description} Kotagede - Yogyakarta`),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: '"Lato", sans-serif',
          display: "flex",
          width: "100%",
          height: "100%",
          color: "#fdfbf7",
          position: "relative",
          overflow: "hidden",
          backgroundImage: `url(${bgBase64})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        />

        {/* Content Wrapper */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: "80px 96px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 26,
              maxWidth: 780,
            }}
          >
            <div
              style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: 22,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "rgba(253, 251, 247, 0.85)",
              }}
            >
              Salim Silver
            </div>

            <div
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 80,
                lineHeight: 1,
                fontWeight: 700,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontFamily: '"Lato", sans-serif',
                fontSize: 28,
                lineHeight: 1.35,
                color: "rgba(253, 251, 247, 0.95)",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {description}
            </div>

            <div
              style={{
                fontFamily: '"Lato", sans-serif',
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 12,
                color: "rgba(253, 251, 247, 0.9)",
                fontSize: 22,
                letterSpacing: 2,
              }}
            >
              <div style={{ width: 60, height: 2, backgroundColor: "rgba(253, 251, 247, 0.6)" }} />
              <span>Kotagede - Yogyakarta</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Cormorant Garamond",
          data: cormorantFont,
          style: "normal",
          weight: 700,
        },
        {
          name: "Lato",
          data: latoFont,
          style: "normal",
          weight: 400,
        },
      ],
    },
  )
}
