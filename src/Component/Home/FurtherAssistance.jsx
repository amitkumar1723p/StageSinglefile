import React from 'react';
import './FurtherAssistance.css'; // Import the CSS file

const FurtherAssistance = () => {
  return (
    <div className="further-assistance-container">
      <div className="further-assistance-left">
        <img src="/img/futher-assistance.svg" alt="Assistance" className="further-assistance-image" />
      </div>
      <div className="further-assistance-right">
        <h2 className="further-assistance-title">NEED FURTHER ASSISTANCE?</h2>
        <p className="further-assistance-description">
          Get expert guidance on listing, pricing, and selling your property. Our support team is here to ensure a smooth and successful sales experience.
        </p>
        <div className="further-assistance-contact">
          <a href="https://wa.me/917837840785" className="whatsapp-link">
            <button className="whatsapp-button">Whatsapp</button>
          </a>
          <span className="or-text">Or</span>
          <span className="contact-number">+91 783-784-0785</span>
        </div>
      </div>
    </div>
  );
};

export default FurtherAssistance;
