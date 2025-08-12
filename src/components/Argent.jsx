import { Col, Row } from "react-bootstrap";
import AgtCard from "./AgtCard";
import { useEffect, useRef, useState } from "react";

function Argent({ agts }) {
  const [rotation, setRotation] = useState("");
  const SouD = useRef();
  SouD.current = agts.solde >= 0;

  const argents = [
    {
      titre: agts.solde < 0 ? "Dette" : "Solde",
      valeur: Math.abs(agts.solde),
      icon: "💲",
      cardClass: agts.solde < 0 ? "border-danger" : "border-primary",
      titleClass: agts.solde < 0 ? "text-danger dette" : "",
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
  // Animation si signe de solde change
  useEffect(() => {
    setRotation("rotation");

    const timer = setTimeout(() => {
      setRotation("");
    }, 700);
    return () => clearTimeout(timer);
  }, [SouD.current]);

  return (
    <>
      <Row className="justify-content-between my-3">
        {argents.map((argent, i) => (
          <Col key={i}>
            <AgtCard argent={argent} rotation={rotation} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Argent;
