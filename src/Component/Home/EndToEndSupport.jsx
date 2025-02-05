import React from "react";
import "./EndToEndSupport.css";
const EndToEndSupport = () => {
  return (
    <>
      <div className="databox-sellertoseller">
        <h2 className="support-title underline-on-text">
          End-to-End <span style={{ color: "#0078d4" }}> Support </span>
        </h2>
      
      <div className="main-box-sellertoseller">
        <div className="support-container">
          {/* Left Side Image */}
          <div className="support-image">
            <img
              src="/img/EndToEndNewBuyer.svg"
              alt="Support illustration"
              className="main-image"
            />
          </div>

          {/* Right Side Content */}
          <div className="support-content">
            <ul className="features-list">
              {[ 
                "Dedicated Relationship Manager",
                "Site Visit Assistance",
                "Home Loan",
                "Documentation",
                "Registration",
                "Society Transfer",
              ].map((feature, index) => (
                <li key={index} className="feature-item">
                  <img
                    src="/img/tick-purple.png" // replace with the path to your checkmark icon
                    alt="checkmark"
                    className="checkmark-icon"
                  />
                  <span className="feature-text">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="brokerrafe-endtoend" >Brokerage applicable</p>
      </div>
    </>
  );
};

export default EndToEndSupport;
