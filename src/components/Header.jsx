import { Form, Button, Overlay, Popover } from "react-bootstrap";
import "../assets/css/Header.css";
import { useState, useRef } from "react";
import { getMonth } from "../utils/dateFormat";

function Header({ onAction, onShow, dates, dateCrnt }) {
  const boutons = document.getElementById("boutons");
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
  const ButtonAjuste = () => {
    onAction("Solde");
    onShow();
    setShow(false);
  };
  window.addEventListener("click", (e) => {
    if (show && !boutons.contains(e.target)) {
      setShow(false);
    }
  });
  return (
    <>
      <div className="row justify-content-between m-2 mb-0 pt-2" id="header">
        <div className="col-auto">
          <h1>Suivi des dépenses</h1>
        </div>

        <div className="col-auto row my-auto">
          <div className="col-auto">
            <Form.Select
              onChange={(e) => dateCrnt(e.target.value)}
              className="text-capitalize"
              name="date"
            >
              {dates?.map((date, i) => (
                <option value={date} key={date}>
                  {getMonth(date)}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="col-auto" id="boutons">
            <div>
              <Button ref={target} onClick={() => setShow(!show)} id="ajouter">
                <span className="me-2">+</span>
                <span>Ajouter</span>
              </Button>
            </div>
            <Overlay target={target.current} show={show} placement="bottom">
              {(props) => (
                <Popover {...props} id="action">
                  <Popover.Body>
                    <div className="semi-circle d-flex flex-column gap-2">
                      <Button
                        onClick={ButtonRevenue}
                        variant="success"
                        id="revenue"
                      >
                        Revenue
                      </Button>
                      <Button
                        onClick={ButtonDepense}
                        variant="warning"
                        id="depense"
                      >
                        Dépense
                      </Button>
                      <Button onClick={ButtonAjuste} id="ajuste">
                        Ajuster
                      </Button>
                    </div>
                  </Popover.Body>
                </Popover>
              )}
            </Overlay>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
