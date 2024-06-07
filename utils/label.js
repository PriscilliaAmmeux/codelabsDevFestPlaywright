import { Locator } from "@playwright/test";

export class Label {
  static async getLabel(element) {
    let label = (await element.innerText()).trim();
    if (label) return label;

    label = (await element.getAttribute("aria-label"))?.trim();
    if (label) return label;

    label = (await element.getAttribute("title"))?.trim();
    if (label) return label;

    return null;
  }
}
