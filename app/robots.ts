import { MetadataRoute } from "next"

import { BASE_URL } from "@/lib/constants"

const baseUrl = BASE_URL

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
