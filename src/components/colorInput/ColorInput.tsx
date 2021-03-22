import React, { useState } from "react";
import "./colorInput.css";
import { userStringKeys } from "../../redux/types";
import { StringInputType } from "../userForm/UserForm";

function ColorInput(
  title: string,
  colors: { hex: string; name: string }[],
  key: userStringKeys,
  defaultValue?: string
): StringInputType {
  const [selectedColor, changeColor] = useState(defaultValue || "");

  return {
    element: (
      <div className="colorInput">
        <span className="colorInput-title">{title}</span>
        <div className="colorInput-circleContainer">
          {colors.map((color) => (
            <ColorCircle
              choosen={selectedColor === color.name}
              onClick={() => {
                changeColor(color.name);
              }}
              key={color.name}
              hex={color.hex}
            ></ColorCircle>
          ))}
        </div>
      </div>
    ),
    value: selectedColor,
    key,
  };
}

export default ColorInput;

function ColorCircle({
  hex,
  onClick,
  choosen,
}: {
  hex: string;
  onClick: ()=>void;
  choosen: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`colorCircle ${choosen ? "choosen" : ""}`}
      style={{ backgroundColor: hex }}
    ></div>
  );
}

