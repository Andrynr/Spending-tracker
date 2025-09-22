/**
 * Supprime une transactions par Date
 *
 * @param {Array} transactions
 * @param {Date} aSupprimerD
 * @returns
 */

export const suprTransaction = (transactions, aSupprimerD) => {
  return transactions.filter((item) => item.date !== aSupprimerD);
};

export const modifTransaction = (transactions, aModifier) => {
  return transactions.map((item) =>
    item.date === aModifier.date
      ? {
          ...item,
          libelle: aModifier.libelle,
          montant: aModifier.montant,
          categorie: aModifier.categorie,
        }
      : item
  );
};
