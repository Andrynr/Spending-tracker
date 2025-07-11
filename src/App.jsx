import { useState } from "react";
import "./App.css";
import { Tab, Container, Row, Col, Stack, Modal } from "react-bootstrap";
import List from "./components/List.jsx";
import Header from "./components/Header.jsx";
import Argent from "./components/Argent.jsx";
import Graph from "./components/Graph.jsx";
import Navigation from "./components/Navigation.jsx";
import TransacModal from "./components/TransacModal.jsx";

function App() {
  const [mShow, setMShow] = useState(false);

  const [transaction, setTransaction] = useState("");

  const [argent, setArgent] = useState({
    solde: 100000,
    revenue: 100000,
    depense: 0,
  });

  const [action, setAction] = useState("");

  const Depense = (dep) => {
    setArgent((prev) => ({
      ...prev,
      solde: argent.solde - dep,
      depense: argent.depense + dep,
    }));
  };

  const Transaction = (newTrans) => {
    const trans = {
      type: action,
      date: new Date(),
      categorie: "",
    };
    setTransaction([...transaction, newTrans]);
  };

  const Gain = (benefice) => {
    setArgent((prev) => ({
      ...prev,
      solde: argent.solde + benefice,
      revenue: argent.revenue + benefice,
    }));
  };

  const ajustement = (newSold) => {
    setArgent((prev) => ({ ...prev, solde: newSold }));
  };

  const commit = (newTransac) => {
    setArgent((prev) => ({
      ...prev,
      solde: argent.solde + newTransac.montant,
      revenue:
        newTransac.montant > 0
          ? argent.revenue + newTransac.montant
          : argent.revenue + 0,
      depense:
        newTransac.montant < 0
          ? argent.depense + newTransac.montant
          : argent.depense + 0,
    }));

    setTransaction([...transaction, newTransac]);
  };

  const handleModal = () => {
    setMShow(!mShow);
  };

  return (
    <>
      <Tab.Container defaultActiveKey="dashboard">
        <Row className=" h-100 m-0">
          <Col md={3} className="bg-dark p-3" id="navigation">
            <Navigation />
          </Col>
          <Col xs={9} className="row">
            <Tab.Content>
              <Tab.Pane eventKey="dashboard">
                <Header onAction={setAction} onShow={handleModal} />
                <TransacModal
                  mShow={mShow}
                  ajoutTransac={commit}
                  transType={action}
                  fermer={setMShow}
                />
                <Container>
                  <Row
                    direction="horizontal"
                    className="justify-content-between my-3"
                  >
                    <Col>
                      <Argent
                        titre="Solde"
                        valeur={argent.solde}
                        cardClass={"border-primary"}
                      />
                    </Col>
                    <Col>
                      <Argent
                        titre="Revenue"
                        valeur={argent.revenue}
                        cardClass={"border-success"}
                        titleClass={"text-success"}
                      />
                    </Col>
                    <Col>
                      <Argent
                        titre="Dépenses"
                        valeur={argent.depense}
                        cardClass={"border-warning"}
                        titleClass={"text-warning"}
                      />
                    </Col>
                  </Row>
                </Container>

                <Container>
                  <Graph />
                </Container>
                <List />
              </Tab.Pane>
              <Tab.Pane eventKey="setting">
                <h1>Ici les paramètres</h1>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

export default App;
