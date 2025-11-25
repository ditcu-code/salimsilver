import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Salim Silver | Handcrafted Javanese Jewelry',
    short_name: 'Salim Silver',
    description: 'Discover handcrafted silver rings, necklaces, and bracelets from Kotagede, Yogyakarta.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFBF7',
    theme_color: '#1A1A1A',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
