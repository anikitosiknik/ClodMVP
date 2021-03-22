// import React, { useEffect } from "react";
import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import "./DesktopModal.css";

export default function Modal({
  children,
  closeEvent,
}: {
  children: JSX.Element | null;
  closeEvent: () => void;
}) {
  let root = document.getElementById("modal-root");
  const clickBgHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) return closeEvent();
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
