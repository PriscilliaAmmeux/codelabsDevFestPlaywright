import { expect, test } from "@playwright/test";

// Vérifier que chaque champ de formulaire possède un libellé (via `aria-labelledby` ou `aria-label`)
test("Check that input has label", async ({ page }) => {
  await page.goto("https://www.amazon.fr/");

  const inputs = await page.locator("input").all();
  for (const input of inputs) {
    if (await input.isEditable()) {
      const labelSelector = await input.getAttribute("aria-labelledby");

      if (labelSelector !== null) {
        const label = await page.locator("#" + labelSelector);
        expect(label).toBeVisible();
        expect(label).not.toBeEmpty();
      } else {
        expect(input).toHaveAttribute("aria-label");
      }
    }
  }
});
