import { format } from "../utils/format";
import "../assets/css/AgtCard.css";
import { Card } from "react-bootstrap";
/**
 *
 * @param {object} argent
 * -cardClass - Classe de la carte
 * -titre
 * -icon
 * -titleClass - Classe du titre
 * -valeur - valeur de l'argent
 */
function AgtCard({ argent, rotation }) {
  return (
    <Card
      className={` py-0 px-1 argent h-scale ${argent.cardClass} ${rotation}`}
      id={argent.titre}
    >
      <Card.Body className=" p-2 pb-0">
        <Card.Title>
          <span className="me-2">{argent.icon}</span>
          <span className={argent.titleClass}>{argent.titre}</span>
        </Card.Title>
        <Card.Text className="fs-2 fw-medium">
          {format(argent.valeur)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AgtCard;
