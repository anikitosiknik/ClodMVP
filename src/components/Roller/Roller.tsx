import React from "react";
import PropTypes from "prop-types";
import "./Roller.css";

export default function Roller({ color, style }: { color: string; style: {} }) {
  const circles = [...Array(8)].map((_, index) => {
    return (
      <div key={index}>
        <div className={"div-after"} style={{ background: color }}></div>
      </div>
    );
  });

  return (
    <div className="rollerContainer">
      <div className={`lds-roller `} style={{ ...style }}>
        {circles}
      </div>
    </div>
  );
}

Roller.propTypes = {
  color: PropTypes.string,
  style: PropTypes.object,
};

Roller.defaultProps = {
  color: "#699C8B",
  style: {},
};
