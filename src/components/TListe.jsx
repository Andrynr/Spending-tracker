import "../assets/css/TListe.css";
import { format } from "../utils/format";
/**
 *Un tableau de transactions
 *
 * @param {Object} filtredTransactions - Tableau de transactions
 */

function TListe({ filtredTransactions, transModif }) {
  return (
    <>
      {filtredTransactions && filtredTransactions.length > 0 ? (
        filtredTransactions?.map((transaction, i) => (
          <tr key={i}>
            <td>{++i}</td>
            <td>{transaction.date.toLocaleString()}</td>
            <td className="overflow-auto">{transaction.libelle}</td>
            <td>{transaction.categorie}</td>
            <td>
              {format(
                transaction.type === "Dépense"
                  ? -transaction.montant
                  : transaction.montant
              )}
              <span className="ms-1 d-none">
                <button
                  className="btn btn-sm mx-0"
                  type="button"
                  onClick={() => transModif("modifier", transaction)}
                >
                  🖉
                </button>
                <button
                  className="btn btn-sm mx-0"
                  type="button"
                  onClick={() => transModif("supprimer", transaction)}
                >
                  🗑
                </button>
              </span>
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
    </>
  );
}
export default TListe;
