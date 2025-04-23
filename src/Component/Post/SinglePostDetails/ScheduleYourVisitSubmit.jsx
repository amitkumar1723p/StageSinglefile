import React, { useCallback } from "react";
import "./ScheduleYourVisitSubmit.css";
import { useNavigate } from "react-router-dom";
import { FormatDate } from "../../../utils/CommonFunction";

const ScheduleYourVisitSubmit = ({ SetShow, ScheduleVistData }) => {
  const navigate = useNavigate();

  const formatTime = useCallback((time24) => {
    if (time24) {
      const [hours, minutes] = time24.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    }
    return "N/A";
  }, []);

  return (
    <div className="schedule-your-visit-submit">
      <div className="close-btn" onClick={() => SetShow(false)}>
        ✕
      </div>
      <div className="success-icon"><img src="/img/schedule-your-visit-submit-tick.svg" alt="" /></div>
      <h2 className="submit-title">Request Submitted</h2>
      <p className="visit-subtitle">Your Visit is Scheduled</p>
      <p className="visit-time">
        <strong>{formatTime(ScheduleVistData?.VisitTime?.From)}</strong> On{" "}
        <strong>{FormatDate(ScheduleVistData?.VisitDate)}</strong>
      </p>
      <p className="info-text">
        If the property is occupied, the timing of the visit will be subject to
        the availability of the owner or tenant. We'll ensure to keep you
        informed.
      </p>
      <hr className="divider" />
      <div className="action-row">
        <button onClick={() => navigate("/")} className="outlined-btn">
          View Property Listing
        </button>
        <button onClick={() => navigate("/user")} className="outlined-btn">
          Go To Dashboard
        </button>
      </div>
    </div>
  );
};

export default ScheduleYourVisitSubmit;
