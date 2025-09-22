/**
 * Générateur de couleur
 *
 * @param {Number} nbr
 * @param {Number} saturation
 * @param {Number} lightness
 * @returns
 */
export const generateColors = (nbr, saturation = 60, lightness = 60) => {
  const colors = [];
  const step = 360 / nbr;

  for (let i = 0; i < nbr; i++) {
    const hue = Math.round(i * step);
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};
