import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.amazon.fr/");
});

// Vérifier que chaque image est visible
test("Check that images are visible", async ({ page }) => {
  await page.goto("https://www.amazon.fr/");

  const images = await page.locator("img").all();
  images.forEach((img) => {
    expect(img).toBeVisible();
  });
});

// Vérifier que chaque image possède une attribut `alt`
test("Check that image has alt attribut", async ({ page }) => {
  await page.goto("https://www.amazon.fr/");

  const images = await page.locator("img").all();
  images.forEach(async (img) => {
    expect(img).toHaveAttribute("alt"); //l'attribut alt doit décrire l'image qu'il illustre

    const alt = await img.getAttribute("alt");
    expect(alt).toBeTruthy();
  });
});
