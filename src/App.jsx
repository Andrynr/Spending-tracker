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
  const [dates, setdates] = useState([]);

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
      setToast({ show: true, success: true });
    } catch (error) {
      setToast({ show: true, success: false });
    }
  };

  useEffect(() => {
    localStorage.setItem("argents", JSON.stringify(argents));
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

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
                <Container>
                  <Argent agts={argents} />
                </Container>

                <Container>
                  <Graph transactions={transactions} date={date} />
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
