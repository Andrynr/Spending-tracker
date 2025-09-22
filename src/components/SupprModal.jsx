import { useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import useForm from "../hooks/useForm";

function SupprModal({ affiche, fermer, supprTransac }) {
  const {
    values: check,
    handleChange,
    resetForm,
  } = useForm({ checked: false });

  const confirmer = (e) => {
    e.preventDefault();

    supprTransac(check.checked);

    resetForm();
    fermer();
  };

  return (
    <Modal show={affiche} size="sm" onHide={fermer} id="ModalSuppression">
      <Modal.Header closeButton>
        <Modal.Title>Supprimer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={confirmer} method="POST">
          <div className="pb-2">
            <Form.Check className="d-flex align-items-center">
              <Form.Check.Input
                type="checkbox"
                value={check}
                onChange={handleChange}
                name="checked"
                id="def"
              />
              <Form.Check.Label className="ms-3">
                Annuler définitivement la transaction
              </Form.Check.Label>
            </Form.Check>
          </div>

          <Stack direction="horizontal" gap={2}>
            <Button onClick={() => fermer()} variant="secondary" autoFocus>
              Annuler
            </Button>
            <Button type="submit" variant="danger" className="ms-auto">
              Confirmer
            </Button>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SupprModal;
