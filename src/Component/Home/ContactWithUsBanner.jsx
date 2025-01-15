import React from 'react';
import './ContactWithUsBanner.css';  // Import the corresponding CSS file

const ContactWithUsBanner = () => {
  return (
    <div className="contact-with-us-banner">
      <div className="image-container">
        <img src="/img/banner1rd.png" alt="Cityscape" className="image-1" />
        <div className="content-overlay">
          <h2>Properties are Everywhere</h2>
          {/* <p>Connecting you to the India’s most affordable properties at your door step</p> */}
          <button className="cta-button">Connect with Us</button>
        </div>
      </div>
      <div className="image-2-container">
        <img src="/img/banner2rd.png" alt="Couple" className="image-2" />
      </div>
      <div className="image-3-container">
        <img src="/img/banner3rd.png" alt="Person walking" className="image-3" />
      </div>
    </div>
  );
};

export default ContactWithUsBanner;
