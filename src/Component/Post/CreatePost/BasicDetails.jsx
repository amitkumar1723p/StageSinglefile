import React, { useEffect, useState } from "react";
import { StoreDataInSession } from "../../../utils/SessionStorage.js";

import ScrollToTop from "../../../ScrollToTop.jsx";
import { useSelector } from "react-redux";
export default function BasicDetailsSection({
  BasicDetailsData,
  setBasicDetailsData,
  setnext,
  update,
  BasicDetailsFormSubmit,
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

  const [CurrentPropertyStatusArray, setCurrentPropertyStatusArray] = useState(
    []
  );

  const PossessionStatusOption = [
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
                className={`tab ${
                  BasicDetailsData.PropertyType === "Residential"
                    ? "select"
                    : ""
                }`}
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
                      ? "/img/white-tick.svg"
                      : "/img/plus-create.svg"
                  }
                />
              </button>
            </div>
            <h3 className="basic-details-heading">I am Looking To *</h3>
            <div className="ad-type rent-sale">
              {PropertyAdTypeArray.map((text, i) => {
                return (
                  <button
                    key={i}
                    value={text}
                    className={`ad-btn tab img add-btn-${text} ${
                      BasicDetailsData.PropertyAdType === text ? "select" : ""
                    }`}
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
                          ? "/img/white-tick.svg"
                          : "/img/plus-create.svg"
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
                    className={`tab ${
                      BasicDetailsData.ApartmentType === e ? "select" : ""
                    }`}
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
                    {e}{" "}
                    <img
                      className="select-img"
                      alt=""
                      src={
                        BasicDetailsData.ApartmentType === e
                          ? "/img/white-tick.svg"
                          : `/img/plus-create.svg`
                      }
                    />
                  </button>
                );
              })}
            </div>
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
                      className="date-time-lable"
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
                                <label htmlFor={`property-status-${i}`}>
                                  {text}
                                </label>
                                <input
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
                                    htmlFor={`current-property-status-${i}`}
                                  >
                                    {text}
                                  </label>
                                  <input
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
                              className="date-time-lable"
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
                          className="date-time-lable"
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
                                if (BasicDetailsData.NoOfOpenSide > 0) {
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
                              value={BasicDetailsData.NoOfOpenSide || 0}
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
        <button id="Submit-Next" onClick={BasicDetailsFormSubmit}>
          Next
        </button>
      </div>
    </>
  );
}
