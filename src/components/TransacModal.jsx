import { Modal } from "react-bootstrap";
import Transaction from "./Form.jsx";
import "../assets/css/TransacModal.css";

function TransacModal({
  ajoutTransac,
  transType,
  fermer,
  mShow,
  ancienneTransaction,
}) {
  return (
    <>
      <Modal id="soldeModif" size="sm" show={mShow} onHide={fermer}>
        <Modal.Header closeButton>
          <Modal.Title>{transType}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Transaction
            ajoutTransac={ajoutTransac}
            transType={transType}
            fermer={fermer}
            ancienneTransaction={ancienneTransaction}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TransacModal;
