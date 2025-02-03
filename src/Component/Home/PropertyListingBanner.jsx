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
      <div className="flex items-center bg--400 pt-4 justify-center  bg--400 max-480:flex-col max-480:py-[10px] border-t-[#d1e1ec]  border-b-[#d1e1ec] max-480:px-[5%] h-fit max-480:border-t-0 max-480:border-b-0 border-t-2 border-b-2    bg--600">
        <div className="flex bg--200  max-480:p-0  max-480:flex-col-reverse max-480:items-center max-480:justify-between  max-480:w-full  w-[80%]  ">
          {/* Left Side Content */}
          <div className="bg--400 flex-[1]">
            <h2 className="text-[#333]  text-2xl font-semibold leading-[32px] tracking-[0.5px] max-480:text-[16px] max-480:tracking-[0.5px] max-480:leading-[18px] bg--500">
              Confused by <span className="uppercase"> unverified </span> or{" "}
              <span className="uppercase">misleading </span> property listings?
              We can help!
            </h2>
            <p  className="mb-3 flex items-center text-[#333f] max-480:mb-0 max-480:text-sm">
  <img
    src="/img/blueTick.svg"
    alt="checkmark"
    className="checkmark-icon"
  />
  100% Verified Seller
</p>

<p className="mb-3 flex items-center text-[#333f] max-480:mb-0 max-480:text-sm">
  <img
    src="/img/blueTick.svg"
    alt="checkmark"
    className="checkmark-icon"
  />
  Dedicated Relationship Manager
</p>

<p className="mb-3 flex items-center text-[#333f] max-480:mb-0 max-480:text-sm">
  <img
    src="/img/blueTick.svg"
    alt="checkmark"
    className="checkmark-icon"
  />
  Transparency, Trust and Fair Price
</p>

<p className="mb-3 flex items-center text-[#333f] max-480:mb-0 max-480:text-sm">
  <img
    src="/img/blueTick.svg"
    alt="checkmark"
    className="checkmark-icon"
  />
  Single point of Contact for Dealing
</p>
            <div className=" bg--400 pt-2">
              <button
                className="px-[10px] max-480:py-[5px] max-480:text-[12px] py-[10px] border-[1px] text-white bg-[#0b6ed8] mr-3 hover:bg-[#2f6fb5] rounded-md text-[16px] "
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
                className="px-[20px]  py-[10px] max-480:text-[12px] max-480:py-[5px] max-480:px-[10px] text-[16px] rounded-md border-[1px] hover:bg-[#0b6ed8] text-[var(--main-light-clr)] hover:text-white border-[var(--main-light-clr)]"
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
{/* 
              <div className="banner-bottom-image ">
                <img src="/img/confuse-build.svg" alt="City Skyline" />
              </div> */}
            </div>
          </div>

          {/* Right Side Image */}
          <div className="max-480:w-[70%] flex items-center justify-center w-[50%] h-auto ">
            <img src="/img/confuse.svg" alt="Property Assistance" className="max-w-[50%] max-480:max-w-[100%] "/>
          </div>
        </div>

        {/* Bottom Left Image */}
      </div>
    </>
  );
};

export default PropertyListingBanner;
