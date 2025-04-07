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
       console.log("OwnerDetails",OwnerDetails)
    return () => {
      sessionStorage.removeItem("OwnerDetails");
    };
  }, []);

  return (
    OwnerDetails?.success && (<div className="view-owner-details-modal">
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
    <strong>Here are Owner contact details for rental property inquiries:</strong>
  </p>
  <p>
    Owner Name: <b>{OwnerDetails?.ownerName}</b>
  </p>
  <p>
    Owner Contact No: <b>{OwnerDetails?.ownerPhonenumber}</b>
  </p>
  <p>
   Owner Email: <b>{OwnerDetails?.ownmerEmail}</b>
  </p>
  <p>
  <span className="view-owner-details-desclaimer">Disclaimer:</span> The contact details provided have been verified to a reasonable extent; however, their accuracy and authenticity are not guaranteed. We disclaim all liability for any loss, dispute, or consequence arising from their use. Users are advised to exercise discretion.
  </p>
</div>


    </div>)

    
  );
}
