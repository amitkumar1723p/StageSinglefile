import React from "react";
import "./ForLandLord.css";

const ForLandLord = () => {
  return (
    <div className="LandLordDetails">
      <div className="LandLordDetails-container">
        <div className="LandLordDetails-left">
          <img
            alt="LandLord-Img"
            src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/ForLandLord-Img.png"
          />
        </div>
        <div className="LandLordDetails-right">
          <div className="LandLordDetails-tag">FOR LANDLORD</div>
          <div className="LandLordDetails-heading">
            <h2>
              List your property and Find tenants - <span>All Free!</span>
            </h2>
          </div>
          <div className="LandLordDetails-steps">
            <div className="LandLordDetails-step">
              <div className="LandLordDetails-icon">
                <img alt="Introduce" src="/img/Introduce.png" />
              </div>
              <div className="LandLordDetails-content">
                <h4>Introduce Yourself</h4>
                <p>Sign Up & Set up your owner profile</p>
              </div>
            </div>

            <div className="LandLordDetails-step">
              <div className="LandLordDetails-icon">
                <img alt="listproperty" src="/img/listproperty.png" />
              </div>
              <div className="LandLordDetails-content">
                <h4>List Property</h4>
                <p>List your property today and connect with genuine tenants - fast, hassle-free, and commission-free!</p>
              </div>
            </div>

            <div className="LandLordDetails-step">
              <div className="LandLordDetails-icon">
                <img alt="getverified" src="/img/getverified.png" />
              </div>
              <div className="LandLordDetails-content">
                <h4>Get Verified Tenants</h4>
                <p>Connect with Tenants directly</p>
              </div>
            </div>

            <div className="LandLordDetails-step">
              <div className="LandLordDetails-icon">
                <img alt="LegalDocs" src="/img/LegalDocs.png" />
              </div>
              <div className="LandLordDetails-content">
                <h4>Legal Documentation</h4>
                <p>Nominal fee for quick Rental Agreement & Policy Verification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForLandLord;
