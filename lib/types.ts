/**
 * Represents a jewelry in the gallery
 */
export interface Jewelry {
  /** Unique identifier for the jewelry */
  id: string
  /** Source path of the jewelry's photo */
  src: string
  /** Width of the photo in pixels */
  width: number
  /** Height of the photo in pixels */
  height: number
  /** Alt text for accessibility */
  alt: string
  /** Title of the jewelry item */
  title: string
  /** Description of the jewelry item */
  description?: string
  /** Material of the jewelry (e.g., "Sterling Silver 925") */
  material?: string
  /**
   * Dimensions of the item ({ width: number, height: number, depth: number })
   */
  dimensions?: { width: number; height: number; depth?: number; units?: string }
  /** Weight of the item in grams */
  weightGrams?: number
  /** Price of the item in USD (e.g., "120" or "120.00") */
  priceUsd?: number
  /** Estimated crafting time for the item, in hours */
  craftingTimeHours?: number
  /** Complexity of the item (e.g., "120+ individual silver threads soldered manually") */
  complexity?: string
  /** Origin of the piece (e.g., "Purbayan Workshop, Kotagede") */
  origin?: string
  /** Technique used to craft the jewelry (e.g., "100% Hand-twisted Filigree (Egg Technique)") */
  technique?: string
  /** Additional note or message about the piece */
  note?: string
}

/**
 * Represents a jewelry collection
 */
export interface Collection {
  /** Unique identifier for the collection */
  id: string
  /** URL-friendly slug for the collection */
  slug: string
  /** Title of the collection */
  title: string
  /** Short description for previews */
  description: string
  /** Full description for the collection page */
  fullDescription: string
  /** Path to the cover image */
  coverImage: string
  /** Array of tags for categorization */
  tags: string[]
  /** Whether the collection is featured on the homepage */
  featured: boolean
  /** List of jewelry items in the collection */
  jewelryList: Jewelry[]
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
