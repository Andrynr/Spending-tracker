import { format } from "../utils/format";
import "../assets/css/AgtCard.css";

function AgtCard({ argent, rotation }) {
  return (
    <div
      className={`card py-0 px-1 argent ${argent.cardClass} ${rotation}`}
      id={argent.titre}
    >
      <div className="card-body p-2 pb-0">
        <p className="card-title">
          <span className="me-2">{argent.icon}</span>
          <span className={argent.titleClass}>{argent.titre}</span>
        </p>
        <p className="fs-2 fw-medium">{format(argent.valeur)}</p>
      </div>
    </div>
  );
}

export default AgtCard;
