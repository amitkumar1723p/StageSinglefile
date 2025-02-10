import React from "react";
import "./LandLord.css";

const LandLord = () => {
  return (
    <div className="LandLordDetails">
     <div className="landlord-left">
        <img
        alt="landlord-img" 
        src="/img/ForLandLord-Img.png"
        />
     </div>
     <div className="landlord-right">
        <div className="landlord-heading">
            <div className="forLandLord"> FOR LANDLORD</div>
            <h2 className="Head">List Your Property and Find Tenants- <span>All Free</span></h2>
        </div>
        <div className=" landlord-content">
            <div className="Introduction">
                <div className="IntroductionImgContainer">
                <img 
                src="/img/Introduce.svg"
                alt=""
                />
                </div>
                <div className="contentContainer"> 
                    <h3>Introduce Yourself</h3>
                    <p>Sign Up & Set Up your owner profile</p>
                </div>
            </div>
            <div className="Introduction">
            <div className="IntroductionImgContainer">
                <img 
                src="/img/ListProperty.svg"
                alt=""
                />
                </div>
                <div className="contentContainer"> 
                    <h3>List Property</h3>
                    <p>List your property today and connect with genuine tenants- fast, hassle-free, and commission-free!</p>
                </div>
            </div>
            <div className="Introduction">
            <div className="IntroductionImgContainer">
                <img 
                src="/img/GetVerified.svg"
                alt=""
                />
                </div>
                <div className="contentContainer"> 
                    <h3>Get Verified Tenants</h3>
                    <p>Connect with Tenant directly</p>
                </div>
            </div>
            <div className="Introduction">
            <div className="IntroductionImgContainer">
                <img 
                src="/img/legalDocs.svg"
                alt=""
                />
                </div>
                <div className="contentContainer"> 
                    <h3>Legal Documents</h3>
                    <p>Nominal fee for quick Rental Agreement & Policy Verification</p>
                </div>
            </div>
        </div>
     </div>
    </div>
  );
};

export default LandLord;
