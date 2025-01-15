import React from "react";
import "./ScheduleYourVisitSubmit.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const ScheduleYourVisitSubmit = ({ SetShow }) => {
  const navigate = useNavigate();
  return (
    <div className="request-submit-container">
       <div className="cross-div">
            <span
              className="cross-btn"
              onClick={() => {
                SetShow(false);
              }}
            >
              X
            </span>
          </div>
      <div className="request-submit-header">
        <h2>Request Submitted</h2>
      </div>
      <div className="request-submit-body">
        <div className="status-message">
          <div className="status-icon">&#10003;</div>
          <span className="status-text">
            Your visit is scheduled from 10:00 AM to 6:00 PM on January 16,
            2025.
          </span>
        </div>
        <p className="note-text">
          If the property is occupied, the timing of the visit will be subject
          to the availability of the owner or tenant. We'll ensure to keep you
          informed.
        </p>
      </div>
      <div className="action-buttons">
        <button
          className="btn view-more"
          onClick={() => {
            navigate("/");
          }}
        >
          View More Properties
        </button>
        <button
          className="btn"
          onClick={() => {
            navigate("/user");
          }}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default ScheduleYourVisitSubmit;
