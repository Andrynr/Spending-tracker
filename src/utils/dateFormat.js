export const getMonth = (monthStr) => {
  const [year, month] = monthStr.split("-");
  const date = new Date(year, month - 1);

  return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
};

export const ISOtoDate = (tableau) => {
  return tableau.map((item) => ({ ...item, date: new Date(item.date) }));
};
