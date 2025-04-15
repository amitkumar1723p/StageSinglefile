import React, { useEffect, useState } from "react";
import { StoreDataInSession } from "../../../utils/SessionStorage.js";

import ScrollToTop from "../../../ScrollToTop.jsx";
import { useSelector } from "react-redux";
export default function BasicDetailsSection({
  BasicDetailsData,
  setBasicDetailsData,
  setnext,
  update,
  SinglePost,
  FormSubmitRef ,
}) {
  // eslint-disable-next-line
  const [ApartMentTypeTab, setApartMentTypeTab] = useState([
    "Apartment",
    "Independent House/Villa",
    // "1 RK/Studio Apartment",
    "Independent/Builder Floor",
    // "Serviced Apartment",
  ]);
  const ApartMentTypeArrayRemovePlotAndLand = [
    "Apartment",
    "Independent House/Villa",
    // "1 RK/Studio Apartment",
    "Studio Apartment",
    "1 RK/PG",
    "Independent/Builder Floor",
    "Serviced Apartment",
  ];
  const PropertyStatusArray = ["Ready to move", "Under Construction"];
  const PropertyAdTypeArray = ["Sale", "Rent"];
  // const CurrentPropertyStatusArray = ["Vacant", "Rented", "Self Occupied"];
  const TransitionTypeArray = ["Transfer Case", "Registry Case"];
  const [CurrentPropertyStatusArray, setCurrentPropertyStatusArray] = useState(
    []
  );
  const PossessionStatusOption = [
    "Immediate",
    "Within 3 Month",
    "Within 6 Month",
    "By 2025",
    "By 2026",
    "By 2027",
    "By 2028",
    "By 2029",
  ];
  const { loading, medata } = useSelector((state) => {
    return state.meDetails;
  });
  // Property Ad type (useEffect)  add plot/land
  useEffect(() => {
    if (BasicDetailsData.PropertyAdType === "Sale") {
      setApartMentTypeTab([
        "Apartment",
        "Independent/Builder Floor",
        "Studio Apartment",
        "Independent House/Villa",
        "Plot/Land",
      ]);
      // if (!ApartMentTypeTab.includes("Plot/Land")) {
      // setApartMentTypeTab([...ApartMentTypeTab, ]);
      // }
    }

    if (BasicDetailsData.PropertyAdType === "Rent") {
      setApartMentTypeTab([
        "Apartment",
        "Independent/Builder Floor",
        "1 RK/PG",
        "Independent House/Villa",
        "Serviced Apartment",
      ]);
      // if (ApartMentTypeTab.includes("Plot/Land")) {
      //   setApartMentTypeTab(
      //     ApartMentTypeTab.filter((e) => {
      //       return e !== "Plot/Land";
      //     })
      //   );
      // }
    }
    // eslint-disable-next-line
  }, [BasicDetailsData.PropertyAdType]);
  // Property Ad type (useEffect)  add plot/land
  useEffect(() => {
    if (BasicDetailsData.ApartmentType == "Plot/Land") {
      setCurrentPropertyStatusArray([
        "Vacant",
        "Boundary Wall",
        "Construction Done",
      ]);
    } else {
      setCurrentPropertyStatusArray(["Vacant", "Rented", "Self Occupied"]);
    }
    // eslint-disable-next-line
  }, [BasicDetailsData.ApartmentType]);
  // const BasicDetailsSubmitForm =()=>{}
  const transitionDuration = "0.3s";
  const [error, setError] = useState(" ");
  const [propertyTypeShake, setPropertyTypeShake] = useState(false);
  const [sellRentShake, setSellRentShake] = useState(false);
  const [TransitionTypeShake, setTransitionTypeShake] = useState(false);
  const [choosePropertyShake, setChoosePropertyShake] = useState(false);
  const [availableFromShake, setAvailableFromShake] = useState(false);
  const [propertyStatusShake, setPropertyStatusShake] = useState(false);
  const isValidTransitionType = update
    ? ["Registry Case", "Transfer Case"].includes(
        SinglePost?.BasicDetails?.TransitionType
      )
    : true;
  const [
    currentpropertyStatusReadytoMove,
    setCurrentpropertyStatusReadytoMove,
  ] = useState(false);
  const [propertyAgeShake, setPropertyAgeShake] = useState(false);
  const [
    underConstructionPossessionShake,
    setUnderConstructionPossessionShake,
  ] = useState(false);
  const [plotLandPossessionShake, setPlotLandPossessionShake] = useState(false);
  const [currentpropertyStatuPlotLand, setCurrentpropertyStatusPlotLand] =
    useState(false);
  const HandleAlertShake = () => {
    if (!BasicDetailsData.PropertyType) {
      if (BasicDetailsData.PropertyAdType) {
        setPropertyTypeShake(true);
        setTimeout(() => setPropertyTypeShake(false), 1000);
        return;
      }
      setPropertyTypeShake(true);
      setTimeout(() => setPropertyTypeShake(false), 1000);
    }
    if (!BasicDetailsData.PropertyAdType) {
      if (BasicDetailsData.ApartmentType) {
        setSellRentShake(true);
        setTimeout(() => setSellRentShake(false), 1000);
        return;
      }
      setSellRentShake(true);
      setTimeout(() => setSellRentShake(false), 1000);
    }
    if (!BasicDetailsData.ApartmentType) {
      setChoosePropertyShake(true);
      setTimeout(() => setChoosePropertyShake(false), 1000);
      return;
    }
    //  let Date = SinglePost?.createAt
    const EnableTransitionTypeDate = new Date("3/20/2025");
    //  ["Registry Case" ,"Transfer Case"].includes(SinglePost?.BasicDetails?.TransitionType)
    if (
      BasicDetailsData.PropertyAdType === "Sale" &&
      !BasicDetailsData.TransitionType &&
      isValidTransitionType
    ) {
      setTransitionTypeShake(true);
      setTimeout(() => setTransitionTypeShake(false), 1000);
      return;
    }
    if (
      BasicDetailsData.PropertyAdType === "Rent" &&
      !BasicDetailsData.AvailableFrom
    ) {
      setAvailableFromShake(true);
      setTimeout(() => setAvailableFromShake(false), 1000);
      return;
    }
    if (
      BasicDetailsData.PropertyAdType === "Rent" &&
      BasicDetailsData.AvailableFrom
    ) {
      // const currentDate = new Date(Date.now());
      const currentDate = new Date().toISOString().split("T")[0];
      const selectedDate = BasicDetailsData.AvailableFrom;
      if (selectedDate < currentDate) {
        return alert("Enter valid Date");
      }
      // if (selectedDate >= currentDate) {
      //   setBasicDetailsData({
      //     ...BasicDetailsData,
      //     AvailableFrom: e.target.value,
      //   });
      // }
    }
    if (
      BasicDetailsData.PropertyAdType === "Sale" &&
      ApartMentTypeArrayRemovePlotAndLand.includes(
        BasicDetailsData.ApartmentType
      ) &&
      !BasicDetailsData.PropertyStatus
    ) {
      setPropertyStatusShake(true);
      setTimeout(() => setPropertyStatusShake(false), 1000);
      return;
    }
    if (
      BasicDetailsData.PropertyAdType === "Sale" &&
      ApartMentTypeArrayRemovePlotAndLand.includes(
        BasicDetailsData.ApartmentType
      ) &&
      BasicDetailsData.PropertyStatus == "Ready to move" &&
      !BasicDetailsData.CurrentPropertyStatus
    ) {
      setCurrentpropertyStatusReadytoMove(true);
      setTimeout(() => setCurrentpropertyStatusReadytoMove(false), 1000);

      return;
    }

    if (
      BasicDetailsData.PropertyAdType === "Sale" &&
      ApartMentTypeArrayRemovePlotAndLand.includes(
        BasicDetailsData.ApartmentType
      ) &&
      BasicDetailsData.PropertyStatus == "Ready to move" &&
      !BasicDetailsData.PropertyAge
    ) {
      setPropertyAgeShake(true);
      setTimeout(() => setPropertyAgeShake(false), 1000);
      return;
    }
    if (
      BasicDetailsData.PropertyAdType === "Sale" &&
      ApartMentTypeArrayRemovePlotAndLand.includes(
        BasicDetailsData.ApartmentType
      ) &&
      BasicDetailsData.PropertyStatus == "Under Construction" &&
      !BasicDetailsData.PossessionStatus
    ) {
      setUnderConstructionPossessionShake(true);
      setTimeout(() => setUnderConstructionPossessionShake(false), 1000);
      return;
    }
    if (
      BasicDetailsData.ApartmentType === "Plot/Land" &&
      !BasicDetailsData.CurrentPropertyStatus
    ) {
      setCurrentpropertyStatusPlotLand(true);
      setTimeout(() => setCurrentpropertyStatusPlotLand(false), 1000);
      return;
    }
    if (
      BasicDetailsData.ApartmentType === "Plot/Land" &&
      !BasicDetailsData.PossessionStatus
    ) {
      setPlotLandPossessionShake(true);
      setTimeout(() => setPlotLandPossessionShake(false), 1000);
      return;
    }
    if (!update) {
      // StoreDataInSession("BasicDetailsDataUpdate", BasicDetailsData);
      StoreDataInSession("BasicDetailsData", BasicDetailsData);
      StoreDataInSession("next", 1);
    }

    setnext(1);
    return true;
  };

  return (
    <>
      <ScrollToTop />
      <main className="main-container">
        {/* <h3 className="heading-section-form-start"
          Sale or Rent your Property For Free
        </h3> */}
        {/* <div className="create-banner-box">
          <img src="/img/create-banner.svg" alt="create-banner" />
        </div> */}
        <div className="form-container-step-1">
          <div className="form-content">
            <h3 className="basic-details-heading">Property Type*</h3>
            <div className="tabs">
              <button
                style={{ transitionDuration }}
                className={`tab ${
                  BasicDetailsData.PropertyType === "Residential"
                    ? "select"
                    : ""
                }   ${propertyTypeShake ? "inputShake shake" : ""}  `}
                value={"Residential"}
                onClick={() => {
                  if (!update) {
                    setBasicDetailsData({
                      ...BasicDetailsData,
                      PropertyType: "Residential",
                    });
                  }
                }}
              >
                Residential{" "}
                <img
                  alt=""
                  src={
                    BasicDetailsData.PropertyType === "Residential"
                      ? "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/white-tick.svg"
                      : "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/plus-create.svg"
                  }
                />
              </button>
              <div>
                {error && (
                  <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
                )}
              </div>
            </div>
            <h3 className="basic-details-heading">I am Looking To *</h3>
            <div className="ad-type rent-sale">
              {PropertyAdTypeArray.map((text, i) => {
                return (
                  <button
                    key={i}
                    value={text}
                    style={{ transitionDuration }}
                    className={`ad-btn tab img add-btn-${text} ${
                      BasicDetailsData.PropertyAdType === text ? "select" : ""
                    }  ${sellRentShake ? "inputShake shake" : ""} `}
                    onClick={() => {
                      if (!update) {
                        setBasicDetailsData({
                          ...BasicDetailsData,
                          PropertyAdType: text,
                        });
                      }
                    }}
                  >
                    {text === "Sale" ? "Sell" : text}
                    <img
                      alt=""
                      src={
                        BasicDetailsData.PropertyAdType === text
                          ? "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/white-tick.svg"
                          : "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/plus-create.svg"
                      }
                    />
                  </button>
                );
              })}
            </div>
            <h3 className="basic-details-heading">
              Choose Property Classification *{" "}
            </h3>
            <div className="tab-box">
              {ApartMentTypeTab.map((e, i) => {
                return (
                  <button
                    style={{ transitionDuration }}
                    className={`tab ${
                      BasicDetailsData.ApartmentType === e ? "select" : ""
                    }  ${choosePropertyShake ? "inputShake shake" : ""}  `}
                    key={i}
                    onClick={() => {
                      if (["Owner"].includes(medata?.user?.Role) || !update) {
                        setBasicDetailsData({
                          ...BasicDetailsData,
                          ApartmentType: e,
                        });
                      }
                    }}
                  >
                    {e}
                    <img
                      className="select-img"
                      alt=""
                      src={
                        BasicDetailsData.ApartmentType === e
                          ? "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/white-tick.svg"
                          : `https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/plus-create.svg`
                      }
                    />
                  </button>
                );
              })}
            </div>
            {/* Transition Type  */}
            {BasicDetailsData.PropertyAdType == "Sale" && (
              <>
                <h3 className="basic-details-heading">Transition Type *</h3>

                <div className="tab-box">
                  {TransitionTypeArray.map((e, i) => {
                    return (
                      <button
                        style={{ transitionDuration }}
                        className={`tab ${
                          BasicDetailsData.TransitionType === e ? "select" : ""
                        }  ${TransitionTypeShake ? "inputShake shake" : ""}  `}
                        key={i}
                        onClick={() => {
                          if (
                             !update  ||   
                            ["Owner"].includes(medata?.user?.Role)
                          ) {
                            if (BasicDetailsData.TransitionType == e) {
                              if (update) {
                                setBasicDetailsData({
                                  ...BasicDetailsData,
                                  TransitionType: "",
                                });
                              }
                            } else {
                              setBasicDetailsData({
                                ...BasicDetailsData,
                                TransitionType: e,
                              });
                            }
                          }
                        }}
                      >
                        {e}
                        <img
                          className="select-img"
                          alt=""
                          src={
                            BasicDetailsData.TransitionType === e
                              ? "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/white-tick.svg"
                              : `https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/plus-create.svg`
                          }
                        />
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {[...ApartMentTypeArrayRemovePlotAndLand, "Plot/Land"].includes(
              BasicDetailsData.ApartmentType
            ) && (
              <>
                {BasicDetailsData.PropertyAdType === "Rent" && (
                  <div className="date-time">
                    <label
                      htmlFor="available-from"
                      className="basic-details-heading"
                    >
                      Available From *
                    </label>

                    <input
                      style={{ transitionDuration }}
                      className={`date-time-lable ${
                        availableFromShake ? "inputShake shake" : ""
                      } `}
                      type="date"
                      id="available-from"
                      required
                      value={BasicDetailsData.AvailableFrom || ""}
                      onChange={(e) => {
                        // const currentDate = new Date(Date.now());
                        const currentDate = new Date()
                          .toISOString()
                          .split("T")[0];
                        const selectedDate = e.target.value;

                        if (selectedDate >= currentDate) {
                          setBasicDetailsData({
                            ...BasicDetailsData,
                            AvailableFrom: e.target.value,
                          });
                        }
                      }}
                    />
                  </div>
                )}

                {BasicDetailsData.PropertyAdType === "Sale" && (
                  <>
                    {/* not enable plot and land  */}
                    {ApartMentTypeArrayRemovePlotAndLand.includes(
                      BasicDetailsData.ApartmentType
                    ) && (
                      <div className="fom-group">
                        <h4 className="basic-details-heading">
                          {" "}
                          Property Status*{" "}
                        </h4>
                        <div className="PropertyStatus-box">
                          {PropertyStatusArray.map((text, i) => {
                            return (
                              <div
                                key={i}
                                className="PropertyStatus-box-content"
                              >
                                <label
                                  style={{ transitionDuration }}
                                  className={` ${
                                    propertyStatusShake ? " shake" : ""
                                  }`}
                                  htmlFor={`property-status-${i}`}
                                >
                                  {text}
                                </label>
                                <input
                                  style={{ transitionDuration }}
                                  className={` ${
                                    propertyStatusShake ? "inputShake  " : ""
                                  }`}
                                  type="radio"
                                  name="Property Stattus"
                                  required
                                  id={`property-status-${i}`}
                                  value={text}
                                  checked={
                                    BasicDetailsData.PropertyStatus === text
                                  }
                                  onChange={() => {
                                    setBasicDetailsData({
                                      ...BasicDetailsData,
                                      PropertyStatus: text,
                                    });
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {(BasicDetailsData.PropertyStatus == "Ready to move" ||
                      BasicDetailsData.ApartmentType == "Plot/Land") && (
                      <>
                        {" "}
                        <div className="fom-group">
                          <p className="basic-details-heading">
                            Current Property Status*{" "}
                            <small> (Choose only one) </small>
                          </p>

                          <div className="PropertyStatus-box">
                            {CurrentPropertyStatusArray.map((text, i) => {
                              return (
                                <div
                                  key={i}
                                  className="PropertyStatus-box-content"
                                >
                                  <label
                                    style={{ transitionDuration }}
                                    className={` ${
                                      currentpropertyStatusReadytoMove
                                        ? "shake  "
                                        : ""
                                    }  ${
                                      currentpropertyStatuPlotLand
                                        ? "shake  "
                                        : ""
                                    } `}
                                    htmlFor={`current-property-status-${i}`}
                                  >
                                    {text}
                                  </label>
                                  <input
                                    style={{ transitionDuration }}
                                    className={` ${
                                      currentpropertyStatusReadytoMove
                                        ? "shake  "
                                        : ""
                                    }  ${
                                      currentpropertyStatuPlotLand
                                        ? "shake  "
                                        : ""
                                    }`}
                                    type="radio"
                                    name="current-property-status"
                                    required
                                    id={`current-property-status-${i}`}
                                    value={text}
                                    checked={
                                      BasicDetailsData.CurrentPropertyStatus ===
                                      text
                                    }
                                    onChange={() => {
                                      setBasicDetailsData({
                                        ...BasicDetailsData,
                                        CurrentPropertyStatus: text,
                                      });
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        {/* not enable plot and land  */}
                        {ApartMentTypeArrayRemovePlotAndLand.includes(
                          BasicDetailsData.ApartmentType
                        ) && (
                          <div className="form-group">
                            <label htmlFor="property-age">Property Age*</label>
                            <select
                              style={{ transitionDuration }}
                              className={`date-time-lable  ${
                                propertyAgeShake ? "shake inputShake" : ""
                              } `}
                              id="property-age"
                              required
                              value={BasicDetailsData.PropertyAge || ""}
                              onChange={(e) => {
                                setBasicDetailsData({
                                  ...BasicDetailsData,
                                  PropertyAge: e.target.value,
                                });
                              }}
                            >
                              <option value="">Select</option>
                              <option value="0-5">0-5 years</option>
                              <option value="5-10">5-10 years</option>
                              <option value="10-20">10-20 years</option>
                            </select>
                          </div>
                        )}
                      </>
                    )}

                    {(BasicDetailsData.PropertyStatus == "Under Construction" ||
                      BasicDetailsData.ApartmentType == "Plot/Land") && (
                      <div className="form-group">
                        <label htmlFor="property-age">Possession Status*</label>
                        <select
                          style={{ transitionDuration }}
                          className={`date-time-lable  ${
                            underConstructionPossessionShake
                              ? "shake inputShake"
                              : ""
                          }  ${
                            plotLandPossessionShake ? "shake inputShake" : ""
                          } `}
                          id="property-age"
                          required
                          value={BasicDetailsData.PossessionStatus || ""}
                          onChange={(e) => {
                            setBasicDetailsData({
                              ...BasicDetailsData,
                              PossessionStatus: e.target.value,
                            });
                          }}
                        >
                          <option value="">Select</option>
                          {PossessionStatusOption.map((e, i) => {
                            return (
                              <option key={i} value={e}>
                                {e}
                              </option>
                            );
                          })}
                          {/* <option value="0-5">0-5 years</option>
                          <option value="5-10">5-10 years</option>
                          <option value="10-20">10-20 years</option> */}
                        </select>
                      </div>
                    )}
                    {BasicDetailsData.ApartmentType == "Plot/Land" && (
                      <div className="open-side-box not-select-text">
                        <div className="Counter">
                          <p className="basic-details-heading">
                            Open Sides
                            <small> (optional) </small>
                          </p>

                          <div className="counter">
                            <div
                              className="decrement button"
                              onClick={() => {
                                if (BasicDetailsData.NoOfOpenSide > 1) {
                                  setBasicDetailsData({
                                    ...BasicDetailsData,
                                    NoOfOpenSide:
                                      BasicDetailsData.NoOfOpenSide - 1,
                                  });
                                }
                              }}
                            >
                              -
                            </div>
                            <input
                              type="number"
                              id="bathroom"
                              name="bathroom"
                              min="0"
                              value={BasicDetailsData.NoOfOpenSide || 1}
                              readOnly
                            />
                            <div
                              className="increment button not-select-text"
                              onClick={() => {
                                setBasicDetailsData({
                                  ...BasicDetailsData,
                                  NoOfOpenSide:
                                    BasicDetailsData.NoOfOpenSide + 1,
                                });
                              }}
                            >
                              +
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <div className="next-prev-box">
        {
          update ==true &&  <button onClick={()=>{
            FormSubmitRef?.current?.requestSubmit();
          }}>Update Post</button>
        }
         
        {/*  BasicDetailsFormSubmit();  include this for default alert and include this for shakeAlert HandleAlertShake();  */}
        <button
          id="Submit-Next"
          onClick={() => {
            HandleAlertShake();
          }}
        >
          Next
        </button>
         
      </div>
    </>
  );
}
