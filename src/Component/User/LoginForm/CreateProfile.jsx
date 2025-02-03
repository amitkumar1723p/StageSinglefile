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

  const Role = ["Buyer", "Tenant", "PropertyOwner", "Channel Partner"];

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
      <div className="main-sign-box">
        <div className="signup-form-wrapper-unique">
          <div className="signup-image-section-unique">
            <img src="/img/login-form.png" alt="City Buildings" />
          </div>
          <div className="signup-form-content-unique">
            <h2>Create Profile </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your Name"
                value={CreateProfileData?.Name?.trimStart() || ""}
                onChange={(e) =>
                  setCreateProfileData({
                    ...CreateProfileData,
                    Name: e.target.value,
                  })
                }
                required
              />

              <input
                type="email"
                placeholder="Enter your Email"
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

              {ISNRI && (
                <>
                  <select
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
                  </select>

                  <>
                    <input
                      required
                      className="nri-contact-number"
                      type="text"
                      placeholder="Enter your Contact Number"
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
                    <input
                      className="nri-contact-another-number"
                      type="text"
                      placeholder="Enter your Another Number"
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
                  </>
                </>
              )}
              {!ISNRI && (
                <>
                  <input
                    type="text"
                    placeholder="Enter your Contact Number"
                    value={SignUpData?.ContactNumber}
                    readOnly={true}
                  />
                  <select
                    className="role-select"
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
                          {e == "PropertyOwner" ? "Owner" : e}
                        </option>
                      );
                    })}
                  </select>
                </>
              )}

              <button type="submit">Get Started</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
