/**
 *
 * @param {object} newTransac - Nouvelle transaction à effectuer
 * @param {Array} argents - Tableau : Solde, Revenue, Dépense
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

export const deduireArgent = ({ anciTransac, argents }) => {
  const tempTransac = {
    montant: -anciTransac.montant,
    type: anciTransac.type,
  };

  return MAJArgents({ newTransac: tempTransac, argents });
};

export const modifArgents = (argents, anciTransac, nouvTransac) => {
  // On déduit le montant de l'argent d'abord
  // Après on ajoute le nouveau montant
  const tmpArgents = deduireArgent({ anciTransac, argents });

  return MAJArgents({ argents: tmpArgents, newTransac: nouvTransac });
};
