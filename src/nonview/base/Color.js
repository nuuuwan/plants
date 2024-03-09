import Random from "./Random.js";

export default class Color {
  static hsla(h, s, l) {
    return `hsla(${h},${s}%,${l}%)`;
  }
  static getRandomHSLTuple() {
    const h = Random.int(0, 240);
    const s = 100;
    const l = 75;

    return [h, s, l];
  }

  static getRandomHSL() {
    return Color.hsl(...Color.getRandomHSLTuple());
  }
  static hueToRGB(t1, t2, hue) {
    if (hue < 0) hue += 1;
    if (hue > 1) hue -= 1;
    if (hue < 1 / 6) return t1 + (t2 - t1) * 6 * hue;
    if (hue < 1 / 2) return t2;
    if (hue < 2 / 3) return t1 + (t2 - t1) * (2 / 3 - hue) * 6;
    return t1;
  }
  static hsl2rgb(hslaTuple) {
    let [h, s, l] = hslaTuple;
    s /= 100;
    l /= 100;

    if (s === 0) {
      // It's a shade of gray.
      l = Math.round(l * 255);
      return [l, l, l];
    }

    let t1, t2, r, g, b;
    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }
    t1 = 2 * l - t2;

    h /= 360;

    r = this.hueToRGB(t1, t2, h + 1 / 3);
    g = this.hueToRGB(t1, t2, h);
    b = this.hueToRGB(t1, t2, h - 1 / 3);

    const rgbaTuple = [
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255),
    ];
    return rgbaTuple;
  }

  static getRandomRGBATuple() {
    const [h, s, l] = Color.getRandomHSLTuple();
    const [r, g, b] = Color.hsl2rgb([h, s, l]);
    return [r, g, b];
  }

  static getRandomHex() {
    const [r, g, b] = Color.getRandomRGBATuple();
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  }
}
