import React, { useEffect, useState } from "react";
import "./ViewOwnerDetailsAlert.css";
export default function ViewOwnerDetails({ SetShow ,Contact}) {
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
        <h1 className="view-owner-details-title">View Response Form</h1>
      </div>
      <div className="view-owner-details-content">
        <p>
          <strong>Name:</strong> {OwnerDetails.OwnerName}
        </p>
        <p>
          <strong>Phone No:</strong> {Contact}
        </p>
        <p>
          Dear Tenant, here is the contact information for the property owner.
          You can directly reach out to the owner to inquire about the listing.
          Additionally, we have sent your details to the owner. If they choose
          to proceed with you, you will receive a call from their side. You also
          have the option to contact the owner directly for further discussions
          and to move forward with the property process.
        </p>
      </div>
    </div>
  );
}
