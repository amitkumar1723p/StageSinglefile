import React from "react";
import "./RentAgreement.css";
import { Link } from "react-router-dom";


const RentAgreement = () => {
  return (
    <div className="RentAgreement">
      <h3 className="RentAgreement__title">
        Your <span>Rent Agreement </span> Partner in Gurgaon
      </h3>
      <p className="RentAgreement__sub-title">
        From Draft to Delivery - We Handle It All
      </p>
      <div className="RentAgreement__steps-container">
        <div className="RentAgreement__step">
          <div className="RentAgreement__icon">
            <img src="./img/Submityourdraft.svg" alt="Submit your draft" />
          </div>
          <div className="RentAgreement-text">
            <h2 className="RentAgreement__step-title">Submit your Draft</h2>
            <p>
              Begin your process by sending us your preliminary rent agreement
              draft via email or upload your draft on our website.
            </p>
          </div>
        </div>
        <div className="RentAgreement__step">
          <div className="RentAgreement__icon">
            <img
              src="./img/Review&Custmization.svg"
              alt="Review & Custmization"
            />
          </div>
          <div className="RentAgreement-text">
            <h2 className="RentAgreement__step-title">
              Review & Customization
            </h2>
            <p>
              Our team will review your draft to ensure it meets all legal
              requirements and customize it to fit local Gurgaon laws.
            </p>
          </div>
        </div>
        <div className="RentAgreement__step">
          <div className="RentAgreement__icon">
            <img src="./img/Stamp&Validate.svg" alt="Stamp & Validate" />
          </div>
          <div className="RentAgreement-text">
            <h2 className="RentAgreement__step-title">Stamp & Validate</h2>
            <p>
              We stamp your finalized documents using traditional or e-stamping
              to make it legally enforceable.
            </p>
          </div>
        </div>
        <div className="RentAgreement__step">
          <div className="RentAgreement__icon">
            <img
              src="./img/DeliveryAtYourDoorstep.svg"
              alt="Delivery At Your Door step.svg"
            />
          </div>
          <div className="RentAgreement-text">
            <h2 className="RentAgreement__step-title">
              Delivery at your Doorstep
            </h2>
            <p>
              Receive your legally verified rent agreement at your doorstep in
              Gurgaon, hassle-free.
            </p>
          </div>
        </div>
      </div>
      <Link
        to="https://wa.me/7837840785"
        target="_blank"
        rel="noopener noreferrer"

      >
        <button className="UploadYourDraftMain ">

          <img src="/img/whatapp.png" alt="WhatsApp" />
          Share Your Draft

        </button>
      </Link>


    </div >
  );
};

export default RentAgreement;
