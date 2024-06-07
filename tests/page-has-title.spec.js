import { expect, test } from "@playwright/test";
import { URLS } from "../Fixtures/url.fixtures";

test("Root url has title", async ({ page }) => {
  await page.goto("https://www.amazon.fr/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(
    "Amazon.fr : livres, DVD, jeux vidéo, musique, high-tech, informatique, jouets, vêtements, chaussures, sport, bricolage, maison, beauté, puériculture, épicerie et plus encore !"
  ); //Favoriser le libellé exacte pour la non régression
});

test("All URLs have a title", async ({ page }) => {
  for (const url of URLS) {
    await page.goto(url.url);

    await expect(page).toHaveTitle(url.title);
    console.log(await page.title());
  }
});
