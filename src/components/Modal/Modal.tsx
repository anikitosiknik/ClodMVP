// import React, { useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";
import PropTypes, { InferProps } from "prop-types";
import "./Modal.css";

function Modal({ children, closeEvent }: InferProps<typeof Modal.propTypes>) {
  let root = document.getElementById("modal-root");
  const clickBgHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (event.target === event.currentTarget) return closeEvent()
  };

  if (root) {
    return ReactDOM.createPortal(
      <div className="modalBg" onClick={clickBgHandler}>
        <div className="modalContainer">{children}</div>
      </div>,
      root
    );
  } else return <div>modal window is broken(</div>;
}

Modal.propTypes = {
  children: PropTypes.element,
  closeEvent: PropTypes.func.isRequired,
};

export default Modal;
