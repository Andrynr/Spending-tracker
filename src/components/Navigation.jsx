import { Nav } from "react-bootstrap";

function Navigation() {
  return (
    <>
      <Nav>
        <Nav.Item>
          <Nav.Link
            eventKey="dashboard"
            className="
   d-flex flex-start bg-transparent"
          >
            <span>Tableau de bord</span>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            eventKey="setting"
            className="d-flex flex-start bg-transparent"
          >
            Paramètre
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Navigation;
