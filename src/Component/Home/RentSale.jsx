import React from "react";
import "./RentSale.css";

const RentSale = () => {
  return (
    <div className="rent-sale-container">
      <div className="property-image-section">
        <div className="property-image">
          <img
                      loading="lazy" src="./img/Rent-sale.svg" alt="img" />
        </div>
      </div>
      <div className="property-info-section">
        <h2 className="property-info-title">
          List Your Property with PropertyDekho247.com
        </h2>
        <p className="property-info-subtitle">
          Reach Thousands of Potential Buyers and Renters – Let Us Help You Get
          the Best
        </p>
        <p className="property-info-details">
          Ready to sell or rent out your property? Future Property simplifies
          the process, from listing to closing. Gain maximum exposure and secure
          the best value with us.
        </p>
        <p className="property-info-footer">
          Let <span className="property-highlight">PropertyDekho247.com</span>{" "}
          turn your listing into an opportunity.
        </p>
      </div>
    </div>
  );
};

export default RentSale;
