import React, { useEffect } from "react";
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

  return (
    <>
      <ScrollToTop />
      <div className="container">
        <h2 className="location-heading">Location Details</h2>
        <form id="locationForm" onSubmit={submitHandler}>
          <div className="location-box">
            <ProjectNameSection
              ProjectInputType ={"PostForm"}
              ProjectNameObjectData={LocationDetailsData}
              setProjectNameObjectData={setLocationDetailsData}
              placeholder={"Project Name"}
            />

            <div className="form-group">
              <label htmlFor="street">Sector *</label>
              <input
                type="text"
                id="street"
                name="street"
                placeholder="e.g. Evergreen street"
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
                type="text"
                id="city"
                name="city"
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
                type="text"
                id="locality"
                name="locality"
                placeholder="Enter location / society name"
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

            <button className="Submit-next">Next</button>
          </div>
        </form>
      </div>
      <div className="map-box">{/* <MapComponent /> */}</div>
    </>
  );
}
