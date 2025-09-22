/**
 * 
 * @param {Array} tableau 
 * @param {string} date 
 * @param {string} type 
 * @param {string} categ 
 * @param {string} recherche 
 * @returns {Array} - Tableau d'objet filtré
 */

export const filtrer = (tableau, date, type, categ, recherche) => {
  return tableau.filter((item) => {
    const memeDate = item.date.toISOString().slice(0, 7) === date;
    const memeType = !type || type === "All" || item.type === type;
    const memeCategorie = !categ || categ === "All" || item.categorie === categ;

    const rechercheMatch =
      !recherche ||
      Object.values(item).some((val) => {
        if (typeof val === "string") {
          return val.toLowerCase().includes(recherche.toLowerCase());
        }
        return false;
      });
    return memeDate && memeType && memeCategorie && rechercheMatch;
  });
};
