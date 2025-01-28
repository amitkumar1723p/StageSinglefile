import React from "react";
import "./Loader.css";
export default function Loader({ className = "" }) {
  return (
    <div className={className}>
      {/* <span className={`loader`}></span> */}
      <span className="loader">  </span>
    </div>
  );
}
