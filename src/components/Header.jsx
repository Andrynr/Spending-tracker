import { Form, Button, Overlay, Popover } from "react-bootstrap";
import "../assets/css/Header.css";
import { useState, useRef } from "react";

function Header({ onAction, onShow }) {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const ButtonRevenue = () => {
    onAction("Revenue");
    onShow();
    setShow(false);
  };
  const ButtonDepense = () => {
    onAction("Dépense");
    onShow();
    setShow(false);
  };

  return (
    <>
      <div className="row justify-content-between m-2 mb-0 pt-2" id="header">
        <div className="col-auto">
          <h1>Suivi des dépenses</h1>
        </div>

        <div className="col-auto row my-auto">
          <div className="col-auto">
            <Form.Select>
              <option value="">2918 23</option>
              <option value="">2938 12</option>
            </Form.Select>
          </div>
          <div className="col-auto">
            <Button
              variant="primary"
              ref={target}
              onClick={() => setShow(!show)}
            >
              <span className="me-2">+</span>
              <span>Ajouter</span>
            </Button>
          </div>
          <Overlay target={target.current} show={show} placement="left">
            {(props) => (
              <Popover {...props}>
                <Popover.Header>Action</Popover.Header>
                <Popover.Body>
                  <div className="semi-circle d-flex justify-content-center align-items-center gap-2">
                    <Button onClick={ButtonRevenue}>Revenue</Button>
                    <Button onClick={ButtonDepense}>Dépense</Button>
                  </div>
                </Popover.Body>
              </Popover>
            )}
          </Overlay>
        </div>
      </div>
    </>
  );
}

export default Header;
