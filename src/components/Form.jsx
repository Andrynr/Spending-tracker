import { useEffect, useState } from "react";
import { Form, Button, Stack } from "react-bootstrap";
import useForm from "../hooks/useForm";

function Transaction({ ajoutTransac, transType, fermer }) {
  const { values: newVals, handleChange } = useForm({
    montant: 0,
    libelle: "",
    categorie: "",
  });

  let categories = [];

  if (transType === "Revenue") {
    categories = ["Revenue", "Salaire", "Autre"];
  } else if (transType === "Dépense") {
    categories = ["Alimentation", "Divertissement", "Santé", "Reparation"];
  } else {
    categories = ["Nouveau Solde"];
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(newVals.montant) || newVals.montant <= 0) return;

    const transaction = {
      montant: newVals.montant,
      libelle: newVals.libelle,
      categorie: transType === "Solde" ? "Nouveau Solde" : newVals.categorie,
      date: new Date(),
      type: transType,
    };

    ajoutTransac(transaction);

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
            <option key={i} value={categorie.toLocaleLowerCase()}>
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
