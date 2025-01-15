import React from "react";
import "./FutureAsist.css";

const FutureAsist = () => {
  return (
    <div className="assistance-banner">
      {/* Left Side - Image */}
      <div className="assistance-banner-image">
        <img
          src="/img/futher-assistance.svg"
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
          <button
            className="assistance-banner-button"
            onClick={() => {
              window.open(
                "https://wa.me/9560509397?text=Hello%20Propfuture%20AI%20Technologies,%20I%20would%20like%20to%20know%20more%20about%20the%20opportunity.",
                "_blank"
              );
            }}
          >
            <img className="icon-btn" src="/img/whatapp.png" alt="whatsapp" />
           Whatsapp
          </button>

          <span className="assistance-banner-or">Or</span>
          <span className="assistance-banner-phone">+91 783-784-0785</span>
        </div>
      </div>
    </div>
  );
};

export default FutureAsist;
