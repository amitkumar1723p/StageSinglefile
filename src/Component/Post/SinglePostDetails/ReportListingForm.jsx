import React, { useState } from "react";
import "./ReportListingForm.css";
import { useDispatch } from "react-redux";
import { ReportSuspiciousProperty } from "../../../Action/userAction";

const ReportListingForm = ({ SinglePostData, SetShow }) => {
  const dispatch = useDispatch();

  const [reason, setReason] = useState("");
  const suspiciousPropertyId = SinglePostData.SinglePost._id;
  
  const handleReportClick = (e) => {
    e.preventDefault();
    const updateData = {
      reason: reason,
      postId: suspiciousPropertyId,
    };

    dispatch(ReportSuspiciousProperty(updateData));
  };
  return (
    <>
      <div className="report-form-container">
        <div className="report-form-header">
          <span className="report-form-title">Report Listing</span>
          <button
            className="close-button"
            onClick={() => {
              SetShow(false);
            }}
          >
            ×
          </button>
        </div>
        <div className="">
          {/* <div className="report-form-header">
              <span className="report-form-title">Report Listing</span>
              <button className="close-button">×</button>
          </div> */}
          <p className="report-form-description">
            If this listing contains incorrect, misleading, or inappropriate
            information, or violates our guidelines, please report it below.
          </p>
          <label htmlFor="reason" className="reason-label">
            Reason for reporting:
          </label>
          <textarea
            id="reason"
            required
            className="report-textarea"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter your reason here..."
          />
          <div className="button-group">
            <button className="report-button" onClick={handleReportClick}>
              Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportListingForm;
