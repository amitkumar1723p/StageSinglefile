import React, { useEffect, useState } from "react";
import "./PostPropertyRequerment.css";
import { PostPropertyRequirementAction } from "../../Action/userAction";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ProjectNameSection from "../Post/ProjectName";

const PostPropertyRequerment = ({ SetShow }) => {
  const dispatch = useDispatch();
  const [PostPropertyRequirementData, setPostPropertyRequirementData] =
    useState({
      ProjectName: "",
      BHKType: "",
      Budget: "",
      FloorPreference: "",
    });
  const { loading, data, LodingType } = useSelector((state) => {
    return state.userData;
  });
 ;

    
  useEffect(() => {
    if (data && LodingType === "PostPropertyRequirementRequest") {
      if (data.success == true) {
        setPostPropertyRequirementData({
          ProjectName: "",
          BHKType: "",
          Budget: "",
          FloorPreference: "",
        });
        SetShow(false);
      }
    }
  }, [data]);

  const CreateQuerryFormHandler = (e) => {
    e.preventDefault();
    dispatch(PostPropertyRequirementAction(PostPropertyRequirementData));
  };
  return (
    <div className="form-container">
      <div className="form-left">
        <h2 className="form-title">Why Buy From Us?</h2>
        <p className="form-description">
          “Experience a seamless journey from property search to ownership with
          our expert guidance.”
        </p>
        <div className="img-requirement">
          <img src="./img/share-require.svg" alt="img" />
        </div>
        <ul className="form-features">
          <li>✔ 100% Verified Seller</li>
          <li>✔ Dedicated Relationship Manager</li>
          <li>✔ Transparency, Trust and Fair Price</li>
          <li>✔ Single point of Contact Dealing</li>
        </ul>
      </div>
      <div className="form-right">
        <h3 className="form-header">Share Your Requirement</h3>
        <form className="property-form" onSubmit={CreateQuerryFormHandler}>
          <div className="form-group">
       
            <ProjectNameSection 
            ProjectInputType ={"PostRequirement"}
                  ProjectNameObjectData={PostPropertyRequirementData}
                  setProjectNameObjectData={setPostPropertyRequirementData}
                  placeholder={"Search by locality, project name"}
            
            />
            
            {/* <input
              required
              value={PostPropertyRequirementData.ProjectName.trimStart()}
              onChange={(e) => {
                setPostPropertyRequirementData({
                  ...PostPropertyRequirementData,
                  ProjectName: e.target.value,
                });
              }}
              type="text"
              placeholder="Search by locality, project name"
              className="form-input"
            /> */}
          </div>
          <div className="form-group">
            <select
              className="form-input"
              required
              value={PostPropertyRequirementData.BHKType.trimStart()}
              onChange={(e) =>
                setPostPropertyRequirementData({
                  ...PostPropertyRequirementData,
                  BHKType: e.target.value,
                })
              }
            >
              <option value="">Select BHK Type</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5 BHK</option>
            </select>
          </div>

          <div className="form-group">
            <input
              required
              value={PostPropertyRequirementData.Budget.trimStart()}
              onChange={(e) => {
                const numericValue = String(e.target.value).replace(
                  /[^0-9]/g,
                  ""
                );

                setPostPropertyRequirementData({
                  ...PostPropertyRequirementData,
                  Budget: numericValue,
                });
              }}
              type="text"
              placeholder="Enter your Budget"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <select
              required
              className="form-input"
              onChange={(e) => {
                setPostPropertyRequirementData({
                  ...PostPropertyRequirementData,
                  FloorPreference: e.target.value,
                });
              }}
            >
              <option value="">Floor Preference</option>
              <option value="ground">Ground Floor</option>
              <option value="mid">Mid Floor</option>
              <option value="high">High Floor</option>
            </select>
          </div>
          {/* Hidden Field */}
          {/* <div className="form-group hidden-group">
            <input
              type="hidden"
              placeholder="Property Details"
              value="hidden property data"
              className="form-input-hidden"
            />
          </div> */}
          <div className="form-group">
            <button
              disabled={loading ? true : false}
              type="submit"
              className="form-submit-btn"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div
        className="cross-btn"
        onClick={() => {
          SetShow(false);
        }}
      >
        X
      </div>
    </div>
  );
};

export default PostPropertyRequerment;
