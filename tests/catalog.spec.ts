import { expect, test } from '@playwright/test';

test.describe('Catalog Page', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/catalog');
  });

  test('category filtering', async ({ page }) => {
    // Wait for the gallery to load
    const gallery = page.locator('.react-photo-album');
    await expect(gallery).toBeVisible();

    // Check "All Jewelry" is active initially
    const allBtn = page.getByRole('button', { name: 'All Jewelry' });
    await expect(allBtn).toHaveClass(/bg-primary/);

    // Target specifically the category filter buttons within the container
    // Based on CategoryFilters.tsx class structure
    const filtersContainer = page.locator('.overflow-x-auto.no-scrollbar');
    const categoryButtons = filtersContainer.locator('button');
    
    // Check if we have more than just "All Jewelry"
    const count = await categoryButtons.count();
    console.log(`Found ${count} category buttons.`);

    // If we have a second button (meaning we have collections)
    if (count > 1) {
        const secondButton = categoryButtons.nth(1);
        const categoryName = await secondButton.innerText();
        console.log(`Clicking category: ${categoryName}`);
        
        await secondButton.click();

        // Expect the clicked button to become active
        await expect(secondButton).toHaveClass(/bg-primary/);
        // Expect "All" to be inactive
        await expect(allBtn).toHaveClass(/bg-secondary/);
    } else {
        console.log("Skipping filtering test: Only 'All Jewelry' category found.");
    }
  });

  test('product lightbox navigation', async ({ page }) => {
    // Wait for at least one photo to be visible
    const firstImage = page.locator('.react-photo-album img').first();
    await expect(firstImage).toBeVisible();

    // Click the first product image
    await firstImage.click();

    // Expect lightbox to open (role="dialog")
    const lightbox = page.getByRole('dialog', { name: 'Jewelry photo viewer' });
    await expect(lightbox).toBeVisible();

    // Expect URL to update with query param
    await expect(page).toHaveURL(/\?jewelry=/);

    // Close the lightbox
    await page.getByRole('button', { name: 'Close' }).click();

    // Expect lightbox to close
    await expect(lightbox).toBeHidden();

    // Expect URL to revert (query param removed)
    await expect(page).not.toHaveURL(/\?jewelry=/);
  });
});
