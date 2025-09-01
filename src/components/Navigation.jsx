import { Nav } from "react-bootstrap";
import "../assets/Navigation.css";

function Navigation() {
  return (
    <>
      <Nav className="d-md-block justify-content-around justify-content-md-start">
        <Nav.Item>
          <Nav.Link
            eventKey="dashboard"
            className="d-flex flex-start bg-transparent"
          >
            <span className="fs-5 me-md-2">📊</span>
            <span className="my-auto d-none d-md-flex">Tableau de bord</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="transactions"
            className="d-flex flex-start bg-transparent"
          >
            <span className="fs-5 me-md-2">🧮</span>
            <span className="d-none d-md-flex">Transactions</span>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            eventKey="setting"
            className="d-flex bg-transparent disabled text-secondary"
          >
            <span className="fs-5 me-md-2">🛠</span>
            <span className="my-auto d-none d-md-flex">Paramètre</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Navigation;
