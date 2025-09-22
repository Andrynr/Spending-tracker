/**
 *
 * @param {String} monthStr - Une date en string
 * @returns Une date en format local (ex: Septembre 2025)
 */
export const getMonth = (monthStr) => {
  const [year, month] = monthStr.split("-");
  const date = new Date(year, month - 1);

  return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
};

// String to Date
export const ISOtoDate = (tableau) => {
  return tableau.map((item) => ({ ...item, date: new Date(item.date) }));
};
