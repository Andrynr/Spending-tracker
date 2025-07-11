import "../assets/css/Argent.css";

function Argent({ titre, icon, valeur, cardClass, titleClass }) {
  return (
    <>
      <div className={`card py-0 px-2 argent ${cardClass}`}>
        <div className="card-body p-2 pb-0">
          <p className="card-title">
            <span>{icon}</span>
            <span className={titleClass}>{titre}</span>
          </p>
          <p className="fs-2 fw-medium">
            {valeur} <span>Ar</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Argent;
