import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 
 

export default function ViewOwnerDetails({ SetShow }) {
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
  console.log(OwnerDetails)
  return (
    <>
      <div>
        <span
          onClick={() => {
            SetShow(false);
          }}
        >
          X
        </span>
        <h1>View Response Form</h1>
        <div className="view-owner-details-main">

          <p>Name : {OwnerDetails.OwnerName}</p>
          <p>ContactNuber : {OwnerDetails.OwnerContactNumber}</p>
        </div>
      </div>
    </>
  );
}
