export const categorieList = (transacType) => {
  let categories = [];

  if (transacType === "Revenue") {
    categories = ["Revenue", "Salaire"];
  } else if (transacType === "Dépense") {
    categories = ["Nourriture", "Divertissement", "Santé", "Reparation"];
  } else if (transacType === "Solde") {
    categories = ["Nouveau Solde"];
  } else
    categories = [
      "Revenue",
      "Salaire",
      "Nourriture",
      "Divertissement",
      "Santé",
      "Reparation",
      "Nouveau Solde",
      "Autre",
    ];

  return categories;
};
