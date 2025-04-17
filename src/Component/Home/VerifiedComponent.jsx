import React from "react";
import "./VerifiedComponent.css";

const VerifiedComponent = () => {
  return (
    <div className="Rent-Container">
      <h2 className="Rent-Heading">
        What Does <span className="Rent-Highlighted">Verified</span> Mean in
        Propertydekho247.com
      </h2>
      <p className="Rent-SubText">
        Every listing on Propertydekho247.com goes through a verification
        process. Say goodbye to fake listings and enjoy a secure rental
        experience.
      </p>

      <div className="Rent-Grid">
        <div className="Rent-Authentication">
          <div className="Rent-Icon">
            <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/IdentityAutha.svg" alt="IdentityAutha" />
          </div>
          <div>
            <h3 className="Rent-Title">Identity Authentication</h3>
            <p className="Rent-Description">
              Property owners must submit valid government-issued identification
              (Aadhar, PAN, or Passport) to establish their legitimacy.
            </p>
          </div>
        </div>

        <div className="Rent-Authentication">
          <div className="Rent-Icon">
            <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/OTPAuthe.svg" alt="OTPAuthe" />
          </div>
          <div>
            <h3 className="Rent-Title">OTP Authentication</h3>
            <p className="Rent-Description">
              Secure validation through OTP-based verification.
            </p>
          </div>
        </div>

        <div className="Rent-Authentication">
          <div className="Rent-Icon">
            <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/VideoAndPhoto.svg" alt="VideoAndPhoto" />
          </div>
          <div>
            <h3 className="Rent-Title">Authentic Property Images & Videos</h3>
            <p className="Rent-Description">
              Owners must upload real images and videos that undergo a check to
              ensure they reflect the actual property.
            </p>
          </div>
        </div>

        <div className="Rent-Authentication">
          <div className="Rent-Icon">
            <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/SecureAndCompliance.svg" alt="SecureAndCompliance" />
          </div>
          <div>
            <h3 className="Rent-Title">Secure & Compliance</h3>
            <p className="Rent-Description">
              Verified Properties receive an official “PropertyDekho247”
              verified badge, increasing tenant confidence and improving listing
              visibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiedComponent;
