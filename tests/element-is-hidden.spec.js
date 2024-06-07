import { expect, test } from "@playwright/test";

// Vérifier que chaque champ de formulaire possède un libellé (via `aria-labelledby` ou `aria-label`)
test("An element is hidden", async ({ page }) => {
  await page.goto("https://www.amazon.fr/");

  const icons = await page.locator('i[class="icon"]').all();
  for (const icon of icons) {
    if (!(await icon.isVisible())) {
      expect(icon).toHaveAttribute("aria-hidden");

      const hidden = await icon.getAttribute("aria-hidden");
      console.log(hidden);
      expect(hidden).toBeTruthy();
    }
  }
});
