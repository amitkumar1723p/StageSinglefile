import React from "react";
import "./MakeOfferSuccessAlert.css";
import { useNavigate } from "react-router-dom";

const AlertBox = ({ SetShow }) => {
  const navigate = useNavigate();
  return (
    <div className="alert-box-container">
      <div className="alert-box">
        <div className="alert-header-main">
          <div className="alert-header">
            {/* <span className="alert-success-icon">✔</span> */}
            <span className="alert-title">
              Your offer has been submitted and forwarded to seller.
            </span>
          </div>
          <div className="alert-description">
            We will let you know if the seller accepts your offer.
          </div>
        </div>
        <div className="alert-next-steps">
          <p className="alert-next-steps-p">
            <strong>What happens next?</strong>
          </p>
          <p className="alert-next-steps-p2">
            If the owner accepts your offer, you’ll be invited for a personal
            meeting to discuss the next steps.
          </p>
        </div>
        <div className="alert-action-links">
          <a href="#" className="action-link">
            Need help? Contact our support team here.
          </a>
          <div className="action-buttons">
            <button
              className="btn"
              onClick={() => {
                navigate("/user/my-listing");
              }}
            >
              View More Properties
            </button>
            <button
              className="btn"
              onClick={() => {
                navigate("/user/my-listing");
              }}
            >
              Dashboard
            </button>
          </div>
        </div>
        <div className="alert-footer">
          <span className="alert-warning">
            <strong> ⚠ </strong> Found suspicious listing?
            <a href="#">Report here!</a>
          </span>
        </div>
        <button
          className="close-btn"
          onClick={() => {
            SetShow(false);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
