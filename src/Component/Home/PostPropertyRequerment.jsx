import React, { useEffect, useState } from "react";
import "./PostPropertyRequerment.css";
import { PostPropertyRequirementAction } from "../../Action/userAction";
import { useSelector, useDispatch } from "react-redux";
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
  const [unit, setUnit] = useState("Cr");
  const [status, setStatus] = useState(""); // Possession Status
  const { loading, data, LodingType } = useSelector((state) => state.userData);

  useEffect(() => {
    if (data && LodingType === "PostPropertyRequirementRequest") {
      if (data.success === true) {
        setPostPropertyRequirementData({
          ProjectName: "",
          BHKType: "",
          Budget: "",
          FloorPreference: "",
        });
        setUnit("Cr");
        setStatus("");
        SetShow(false);
      }
    }
  }, [data, LodingType, SetShow]);

  const CreateQuerryFormHandler = (e) => {
    e.preventDefault();
    // Merge unit and PossessionStatus into the submission data
    const dataToSubmit = {
      ...PostPropertyRequirementData,
      unit,
      PossessionStatus: status,
    };
    dispatch(PostPropertyRequirementAction(dataToSubmit));
  };

  return (
    <div className="form-container">
      <div className="form-right">
        <div className="form-right-heading-container">
          <h3 className="form-header">Share Your Requirement</h3>
          <p>
            Tell us what you're looking for, and we'll help you find your
            perfect property.
          </p>
        </div>

        <form
          className="property-form post-property-form"
          onSubmit={CreateQuerryFormHandler}
        >
          <div className="property-form-details-top">
            <div className="form-group">
              <p className="postreq-form ">Locality</p>
              <ProjectNameSection
                ProjectInputType={"PostRequirement"}
                ProjectNameObjectData={PostPropertyRequirementData}
                setProjectNameObjectData={setPostPropertyRequirementData}
                placeholder={"Search by locality, project name"}
              />
            </div>

            <div className="form-group form-bhk">
              <p className="postreq-form " >BHK Type</p>
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

            <div className="form-group form-floor">
              <p className="postreq-form "> Floor Preference</p>
              <select
                required
                className="form-input"
                onChange={(e) =>
                  setPostPropertyRequirementData({
                    ...PostPropertyRequirementData,
                    FloorPreference: e.target.value,
                  })
                }
              >
                <option value="">Floor Preference</option>
                <option value="ground">Ground Floor</option>
                <option value="mid">Mid Floor</option>
                <option value="high">High Floor</option>
              </select>
            </div>
          </div>

          <div className="property-form-details-bottom">
            <div className="form-group form-budget">
              <div className="budget-container">
                <p className="postreq-form ">Budget</p>
                <input
                  required
                  value={PostPropertyRequirementData.Budget}
                  onChange={(e) => {
                    // Allow numbers and one decimal point only
                    let value = e.target.value;
                    // Remove any character that is not a digit or a decimal point
                    value = value.replace(/[^0-9.]/g, "");
                    // Ensure that only one decimal point exists
                    const parts = value.split(".");
                    if (parts.length > 2) {
                      value = parts[0] + "." + parts.slice(1).join("");
                    }
                    setPostPropertyRequirementData({
                      ...PostPropertyRequirementData,
                      Budget: value,
                    });
                  }}
                  type="text"
                  placeholder="Enter your Budget"
                  className="form-input"
                />
              </div>

              <div className="form-budget-option">
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <option value="Cr">Cr</option>
                  <option value="Lakh">Lakhs</option>
                </select>
              </div>
            </div>

            <div className="possession-status">
              <p className="possession-status-title">Possession Status</p>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="possession"
                    value="Ready to Move"
                    checked={status === "Ready to Move"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Ready to Move
                </label>
                <label>
                  <input
                    type="radio"
                    name="possession"
                    value="Under Construction"
                    checked={status === "Under Construction"}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  Under Construction
                </label>
              </div>
            </div>

            <div className="form-group">
              <button
                disabled={loading ? true : false}
                type="submit"
                className="form-submit-btn"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div
        className="cross-Btn"
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
