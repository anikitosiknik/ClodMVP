import React, { ReactElement } from "react";
import "./InputErrorWrapper.css";

export function InputErrorWrapper({
  children,
  isErrorShowed,
  errorMessage,
}: {
  children: ReactElement;
  isErrorShowed: boolean;
  errorMessage: string;
}) {
  return (
    <div className="InputErrorWrapper">
      <div className={`error ${isErrorShowed ? "showed" : ""}`}>
        {errorMessage}
      </div>
      {children}
    </div>
  );
}
