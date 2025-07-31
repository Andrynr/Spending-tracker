import { Col, Row } from "react-bootstrap";
import AgtCard from "./AgtCard";

function Argent({ agts }) {
  const argents = [
    {
      titre: "Solde",
      valeur: agts.solde,
      icon: "💲",
      cardClass: "border-primary",
      titleClass: "",
    },
    {
      titre: "Revenue",
      valeur: agts.revenue,
      icon: "💰",
      cardClass: "border-success",
      titleClass: "text-success",
    },
    {
      titre: "Dépense",
      valeur: agts.depense,
      icon: "💸",
      cardClass: "border-warning",
      titleClass: "text-warning",
    },
  ];
  return (
    <>
      <Row className="justify-content-between my-3">
        {argents.map((argent, i) => (
          <Col key={i}>
            <AgtCard argent={argent} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Argent;
