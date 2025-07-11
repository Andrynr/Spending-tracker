import { useState } from "react";
import { Form, Button, Stack } from "react-bootstrap";
import useForm from "../hooks/useForm";

function Transaction({ ajoutTransac, transType, fermer }) {
  const {
    values: newVals,
    handleChange,
    setValues,
  } = useForm({
    montant: 0,
    libelle: "",
    categorie: "",
  });

  const [transaction, settransaction] = useState({});
  const categories = ["Alimentation", "Revenue", "Divertissement", "Santé"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const valeur = Number(newVals.montant);

    if (isNaN(valeur) || valeur <= 0) return;

    const date = new Date();
    setValues((prev) => ({ ...prev, date: date }));

    if (transType === "Revenue") {
      setValues((prev) => ({ ...prev, montant: -valeur }));
    } else if (transType === "Dépense") {
      setValues((prev) => ({ ...prev, montant: valeur }));
    } else {
      ajustement(valeur);
    }

    ajoutTransac(newVals);

    fermer();
  };

  return (
    <>
      <Form onSubmit={handleSubmit} method="POST">
        <Form.Label>Entrez le Montant</Form.Label>
        <Form.Control
          type="number"
          name="montant"
          value={newVals.montant}
          onChange={handleChange}
          id="montant"
        />
        <Form.Label>Libellé</Form.Label>
        <Form.Control
          type="text"
          name="libelle"
          value={newVals.libelle}
          onChange={handleChange}
          id="libelle"
        />
        <Form.Select
          name="categorie"
          value={newVals.categorie}
          onChange={handleChange}
          id="categorie"
        >
          <option value="">Catégorie</option>
          {categories.map((categorie) => (
            <option key={categorie} value={categorie.toLocaleLowerCase()}>
              {categorie}
            </option>
          ))}
        </Form.Select>
        <Stack direction="horizontal" className="justify-content-evenly pt-2">
          <Button type="submit">Valider</Button>
          <Button onClick={() => fermer()}>Annuler</Button>
        </Stack>
      </Form>
    </>
  );
}

export default Transaction;
