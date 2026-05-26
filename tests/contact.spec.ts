import { expect, test } from "@playwright/test"

test.describe("Contact Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact")
  })

  test("should display contact form fields", async ({ page }) => {
    // Check for Name input
    await expect(page.getByLabel("Name", { exact: true })).toBeVisible()

    // Check for Email input
    await expect(page.getByLabel("Email", { exact: true })).toBeVisible()

    // Check for Message textarea
    await expect(page.getByLabel("Message", { exact: true })).toBeVisible()

    // Check for Send Message button
    await expect(page.getByRole("button", { name: "Send Message" })).toBeVisible()
  })

  // We test the honeypot submission (Bot Path) because testing the happy path requires
  // a working Resend API key and sending real emails, which we want to avoid in tests.
  // The honeypot path verifies that the form submission logic works and creates a success state.
  test("should handle honeypot submission", async ({ page }) => {
    // Fill out the visible fields
    await page.getByLabel("Name", { exact: true }).fill("Test User")
    await page.getByLabel("Email", { exact: true }).fill("test@example.com")
    await page.getByLabel("Message", { exact: true }).fill("This is a test message.")

    // Fill out the honeypot field (hidden)
    // We need to use locator with name attribute since it's hidden and might not be interactable with normal fill if hidden
    // But Playwright's fill might complain if element is not visible.
    // Let's try to unhide it or use force: true, or just use evaluate to set value.
    const honeypot = page.locator('input[name="_gotcha"]')

    // Using evaluate to set value because the element is hidden via CSS
    await honeypot.evaluate((node) => {
        if (node instanceof HTMLInputElement) {
            node.value = "I am a bot"
        }
    })

    // Submit the form
    await page.getByRole("button", { name: "Send Message" }).click()

    // Expect success message
    await expect(page.getByText("Message sent successfully!")).toBeVisible()
  })

  test("should show validation error for invalid email", async ({ page }) => {
    // Disable HTML5 validation to test server-side validation
    await page.evaluate(() => {
      const form = document.querySelector("form")
      if (form) form.noValidate = true
    })

    // Fill out fields with invalid email
    await page.getByLabel("Name", { exact: true }).fill("Test User")
    await page.getByLabel("Email", { exact: true }).fill("invalid-email")
    await page.getByLabel("Message", { exact: true }).fill("This is a test message.")

    // Submit the form
    await page.getByRole("button", { name: "Send Message" }).click()

    // Expect validation error
    await expect(page.getByText("Invalid email address")).toBeVisible()
  })
})
