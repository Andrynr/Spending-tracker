/**
 * Supprime une transaction par Date
 *
 * @param {Array} transactions
 * @param {Date} aSupprimerD
 * @returns Un tableau avec la transaction supprimer
 */

export const suprTransaction = (transactions, aSupprimerD) => {
  return transactions.filter((item) => item.date !== aSupprimerD);
};

/**
 * Modifie une transaction
 *
 * @param {Array} transactions - Tableau de transactions
 * @param {Object} aModifier - La transaction à modifier
 * @returns {Array} Un Tableau avec la transaction modifier
 */
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
