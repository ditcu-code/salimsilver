import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1a120b 0%, #3c2a21 45%, #956a58 100%)",
          color: "#fdfbf7",
          position: "relative",
          padding: "80px 96px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 480,
            height: 480,
            right: -120,
            top: -140,
            borderRadius: "9999px",
            background: "radial-gradient(circle at 30% 30%, rgba(250, 247, 243, 0.15), rgba(17, 10, 6, 0.05))",
            filter: "blur(4px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 360,
            height: 360,
            left: -140,
            bottom: -120,
            borderRadius: "9999px",
            background: "radial-gradient(circle at 40% 40%, rgba(149, 106, 88, 0.25), rgba(17, 10, 6, 0.15))",
            filter: "blur(2px)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 26,
            maxWidth: 780,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(253, 251, 247, 0.75)",
            }}
          >
            Salim Silver
          </div>

          <div
            style={{
              fontSize: 70,
              lineHeight: 1.05,
              fontWeight: 700,
            }}
          >
            Handcrafted Javanese Jewelry
          </div>

          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(253, 251, 247, 0.9)",
            }}
          >
            Heritage silver pieces made by artisans in Kotagede, Yogyakarta. Rings, necklaces, and bracelets crafted with intention.
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginTop: 12,
              color: "rgba(253, 251, 247, 0.8)",
              fontSize: 22,
              letterSpacing: 2,
            }}
          >
            <div style={{ width: 60, height: 2, backgroundColor: "rgba(253, 251, 247, 0.35)" }} />
            <span>Kotagede - Yogyakarta</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}
