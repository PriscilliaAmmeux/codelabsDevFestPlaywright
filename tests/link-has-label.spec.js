import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.amazon.fr/");
});

// Vérifier que les liens sont visibles
test("Check that all links are visible", async ({ page }) => {
  // await page.goto('/');

  const links = await page.getByRole("link").all(); //getByRole('link') va récupérer tous les éléments <a>
  links.forEach((link) => {
    expect(link).toBeVisible();
  });
});

// Vérifier que les liens ont tous un label ou un title
test("Check that link has label or title", async ({ page }) => {
  // await page.goto('/');

  const links = await page.getByRole("link").all(); //getByRole('link') va récupérer tous les éléments <a>
  for (const link of links) {
    const text = (await link.textContent())?.trim(); //le .trim() va permettre d'épurer l'indentation
    if (text != null && text != "") {
      expect(link).toContainText(/.+/, { useInnerText: true });
    } else {
      expect(link).toHaveAttribute("aria-label");
    }

    // const label = await Label.getLabel(link);
    // console.log(label)
    // expect(label).toBeTruthy();
  }
});
