import { MetadataRoute } from "next"

import { BASE_URL } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/about`, lastModified: new Date() },
    { url: `${BASE_URL}/catalog`, lastModified: new Date() },
    { url: `${BASE_URL}/collections`, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, lastModified: new Date() },
    { url: `${BASE_URL}/store-location`, lastModified: new Date() },
  ]
}
