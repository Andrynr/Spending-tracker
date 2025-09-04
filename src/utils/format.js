export const format = (valeur) =>
  new Intl.NumberFormat("mg-Mg", {
    style: "currency",
    currency: "MGA",
    minimumFractionDigits: 0,
  }).format(valeur);

export const formatNombre = (valeur) =>
  new Intl.NumberFormat("fr-FR").format(valeur);
