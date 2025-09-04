import { useEffect, useState } from "react";
import {
  Toast,
  Col,
  Container,
  Row,
  Tab,
  ToastContainer,
} from "react-bootstrap";
import "./App.css";
import Argent from "./components/Argent.jsx";
import Graph from "./components/Graph.jsx";
import Header from "./components/Header.jsx";
import List from "./components/List.jsx";
import Navigation from "./components/Navigation.jsx";
import TransacModal from "./components/TransacModal.jsx";
import { ISOtoDate } from "./utils/dateFormat.js";

function App() {
  const [mShow, setMShow] = useState(false);
  const [toast, setToast] = useState({ show: false, success: true });
  const [action, setAction] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7));

  // Données enregistrées
  const [transactions, setTransaction] = useState(() => {
    const savedTransac = JSON.parse(localStorage.getItem("transactions"));
    return savedTransac ? ISOtoDate(savedTransac) : [];
  });
  const [argents, setArgent] = useState(() => {
    const savedArgents = JSON.parse(localStorage.getItem("argents"));
    return savedArgents ? savedArgents : { solde: 0, revenue: 0, depense: 0 };
  });

  useEffect(() => {
    if (Object.values(argents).every((v) => v === 0)) {
      setAction("Solde");
      setMShow(true);
    }
  }, []);

  const MAJArgents = (newTransac) => {
    let { solde, revenue, depense } = argents;

    switch (action) {
      case "Solde":
        solde = newTransac.montant;
        break;
      case "Revenue":
        solde += newTransac.montant;
        revenue += newTransac.montant;
        break;
      case "Depense":
        solde -= newTransac.montant;
        depense += newTransac.montant;
        break;
    }

    return { solde, revenue, depense };
  };

  const commit = (newTransac) => {
    try {
      setArgent(MAJArgents(newTransac));
      setTransaction([...transactions, newTransac]);
      setToast({ show: true, success: true });
    } catch (error) {
      setToast({ show: true, success: false });
    }
  };

  useEffect(() => {
    localStorage.setItem("argents", JSON.stringify(argents));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions, argents]);

  // Gestion du modal du formulaire
  const handleModal = () => {
    setMShow(!mShow);
  };

  // Dates des transactions
  const dates = Array.from(
    new Set(transactions.map((item) => item.date.toISOString().slice(0, 7)))
  ).reverse();

  return (
    <>
      <Tab.Container defaultActiveKey="dashboard">
        <Row className=" m-0 align-content-start h-100">
          <Col md={3} className="bg-dark p-md-3" id="navigation">
            <Navigation />
          </Col>
          <Col md={9} className="min-vh-100">
            <Tab.Content>
              <Tab.Pane eventKey="dashboard">
                <ToastContainer
                  position="top-center"
                  className={`${toast.success ? "bg-success" : "bg-danger"} `}
                >
                  <Toast
                    show={toast.show}
                    onClose={() =>
                      setToast({ show: false, success: toast.success })
                    }
                    autohide
                    delay={3000}
                    className="w-auto"
                  >
                    <Toast.Header className="justify-content-between">
                      {toast.success
                        ? "Transaction réussie ✅"
                        : "Transaction échouée ❌"}
                    </Toast.Header>
                    <Toast.Body>
                      {toast.success
                        ? "La transaction s'est bien déroulé"
                        : "Il y a eu une erreur !!!"}
                    </Toast.Body>
                  </Toast>
                </ToastContainer>
                <Header
                  onAction={setAction}
                  onShow={handleModal}
                  dates={dates}
                  dateCrnt={setDate}
                />
                <TransacModal
                  mShow={mShow}
                  ajoutTransac={commit}
                  transType={action}
                  fermer={setMShow}
                />
                <Container fluid="md">
                  <Argent agts={argents} />
                </Container>

                <Container fluid="md">
                  <Graph transactions={transactions} date={date} />
                </Container>
              </Tab.Pane>

              <Tab.Pane eventKey="transactions">
                <Container fluid="md" className="py-3">
                  <List transactions={transactions} dates={dates} />
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
