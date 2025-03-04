import React, { useEffect, useState } from "react";
import { StoreDataInSession } from "../../../utils/SessionStorage.js";

import ScrollToTop from "../../../ScrollToTop.jsx";
export default function BasicDetailsSection({
  BasicDetailsData,
  setBasicDetailsData,
  setnext,
  update,
}) {
  // eslint-disable-next-line
  const [ApartMentTypeTab, setApartMentTypeTab] = useState([
    "Apartment",
    "Independent House/Villa",
    "1 RK/Studio Apartment",
    "Independent/Builder Floor",
    "Serviced Apartment",
  ]);
  const ApartMentTypeArrayRemovePlotAndLand = [
    "Apartment",
    "Independent House/Villa",
    "1 RK/Studio Apartment",
    "Independent/Builder Floor",
    "Serviced Apartment",
  ];
  const PropertyStatusArray = ["Ready to move", "Under Construction"];
  const PropertyAdTypeArray = ["Sale", "Rent"];
  const CurrentPropertyStatusArray = ["Vacant", "Rented", "Self Occupied"];
  const PossessionStatusOption = [
    "Within 3 Month",
    "Within 6 Month",
    "By 2025",
    "By 2026",
    "By 2027",
    "By 2028",
    "By 2029",
  ];

  // Add Plot And Land  After Some Time
  // useEffect(() => {
  //   if (BasicDetailsData.PropertyAdType === "Sale") {
  //     if (!ApartMentTypeTab.includes("Plot/Land")) {
  //       setApartMentTypeTab([...ApartMentTypeTab, "Plot/Land"]);
  //     }
  //   }

  //   if (BasicDetailsData.PropertyAdType === "Rent") {
  //     if (ApartMentTypeTab.includes("Plot/Land")) {
  //       setApartMentTypeTab(
  //         ApartMentTypeTab.filter((e) => {
  //           return e !== "Plot/Land";
  //         })
  //       );
  //     }
  //   }

  //   // eslint-disable-next-line
  // }, [BasicDetailsData.PropertyAdType]);

  useEffect(() => {
    setTimeout(() => {
      setBasicDetailsData((prevData) => ({
        ...prevData,

        NoOfOpenSide: prevData.NoOfOpenSide || 0,
      }));
    }, 0);
    // eslint-disable-next-line
  }, []);

    const [error, setError] = useState(' ');

    const [residentialShake, setResidentialShake] = useState(false);
    const [residentialTextShake, setResidentialTextShake] = useState(false);

    const [sellRentShake, setSellRentShake] = useState(false);
    const [sellRentTextShake, setSellRentTextShake] = useState(false);

    const [choosePropertyShake, setChoosePropertyShake] = useState(false);
    const [choosePropertyTextShake, setChoosePropertyTextShake] = useState(false);

    const [propertyStatusShake,setPropertyStatusShake] = useState(false);
    const [propertyStatusTextShake,setPropertyStatusTextShake] = useState(false);

    const [availableForShake,setAvailableForShake] = useState(false);
    const [availableForTextShake,setAvailableForTextShake] = useState(false);

    const [currentPropertyStateShake,setCurrentPropertyStateShake] = useState(false);

    const [propertyAgeShake, setpropertyAgeShake] = useState(false);
    
    const [possessionStatusShake, setPossessionStatusShake] = useState(false);


  return (
    <>
      <ScrollToTop />
      <main className="main-container">
        {/* <h3 className="heading-section-form-start">
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
                }   ${residentialShake? 'inputShake' : ''} ${residentialShake? 'shake' : ''}  `}
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
              <div>{error && <p style={{color: 'red', fontSize: '12px' }}>{error}</p>}</div>
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
                    }  ${sellRentShake? 'inputShake' : ''}  ${sellRentTextShake? 'shake' : ''} `  }
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
                    }  ${choosePropertyShake? 'inputShake' : ''}  ${choosePropertyTextShake? 'shake' : ''}`}
                    key={i}
                    onClick={() => {
                      if (!update) {
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
            {ApartMentTypeArrayRemovePlotAndLand.includes(
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
                      className={`date-time-lable ${availableForShake?'inputShake' :''} ${availableForShake?'shake' :''} `}
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
                    <div className="fom-group">
                      <h4 className="basic-details-heading">
                        {" "}
                        Property Status*{" "}
                      </h4>
                      <div className="PropertyStatus-box">
                        {PropertyStatusArray.map((text, i) => {
                          return (
                            <div key={i} className="PropertyStatus-box-content">
                              <label htmlFor={`property-status-${i}`} className={` ${propertyStatusTextShake? 'shake' : ''}`}>
                                {text}
                              </label>
                              <input
                              className={` ${propertyStatusShake? 'inputShake' : ''}`}
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
                    {BasicDetailsData.PropertyStatus == "Ready to move" && (
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
                                  className={`   ${currentPropertyStateShake? 'shake' : ''} `}
                                    htmlFor={`current-property-status-${i}`}
                                  >
                                    {text}
                                  </label>
                                  <input
                                    type="radio"
                                    className={`${currentPropertyStateShake? 'shake' : ''}`}
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
                        <div className="form-group">
                          <label htmlFor="property-age">Property Age*</label>
                          <select
                            className={`date-time-lable ${propertyAgeShake? 'shake inputShake' : ''}`}
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
                      </>
                    )}
                    {BasicDetailsData.PropertyStatus ==
                      "Under Construction" && (
                      <div className="form-group">
                        <label htmlFor="property-age">Possession Status*</label>
                        <select
                          className={`date-time-lable ${possessionStatusShake? 'shake inputShake' : ''}` }
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
                  </>
                )}
              </>
            )}
            {/* {BasicDetailsData.ApartmentType === "Plot/Land" && (
              <>            
                <div className="">
                  <label htmlFor="possession-status"> Possession Status </label>
                  <select
                    id="possession-status"
                    required
                    value={BasicDetailsData.PossessionStatus}
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
                  </select>
                </div>
                <div>
                  <h3> Current Property Status* </h3>
                  <div className="tab-box">
                    {CurrentPropertyStatusArray.map((e, i) => {
                      return (
                        <button
                          className={`tab ${
                            BasicDetailsData.CurrentPropertyStatus === e
                              ? "select"
                              : ""
                          }`}
                          key={i}
                          onClick={() => {
                            setBasicDetailsData({
                              ...BasicDetailsData,
                              CurrentPropertyStatus: e,
                            });
                          }}
                        >          
                          {e}{" "}
                          <img
                            alt=""
                            className="select-img"
                            src={
                              BasicDetailsData.CurrentPropertyStatus === e
                                ? "/img/white-tick.svg"
                                : `/img/plus-create.svg`
                            }
                          />
                         
                        </button>
                      );
                    })}
                  </div>
                </div>          
                <div className="field-group">
                  <label htmlFor="plot-open-side">
                    No.Of Open Side Optional
                  </label>
                  <div className="counter">
                    <div
                      className="decrement button"
                      onClick={() => {
                        if (BasicDetailsData.NoOfOpenSide > 0) {
                          setBasicDetailsData({
                            ...BasicDetailsData,
                            NoOfOpenSide: BasicDetailsData.NoOfOpenSide - 1,
                          });
                        }
                      }}
                    >                      -
                    </div>
                    <input
                      type="number"
                      id="plot-open-side"
                      name="plot-open-side"
                      min="0"
                      value={BasicDetailsData.NoOfOpenSide || 0}
                      readOnly
                    />
                    <div
                      className="increment button"
                      onClick={() => {
                        setBasicDetailsData({
                          ...BasicDetailsData,
                          NoOfOpenSide: BasicDetailsData.NoOfOpenSide + 1,
                        });
                      }}
                    >
                      +
                    </div>
                  </div>
                </div>
              </>
            )} */}
          </div>
        </div>
      </main>

      <div className="next-prev-box">
        <button
          id="Submit-Next"
          onClick={() => {
            if (!BasicDetailsData.PropertyType) {
              // setError("Email cannot be empty. ");
              // setInputShake(true);
              setResidentialShake(true);
              setResidentialTextShake(true)

              // setTimeout(()=>setError(''),2000);
              setTimeout(()=>setResidentialShake(false),1600)
              setTimeout(()=>setResidentialTextShake(false),1600)
              // setTimeout(()=>setInputShake(false),1600);
              return;
            }

            if (!BasicDetailsData.PropertyAdType) {
             setSellRentShake(true);
             setSellRentTextShake(true)
            setTimeout(()=>{setSellRentShake(false); setSellRentTextShake(false)},1600)
            return;
            }
            if (!BasicDetailsData.ApartmentType) {
              setChoosePropertyShake(true)
              setChoosePropertyTextShake(true)
              setTimeout(()=>setChoosePropertyShake(false),1600)
              setTimeout(()=>setChoosePropertyTextShake(false),1600);
              return;
            }

            if (
              BasicDetailsData.PropertyAdType === "Rent" &&
              !BasicDetailsData.AvailableFrom
            ) {

              setAvailableForShake(true);
              setTimeout(()=>setAvailableForShake(false),1600)
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
              setPropertyStatusTextShake(true);

              setTimeout(()=>setPropertyStatusShake(false),1600);
              setTimeout(()=>setPropertyStatusTextShake(false),1600);
              
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

              setCurrentPropertyStateShake(true);
              setTimeout(()=>setCurrentPropertyStateShake(false),1600);
              return ;
            }

            if (
              BasicDetailsData.PropertyAdType === "Sale" &&
              ApartMentTypeArrayRemovePlotAndLand.includes(
                BasicDetailsData.ApartmentType
              ) &&
              BasicDetailsData.PropertyStatus == "Ready to move" &&
              !BasicDetailsData.PropertyAge
            ) {
              setpropertyAgeShake(true);
              setTimeout(()=>setpropertyAgeShake(false),1600);
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
              setPossessionStatusShake(true);
              setTimeout(()=>setPossessionStatusShake(false),1600);
              return;
            }

            // if (
            //   BasicDetailsData.ApartmentType === "Plot/Land" &&
            //   !BasicDetailsData.PossessionStatus
            // ) {
            //   return alert("Possession Status is Required");
            // }
            if (
              BasicDetailsData.ApartmentType === "Plot/Land" &&
              !BasicDetailsData.CurrentPropertyStatus
            ) {
              return alert("Current Possession Status is Required");
            }

            if (!update) {
              // StoreDataInSession("BasicDetailsDataUpdate", BasicDetailsData);
              StoreDataInSession("BasicDetailsData", BasicDetailsData);
              StoreDataInSession("next", 1);
            }

            setnext(1);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
}
