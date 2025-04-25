import React from 'react';
import './RentalBanner.css'; // Importing the external CSS file

const RentalBanner = () => {
  return (
    <div className="rental-banner-container">
      <div className="banner-content">
        {/* Left content section */}
        <div className="left-content">
          <h2 className="banner-heading">
            YOUR NEXT RENTAL HOME IS JUST A CLICK AWAY
          </h2>
          
          <div className="info-box">
            <p className="info-text">
              Find verified rental homes in Gurgaon with zero brokerage and real prices.
            </p>
          </div>

          <div className="feature-list">
            <div className="features">
              <div className="feature">
                <div className="feature-icon"></div>
                <span className="feature-text">Direct owner listings</span>
              </div>
             
            </div>
            <div className="features">
              <div className="feature">
                <div className="feature-icon"></div>
                <span className="feature-text">Zero Brokerage</span>
              </div>
             
            </div>
            
            <div className="features">
              <div className="feature">
                <div className="feature-icon"></div>
                <span className="feature-text">No Hidden Charges</span>
              </div>
             
            </div>

             
            <div className="features">
              <div className="feature">
                <div className="feature-icon"></div>
                <span className="feature-text">Legal Documentation</span>
              </div>
             
            </div>
          </div>
        </div>

        
        <div className="right-content">
          <div className="agent-image-container">
            <div className="agent-image">
              <img
                loading="lazy"
              src='/img/rentalbanner.svg'
              alt='rentalBanner'
              />
            </div>
          </div>
        </div>

        {/* <div className="decorative-box"></div> */}
      </div>
    </div>
  );
};

export default RentalBanner;
