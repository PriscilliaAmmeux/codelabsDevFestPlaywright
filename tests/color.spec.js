import { expect, test } from "@playwright/test";
import { URLS } from "../Fixtures/url.fixtures";

import { Color } from "../utils/color";

test("Check ratio contrast", async ({ page }) => {
  for (const url of URLS) {
    await page.goto(url.url);

    const texts = await page.locator("p").all();

    texts.forEach(async (text) => {
      const colors = await Color.getColorAttribute(text);
      const colorRgb = Color.getRGBFromCssProperties(colors.color);
      const bgColorRgb = Color.getRGBFromCssProperties(colors.backgroundColor);
      const ratio = Color.contrast(colorRgb, bgColorRgb);

      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  }
});
