import { expect, test } from "@playwright/test";

// Vérifier que la barre de recherche de notre application est parfaitement accessible via le l'attribut html `role="searchbox"`
test("Access to search bar with tab", async ({ page }) => {
  await page.goto("https://www.amazon.fr/");

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");

  const activeElement = await page.evaluate(() => {
    return document.activeElement;
  });

  console.log(activeElement);
  activeElement?.setAttribute("value", "toto");
  //await activeElement.fill('Toto');
});

// Vérifier que la barre de recherche de notre application est parfaitement accessible via le l'attribut html `role="searchbox"`
test("Fill search bar", async ({ page }) => {
  await page.goto("/");

  const searchForm = await page.getByRole("search");
  const searchInput = await searchForm.locator("input");

  expect(searchInput).toBeVisible();
  expect(searchInput).not.toBeDisabled();

  await searchInput.fill("My search");
});
