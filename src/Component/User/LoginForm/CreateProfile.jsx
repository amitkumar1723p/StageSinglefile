// import React from 'react'

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { CreateUserAction } from "../../../Action/userAction";
import "./CreateProfile.css";
import ScrollToTop from "../../../ScrollToTop";
const CreateProfile = ({
  SignUpData,
  CreateProfileData,
  setCreateProfileData,
}) => {
  const dispatch = useDispatch();

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const CreateProfileDataObj = {
      ...CreateProfileData,
      ContactNumber: SignUpData.ContactNumber,
    };
    dispatch(CreateUserAction(CreateProfileDataObj));
  };

  const Role = ["Buyer", "Tenant", "PropertyOwner", "Channel Partner"];

  return (
    <>
      {" "}
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
                value={CreateProfileData.Name.trimStart()}
                onChange={(e) =>
                  setCreateProfileData({
                    ...CreateProfileData,
                    Name: e.target.value,
                  })
                }
                required
              />
              <input
                type="text"
                placeholder="Enter your Contact Number"
                value={SignUpData.ContactNumber}
                readOnly
              />
              <input
                type="email"
                placeholder="Enter your Email"
                value={CreateProfileData.email}
                required
                onChange={(e) => {
                 
                   
                  
                      setCreateProfileData({
                        ...CreateProfileData,
                        email: e.target.value,
                      })
                     
                  
                ;
                }}
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

              <button type="submit">Get Started</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
