import Table from "react-bootstrap/Table";
import "../assets/css/List.css";
import { format } from "../utils/format";

function List({ transactions }) {
  return (
    <>
      <div className=" d-flex justify-content-between pt-3" id="liste">
        <input type="text" placeholder="Rechercher" />
        <select name="categ">
          <option value="All">Catégorie</option>
          <option value="Alimentation">Alimentation</option>
          <option value="Divertissement">Divertissement</option>
          <option value="Sante">Santé</option>
          <option value="Revenue">Ajouter +</option>
        </select>
        <select name="TTF" id="TTF">
          <option value="All">Tous</option>
          <option value="Revenue">Revenue</option>
          <option value="Dépense">Dépense</option>
        </select>
        <select name="filtre" id=""></select>
      </div>

      <Table className="mt-2">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Libellé</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Montant</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, i) => (
              <tr key={i}>
                <td>{transaction.date.toLocaleString()}</td>
                <td>{transaction.libelle}</td>
                <td>{transaction.categorie}</td>
                <td>
                  {format(
                    transaction.type === "Dépense"
                      ? -transaction.montant
                      : transaction.montant
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <p className="text-center fs-4">
                  Aucune transaction effectué pour le moment
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default List;
