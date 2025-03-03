import React, { useEffect, useState } from "react";
import "./ViewOwnerDetailsAlert.css";
import { FaCheckCircle } from "react-icons/fa"; // Import an icon for success

export default function ViewOwnerDetails({ SetShow, Contact }) {
  const [OwnerDetails, setOwnerDetals] = useState({});

  useEffect(() => {
    let OwnerDetails = sessionStorage.getItem("OwnerDetails");
    if (OwnerDetails) {
      setOwnerDetals(JSON.parse(OwnerDetails));
    }
    return () => {
      sessionStorage.removeItem("OwnerDetails");
    };
  }, []);

  return (
    <div className="view-owner-details-modal">
      <div className="view-owner-details-header">
        <span
          className="close-btn"
          onClick={() => {
            SetShow(false);
          }}
        >
          X
        </span>
        {/* <h2 className="view-owner-details-title">Payment Successful!</h2> */}
      </div>
      <div className="view-owner-details-content">
        <div className="success-icon">
          <FaCheckCircle color="#28a745" size={50} />
        </div>
        <p>
          Congratulations! Your payment was successfully processed. Here are
          the details:
        </p>
        <strong>
          Property Owner Contact No: <b>{Contact}</b>
        </strong>
        <p>
          You can now directly reach out to the owner for further
          communication and discussions.
        </p>
        {/* <div className="cta-btn-container">
          <button
            className="cta-btn"
            onClick={() => {
              alert("Opening contact options...");
            }}
          >
            Contact Owner
          </button>
        </div> */}
      </div>
    </div>
  );
}
