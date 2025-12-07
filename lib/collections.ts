import type { Collection, Jewelry } from "./types"

// Raw Catalog Data
const CATALOG_DATA = {
  Jewelry: [
    {
      slug: "silver-filigree-ruby-cuff-bracelet-salimsilver",
      title: "The Filigree Sunburst Cuff: An Artisan Statement Piece with Ruby",
      desc: "Handcrafted silver filigree cuff bracelet featuring a large, hammered silver disc with an intricate central filigree pattern and a deep red ruby gemstone. The openwork band is adorned with delicate silver scrollwork.",
      category: "bracelets",
    },
    {
      slug: "hand-carved-silver-floral-relief-cuff-bracelet-salimsilver",
      title: "The Trinity Floral Cuff: An Artisan Silver Statement",
      desc: "Artisan sterling silver cuff bracelet defined by three interlocking circles with intricate floral repoussé relief work. The design emphasizes the depth of the metal and fine craftsmanship.",
      category: "bracelets",
    },
    {
      slug: "silver-seahorse-charm-bracelet-salimsilver",
      title: "The Coastal Artisan: A Silver Seahorse Charm Bracelet",
      desc: "Silver seahorse charm bracelet with metallic texture and intricate detailing on the charms and chain. A piece that evokes an artisanal and luxurious feel.",
      category: "bracelets",
    },
    {
      slug: "silver-gold-floral-lotus-brooch-salimsilver",
      title: "The Gilded Bloom: Silver and Gold Lotus Flower Brooch",
      desc: "Two-tone floral brooch with a textured gold top layer of petals over a silver base, featuring a detailed beaded center.",
      category: "brooches",
    },
    {
      slug: "hand-carved-silver-pearl-brooch-salimsilver",
      title: "The Moonlight Heirloom: Silver and Pearl Filigree Brooch",
      desc: "Intricate silver filigree brooch adorned with lustrous pearls and cool metallic tones, emphasizing artisanal craftsmanship.",
      category: "brooches",
      hidden: true,
    },
    {
      slug: "hand-carved-silver-moonstone-brooch-salimsilver",
      title: "The Moonlit Hand Carved: An Artisan Silver Moonstone Brooch",
      desc: "Ornate silver brooch with a central moonstone cabochon and intricate metalwork.",
      category: "brooches",
    },
    {
      slug: "baroque-pearl-citrine-silver-brooch",
      title: "The Luminous Baroque: Artisan Pearl and Citrine Brooch",
      desc: "Handcrafted silver brooch featuring lustrous baroque pearls and faceted yellow citrine gemstones arranged in an intricate, swirling floral motif.",
      category: "brooches",
    },
    {
      slug: "silver-ruby-filigree-earrings-salimsilver",
      title: "Golden Hour Embrace: Organic Amber Filigree Earrings",
      desc: "Gold organic-shaped earrings with amber gemstones. The design highlights the metallic sheen and organic forms.",
      category: "earrings",
    },
    {
      slug: "silver-mamuli-earrings-salimsilver",
      title: "The Hand Carved Mamuli: Handcrafted Silver Spiral Earrings",
      desc: "Handcrafted silver Mamuli earrings featuring hammered textures and spiral motifs.",
      category: "earrings",
    },
    {
      slug: "silver-dragonfly-amethyst-drop-earrings-salimsilver",
      title: "The Twilight Garden: Silver Dragonfly & Amethyst Earrings",
      desc: "Intricate sterling silver drop earrings with a floral stud and dragonfly motif, anchored by a deep purple amethyst.",
      category: "earrings",
    },
    {
      slug: "silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver",
      title: "The Hibiscus Locket: A Hand Carved Silver Statement Piece",
      desc: "Open silver locket featuring intricate hibiscus floral engravings and a deep purple stone.",
      category: "pendants",
    },
    {
      slug: "silver-pendant-labradorite-eye-dot-jewelry-salimsilver",
      title: "The Celestial Shield: Granulated Silver Pendant with Labradorite Eye",
      desc: "Handcrafted sterling silver pendant featuring a circular 'shield' design with intricate granulation beads radiating from a central, bezel-set labradorite stone. The silver boasts a rich antique finish.",
      category: "pendants",
    },
    {
      slug: "silver-seahorse-pendant-amber-salimsilver",
      title: "The Maritime Dual: Artisan Silver Seahorse Pendant",
      desc: "Intricate silver double-seahorse pendant featuring amber and green gemstone accents with detailed metal texture.",
      category: "pendants",
    },
    {
      slug: "hand-carved-silver-rings-couple-salimsilver",
      title: "The Carved Couple: Artisan Carved Silver & White Gemstone Rings",
      desc: "Hand-carved sterling silver rings featuring deep, oxidized organic vine engravings and bezel-set clear gemstones.",
      category: "rings",
    },
    {
      slug: "silver-pagoda-ring-pearl-salimsilver",
      title: "The Sanctuary: Sterling Silver Pagoda Ring with Pearl Finial",
      desc: "Sculptural silver ring crafted in the shape of a miniature tiered pagoda with intricate metalwork, tiled roofing, and window cutouts, crowned with a lustrous peach pearl.",
      category: "rings",
    },
    {
      slug: "hand-carved-silver-turquoise-ring-salimsilver",
      title: "The Verde Filigree: An Artisanal Silver and Turquoise Statement Ring",
      desc: "Substantial silver ring set with three round turquoise cabochons, featuring intricate floral filigree and an aged patina.",
      category: "rings",
    },
  ],
}

