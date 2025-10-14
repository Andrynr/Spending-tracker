import { Toast, ToastContainer } from "react-bootstrap";

function PopIn({ affiche, ferme, info, delay = 3000 }) {
  const position = info.position ? info.position : "top-center";

  return (
    <ToastContainer position={position} className={info.class}>
      <Toast
        show={affiche}
        onClose={ferme}
        autohide
        delay={delay}
        className="w-auto"
      >
        <Toast.Header className="justify-content-between">
          {info.titre}
        </Toast.Header>
        <Toast.Body>{info.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default PopIn;
