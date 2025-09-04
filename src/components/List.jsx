import { Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "../assets/css/List.css";
import useForm from "../hooks/useForm";
import { categorieList } from "../utils/Categorie";
import { filtrer } from "../utils/Filtre";
import { format } from "../utils/format";

function List({ transactions, dates }) {
  const { values: filtres, handleChange } = useForm({
    date: new Date().toISOString().slice(0, 7),
    type: "",
    categorie: "",
    recherche: "",
  });

  const filtredTransactions = filtrer(
    transactions,
    filtres.date,
    filtres.type,
    filtres.categorie,
    filtres.recherche
  );
  filtredTransactions.reverse();
  const categories = categorieList(filtres.type);

  return (
    <>
      <h2 className="text-lg text-start fw-semibold">Liste des transactions</h2>
      <div className=" d-flex justify-content-between pt-3" id="liste">
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
          value={filtres.date}
          onChange={handleChange}
          name="date"
          id="date"
        >
          {dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </Form.Select>
      </div>

      <Table className="mt-2">
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
          {filtredTransactions && filtredTransactions.length > 0 ? (
            filtredTransactions?.map((transaction, i) => (
              <tr key={i}>
                <td>{++i}</td>
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
              <td colSpan={5}>
                <p className="text-center fs-4">Aucune transaction trouvée.</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}

export default List;
