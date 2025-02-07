import React from "react";
import './ForTenant.css';  // Import the custom CSS file

const ForTenant = () => {
  return (
    <div className="MainContainer">
      <div className="TenantContainer">
        <div className="LeftContainer">
          <img className="TenantBackground" src="/img/TenantBackground.png" alt="Tenant Background" />
          <img className="TenantMobile" src="/img/TenantMobile.png" alt="Tenant Mobile" />
          <img className="TenantArrow" src="/img/TenantArrow.png" alt="Tenant Arrow" />
          <div className="PhNoContainer">
            <p className="phoneText">Owner's Contact No.</p>
            <p className="phoneNumber">+91-745-546-0112</p>
          </div>
        </div>

        <div className="RightContainer">
          <div className="ForTenantLabel">FOR TENANT</div>
          <div className="Heading">
            <h2>Search, Connect, and Move In- <span className="highlightText">All Free!</span></h2>
          </div>
          <div className="flexContainer">
            <div className="Introduction">
              <div className="ImgContainer">
                <img className="Icon" alt="Introduce" src="/img/Introduce.png" />
              </div>
              <div className="Content">
                <h4>Introduce Yourself</h4>
                <p>Sign Up & Set up your profile</p>
              </div>
            </div>

            <div className="Introduction">
              <div className="ImgContainer">
                <img className="Icon" alt="StartExploring" src="/img/StartExploring.png" />
              </div>
              <div className="Content">
                <h4>Start Exploring</h4>
                <p>Start exploring our listings & find a property that meets your requirements</p>
              </div>
            </div>

            <div className="Introduction">
              <div className="ImgContainer">
                <img className="Icon" alt="ConnectWithOwner" src="/img/ConnectWithOwner.png" />
              </div>
              <div className="Content">
                <h4>Connect with the Owner for Free!</h4>
                <p>Reach out to the property owner directly - no fees, no hassle.</p>
                <p>Your new home is just a call away!</p>
              </div>
            </div>

            <div className="Introduction">
              <div className="ImgContainer">
                <img className="Icon" alt="LegalDocs" src="/img/LegalDocs.png" />
              </div>
              <div className="Content">
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

export default ForTenant;
