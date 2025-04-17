// import React from 'react'

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CreateUserAction } from "../../../Action/userAction";
import "./CreateProfile.css";
import ScrollToTop from "../../../ScrollToTop";
// import countries from 'i18n-iso-countries';
// import 'i18n-iso-countries/langs/en.json';
// import * as countries from "i18n-iso-countries";
// import "i18n-iso-countries/langs/en.json";
// import { getNames } from "country-list";
import { countries } from "countries-list";
const CreateProfile = ({
  SignUpData,
  CreateProfileData,
  setCreateProfileData,
  ISNRI,
}) => {
  const dispatch = useDispatch();

  const [countryArray, setcountryArray] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const CreateProfileDataObj = {
      ...CreateProfileData,
      // ContactNumber: SignUpData.ContactNumber,
    };
    if (ISNRI) {
      CreateProfileDataObj.email = SignUpData.email;
      CreateProfileDataObj.ISNRI = true;
    } else {
      CreateProfileDataObj.ContactNumber = SignUpData.ContactNumber;
    }

    dispatch(CreateUserAction(CreateProfileDataObj, ISNRI));
  };

  const Role = ["Buyer", "Tenant", "Property Owner", "Channel Partner"];

  useEffect(() => {
    if (ISNRI) {
      const AllCountry = { ...countries };
      delete AllCountry.IN; // remove India
      const countryArray = Object.entries(AllCountry);

      setcountryArray(countryArray);
    }
  }, [countries]);
  return (
    <>
      <ScrollToTop />
      <div className="login-main-parent">
        <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/logi-page-blue-svg.svg" alt="" className="blue-login-top-right" />

        <div className="login-form-container">

          <div className="create-profile-form">
            <h2>Create Account</h2>
            <p>
              It seems you are logging in for the first time. Please sign in to explore more!
            </p>
            <form onSubmit={handleSubmit}>
              <div className="input-group">

                <span className="icon">👤</span>
                <input
                  type="text"
                  placeholder="Enter your First Name*"
                  value={CreateProfileData?.Name?.trimStart() || ""}
                  onChange={(e) =>
                    setCreateProfileData({
                      ...CreateProfileData,
                      Name: e.target.value,
                    })
                  }
                  required
                />


              </div>

              <div className="input-group">
                <span className="icon">👤</span>

                <input
                  type="text"
                  placeholder="Enter your Last Name"
                  value={CreateProfileData?.LastName?.trimStart() || ""}
                  onChange={(e) =>
                    setCreateProfileData({
                      ...CreateProfileData,
                      LastName: e.target.value,
                    })
                  }

                />
              </div>

              <div className="input-group">
                <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/email-icon.svg" alt="" className="icon" />

                <input
                  type="email"
                  placeholder="Enter your Email*"
                  value={
                    ISNRI
                      ? SignUpData?.email || ""
                      : CreateProfileData?.email || ""
                  }
                  readOnly={ISNRI ? true : false}
                  required
                  onChange={(e) => {
                    setCreateProfileData({
                      ...CreateProfileData,
                      email: e.target.value,
                    });
                  }}
                />
              </div>

              {ISNRI && (
                <>
                  {/* <select
                    required
                    onChange={(e) => {
                      const selectedCode = e.target.value;
                      const selectedData = countryArray.find(
                        ([code]) => code === selectedCode
                      );

                      if (selectedCode) {
                        setCreateProfileData({
                          ...CreateProfileData,
                          Country: {
                            Code: selectedData[0],
                            Name: selectedData[1].name,
                            // PhoneCode: selectedData[1].phone[0],
                          },
                        });
                      } else {
                        setCreateProfileData({
                          ...CreateProfileData,
                          Country: undefined,
                        });
                      }
                    }}
                  >
                    <option value=""> Select Country Name</option>

                    {countryArray?.map(([code, data], index) => {
                      return (
                        <option key={index} value={code}>
                          {data.name}
                        </option>
                      );
                    })}
                  </select> */}

                  <>
                    <div className="input-group">
                      <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/new-phone-iocn.svg" alt="" className="icon" />

                      <input
                        required
                        className="nri-contact-number"
                        type="text"
                        placeholder="Enter your International Number*"
                        value={
                          CreateProfileData?.ContactNumber?.trimStart() || ""
                        }
                        onChange={(e) => {
                          const numericValue = String(e.target.value).replace(
                            /[^0-9]/g,
                            ""
                          );
                          setCreateProfileData({
                            ...CreateProfileData,
                            ContactNumber: numericValue,
                          });
                        }}
                      />
                    </div>
                    <div className="input-group">
                      <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/new-phone-iocn.svg" alt="" className="icon" />

                      <input
                        className="nri-contact-another-number"
                        type="text"
                        placeholder="Enter your Indian Number"
                        value={
                          CreateProfileData?.AnotherContactNumber?.trimStart() ||
                          ""
                        }
                        onChange={(e) => {
                          const numericValue = String(e.target.value).replace(
                            /[^0-9]/g,
                            ""
                          );
                          setCreateProfileData({
                            ...CreateProfileData,
                            AnotherContactNumber: numericValue,
                          });
                        }}
                      />
                    </div>
                  </>
                </>
              )}
              {!ISNRI && (
                <>
                  <div className="input-group">
                    <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/new-phone-iocn.svg" alt="" className="icon" />
                    <input
                      type="text"
                      placeholder="Enter your Contact Number"
                      value={SignUpData?.ContactNumber}
                      readOnly={true}
                    />
                  </div>

                  <select
                    className="input-group-select"
                    required
                    value={CreateProfileData.Role}
                    onChange={(e) => {
                      setCreateProfileData({
                        ...CreateProfileData,
                        Role: e.target.value,
                      });
                      //
                    }}
                  >
                    <option value={""}>Select Role</option>
                    {Role.map((e, i) => {
                      return (
                        <option key={i} value={e}>
                          {e == "Property Owner" ? "Owner" : e}
                        </option>
                      );
                    })}
                  </select>
                </>
              )}

              <button type="submit" className="continue-btn">Get Started</button>
            </form>
          </div>

          {/* <div className='login-right-container-parent'>
            <div className='login-page-right-container'>
              <div className='login-page-logo'>
                <div
                  className="logo"

                >
                  <h2 className="logo-heading-navbar">
                    Property <span> Dekho247</span>
                  </h2>
                </div>
              </div>

              <p className='login-form-right-heading'>Smart Search, Perfect Homes,
                Just for You.</p>
              <p className='login-page-right-text'>PropertyDekho247 simplifies property buying, selling, and renting with free listings, verified leads, and a fully digital transaction process. Whether you're a homeowner or a seeker, find trusted deals effortlessly with expert insights and a seamless experience.</p>
            </div>
          </div> */}
          <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/logi-page-blue-svg.svg" alt="" className='login-page-blue-svg' />
          <img src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/login-page.gif" alt="" className='create-page-gif' />

        </div>
      </div>
    </>
  );
};

export default CreateProfile;
