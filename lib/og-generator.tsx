import { readFileSync } from "fs"
import { ImageResponse } from "next/og"
import { join } from "path"
import sharp from "sharp"

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

const styles = {
  container: {
    fontFamily: '"Lato", sans-serif',
    display: "flex",
    width: "100%",
    height: "100%",
    color: "#fdfbf7",
    position: "relative",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  contentWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: "80px 96px",
    zIndex: 10,
  },
  contentInner: {
    display: "flex",
    flexDirection: "column",
    gap: 26,
    maxWidth: 780,
  },
  brand: {
    fontFamily: '"Lato", sans-serif',
    fontSize: 22,
    letterSpacing: 6,
    textTransform: "uppercase",
    color: "rgba(253, 251, 247, 0.85)",
  },
  title: {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: 80,
    lineHeight: 1,
    fontWeight: 700,
    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  description: {
    fontFamily: '"Lato", sans-serif',
    fontSize: 28,
    lineHeight: 1.35,
    color: "rgba(253, 251, 247, 0.95)",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },
  footer: {
    fontFamily: '"Lato", sans-serif',
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginTop: 12,
    color: "rgba(253, 251, 247, 0.9)",
    fontSize: 22,
    letterSpacing: 2,
  },
  footerLine: {
    width: 60,
    height: 2,
    backgroundColor: "rgba(253, 251, 247, 0.6)",
  },
} as const

export async function generateOgImage(
  title: string,
  description: string,
  imagePath: string = "public/images/og-background.jpg"
) {
  const bgPath = join(process.cwd(), imagePath)
  const fileBuffer = readFileSync(bgPath)
  // Resize background to avoid large base64 string causing WASM crash
  const bgBuffer = await sharp(fileBuffer).resize(1200).jpeg({ quality: 80 }).toBuffer()
  const bgBase64 = `data:image/jpeg;base64,${bgBuffer.toString("base64")}`

  // Load fonts
  const [cormorantFont, latoFont] = await Promise.all([
    loadGoogleFont("Cormorant Garamond:wght@700", title),
    loadGoogleFont("Lato:wght@400", `Salim Silver ${description} Kotagede - Yogyakarta`),
  ])

  const imageResponse = new ImageResponse(
    <div
      style={{
        ...styles.container,
        backgroundImage: `url(${bgBase64})`,
      }}
    >
      {/* Dark Overlay */}
      <div style={styles.overlay} />

      {/* Content Wrapper */}
      <div style={styles.contentWrapper}>
        <div style={styles.contentInner}>
          <div style={styles.brand}>Salim Silver</div>

          <div style={styles.title}>{title}</div>

          <div style={styles.description}>{description}</div>

          <div style={styles.footer}>
            <div style={styles.footerLine} />
            <span>Kotagede - Yogyakarta</span>
          </div>
        </div>
      </div>
    </div>,
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
    }
  )

  const arrayBuffer = await imageResponse.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  // Convert to JPEG using sharp with quality 80 to ensure size < 300KB
  const compressedBuffer = await sharp(buffer).jpeg({ quality: 80 }).toBuffer()

  return new Response(compressedBuffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, immutable, no-transform, max-age=31536000",
    },
  })
}
