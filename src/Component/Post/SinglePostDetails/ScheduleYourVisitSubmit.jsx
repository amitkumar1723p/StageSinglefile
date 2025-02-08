import React, { useCallback } from "react";
import "./ScheduleYourVisitSubmit.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const ScheduleYourVisitSubmit = ({ SetShow, ScheduleVistData }) => {
  // console.log(ScheduleVistData)

  const navigate = useNavigate();
  const formatTime = useCallback((time24) => {
    if (time24) {
      const [hours, minutes] = time24.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
      return `${formattedHours}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`;
    }

    return "N/A";
  }, []);
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
            Your visit is scheduled{" "}
            {formatTime(ScheduleVistData.VisitTime.From)} on{" "}
            {/* {formatTime(ScheduleVistData.VisitTime.To)} on{" "} */}
            {new Date(ScheduleVistData.VisitDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            .
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
