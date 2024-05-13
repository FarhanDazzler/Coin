function randomColor(number, minDistance = 80) {
  const colors = {};

  function calculateDistance(color1, color2) {
    const r1 = color1.r;
    const g1 = color1.g;
    const b1 = color1.b;
    const r2 = color2.r;
    const g2 = color2.g;
    const b2 = color2.b;
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
  }

  function isColorUnique(color) {
    for (const existingColor of Object.values(colors)) {
      if (calculateDistance(color, existingColor) < minDistance) {
        return false;
      }
    }
    return true;
  }

  function generateUniqueColor() {
    let color;
    do {
      color = {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
      };
    } while (!isColorUnique(color) && rgbToHex(color)!="#ff7300" && rgbToHex(color)!="#00FF00" && rgbToHex(color)!="#ffc658");
    return color;
  }

  for (let i = 0; i < number; i++) {
    const color = generateUniqueColor();
    colors[i] = {
      hex: rgbToHex(color.r, color.g, color.b),
    };
  }
  function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  return colors;
}

module.exports = { randomColor };
