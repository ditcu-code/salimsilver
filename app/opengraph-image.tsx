import { readFileSync } from "fs"
import { ImageResponse } from "next/og"
import { join } from "path"

export const runtime = "nodejs"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function OpengraphImage() {
  const bgPath = join(process.cwd(), "public/images/og-background.jpg")
  const bgBuffer = readFileSync(bgPath)
  const bgBase64 = `data:image/jpeg;base64,${bgBuffer.toString("base64")}`

  // Load fonts
  // We fetch specific weights: Cormorant Garamond Bold (700) and Lato Regular (400)
  const [cormorantFont, latoFont] = await Promise.all([
    fetch(new URL("https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/CormorantGaramond-Bold.ttf", import.meta.url)).then((res) => res.arrayBuffer()),
    fetch(new URL("https://github.com/google/fonts/raw/main/ofl/lato/Lato-Regular.ttf", import.meta.url)).then((res) => res.arrayBuffer()),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: '"Lato", sans-serif', // Default to Lato
          display: "flex",
          width: "100%",
          height: "100%",
          color: "#fdfbf7",
          position: "relative",
          padding: "80px 96px",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <img
          src={bgBase64}
          alt="Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

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

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 26,
            maxWidth: 780,
            zIndex: 10,
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
              fontSize: 80, // Increased slightly for the serif font
              lineHeight: 1,
              fontWeight: 700,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Handcrafted Javanese Jewelry
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
            Heritage silver pieces made by artisans in Kotagede, Yogyakarta. Rings, necklaces, and bracelets crafted with intention.
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
    ),
    {
      ...size,
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