// Helper to filter and map data to Jewelry type
function getJewelryByCategory(category: string): Jewelry[] {
  return CATALOG_DATA.Jewelry.filter(
    (item) => item.category === category && !(item as any).hidden,
  ).map((item) => ({
    id: item.slug,
    slug: item.slug,
    src: `/images/catalog/${item.slug}.webp`,
    width: 1200,
    height: 1200,
    alt: item.title,
    title: item.title,
    description: item.desc,
    material: "Sterling Silver 925",
    priceUsd: 150, // Placeholder price
  }))
}

// Collections data
const collections: Collection[] = [
  {
    id: "1",
    slug: "rings",
    title: "Rings",
    description: "Handcrafted silver rings",
    fullDescription:
      "Our collection of handcrafted silver rings features intricate designs inspired by traditional Javanese craftsmanship. Each piece is a unique statement of elegance.",
    coverImage: "/images/catalog/hand-carved-silver-rings-couple-salimsilver.webp",
    tags: ["Silver", "Rings", "Handcrafted"],
    featured: true,
    jewelryList: getJewelryByCategory("rings"),
  },
  {
    id: "2",
    slug: "pendants",
    title: "Pendants",
    description: "Artisan silver pendants",
    fullDescription:
      "Discover our range of sterling silver pendants, from delicate designs to bold statement pieces. Perfect for any occasion.",
    coverImage:
      "/images/catalog/silver-hibiscus-locket-purple-stone-pendant-necklace-salimsilver.webp",
    tags: ["Silver", "Pendants", "Necklaces"],
    featured: true,
    jewelryList: getJewelryByCategory("pendants"),
  },
  {
    id: "3",
    slug: "bracelets",
    title: "Bracelets",
    description: "Artisan silver bracelets",
    fullDescription:
      "Adorn your wrists with our artisan silver bracelets. Featuring woven patterns and gemstone accents.",
    coverImage: "/images/catalog/silver-filigree-ruby-cuff-bracelet-salimsilver.webp",
    tags: ["Silver", "Bracelets", "Cuffs"],
    featured: true,
    jewelryList: getJewelryByCategory("bracelets"),
  },
  {
    id: "4",
    slug: "brooches",
    title: "Brooches",
    description: "Elegant silver brooches",
    fullDescription:
      "Timeless elegance with our handcrafted silver brooches. Perfect for adding a touch of sophistication to any outfit.",
    coverImage: "/images/catalog/silver-gold-floral-lotus-brooch-salimsilver.webp",
    tags: ["Silver", "Brooches", "Accessories"],
    featured: false,
    jewelryList: getJewelryByCategory("brooches"),
  },
  {
    id: "5",
    slug: "earrings",
    title: "Earrings",
    description: "Handcrafted silver earrings",
    fullDescription:
      "Complete your look with our stunning silver earrings. From studs to drops, each pair is crafted with care.",
    coverImage: "/images/catalog/silver-dragonfly-amethyst-drop-earrings-salimsilver.webp",
    tags: ["Silver", "Earrings", "Jewelry"],
    featured: false,
    jewelryList: getJewelryByCategory("earrings"),
  },
]

// Export functions
export const getAllCollections = (): Collection[] => collections
export const getFeaturedCollections = (): Collection[] =>
  collections.filter((collection) => collection.featured)
export const getCollection = (slug: string): Collection | undefined =>
  collections.find((collection) => collection.slug === slug)
export const getAllTags = (): string[] =>
  Array.from(new Set(collections.flatMap((collection) => collection.tags)))
