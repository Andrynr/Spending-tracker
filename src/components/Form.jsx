import { Button, Form, Stack } from "react-bootstrap";
import useForm from "../hooks/useForm";
import { categorieList } from "../utils/Categorie";

/**
 *
 * @param {function} ajoutTransac - Fonction recevant la nouvelle transaction
 * @param {string} transType - Type de transaction
 * @param {function} fermer - Ferme la modal
 * @param {function} modifTransactions - Fonction modificateur de transaction
 * @returns {jsx} - formulaire
 */

function Transaction({ ajoutTransac, transType, fermer, ancienneTransaction }) {
  // Déclaration des constantes
  const { values: newVals, handleChange } = useForm({
    montant: ancienneTransaction ? ancienneTransaction.montant : 0,
    libelle: ancienneTransaction ? ancienneTransaction.libelle : "",
    categorie: ancienneTransaction ? ancienneTransaction.categorie : "",
  });
  console.log(ancienneTransaction, newVals);

  // Type de transaction
  const newTransType = ancienneTransaction
    ? ancienneTransaction.type
    : transType;
  // Liste de categorie selon la type de transaction
  const categories = categorieList(newTransType);

  // Fonction - Gère la submission de la formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Evite les champs vides ou 0
    if (isNaN(newVals.montant) || newVals.montant <= 0) return;

    const transaction = {
      montant: newVals.montant,
      libelle: newVals.libelle,
      categorie: transType === "Solde" ? "Nouveau Solde" : newVals.categorie,
      date: ancienneTransaction ? ancienneTransaction.date : new Date(),
      type: newTransType,
    };

    if (ancienneTransaction) {
      ajoutTransac("modifier", transaction, ancienneTransaction);
    } else {
      ajoutTransac(transaction);
    }

    fermer();
  };

  return (
    <>
      <Form onSubmit={handleSubmit} method="POST" className="row g-2">
        <Form.Label>
          Entrez le Montant
          <Form.Control
            type="number"
            name="montant"
            value={newVals.montant > 0 ? newVals.montant : ""}
            onChange={handleChange}
            id="montant"
            autoFocus
          />
        </Form.Label>
        <Form.Label>
          Libellé
          <Form.Control
            type="text"
            name="libelle"
            value={newVals.libelle}
            onChange={handleChange}
            id="libelle"
          />
        </Form.Label>

        <Form.Select
          name="categorie"
          value={newVals.categorie}
          onChange={handleChange}
          id="categorie"
          className={`${transType === "Solde" ? "d-none" : ""}`}
        >
          <option value="" disabled>
            Catégorie
          </option>

          {categories.map((categorie, i) => (
            <option key={i} value={categorie}>
              {categorie}
            </option>
          ))}
        </Form.Select>
        <Stack direction="horizontal" className="justify-content-evenly pt-2">
          <Button type="submit" id="validation">
            Valider
          </Button>
          <Button onClick={() => fermer()}>Annuler</Button>
        </Stack>
      </Form>
    </>
  );
}

export default Transaction;
