import { Col, Row } from "react-bootstrap";
import AgtCard from "./AgtCard";
import { useEffect, useRef, useState } from "react";

function Argent({ agts }) {
  const [rotation, setRotation] = useState("");
  const [argents, setArgents] = useState([]);
  const prevSign = useRef(Math.sign(0));

  const newAgts = [
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

  const soldeMAJ = () => {
    if (Math.sign(agts.solde) !== Math.sign(prevSign.current)) {
      setRotation("rotation");
      setTimeout(() => {
        setRotation("");
        setArgents(newAgts);
      }, 700);
      prevSign.current = Math.sign(agts.solde);
    } else {
      setArgents(newAgts);
    }
  };

  useEffect(() => {
    soldeMAJ();
  }, [agts]);

  return (
    <>
      <Row className="justify-content-between my-3 gy-2">
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
