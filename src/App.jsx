import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Tab,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import "./App.css";
import Argent from "./components/Argent.jsx";
import Graph from "./components/Graph.jsx";
import Header from "./components/Header.jsx";
import Navigation from "./components/Navigation.jsx";
import Tableau from "./components/Tableau.jsx";
import TransacModal from "./components/TransacModal.jsx";
import { ISOtoDate } from "./utils/dateFormat.js";
import { deduireArgent, MAJArgents, modifArgents } from "./utils/MAJArgents.js";
import { modifTransaction, suprTransaction } from "./utils/MAJTransactions.js";

function App() {
  // ----------------------
  // Déclaration des états
  // ----------------------

  const [mShow, setMShow] = useState(false); // Affichage de la modal
  const [toast, setToast] = useState({ show: false, success: true }); // Affichage du toast(notification)
  const [action, setAction] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7)); // Date sélectionnés(YYYY-MM)

  // Données enregistrées(localStorage)
  const [transactions, setTransaction] = useState(() => {
    const savedTransac = JSON.parse(localStorage.getItem("transactions"));
    return savedTransac ? ISOtoDate(savedTransac) : [];
  });
  const [argents, setArgent] = useState(() => {
    const savedArgents = JSON.parse(localStorage.getItem("argents"));
    return savedArgents ? savedArgents : { solde: 0, revenue: 0, depense: 0 };
  });

  // Au premier rendu : si aucun argent n'est enregistré, ouvrir la modal avec "Solde"
  useEffect(() => {
    if (Object.values(argents).every((v) => v === 0)) {
      setAction("Solde");
      setMShow(true);
    }
  }, []);

  // Fonction : Valide la transaction
  const commit = (newTransac) => {
    try {
      setArgent(MAJArgents({ newTransac, argents }));
      setTransaction([...transactions, newTransac]);
      setToast({ show: true, success: true });
    } catch (error) {
      setToast({ show: true, success: false });
    }
  };

  const modifTransactions = (actionTrans, transac, ancienneTransaction) => {
    switch (actionTrans) {
      case "modifier":
        setTransaction(modifTransaction(transactions, transac));
        setArgent(modifArgents(argents, ancienneTransaction, transac));

        break;
      case "supprimer":
        setTransaction(suprTransaction(transactions, transac.date));

        if (transac.annuler) {
          setArgent(deduireArgent({ anciTransac: transac, argents }));
        }
        break;

      default:
        break;
    }
  };

  // Enregistrament local(argents, transactions)
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
                  <Tableau
                    transactions={transactions}
                    dates={dates}
                    modifTransactions={modifTransactions}
                  />
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
