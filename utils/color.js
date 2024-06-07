export class Color {
  static RED = 0.2126;
  static GREEN = 0.7152;
  static BLUE = 0.0722;

  static GAMMA = 2.4;

  static contrast(rgb1, rgb2) {
    const lum1 = Color.luminance(rgb1.red, rgb1.green, rgb1.blue);
    const lum2 = Color.luminance(rgb2.red, rgb2.green, rgb2.blue);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return (brightest + 0.05) / (darkest + 0.05);
  }

  static async getColorAttribute(element) {
    const colors = await element.evaluate((e) => {
      return {
        color: window.getComputedStyle(e).getPropertyValue("color"),
        backgroundColor: window
          .getComputedStyle(e)
          .getPropertyValue("background-color"),
      };
    });

    return colors;
  }

  static getRGBFromCssProperties(colorCss) {
    colorCss = colorCss.replace("rgb(", "").replace(")", "");
    const colors = colorCss.split(",");

    const red = colors[0];
    const green = colors[1];
    const blue = colors[2];

    // Return the RGB values in an object
    return {
      red: red,
      green: green,
      blue: blue,
    };
  }

  static luminance(r, g, b) {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928
        ? v / 12.92
        : Math.pow((v + 0.055) / 1.055, Color.GAMMA);
    });

    return a[0] * Color.RED + a[1] * Color.GREEN + a[2] * Color.BLUE;
  }
}
