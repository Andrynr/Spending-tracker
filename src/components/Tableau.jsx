import { useState } from "react";
import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "../assets/css/List.css";
import useForm from "../hooks/useForm";
import { categorieList } from "../utils/Categorie";
import { getMonth } from "../utils/dateFormat";
import { filtrer } from "../utils/Filtre";
import SupprModal from "./SupprModal";
import TListe from "./TListe";
import TransacModal from "./TransacModal";

function Tableau({ transactions, dates, modifTransactions }) {
  // Déclaration des states pour le filtre
  const { values: filtres, handleChange } = useForm({
    date: new Date().toISOString().slice(0, 7),
    type: "",
    categorie: "",
    recherche: "",
  });

  // Appliquer les filtres
  const filtredTransactions = filtrer(
    transactions,
    filtres.date,
    filtres.type,
    filtres.categorie,
    filtres.recherche
  );
  filtredTransactions.reverse(); // Récente d'abord

  const categories = categorieList(filtres.type); // Catégories selon la type de transaction

  // ----------------------------------------
  // Modification d'une transaction
  // ----------------------------------------
  const [anciTrans, setAnciTrans] = useState({});

  // Gestionnaire des modals
  const [modifModal, setModifModal] = useState(false);
  const [supprModal, setSupprModal] = useState(false);

  const transModif = (typeDeMod, ancienne) => {
    setAnciTrans(ancienne);

    switch (typeDeMod) {
      case "modifier":
        setModifModal(true);
        break;
      case "supprimer":
        setSupprModal(true);
        break;
      default:
        break;
    }
  };

  // Fonction qui finalise les paramètres de la suppression
  const passeLaSuppression = (annuler) => {
    const transac = {
      ...anciTrans,
      annuler: annuler,
    };
    modifTransactions("supprimer", transac);
  };

  return (
    <>
      <h2 className="text-lg text-start fw-semibold">Liste des transactions</h2>
      <div className=" d-flex justify-content-between pt-3" id="filtre">
        <Form.Control
          type="text"
          placeholder="Rechercher"
          value={filtres.recherche}
          name="recherche"
          onChange={handleChange}
        />
        <Form.Select
          value={filtres.categorie}
          onChange={handleChange}
          name="categorie"
        >
          <option value="All">Tout</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          value={filtres.type}
          onChange={handleChange}
          name="type"
          id="type"
        >
          <option value="All">Tous</option>
          <option value="Revenue">Revenue</option>
          <option value="Dépense">Dépense</option>
        </Form.Select>
        <Form.Select
          className="text-capitalize"
          value={filtres.date}
          onChange={handleChange}
          name="date"
          id="date"
        >
          {dates.map((date) => (
            <option key={date} value={date}>
              {getMonth(date)}
            </option>
          ))}
        </Form.Select>
      </div>

      <Table className="mt-2 table-responsive table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Libellé</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Montant</th>
          </tr>
        </thead>
        <tbody>
          <TListe
            filtredTransactions={filtredTransactions}
            transModif={transModif}
          />
        </tbody>
      </Table>
      <footer className="sticky-bottom">
        <span
          className="px-2 shadow-lg w-auto rounded-pill"
          style={{ cursor: "default" }}
        >
          <span>{filtredTransactions.length}</span> transactions
        </span>
      </footer>

      {/* Modals */}

      <TransacModal
        ajoutTransac={modifTransactions}
        ancienneTransaction={anciTrans}
        mShow={modifModal}
        transType="Modification"
        fermer={() => setModifModal(false)}
      />
      <SupprModal
        supprTransac={passeLaSuppression}
        affiche={supprModal}
        fermer={() => setSupprModal(false)}
      />
    </>
  );
}

export default Tableau;
