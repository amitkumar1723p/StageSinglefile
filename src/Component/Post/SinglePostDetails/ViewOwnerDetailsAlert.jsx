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
    <strong>Here are our team contact details for rental property inquiries:</strong>
  </p>
  <p>
    Team Contact No: <b>{Contact}</b>
  </p>
  <p>
    Email: <b>sales@propertydekho247.com</b>
  </p>
  <p>
    Our team is available to assist you with any rental property-related inquiries. Don't hesitate to get in touch, and we'll be happy to help!
  </p>
</div>


    </div>
  );
}
