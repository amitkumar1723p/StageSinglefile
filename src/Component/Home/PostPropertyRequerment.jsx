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
    const [unit, setUnit] = useState('Cr');
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
     
      <div className="form-right">
        <div className="form-right-heading-container">
        <h3 className="form-header">Share Your Requirement</h3>
        <p>Tell us what you're looking for, and we'll help you find your perfect property.</p>
        </div>
       
        <form className="property-form  post-property-form" onSubmit={CreateQuerryFormHandler}>
          <div className="property-form-details-top">
             <div className="form-group">
             <p>Locality</p>
       
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
             

             <div className="form-group form-bhk">
             <p>BHK Type</p>
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
          <p>Floor Preference</p>
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
          </div>
          
          

          <div className="property-form-details-bottom">
          <div className="form-group form-budget">
            <div className="budget-container">
            <p>Budget</p>
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
            <div className="form-budget-option">
            <select value={unit} onChange={(e)=>setUnit(e.target.value)}>
              <option value="Cr">Cr</option>
              <option value="Lakhs">lakhs</option>
            </select>
            </div>
           
           
          </div>
          <div className="possession-status">
            <p className="possession-status-title" >Possession Status</p>
            <div className="radio-group">
                <label>
                    <input
                        type="radio"
                        name="possession"
                        value="Ready to Move"
                      
                       
                    />
                    Ready to Move
                </label>
                <label>
                    <input
                        type="radio"
                        name="possession"
                        value="Under Construction"
                      
                       
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
          
          {/* Hidden Field */}
          {/* <div className="form-group hidden-group">
            <input
              type="hidden"
              placeholder="Property Details"
              value="hidden property data"
              className="form-input-hidden"
            />
          </div> */}
          
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
