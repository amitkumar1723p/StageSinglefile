import React from "react";
import './RentalHome.css'; // Import the corresponding CSS file

const RentalHome = () => {
  return (
    <div className="rental-home-main-container">
      <div className="rental-home-container">
        <div className="rental-home-left-container">
          <div className="rental-home-heading">
            <h2 className="rental-home-main-heading">
              Say Goodbye to <br />
              <span className="rental-home-highlight-text">Brokerage-</span>
            </h2>
          </div>

          <div className="rental-home-heading">
            <p className="rental-home-sub-heading">
              Rent Smart with <br />
              <span className="rental-home-highlight-text">Property Dekho 24/7!</span>
            </p>
          </div>

          <div className="rental-home-description">
            <p>Find your perfect home without paying extra. 100% verified listings, direct owners deals, and seamless rental experience!</p>
            <button className="rental-home-browse-button">Browse Properties</button>
          </div>
        </div>

        <div className="rental-home-right-container">
          <div className="rental-home-feature-container">
            <div className="rental-home-feature-item">
              <div className="rental-home-img-section">
                <img
                  loading="lazy"
                  className="rental-home-feature-icon"
                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/directOwnerListings.png"
                  alt="Direct Owner Listings"
                />
              </div>
              <div className="rental-home-feature-text">
                <h5 className="rental-home-feature-title">Direct Owner Listings</h5>
                <p className="rental-home-feature-description">No Middle men, connect directly with property owners.</p>
              </div>
            </div>

            <div className="rental-home-feature-item">
              <div className="rental-home-img-section">
                <img
                  loading="lazy"
                  className="rental-home-feature-icon"
                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/VerifiedProperties.png"
                  alt="Verified Properties"
                />
              </div>
              <div className="rental-home-feature-text">
                <h5 className="rental-home-feature-title">Verified & trusted Properties</h5>
                <p className="rental-home-feature-description">Authenticity and reliability.</p>
              </div>
            </div>

            <div className="rental-home-feature-item">
              <div className="rental-home-img-section">
                <img
                  loading="lazy"
                  className="rental-home-feature-icon"
                  src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/DocsAssistance.png"
                  alt="Document Assistance"
                />
              </div>
              <div className="rental-home-feature-text">
                <h5 className="rental-home-feature-title">Document Assistance</h5>
                <p className="rental-home-feature-description">Rent Agreement and Policy Verification.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalHome;
