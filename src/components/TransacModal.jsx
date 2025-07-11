import { Modal } from "react-bootstrap";
import Transaction from "./Form.jsx";
import "../assets/css/TransacModal.css";

function TransacModal({ ajoutTransac, transType, fermer, mShow }) {
  return (
    <>
      <Modal
        id="soldeModif"
        size="sm"
        show={mShow}
        onHide={fermer}
        className=""
      >
        <Modal.Header closeButton>
          <Modal.Title>{transType}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Transaction
            ajoutTransac={ajoutTransac}
            transType={transType}
            fermer={fermer}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TransacModal;
