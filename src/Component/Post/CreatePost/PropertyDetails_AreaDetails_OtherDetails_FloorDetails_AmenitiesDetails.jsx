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
  CreatePostRef,
  FormSubmitRef,
}) {
  const ApartMentTypeArrayRemovePlotAndLand = [
    "Apartment",
    "Independent House/Villa",
    "Studio Apartment",
    "1 RK/PG",
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
  const [filederror, setfielderror] = useState("");
  useEffect(() => {}, [BasicDetailsData.PropertyAdType]);
  const PostSubmitHandler = (e) => {
    e.preventDefault();
    if (BasicDetailsData.ApartmentType == "Plot/Land") {
      if (!OtherDetailsData.PlotDirection) {
        setfielderror(true);
        return;
      }

      if (!OtherDetailsData.PlotFacing) {
        return;
      }
      if (!OtherDetailsData.FrontRoadWidth) {
        return;
      }

      if (AmenitiesDetailsData?.ProjectAmmenities?.length <= 0) {
        return;
      }

      if (AmenitiesDetailsData?.OtherFeature?.length <= 0) {
        return;
      }

      //
    } else {
      if (
        !AreaDetailsData.SuperBuiltUpArea?.value &&
        !AreaDetailsData.CarpetArea?.value &&
        !AreaDetailsData.BuiltUpArea?.value
      ) {
        return;
      }
      if (Object.keys(AlertObj).length > 0) {
        return;
      }
      if (!FloorDetailsData.PropertyDirection) {
        return;
      }

      if (FloorDetailsData?.OverLookingView?.length <= 0) {
        return;
      }

      if (!AmenitiesDetailsData.Furnishing) {
        return;
      }

      if (
        AmenitiesDetailsData?.SocietyAndBuildingFeature?.length <= 0 &&
        BasicDetailsData.ApartmentType !== "Independent/Builder Floor"
      ) {
        return;
      }
      if (update && AmenitiesDetailsData.Furnishing == "Un-Furnished") {
        const { FurnishingOption, ...AmenitiesDetailsRest } =
          AmenitiesDetailsData;
        setAmenitiesDetailsData(AmenitiesDetailsRest);
      }
    }

    if (!AmenitiesDetailsData.PowerBackUp) {
      return;
    }

    if (
      AmenitiesDetailsData?.WaterSource?.length <= 0 &&
      BasicDetailsData.PropertyStatus != "Under Construction"
    ) {
      return;
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

  // wrong field Alert shakes

  const [Error, showError] = useState({});

  const HandleAreaDetailsAlert = () => {
    if (BasicDetailsData.ApartmentType == "Plot/Land") {
      if (!AreaDetailsData.PlotSize?.value) {
        setTimeout(() => showError({ PlotSize: true }), 500);
        setTimeout(() => showError({ PlotSize: false }), 1500);
        return;
      }
      if (!AreaDetailsData?.PlotDimensions?.Length) {
        setTimeout(() => showError({ PlotDimensions: true }), 500);
        setTimeout(() => showError({ PlotDimensions: false }), 1500);
        return;
      }
      if (!AreaDetailsData.PlotDimensions?.Breadth) {
        setTimeout(() => showError({ PlotDimensions: true }), 500);
        setTimeout(() => showError({ PlotDimensions: false }), 1500);
        return;
      }
      if (AmenitiesDetailsData?.OtherFeature?.length <= 0) {
        const targetScroll = document.querySelector("#ScrollToAreaDetails");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });
        showError({ OtherFeature: true });
        setTimeout(() => showError({ OtherFeature: false }), 1500);
        return;
      }

      if (!OtherDetailsData.ConstructionAllowed) {
        setTimeout(() => showError({ ConstructionAllowed: true }), 500);
        setTimeout(() => showError({ ConstructionAllowed: false }), 1500);
        return;
      }
      if (!OtherDetailsData.PlotDirection) {
        const targetScroll = document.querySelector("#ScrollToOtherDetails");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });
        setTimeout(() => showError({ PlotDirection: true }), 200);
        setTimeout(() => showError({ PlotDirection: false }), 1500);
        return;
      }
      if (!OtherDetailsData.PlotFacing) {
        const targetScroll = document.querySelector("#ScrollToOtherDetails");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });
        setTimeout(() => showError({ PlotFacing: true }), 200);
        setTimeout(() => showError({ PlotFacing: false }), 1500);
        return;
      }
      if (!OtherDetailsData.FrontRoadWidth) {
        const targetScroll = document.querySelector("#ScrollToOtherDetails");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });
        setTimeout(() => showError({ FrontRoadWidth: true }), 100);
        setTimeout(() => showError({ FrontRoadWidth: false }), 1500);
        return;
      }
      if (!AmenitiesDetailsData.PowerBackUp) {
        const targetScroll = document.querySelector("#ScrollToAmenities");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });
        setTimeout(() => showError({ PowerBackUp: true }), 100);
        setTimeout(() => showError({ PowerBackUp: false }), 1500);
        return;
      }
      if (AmenitiesDetailsData.WaterSource?.length <= 0) {
        const targetScroll = document.querySelector("#ScrollToAmenities");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });
        setTimeout(() => showError({ WaterSource: true }), 100);
        setTimeout(() => showError({ WaterSource: false }), 1500);
        return;
      }
      if (AmenitiesDetailsData.ProjectAmmenities?.length <= 0) {
        const targetScroll = document.querySelector("#ScrollToAmenities");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });
        showError({ ProjectAmmenities: true });
        setTimeout(() => showError({ ProjectAmmenities: false }), 1500);
        return;
      }
    } else {
      if (!PropertyDetailsData.BHKType) {
        setTimeout(() => showError({ BHKType: true }), 800);
        setTimeout(() => showError({ BHKType: false }), 1800);
        return;
      }
      if (!PropertyDetailsData.FlooringType) {
        setTimeout(() => showError({ FlooringType: true }), 800);
        setTimeout(() => showError({ FlooringType: false }), 1800);
        return;
      }

      // if (
      //   ["Independent/Builder Floor"].includes(BasicDetailsData.ApartmentType)
      // ) {
      //   // if(PropertyDetailsData.Basement === undefined){
      //   //   setTimeout(()=>showError({Basement:true}),800);
      //   // setTimeout(()=>showError({Basement:false}),1800);
      //   // return;
      //   // }
      // }

      if (PropertyDetailsData.Basement == true) {
        if (!PropertyDetailsData.BasementArea.value) {
          setTimeout(() => showError({ BasementAreaShake: true }), 800);
          setTimeout(() => showError({ BasementAreaShake: false }), 1800);
          return;
        }
      }

      // if(PropertyDetailsData.OtherRoom.length==0){

      //   setTimeout(()=>showError({OtherRoom:true}),800);
      //   setTimeout(()=>showError({OtherRoom:false}),1800);
      //   return;
      // }
      if (
        FloorDetailsData.TotalFloors === undefined ||
        FloorDetailsData.TotalFloors == 0
      ) {
        const targetScroll = document.querySelector("#ScrollToFloorDetails");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });

        setTimeout(() => showError({ TotalFloors: true }), 800);
        setTimeout(() => showError({ TotalFloors: false }), 1800);
        return;
      }
      if (FloorDetailsData.PropertyOnFloor === "") {
        const targetScroll = document.querySelector("#ScrollToFloorDetails");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });

        setTimeout(() => showError({ PropertyOnFloor: true }), 800);
        setTimeout(() => showError({ PropertyOnFloor: false }), 1800);
        return;
      }

      if (
        FloorDetailsData.PropertyDirection <= 0 ||
        FloorDetailsData.PropertyDirection === undefined
      ) {
        const targetScroll = document.querySelector("#ScrollToFloorDetails");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });

        setTimeout(() => showError({ PropertyDirection: true }), 650);
        setTimeout(() => showError({ PropertyDirection: false }), 1650);
        return;
      }
      // if(BasicDetailsData.ApartmentType == "Independent House/Villa"){
      //   if(AreaDetailsData.PlotArea === '' || AreaDetailsData.PlotArea === undefined ){

      //     setTimeout(()=>showError({PlotArea:true}),650);
      //     setTimeout(()=>showError({PlotArea:false}),1650);
      //     return;
      //   }
      // }

      if (
        !AreaDetailsData.SuperBuiltUpArea?.value &&
        !AreaDetailsData.CarpetArea?.value &&
        !AreaDetailsData.BuiltUpArea?.value
      ) {
        const targetScroll = document.querySelector("#ScrollToAreaDetails");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });
        setTimeout(() => showError({ AreaDetailData: true }), 600);
        setTimeout(() => showError({ AreaDetailData: false }), 1600);
        return;
      }

      if (FloorDetailsData?.OverLookingView?.length <= 0) {
        const targetScroll = document.querySelector("#ScrollToFloorDetails");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });

        setTimeout(() => showError({ OverLookingView: true }), 500);
        setTimeout(() => showError({ OverLookingView: false }), 1500);
        return;
      }

      if (!AmenitiesDetailsData.Furnishing) {
        const targetScroll = document.querySelector("#ScrollToAmenities");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });
        setTimeout(() => showError({ Furnishing: true }), 500);
        setTimeout(() => showError({ Furnishing: false }), 1500);
        return;
      }
      if (["Un-Furnished"].includes(AmenitiesDetailsData.Furnishing)) {
        if (
          AmenitiesDetailsData?.SocietyAndBuildingFeature?.length <= 0 &&
          BasicDetailsData.ApartmentType !== "Independent/Builder Floor"
        ) {
          const targetScroll = document.querySelector("#ScrollToAmenities");
          targetScroll.scrollIntoView({
            behavior: "smooth",
          });
          setTimeout(() => showError({ SocietyAndBuildingFeature: true }), 500);
          setTimeout(
            () => showError({ SocietyAndBuildingFeature: false }),
            1500
          );

          return;
        }
      } else {
        if (
          AmenitiesDetailsData.FurnishingOption?.ModularKitchen === undefined
        ) {
          const targetScroll = document.querySelector("#ScrollToAmenities");
          targetScroll.scrollIntoView({
            behavior: "smooth",
          });
          setTimeout(() => showError({ ModularKitchen: true }), 500);
          setTimeout(() => showError({ ModularKitchen: false }), 1500);

          return;
        }
        if (
          AmenitiesDetailsData?.SocietyAndBuildingFeature?.length <= 0 &&
          BasicDetailsData.ApartmentType !== "Independent/Builder Floor"
        ) {
          const targetScroll = document.querySelector("#ScrollToAmenities");
          targetScroll.scrollIntoView({
            behavior: "smooth",
          });
          setTimeout(() => showError({ SocietyAndBuildingFeature: true }), 500);
          setTimeout(
            () => showError({ SocietyAndBuildingFeature: false }),
            1500
          );

          return;
        }
      }
      if (!AmenitiesDetailsData.PowerBackUp) {
        setTimeout(() => showError({ PowerBackUp: true }), 100);
        setTimeout(() => showError({ PowerBackUp: false }), 1500);
        return;
      }

      if (AmenitiesDetailsData.WaterSource?.length <= 0) {
        setTimeout(() => showError({ WaterSource: true }), 100);
        setTimeout(() => showError({ WaterSource: false }), 1500);
        return;
      }

      if (Object.keys(AlertObj).length > 0) {
        const targetScroll = document.querySelector("#ScrollToAreaDetails");
        targetScroll.scrollIntoView({
          behavior: "smooth",
        });

        setTimeout(() => showError({ AreaFieldError: true }), 700);
        setTimeout(() => showError({ AreaFieldError: false }), 1700);
        return;
      }
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
              <div className="Prop-detials-box-form ">
                <PropertyDetailsSection
                  PropertyDetailsData={PropertyDetailsData}
                  setPropertyDetailsData={setPropertyDetailsData}
                  Error={Error}
                  BasicDetailsData={BasicDetailsData}
                />
              </div>
            )}

            <div
              className={`Prop-detials-box-form-area ${
                Error.AreaFieldError ? "inputShake shake" : ""
              }`}
              id="ScrollToAreaDetails"
              style={{ scrollMarginTop: "80px" }}
            >
              <AreaDetailsSection
                AreaDetailsData={AreaDetailsData}
                setAreaDetailsData={setAreaDetailsData}
                BasicDetailsData={BasicDetailsData}
                AlertObj={AlertObj}
                Error={Error}
                AmenitiesDetailsData={AmenitiesDetailsData}
                setAmenitiesDetailsData={setAmenitiesDetailsData}
              />
            </div>

            {ApartMentTypeArrayRemovePlotAndLand.includes(
              BasicDetailsData.ApartmentType
            ) && (
              <div
                className="Prop-detials-box-floor"
                id="ScrollToFloorDetails"
                style={{ scrollMarginTop: "80px" }}
              >
                <FloorDetails
                  FloorDetailsData={FloorDetailsData}
                  setFloorDetailsData={setFloorDetailsData}
                  BasicDetailsData={BasicDetailsData}
                  Error={Error}
                />
              </div>
            )}

            {BasicDetailsData.ApartmentType == "Plot/Land" && (
              <div
                id="ScrollToOtherDetails"
                style={{ scrollMarginTop: "80px" }}
              >
                <OtherDetails
                  OtherDetailsData={OtherDetailsData}
                  setOtherDetailsData={setOtherDetailsData}
                  BasicDetailsData={BasicDetailsData}
                  filederror={filederror}
                  Error={Error}
                />

                {/* <Amenities
                  update={update}
                  AmenitiesDetailsData={AmenitiesDetailsData}
                  setAmenitiesDetailsData={setAmenitiesDetailsData}
                  BasicDetailsData={BasicDetailsData}
                /> */}
              </div>
            )}

            <div
              className="Prop-detials-box-form-Amenities"
              id="ScrollToAmenities"
              style={{ scrollMarginTop: "80px" }}
            >
              <Amenities
                update={update}
                AmenitiesDetailsData={AmenitiesDetailsData}
                setAmenitiesDetailsData={setAmenitiesDetailsData}
                BasicDetailsData={BasicDetailsData}
                Error={Error}
              />
            </div>

            <div className="next-prev-box">
              <>
                {update == true && (
                  <div

                  className="updatebyamdin"
                    onClick={() => {
                      FormSubmitRef?.current?.requestSubmit();
                    }}
                  >
                    Update Post
                  </div>
                )}
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

              <button onClick={HandleAreaDetailsAlert} type="Submit-next">
                {" "}
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
