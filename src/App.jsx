import { useEffect, useRef, useState } from "react";
import { Alert, Col, Container, Row, Tab } from "react-bootstrap";
import "./App.css";
import Argent from "./components/Argent.jsx";
import Graph from "./components/Graph.jsx";
import Header from "./components/Header.jsx";
import List from "./components/List.jsx";
import Navigation from "./components/Navigation.jsx";
import TransacModal from "./components/TransacModal.jsx";

function App() {
  const [mShow, setMShow] = useState(false);
  const [action, setAction] = useState("");
  const [transactions, setTransaction] = useState([]);
  const dateRef = useRef(new Date().toISOString().slice(0, 7));
  const [dates, setdates] = useState(["2023-03", "2024-04", "2025-05"]);

  const [argents, setArgent] = useState({
    solde: 0,
    revenue: 0,
    depense: 0,
  });

  useEffect(() => {
    return () => {
      setAction("Solde");
      setMShow(true);
    };
  }, []);
  const dateCourant = (date) => {
    dateRef.current = date;
  };
  const commit = (newTransac) => {
    const newValeurs = {
      solde: argents.solde,
      revenue: argents.revenue,
      depense: argents.depense,
    };

    if (action === "Solde") {
      newValeurs.solde = newTransac.montant;
    } else if (action === "Revenue") {
      newValeurs.solde += newTransac.montant;
      newValeurs.revenue += newTransac.montant;
    } else {
      newValeurs.solde -= newTransac.montant;
      newValeurs.depense += newTransac.montant;
    }

    try {
      setArgent(newValeurs);
      setTransaction([...transactions, newTransac]);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    const newdates = Array.from(
      new Set(transactions.map((item) => item.date.toISOString().slice(0, 7)))
    );
    setdates(newdates);
  }, [transactions]);

  const handleModal = () => {
    setMShow(!mShow);
  };

  return (
    <>
      <Tab.Container defaultActiveKey="dashboard">
        <Row className=" m-0 h-100">
          <Col md={3} className="bg-dark p-md-3" id="navigation">
            <Navigation />
          </Col>
          <Col md={9}>
            <Tab.Content>
              <Tab.Pane eventKey="dashboard">
                <Header
                  onAction={setAction}
                  onShow={handleModal}
                  dates={dates}
                  dateCrnt={dateCourant}
                />
                <TransacModal
                  mShow={mShow}
                  ajoutTransac={commit}
                  transType={action}
                  fermer={setMShow}
                />
                <Container>
                  <Argent agts={argents} />
                </Container>

                <Container>
                  <Graph transactions={transactions} />
                </Container>
              </Tab.Pane>

              <Tab.Pane eventKey="transactions">
                <Container>
                  <List transactions={transactions} />
                </Container>
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
