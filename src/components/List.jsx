import Table from "react-bootstrap/Table";
import "../assets/css/List.css";

function List(params) {
  return (
    <>
      <div className=" d-flex justify-content-between" id="liste">
        <input type="text" placeholder="Rechercher" />
        <select name="categ">
          <option value="Alimentation">Alimentation</option>
          <option value="Revenue">Revenue</option>
          <option value="Divertissement">Divertissement</option>
          <option value="Sante">Santé</option>
        </select>
        <select name="" id="">
          <option value="All">Tous</option>
        </select>
        <select name="filtre" id=""></select>
      </div>

      <Table>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Libellé</th>
            <th scope="col">Catégorie</th>
            <th scope="col">Montant</th>
          </tr>
        </thead>
        <tbody>
          {/* transaction.map() */}
          <tr>
            <td>2021-05-23</td>
            <td>Supermarché</td>
            <td>Alimentation</td>
            <td>-50 OOO </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default List;
