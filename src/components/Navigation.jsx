import { Nav } from "react-bootstrap";

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
            <span className="my-auto">Tableau de bord</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="transactions"
            className="d-flex flex-start bg-transparent"
          >
            <span className="fs-5 me-md-2">🧮</span>
            <span>Transactions</span>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="setting" className="d-flex bg-transparent">
            <span className="fs-5 me-md-2">🛠</span>
            <span className="my-auto">Paramètre</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Navigation;
