import React, { useContext, useRef, useState } from "react";
import "./PropertyListingBanner.css"; // Import the CSS file
import WindowComponent from "../WindowComponent";
import PostPropertyRequerment from "./PostPropertyRequerment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../CreateContext/CreateContext";
const PropertyListingBanner = ({
  setshowPropertyRequirement,
  PropertyRequirementBtnRef,
  SearchContainerRef,
}) => {
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const navigate = useNavigate();
  const { setRedirectPath } = useContext(UserContext);
  return (
    <>
      {" "}
      <div className="banner-container">
        <div className="banner-top-section">
          {/* Left Side Content */}
          <div className="banner-text-section">
            <h2>
              Confused by <span className="span-baner"> unverified </span> or{" "}
              <span className="span-baner">misleading </span> property listings?
              We can help!
            </h2>
            <p className="p-asist">
              <img
                src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/blueTick.svg"
                alt="checkmark"
                className="checkmark-icon"
              />
              100% Verified Seller
            </p>
            <p className="p-asist">
              <img
                src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/blueTick.svg"
                alt="checkmark"
                className="checkmark-icon"
              />
              Dedicated Relationship Manager
            </p>
            <p className="p-asist">
              <img
                src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/blueTick.svg"
                alt="checkmark"
                className="checkmark-icon"
              />
              Transparency, Trust and Fair Price
            </p>
            <p className="p-asist">
              <img
                src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/blueTick.svg"
                alt="checkmark"
                className="checkmark-icon"
              />
              Single point of Contact for Dealing
            </p>
            <div className="banner-buttons">
              <button
                className="explore-button"
                onClick={(e) => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                Explore
              </button>

              <button
                className="expert-assistance-button"
                ref={PropertyRequirementBtnRef}
                onClick={() => {
                  if (medata && medata.IsAuthenticated == true) {
                    setshowPropertyRequirement(true);
                  } else {
                    setRedirectPath("/post-requirement");
                    navigate("/login");
                  }
                }}
              >
                Share Your Requirement
              </button>

              <div className="banner-bottom-image">
                <img src="/img/confuse-build.svg" alt="City Skyline" />
              </div>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="banner-image-right">
            <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/images/confuse.svg" alt="Property Assistance" />
          </div>
        </div>

        {/* Bottom Left Image */}
      </div>
    </>
  );
};

export default PropertyListingBanner;
