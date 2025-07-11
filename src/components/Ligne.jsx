import Button from "react-bootstrap";
function Li(transaction) {
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.libelle}</td>
      <td>{transaction.categorie}</td>
      <td>{transaction.montant}</td>
      <td>
        <Button type="button" value="🖊" />
        <Button type="button">⭐</Button>
      </td>
    </tr>
  );
}
