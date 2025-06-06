import React from "react";
import "./Tooltip.css"; // You can style your tooltip as needed

const Tooltip = ({ text }) => {
  return <div className="tooltip">{text}</div>;
};

export default Tooltip;
