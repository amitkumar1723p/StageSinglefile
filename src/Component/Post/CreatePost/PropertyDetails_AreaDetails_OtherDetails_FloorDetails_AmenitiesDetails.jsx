import React, { useEffect, useState } from "react";

import { StoreDataInSession } from "../../../utils/SessionStorage.js";
import PropertyDetailsSection from "./PropertyDetails.jsx";
import AreaDetailsSection from "./AreaDetails.jsx";
import OtherDetails from "./OtherDetails.jsx";

import Amenities from "./Amenities.jsx";
import ScrollToTop from "../../../ScrollToTop.jsx";
import FloorDetails from "./FloorDetails.jsx";
export default function PropertyDetails_AreaDetails_OtherDetails_FloorDetails_AmenitiesDetails_Section({
  setnext,
  BasicDetailsData,
  update,
  PropertyDetailsData,
  setPropertyDetailsData,
  AreaDetailsData,
  setAreaDetailsData,
  setOtherDetailsData,
  OtherDetailsData,
  AmenitiesDetailsData,
  setAmenitiesDetailsData,
  FloorDetailsData,
  setFloorDetailsData,
  ApartmentFeaturesRef,
}) {
  const ApartMentTypeArrayRemovePlotAndLand = [
    "Apartment",
    "Independent House/Villa",
    "1 RK/Studio Apartment",
    "Independent/Builder Floor",
    "Serviced Apartment",
  ];

  const [AlertObj, setAlertObj] = useState({});

  useEffect(() => {
    const SuperBuiltUpArea = Number(AreaDetailsData.SuperBuiltUpArea?.value);
    const CarpetArea = Number(AreaDetailsData.CarpetArea?.value);
    const BuiltUpArea = Number(AreaDetailsData.BuiltUpArea?.value);

    // Initialize the new alert object
    let newAlertObj = { ...AlertObj };

    if (
      (AreaDetailsData.SuperBuiltUpArea?.value &&
        AreaDetailsData.CarpetArea?.value) ||
      (AreaDetailsData.SuperBuiltUpArea?.value &&
        AreaDetailsData.BuiltUpArea?.value)
    ) {
      // Check for CarpetArea vs SuperBuiltUpArea
      if (CarpetArea > SuperBuiltUpArea) {
        newAlertObj.CarpetAreaAlert =
          "Carpet Area is always less than or equal to the Super Built-Up Area.";
      } else {
        delete newAlertObj.CarpetAreaAlert;
      }

      // Check for BuiltUpArea vs SuperBuiltUpArea
      if (BuiltUpArea > SuperBuiltUpArea) {
        newAlertObj.BuiltUpAreaAlert =
          "Super Built-Up Area is greater than or equal to Built-Up Area.";
      } else {
        delete newAlertObj.BuiltUpAreaAlert;
      }

      setAlertObj(newAlertObj);
    } else {
      // Clear the alerts when no condition matches
      setAlertObj({});
    }
  }, [
    AreaDetailsData.BuiltUpArea?.value,
    AreaDetailsData.CarpetArea?.value,
    AreaDetailsData.SuperBuiltUpArea?.value,
  ]);

  useEffect(() => {}, [BasicDetailsData.PropertyAdType]);
  const PostSubmitHandler = (e) => {
    e.preventDefault();
    if (BasicDetailsData.ApartmentType == "Plot/Land") {
      if (!OtherDetailsData.PlotDirection) {
        return alert("Plot Direction Field is Required");
      }

      //  if()
      if (!OtherDetailsData.PlotFacing) {
        return alert("Plot Facing  Field is Required");
      }

      if (AmenitiesDetailsData?.ProjectAmmenities?.length <= 0) {
        return alert("Project Ammenities  Field is Required");
      }

      if (AmenitiesDetailsData?.OtherFeature?.length <= 0) {
        return alert("Other Field is Required");
      }

      //
    } else {
      if (
        !AreaDetailsData.SuperBuiltUpArea?.value &&
        !AreaDetailsData.CarpetArea?.value &&
        !AreaDetailsData.BuiltUpArea?.value
      ) {
        return alert(
          "SuperBuiltUpArea CarpetArea  and BuiltUpArea insert value"
        );
      }
      if (Object.keys(AlertObj).length > 0) {
        alert("resove Area field error");
        return;
      }
      if (!FloorDetailsData.PropertyDirection) {
        return alert("PropertyDirection Field Required");
      }

      if (FloorDetailsData?.OverLookingView?.length <= 0) {
        return alert("Over Looking View  Field Required");
      }

      if (!AmenitiesDetailsData.Furnishing) {
        return alert("Furnishing Field Required");
      }

      if (AmenitiesDetailsData?.SocietyAndBuildingFeature?.length <= 0) {
        return alert(" Society And Building Feature is Required");
      }
      if (update && AmenitiesDetailsData.Furnishing == "Un-Furnished") {
        const { FurnishingOption, ...AmenitiesDetailsRest } =
          AmenitiesDetailsData;
        setAmenitiesDetailsData(AmenitiesDetailsRest);
      }
    }

    if (!AmenitiesDetailsData.PowerBackUp) {
      return alert(" PowerBackUp  Field is Required");
    }

    if (AmenitiesDetailsData?.WaterSource?.length <= 0) {
      return alert("WaterSource is Required");
    }

    setnext(3);
    if (!update) {
      if (BasicDetailsData.ApartmentType == "Plot/Land") {
        StoreDataInSession("OtherDetailsData", OtherDetailsData);
      } else {
        StoreDataInSession("PropertyDetailsData", PropertyDetailsData);
        StoreDataInSession("FloorDetailsData", FloorDetailsData);
      }
      StoreDataInSession("next", 3);

      StoreDataInSession("AreaDetailsData", AreaDetailsData);

      StoreDataInSession("AmenitiesDetailsData", AmenitiesDetailsData);
    }
  };

  return (
    <>
      <ScrollToTop />
      {/* <div className="create-banner-box">
          <img src="/img/create-banner.svg" alt="create-banner" />
        </div> */}
      <div className="property-details-main-box">
        <div className="property-details">
          <h2> {BasicDetailsData.ApartmentType} Section </h2>
          <form
            id="property-form"
            onSubmit={PostSubmitHandler}
            ref={ApartmentFeaturesRef}
          >
            {ApartMentTypeArrayRemovePlotAndLand.includes(
              BasicDetailsData.ApartmentType
            ) && (
              <div className="Prop-detials-box-form">
                <PropertyDetailsSection
                  PropertyDetailsData={PropertyDetailsData}
                  setPropertyDetailsData={setPropertyDetailsData}
                />
              </div>
            )}

            <div className="Prop-detials-box-form-area">
              <AreaDetailsSection
                AreaDetailsData={AreaDetailsData}
                setAreaDetailsData={setAreaDetailsData}
                BasicDetailsData={BasicDetailsData}
                AlertObj={AlertObj}
              />
            </div>

            {ApartMentTypeArrayRemovePlotAndLand.includes(
              BasicDetailsData.ApartmentType
            ) && (
              <div className="Prop-detials-box-floor">
                <FloorDetails
                  FloorDetailsData={FloorDetailsData}
                  setFloorDetailsData={setFloorDetailsData}
                  BasicDetailsData={BasicDetailsData}
                />
              </div>
            )}

            {BasicDetailsData.ApartmentType == "Plot/Land" && (
              <>
                <OtherDetails
                  OtherDetailsData={OtherDetailsData}
                  setOtherDetailsData={setOtherDetailsData}
                  BasicDetailsData={BasicDetailsData}
                />

                {/* <Amenities
                  update={update}
                  AmenitiesDetailsData={AmenitiesDetailsData}
                  setAmenitiesDetailsData={setAmenitiesDetailsData}
                  BasicDetailsData={BasicDetailsData}
                /> */}
              </>
            )}

            <div className="Prop-detials-box-form-Amenities">
              <Amenities
                update={update}
                AmenitiesDetailsData={AmenitiesDetailsData}
                setAmenitiesDetailsData={setAmenitiesDetailsData}
                BasicDetailsData={BasicDetailsData}
              />
            </div>

            <div className="next-prev-box">
              <>
                <div
                  className="Submit-prev"
                  onClick={() => {
                    setnext(1);
                    if (!update) {
                      StoreDataInSession("next", 1);
                    }
                  }}
                >
                  {" "}
                  Previous
                </div>{" "}
              </>

              <button type="Submit-next"> Next</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
