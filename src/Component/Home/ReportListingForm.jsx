import React, { useState } from "react";
import "./ReportListingForm.css";
const ReportListingForm = () => {
  const [reason, setReason] = useState("");

  const handleReportClick = () => {
    // Handle the report action
    alert("Report submitted: " + reason);
  };

  const handleCancelClick = () => {
    // Handle the cancel action
    setReason("");
  };

  return (
    <div className="report-form-container">
      <div className="report-form-header">
        <span className="report-form-title">Report Listing</span>
        <button className="close-button">×</button>
      </div>
      <p className="report-form-description">
        If this listing contains incorrect, misleading, or inappropriate
        information, or violates our guidelines, please report it below.
      </p>
      <label htmlFor="reason" className="reason-label">
        Reason for reporting:
      </label>
      <textarea
        id="reason"
        className="report-textarea"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Enter your reason here..."
      />
      <div className="button-group">
        <button className="report-button" onClick={handleReportClick}>
          Report
        </button>
        <button className="cancel-button" onClick={handleCancelClick}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReportListingForm;
