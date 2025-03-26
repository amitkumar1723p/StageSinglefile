import React, { useEffect, useState } from "react";
import "./PostPropertyRequerment.css";
import { PostPropertyRequirementAction } from "../../Action/userAction";
import { useSelector, useDispatch } from "react-redux";
import ProjectNameSection from "../Post/ProjectName";



const PostPropertyRequerment = ({ SetShow }) => {
  const dispatch = useDispatch();
 const [PostPropertyRequiremenLocalitytData,setPostPropertyRequiremenLocalitytData] = useState({});
  const [PostPropertyRequirementData, setPostPropertyRequirementData] =
    useState({
      PropertyType: "",
      ProjectName: "",
      BHKType: "",
      Budget: "",
      FloorPreference: "",
      plotSize: ""
    });
  const [unit, setUnit] = useState("Cr");
  const [plotUnit, setplotUnit] = useState("Sq.yard");

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
          PlotSize: ""
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
    let data = {
      ...PostPropertyRequirementData,
      ProjectName:PostPropertyRequiremenLocalitytData.projectName,
      City:PostPropertyRequiremenLocalitytData.city
    }

    console.log(PostPropertyRequiremenLocalitytData)
    console.log(data)
    if (data.PropertyType !== "Plot" && (!data.PropertyType || !data.ProjectName || !data.BHKType || !data.FloorPreference || !data.Budget)) {
      alert("please fill all data")
      return;
    }
    if (data.PropertyType === "Plot" && (!data.PropertyType || !data.plotSize || !data.Budget)) {
      alert("please fill all data")
      return;
    }
    let dataToSubmit;

    if (PostPropertyRequirementData.plotSize !== "") {
      dataToSubmit = {
        ...data,
        unit,
        PossessionStatus: status,
        plotUnit
      };
    } else {
      dataToSubmit = {
        ...data,
        unit,
        PossessionStatus: status,

      };
    }


    dispatch(PostPropertyRequirementAction(dataToSubmit));
  };

  const [propertyTypeAlert, setPropertyTypeAlert] = useState(false);
  const [locationAlert, setLocationAlert] = useState({});
  const [bhkType, setBhkType] = useState(false);
  const [floorPrefAlert, setFloorPrefAlert] = useState(false);
  const [budgetAlert, setBudgetAlert] = useState(false);



  const HandleRequirementAlert = () => {
    //   if(!PostPropertyRequirementData.PropertyType){
    //     setPropertyTypeAlert(true);
    //     setTimeout(()=>setPropertyTypeAlert(false),1400)
    //     return;
    //   }
    //   // if(!ProjectNameObjectData.ProjectName){
    //   //   setLocationAlert({ProjectName:true})
    //   //   setTimeout(() => {
    //   //     setLocationAlert({ProjectName:false})
    //   //   }, 1400);
    //   // }


    //   if(!PostPropertyRequirementData.BHKType){
    //     // setBhkType(true);
    //     // setTimeout(()=>setBhkType(false),1400);
    //     return;
    //   }
    //   if(!PostPropertyRequerment.FloorPreference){

    //     return;
    //   }

    //   if(PostPropertyRequirementData.Budget === ""){
    //     console.log("console.consloe")
    //     setBudgetAlert(true);
    //     setTimeout(()=> setBudgetAlert(false),1400)
    //     return;
    //   }

  }

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
          <div className="property-form-type">
            <div className="form-group form-bhk">
              <p className="postreq-form " >Property type</p>
              <select
                className={`form-input`}
                required
                value={PostPropertyRequirementData?.PropertyType?.trimStart()}
                onChange={(e) =>
                  setPostPropertyRequirementData({
                    ...PostPropertyRequirementData,
                    PropertyType: e.target.value,
                  })
                }
              >
                <option value="">Choose property type</option>
                <option value="Appartment">Appartment</option>
                <option value="Builder Floor">Builder Floor</option>
                <option value="Plot">Plot/Land</option>

              </select>
            </div>
          </div>
          <div className="property-form-details-top">
            {/* style={{ width: PostPropertyRequirementData.PropertyType !== "Plot" ? '220px' : '100%' }} */}
            <div className='form-group post-prop-form-group'>
              <p className="postreq-form ">Locality</p>
              <ProjectNameSection
                ProjectInputType={"PostRequirement"}
                ProjectNameObjectData={PostPropertyRequiremenLocalitytData}
                setProjectNameObjectData={setPostPropertyRequiremenLocalitytData}
                placeholder={"Search by locality, project name"}
                locationAlert={locationAlert}
              />
            </div>

            {PostPropertyRequirementData.PropertyType !== "Plot" && <>
              <div className="form-group form-bhk">
                <p className="postreq-form " >BHK Type</p>
                <select
                  className={`form-input `}
                  required
                  value={PostPropertyRequirementData?.BHKType?.trimStart()}
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
                  className={`form-input post-prop-floor  ${floorPrefAlert ? "shake inputShake " : ''}`}
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
            </>

            }
            {PostPropertyRequirementData.PropertyType === "Plot" &&
              <div className="form-group form-budget">
                <div className="budget-container">
                  <p className="postreq-form ">Plot size</p>
                  <input
                    required
                    value={PostPropertyRequirementData?.plotSize}
                    onChange={(e) => {
                      // Allow numbers and one decimal point only
                      let value = e.target.value;
                      console.log(value)
                      setPostPropertyRequirementData({
                        ...PostPropertyRequirementData,
                        plotSize: value,
                      });
                    }}
                    type="text"
                    placeholder="Enter your Budget"
                    className="form-input"
                  />
                </div>

                <div className="form-budget-option">
                  <select value={plotUnit} onChange={(e) => setplotUnit(e.target.value)}>
                    <option value="Sqft">Sqft</option>
                    <option value="Sqrd">Sq.yrd</option>
                  </select>
                </div>
              </div>
            }


          </div>

          <div className="property-form-details-bottom">
            <div className="form-group form-budget">
              <div className="budget-container">
                <p className="postreq-form ">Budget</p>
                <input
                  required
                  value={PostPropertyRequirementData?.Budget}
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
                  className={`form-input `}
                />
              </div>

              <div className="form-budget-option">
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                  <option value="Cr">Cr</option>
                  <option value="Lakh">Lakhs</option>
                </select>
              </div>
            </div>

            {
              PostPropertyRequirementData.PropertyType !== "Plot" &&
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
            }
           

            <div className="form-group">
              <button
                disabled={loading ? true : false}
                type="submit"
                className="form-submit-btn"
                onClick={HandleRequirementAlert}
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
