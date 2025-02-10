import React from "react";
import "./Tenant.css";

const Tenant = () => {
  return (
    <div className="for-tenant-details">
      <div className="for-tenant-left">
        <img alt="tenant-img" src="/img/TenantBackground.png" />
        <img alt="TenantMobile" src="/img/TenantMobile.png" />
        <img alt="TenantArrow" src="/img/TenantArrow.png" />
        <img alt="Owner's-Phn-Numb" src="/img/OwnerPhnNumber.svg"/>
        
        
      </div>
      <div className="for-tenant-right">
        <div className="for-tenant-heading">
          <div className="for-tenant-title"> FOR TENANT</div>
          <h2 className="for-tenant-main-heading">
            Search, Connect, and Move In- <span>All Free!</span>
          </h2>
        </div>
        <div className="for-tenant-content">
          <div className="for-tenant-introduction">
            <div className="for-tenant-introduction-img-container">
              <img src="/img/Introduce.svg" alt="" />
            </div>
            <div className="for-tenant-content-container">
              <h3>Introduce Yourself</h3>
              <p>Sign Up & Set Up your profile</p>
            </div>
          </div>
          <div className="for-tenant-introduction">
            <div className="for-tenant-introduction-img-container">
              <img src="/img/StartExploring.svg" alt="" />
            </div>
            <div className="for-tenant-content-container">
              <h3>Start Exploring</h3>
              <p>Start exploring our listings & find property that meets your requirement</p>
            </div>
          </div>
          <div className="for-tenant-introduction">
            <div className="for-tenant-introduction-img-container">
              <img src="/img/ConnectWithOwner.svg" alt="" />
            </div>
            <div className="for-tenant-content-container">
              <h3>Connect with the Owner for Free!</h3>
              <p>Reach out to the property owner directly-no fees, no hassle. Your new home is just a call away!</p>
            </div>
          </div>
          <div className="for-tenant-introduction">
            <div className="for-tenant-introduction-img-container">
              <img src="/img/legalDocs.svg" alt="" />
            </div>
            <div className="for-tenant-content-container">
              <h3>Legal Documentation</h3>
              <p>Nominal fee for quick Rental Agreement & Policy Verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tenant;
