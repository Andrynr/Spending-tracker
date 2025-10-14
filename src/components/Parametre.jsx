import { Button, Container, Form, Stack, Toast } from "react-bootstrap";
import useForm from "../hooks/useForm";
import { useState } from "react";

function Parametre({ reinitialise }) {
  // Déclaration du state des champs du formulaire
  const { values, handleChange, resetForm } = useForm({
    Argent: false,
    Transaction: false,
  });

  // --------------------------
  // Gestion du Pop-in
  // Etat d'affichage du Pop-in
  const [show, setShow] = useState(false);
  // Données du Pop-in
  const erreurPopIn = {
    class: "bg-danger",
    titre: "Réinitialisation échouée ❌",
    message: "Il y a eu une erreur lors de la réinitialisation",
  };
  const succesPopIn = {
    class: "bg-success",
    titre: "Réinitialisation réussie ✅",
    message: "La réinitialisation s'est bien déroulée ",
  };
  // Fonction qui gère l'affichage
  const PopIn = () => {
    setShow(true);
  };

  // Fonction de validation de la réinitialisation
  const valider = (e) => {
    e.preventDefault();
    const reinit = {
      argents: values.Argent,
      transacs: values.Transaction,
    };

    resetForm();
    reinitialise(reinit);
  };

  // Booléen du bouton Réinitialiser
  const disabled = Object.values(values).some((v) => v === true);

  return (
    <>
      <Container>
        <h1 className="display-4 p-2">Paramètres</h1>

        <Form onSubmit={valider} onReset={resetForm} className="p-2">
          <Form.Check className="d-flex justify-content-between">
            <Form.Check.Label>Réinitialiser l'argent</Form.Check.Label>
            <Form.Check.Input
              name="Argent"
              value={values.Argent}
              onChange={handleChange}
            ></Form.Check.Input>
          </Form.Check>
          <Form.Check className="d-flex justify-content-between">
            <Form.Check.Label>
              Réinitialiser la liste des transactions
            </Form.Check.Label>
            <Form.Check.Input
              name="Transaction"
              value={values.Transaction}
              onChange={handleChange}
            ></Form.Check.Input>
          </Form.Check>
          <Stack
            direction="horizontal"
            className="justify-content-end m-3"
            gap={2}
          >
            <Button type="reset" variant="secondary">
              Décocher
            </Button>
            <Button type="submit" variant="danger" disabled={!disabled}>
              Réinitialiser
            </Button>
          </Stack>
        </Form>
      </Container>
    </>
  );
}

export default Parametre;
