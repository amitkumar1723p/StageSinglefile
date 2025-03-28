import React, { useEffect, useState } from "react";
import MapComponent from "./MapComponent";

import { StoreDataInSession } from "../../../utils/SessionStorage.js";

import ProjectNameSection from "../ProjectName.jsx";
import { useDispatch } from "react-redux";
import { GetProjectNameAction } from "../../../Action/postAction.jsx";
import ScrollToTop from "../../../ScrollToTop.jsx";

export default function LocationDetails({
  LocationDetailsData,
  setLocationDetailsData,
  update,
  setnext,
  // LocationDetailsSubmit
  LocationDetailsSubmiRef,
}) {
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!update) {
      StoreDataInSession("next", 2);
      StoreDataInSession("LocationDetailsData", LocationDetailsData);
    }
      setnext(2);
  };

  // handle Alert Shake


  
      const transitionDuration = '0.3s';
  const [locationAlert, setlocationAlert] = useState({});

  const [sectorShake,setSectorShake] = useState(false);
  const [cityShake,setCityShake] = useState(false);
  const [localityShake,setLocalityShake] = useState(false)


  const LocationDetailsAlertShake = (e)=>{
    
    // if(ProjectNameObjectData === undefined){
    //   console.log("console");
    // }
    
    if(LocationDetailsData.Landmark?.length == 0){
      // setSectorShake(true);
      // setTimeout(()=> setSectorShake(false),1600);
      return

    }
    if(LocationDetailsData.City?.length == 0){
      setCityShake(true);
      setTimeout(()=> setCityShake(false),1600);
      return

    }
    if(LocationDetailsData.Locality?.length == 0){
      setLocalityShake(true);
      setTimeout(()=> setLocalityShake(false),1600);
      return

    }
  }



  return (
    <>
      <ScrollToTop />
        {/* <div className="create-banner-box">
          <img src="/img/create-banner.svg" alt="create-banner" />
        </div> */}
      <div className="container-location w-80%">
        <h2 className="location-heading">Location Details</h2>
        <form id="locationForm" onSubmit={submitHandler} ref={ LocationDetailsSubmiRef}>
          <div className="location-box">
            <ProjectNameSection
            
              ProjectInputType={"PostForm"}
              ProjectNameObjectData={LocationDetailsData}
              setProjectNameObjectData={setLocationDetailsData}
              placeholder={"Project / Sector / Area Name"}
              inputClass ={"locationdetails-input"}
              locationAlert={locationAlert}
            />

            <div className="form-group">
              <label htmlFor="street">Sector *</label>
              <input
              style={{transitionDuration}}
              className={`${sectorShake? '' : ''}`}
                type="text"
                id="street"
                name="street"
                placeholder="e.g. Sector 65"
                required
                value={LocationDetailsData.Landmark?.trimStart() || ""}
                onChange={(e) => {
                  setLocationDetailsData({
                    ...LocationDetailsData,
                    Landmark: e.target.value,
                  });
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
              style={{transitionDuration}}
               className={`${cityShake? 'inputShake shake' : ''}`}
                type="text"
                id="city"
                name="city"
                placeholder="Enter City Name"
                required
                value={LocationDetailsData.City?.trimStart() || ""}
                onChange={(e) => {
                  setLocationDetailsData({
                    ...LocationDetailsData,
                    City: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="locality">Locality *</label>
              <input
              style={{transitionDuration}}
              className={`${localityShake? 'inputShake shake' : ''}`}
                type="text"
                id="locality"
                name="locality"
                placeholder="e.g. New Gurgaon / SPR"
                required
                // readOnly={!LocationDetailsData.Locality?false:true}
                // defaultValue={LocationDetailsData.Locality}
                value={LocationDetailsData.Locality?.trimStart() || ""}
                onChange={(e) => {
                  setLocationDetailsData({
                    ...LocationDetailsData,
                    Locality: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="next-prev-box">
            <div
              className="Submit-prev"
              onClick={() => {
                setnext(0);
                StoreDataInSession("next", 0);
              }}
            >
              {" "}
              Previous
            </div>

            <button className="Submit-next" onClick={LocationDetailsAlertShake}>Next</button>
          </div>
        </form>
      </div>
      <div className="map-box">{/* <MapComponent /> */}</div>
    </>
  );
}
