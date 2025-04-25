import React from "react";
import "./FutureAsist.css";

const FutureAsist = () => {
  return (
    <div className="assistance-banner">
      {/* Left Side - Image */}
      <div className="assistance-banner-image">
        <img
         loading="lazy"
          src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/futher-assistance.svg"
          alt="Assistance"
          className="assistance-banner-img"
        />
      </div>

      {/* Right Side - Text and Button */}
      <div className="assistance-banner-content">
        <p className="brand-name-propertydekho247">PropertyDekho247</p>
        <h2 className="assistance-banner-title">Need Further Assistance?</h2>
        <p className="assistance-banner-text">
          Get expert guidance on listing, pricing, and selling your property.
          Our support team is here to ensure a smooth and successful sales
          experience.
        </p>
        <div className="assistance-banner-actions">
        <div className="assistance-banner-actions">
  <button
    className="assistance-banner-button"
    onClick={() => {
      window.open(
        "https://wa.me/7837840785?text=%20Hi%20PropertyDekho247%20Team%2C%20I%20need%20further%20assistance%2C%20Kindly%20get%20in%20touch%20with%20me.",
        "_blank"
      );
    }}
  >
    <img className="icon-btn" src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/whatapp.png" alt="whatsapp" />
    Whatsapp
  </button>
</div>


          <span className="assistance-banner-or">Or</span>
          <span className="assistance-banner-phone">+91 783-784-0785</span>
        </div>

      </div>
    </div>
  );
};

export default FutureAsist;
