// Formater un montant
export const format = (valeur) =>
  new Intl.NumberFormat("fr-Fr", {
    style: "currency",
    currency: "MGA",
    minimumFractionDigits: 0,
  }).format(valeur);

// Formater un nombre
export const formatNombre = (valeur) =>
  new Intl.NumberFormat("fr-FR").format(valeur);
