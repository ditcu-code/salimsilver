"use server"

import { ContactFormData, ContactFormResponse } from "./types"

/**
 * Validates contact form data
 * @param data The form data to validate
 * @returns An array of error messages, empty if valid
 */
function validateContactForm(data: ContactFormData): string[] {
  const errors: string[] = []
  const email = data.email?.trim() ?? ""
  const whatsapp = data.whatsapp?.trim() ?? ""

  if (!data.name?.trim()) {
    errors.push("Name is required")
  }

  if (!email && !whatsapp) {
    errors.push("Email or WhatsApp number is required")
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Invalid email format")
  }

  if (whatsapp && !/^\+?[0-9()\-\s]{8,20}$/.test(whatsapp)) {
    errors.push("Invalid WhatsApp number")
  }

  if (!data.message?.trim()) {
    errors.push("Message is required")
  } else if (data.message.length < 10) {
    errors.push("Message must be at least 10 characters long")
  }

  return errors
}

/**
 * Submits the contact form
 * @param data The form data to submit
 * @returns A response indicating success or failure
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactFormResponse> {
  try {
    // Validate form data
    const errors = validateContactForm(data)
    if (errors.length > 0) {
      return {
        success: false,
        message: errors.join("\n"),
      }
    }

    // TODO: Implement actual form submission logic here
    // For now, we'll just simulate a successful submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "An error occurred while submitting the form. Please try again later.",
    }
  }
}
