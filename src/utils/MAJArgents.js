/**
 *
 * @param {Object} newTransac - Nouvelle transaction à effectuer
 * @param {Object} argents - Objet : Solde, Revenue, Dépense
 * @returns
 */
export const MAJArgents = ({ newTransac, argents }) => {
  let { solde, revenue, depense } = argents;

  switch (newTransac.type) {
    case "Solde":
      solde = newTransac.montant;
      break;
    case "Revenue":
      solde += newTransac.montant;
      revenue += newTransac.montant;
      break;
    case "Dépense":
      solde -= newTransac.montant;
      depense += newTransac.montant;
      break;
  }

  return { solde, revenue, depense };
};

/**
 *
 * @param {Object} anciTransac - Transaction : pour déduire le montant de $argents
 * @param {Object} argents - Solde, Revenue, Depense
 * @returns {Object} argents avec les valeurs déduites
 * - Solde
 * - Revenue
 * - Depense
 */
export const deduireArgent = ({ anciTransac, argents }) => {
  const tempTransac = {
    montant: -anciTransac.montant,
    type: anciTransac.type,
  };

  return MAJArgents({ newTransac: tempTransac, argents });
};

/**
 *
 * @param {Object} argents
 * @param {Object} anciTransac - Transaction avec l'ancienne montant
 * @param {Object} nouvTransac - Transaction avec le nouveau montant
 * @returns
 */
export const modifArgents = (argents, anciTransac, nouvTransac) => {
  // On déduit le montant de l'argent d'abord
  // Après on ajoute le nouveau montant
  const tmpArgents = deduireArgent({ anciTransac, argents });

  return MAJArgents({ argents: tmpArgents, newTransac: nouvTransac });
};
