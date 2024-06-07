import { expect, test } from "@playwright/test";
import { URLS } from "../Fixtures/url.fixtures";

test("All URLs have a defined lang", async ({ page }) => {
  for (const url of URLS) {
    await page.goto(url.url);

    expect(await page.locator("html")).toHaveAttribute("lang");
  }
});

test("lang selector is accssible", async ({ page }) => {
  for (const url of URLS) {
    await page.goto(url.url);

    const languages = await page.locator(".langues");
    const langLinks = await languages.getByRole("link").all();

    langLinks.forEach(async (lang) => {
      expect(lang).toHaveAttribute("lang");
    });
  }
});
