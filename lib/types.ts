/**
 * Represents a jewelry in the gallery
 */
export type JewelryStatus = "available" | "sold" | "reserved" | "hidden"
export type MaterialType = "gold" | "silver" | "copper" | "brass"

export interface Jewelry {
  /** Unique identifier for the jewelry (UUID) */
  id: string
  collectionId: string
  /** URL-friendly slug for the jewelry */
  slug: string
  /** Title of the jewelry item */
  title: string
  /** Description of the jewelry item */
  description?: string
  /** Material of the jewelry (enum) */
  material?: MaterialType
  /** Purity of the material (e.g. "925", "24k") */
  materialPurity?: string
  /** Weight of the item in grams */
  weightGrams?: number
  /** Estimated crafting time for the item, in hours */
  craftingTimeHours?: number
  /** Year the item was made */
  productionYear?: number
  /** Status of the item */
  status: JewelryStatus
  /** JSON variants (e.g. sizes) */
  variants?: any

  /**
   * Images are now fetched from jewelry_images table.
   * We typically join them or fetch them separately.
   * For the frontend, we might want to attach them here nicely.
   */
  images?: JewelryImage[]
  /** Helper to easily get the main cover image URL */
  coverImage?: string
}

export interface JewelryImage {
  id: string
  jewelryId: string
  src: string
  displayOrder: number
}

/**
 * Represents a jewelry collection
 */
export interface Collection {
  /** Unique identifier for the collection (UUID) */
  id: string
  /** URL-friendly slug for the collection */
  slug: string
  /** Title of the collection */
  title: string
  /** Short description for previews */
  description?: string
  /**
   * ID of the jewelry_image used as cover.
   * In frontend, we often resolve this to the actual URL string 'coverImage'
   */
  coverImageId?: string
  /** Resolved cover image URL */
  coverImage?: string

  /** Whether the collection is featured on the homepage */
  featured: boolean

  /** List of jewelry items in the collection (optional, if fetched) */
  jewelryList?: Jewelry[]
}

/**
 * Contact form data
 */
export interface ContactFormData {
  /** Name of the person contacting */
  name: string
  /** Email address for response */
  email: string
  /** Subject of the message */
  subject: string
  /** Message content */
  message: string
}

/**
 * Response from the contact form submission
 */
export interface ContactFormResponse {
  /** Whether the submission was successful */
  success: boolean
  /** Message to display to the user */
  message: string
}

/**
 * Represents a blog post
 */
export interface Post {
  id: string
  slug: string
  title: string
  excerpt?: string
  content?: string
  cover_image_url?: string
  published: boolean
  published_at?: string
  author_id?: string
  created_at: string
  updated_at: string
  /** SEO Title (optional, falls back to title) */
  meta_title?: string
  /** SEO Description */
  meta_description?: string
  /** Array of tags for the post */
  tags?: string[]
  /** Whether the post is featured on the blog homepage */
  featured?: boolean
}
