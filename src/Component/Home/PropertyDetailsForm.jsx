import React, { useState } from "react";
import "./PropertyDetailsForm.css";

export default function PropertyDetailsForm() {
  const [bedrooms, setBedrooms] = useState(0);
  const [parking, setParking] = useState(0);

  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => {
    if (value > 0) setter(value - 1);
  };

  return (
    <div className="form-container">
      {/* Left Section Placeholder */}
      <div className="leftContainer">
        <div className="upperSection">
          <div className="heading"><h1>Get a <span>Free</span> Property Estimate - Known Your Property's Real Value</h1></div>
          <div className="paragraph"> <p>Thinking of Selling? Get an expert-estimated value of your property in minutes. Just fill in the Details, and our team will get back to you with a fair and transparent price extimate.</p></div>
        </div>
        <div className="lowerSection">
          <h4>WHAT YOU WILL GET HERE</h4>
      <div className="property-Container">
        <img
        src="/img/PropertyDetailsForm.svg"
        alt=""
        />
      {/* <div className="property-item independent-floors">Independent Floors</div>
      <div className="property-item penthouse">Pent House</div>
      <div className="property-item apartment">Apartment</div>
      <div className="property-item plots-villa">Plots & Villa</div>
      <div className="property-item studio-apartment">1 RK Studio Apartment</div> */}
    </div>
        </div>
      </div>

      
      <div className="form-section">
        <h2>Property Details</h2>

        <div className="form-grid">
          <select
          
           className="input">
            <option className="disabledButton"  disabled selected hidden>Property Type</option>
            <option >Type-1</option>
            <option >Type-2</option>
            <option >Type-3</option>
          </select>
          <input
            type="text"
            placeholder="Project Name/Locality/Sector"
            className="input"
          />
          <input
            type="text"
            placeholder="Property Size"
            className="input"
          />
          <select className="input">
            <option disabled selected hidden>Property Age</option>
            <option >0-5</option>
            <option>5-10</option>
            <option>10-15</option>
            <option>15-20</option>
          </select>
          <select className="input">
            <option disabled selected hidden>Furnishing Status</option>
            <option>Status-1</option>
            <option>Status-2</option>
          </select>
          <input
            type="text"
            placeholder="City & Locality"
            className="input"
          />

          <div className="counter">
            <label className="bedroom-counter">Bedrooms</label>
            <button onClick={() => decrement(setBedrooms, bedrooms)}>-</button>
            <span >{bedrooms}</span>
            <button onClick={() => increment(setBedrooms, bedrooms)}>+</button>
          </div>

          <div className="counter">
            <label>Parking</label>
            <button onClick={() => decrement(setParking, parking)}>-</button>
            <span >{parking}</span>
            <button onClick={() => increment(setParking, parking)}>+</button>
          </div>
        </div>

        <h2>Sellers Info</h2>

        <div className="form-grid">
          <input
            type="text"
            placeholder="First Name"
            className="input"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="input"
          />
          <input
          required
            type="number"
            pattern="[0-9]{10}"
            placeholder="Mobile No"
            className="input"
          />
          <select className="input">
            <option disabled selected  hidden>Preferred Contact Mode</option>
            <option>Mode-1</option>
            <option>Mode-2</option>
            <option>Mode-3</option>
          </select>
        </div>

        <button className="submit-button">Get Free Estimate</button>
      </div>
    </div>
  );
}
