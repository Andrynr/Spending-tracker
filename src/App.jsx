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
import { getDates, ISOtoDate } from "./utils/dateFormat.js";
import {
  deduireArgent,
  initialise,
  MAJArgents,
  modifArgents,
} from "./utils/MAJArgents.js";
import { modifTransaction, suprTransaction } from "./utils/MAJTransactions.js";
import Parametre from "./components/Parametre.jsx";
import PopIn from "./components/PopIn.jsx";

function App() {
  // ----------------------
  // Déclaration des états
  // ----------------------

  const [mShow, setMShow] = useState(false); // Affichage de la modal
  const [popIn, setPopIn] = useState({ show: false, info: {} }); // Affichage du toast(notification)
  const [action, setAction] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7)); // Date sélectionnés(YYYY-MM)

  // ----------------------
  //Déclaration des constantes
  // Pop-in de réinitialisation
  const erreurReinit = {
    class: "bg-danger mb-5",
    position: "bottom-center",
    titre: "Réinitialisation échouée ❌",
    message: "Il y a eu une erreur lors de la réinitialisation",
  };
  const succesReinit = {
    class: "bg-success mb-5",
    position: "bottom-center",
    titre: "Réinitialisation réussie ✅",
    message: "La réinitialisation a été effectuée avec succès ",
  };
  // Pop-in de transaction
  const erreurTransac = {
    class: "bg-danger",
    titre: "Transaction échouée ❌",
    message: "Il y a eu une erreur lors de la transaction !!!",
  };
  const succesTransac = {
    class: "bg-success",
    titre: "Transaction réussie ✅",
    message: "La transaction a été effectuée avec succès ",
  };
  // -------------------------------

  // Données enregistrées(localStorage)
  const [transactions, setTransaction] = useState(() => {
    const savedTransac = JSON.parse(localStorage.getItem("transactions"));
    return savedTransac ? ISOtoDate(savedTransac) : [];
  });
  const [argents, setArgent] = useState(() => {
    const savedArgents = JSON.parse(localStorage.getItem("argents"));
    return savedArgents ? savedArgents : initialise();
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
      setPopIn({ show: true, info: succesTransac });
    } catch (error) {
      setPopIn({ show: true, info: erreurTransac });
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
  const dates = getDates(transactions);
  if (!dates.some((d) => d === new Date().toISOString().slice(0, 7)))
    dates.unshift(new Date().toISOString().slice(0, 7));

  const reinitialise = (aReinit) => {
    try {
      if (aReinit.argents) setArgent(initialise);
      if (aReinit.transacs) setTransaction([]);
      setPopIn({ show: true, info: succesReinit });
    } catch (error) {
      setPopIn({ show: true, info: erreurReinit });
    }
  };

  return (
    <>
      <PopIn
        info={popIn.info}
        affiche={popIn.show}
        ferme={() => setPopIn({ ...popIn, show: false })}
      />
      <Tab.Container defaultActiveKey="dashboard">
        <Row className=" m-0 align-content-start h-100">
          <Col md={3} className="bg-dark p-md-3" id="navigation">
            <Navigation />
          </Col>
          <Col md={9} className="min-vh-100">
            <Tab.Content>
              <Tab.Pane eventKey="dashboard">
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
                <Parametre reinitialise={reinitialise} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

export default App;
