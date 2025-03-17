import { CloudSnow } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function PropertyDetailsSection({
  PropertyDetailsData,
  setPropertyDetailsData,
  BasicDetailsData,
  Error,
}) {
  const [bhkcount, setbhkcount] = useState([]);

  // useEffect(() => {
  //   setTimeout(() => {

  //     let bhknumber = [];
  //     for (let i = 1; i <= 15; i++) {
  //       bhknumber.push(i);
  //     }
  //     setbhkcount(bhknumber);

  //     setPropertyDetailsData((prevData) => ({
  //       ...prevData,
  //       OtherRoom: prevData.OtherRoom || [],
  //       Balcony: prevData.Balcony || 0,
  //       Bathroom: prevData.Bathroom || 0,
  //       Parking: prevData.Bathroom || 0,
  //       Parking: {
  //         CoveredParking: prevData.Parking?.CoveredParking || 0,
  //         OpenParking: prevData.Parking?.OpenParking || 0,
  //       },
  //       BasementArea : {
  //         unit :  BasicDetailsData.ApartmentType === "Independent/Builder Floor" && prevData.Basement==true ? "sq.ft":undefined
  //        }
  //     }));
  //   }, 0);
  // }, [PropertyDetailsData.Basement]);

  useEffect(() => {
    setTimeout(() => {
      // Generate numbers 1 to 15 for the BHK count
      let bhknumber = [];
      for (let i = 1; i <= 15; i++) {
        bhknumber.push(i);
      }
      setbhkcount(bhknumber);

      setPropertyDetailsData((prevData) => {
        const newParking = prevData.Parking || {
          CoveredParking: 0,
          OpenParking: 0,
        };
    
        // Update the PropertyDetailsData state with defaults
        return {
          ...prevData,
          OtherRoom: prevData.OtherRoom || [],
          Balcony: prevData.Balcony || 0,
          Bathroom: prevData.Bathroom || 0,
          Parking: newParking, // Nested Parking object
          BasementArea:
            BasicDetailsData.ApartmentType === "Independent/Builder Floor" &&
            prevData.Basement
              ? { ...prevData.BasementArea  , unit: "sq.ft" }
              : {},
        };
      });
    }, 0);
  }, [PropertyDetailsData.Basement, BasicDetailsData.ApartmentType]);

  const FlooringArray = [
    "Marble",
    "Vitrified",
    "Wood",
    "Concrete",
    "Stone",
    "Polished",
    "Granite",
    "Ceramic",
    "Cement",
    "Mosaic",
    "IPSFinish",
    "Spartex",
    "Vinyl",
    "Others",
  ];
  const OtherRoomArray = [
    "Pooja Room",
    "Study Room",
    "Servant Room",
    "Store Room",
  ];





  return (
    <>
      <p className="Property-Details-heading">Property Details</p>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="bhk-type">BHK Type*</label>
          <select
           className={` ${Error.BHKType? 'inputShake shake' : ''}`}

            id="bhk-type"
            required
            value={PropertyDetailsData.BHKType || ""}
            onChange={(e) => {
              setPropertyDetailsData({
                ...PropertyDetailsData,
                BHKType: e.target.value,
              });
            }}
          >
            <option value="">Select</option>
            {bhkcount.map((bhk, i) => {
              return (
                <option key={i} value={bhk}>
                  {bhk} BHK
                </option>
              );
            })}

            {/* <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5">5 BHK</option> */}
          </select>
        </div>
        {/* FlooringType */}
        <div className="form-group">
          <label htmlFor="flooring-type">Flooring Type*</label>
          <select
           
           className={` ${Error.FlooringType? 'inputShake shake' : ''}`}
            id="flooring-type"
            required
            value={PropertyDetailsData.FlooringType || ""}
            onChange={(e) => {
              setPropertyDetailsData({
                ...PropertyDetailsData,
                FlooringType: e.target.value,
              });
            }}
          >
            <option value="">Select</option>
            {FlooringArray.map((e, i) => {
              return (
                <option key={i} value={e.trim()}>
                  {e.trim()}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Other Room Tab   and Basement*/}

      <div className="form-row ">
        {/* Other Room Tab */}
        <div className="fom-group first">
          <p className="label parking-label">Other Room*</p>
          <div className="tab-box">
            {OtherRoomArray.map((text, i) => {
              return (
                <div
                  key={i}
                  
                  className={`tab ${
                    PropertyDetailsData.OtherRoom?.includes(text) ? "select" : ""
                  }  ${Error.OtherRoom? 'inputShake shake' : ''}
                      `}
                  onClick={() => {
                    if (!PropertyDetailsData.OtherRoom?.includes(text)) {
                      setPropertyDetailsData({
                        ...PropertyDetailsData,
                        OtherRoom: [...PropertyDetailsData.OtherRoom, text],
                      });
                    }
                    if (PropertyDetailsData.OtherRoom?.includes(text)) {
                      setPropertyDetailsData({
                        ...PropertyDetailsData,
                        OtherRoom: PropertyDetailsData.OtherRoom?.filter(
                          (item) => {
                            return item !== text;
                          }
                        ),
                      });
                    }
                  }}
                >
                  {text}{" "}
                  <img
                    src={
                      PropertyDetailsData.OtherRoom?.includes(text)
                        ? "/img/white-tick.svg"
                        : "/img/plus-create.svg"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* {} */}
        {["Independent/Builder Floor"].includes(
          BasicDetailsData.ApartmentType
        ) && (
          <div className="basement-box">
            <div className="field-group second">
              <p className="label parking-label mb-2">Basement*</p>

              <div className="d-flex">
                {[true, false].map((text, i) => {
                  return (
                    <div className="d-flex" key={i}>
                      <input
                       
                      className={`me-2 ${Error.Basement? 'inputShake shake' : ''}`}
                        type="radio"
                        id={`basement-${i}`}
                        name="basement"
                        value={text}
                        required
                        checked={PropertyDetailsData.Basement === text}
                        onChange={() => {
                          setPropertyDetailsData({
                            ...PropertyDetailsData,
                            Basement: text,
                          });
                        }}
                      />
                      &nbsp;
                      <label
                       
                        htmlFor={`basement-${i}`}
                        className={`basement-label-${i} ${Error.Basement? ' shake' : ''}`}
                      >
                        {text === true ? "Yes" : "No"}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {PropertyDetailsData.Basement == true && (
              <div className="form-group">
                <label htmlFor="BasementArea">Basement Area*</label>
                <div   className={`unit-input basement-unit-input ${Error.BasementAreaShake? 'inputShake shake' : ''}`}>
                  <input
                   
                   
                    type="text"
                    id="BasementArea"
                    name="BasementArea"
                    required
                    value={PropertyDetailsData?.BasementArea?.value || ""}
                    onChange={(e) => {
                      const numericValue = String(e.target.value).replace(
                        /[^0-9]/g,
                        ""
                      );

                      setPropertyDetailsData({
                        ...PropertyDetailsData,
                        BasementArea: {
                          ...PropertyDetailsData.BasementArea,
                          value: numericValue,
                        },
                      });
                    }}
                    placeholder={"Basement Area"}
                  />
                  <input
                    type="text"
                    readOnly
                    className="unit"
                    value={PropertyDetailsData?.BasementArea?.unit || ""}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/*  { Bathroom  } */}

      <div className="Main-row">
        <div className="bath-bal-box">
          <div className="Counter">
            <label htmlFor="bathroom">Bathrooms*</label>
            <div className="counter">
              <div
                className="decrement button"
                onClick={() => {
                  if (PropertyDetailsData.Bathroom > 0) {
                    setPropertyDetailsData({
                      ...PropertyDetailsData,
                      Bathroom: PropertyDetailsData.Bathroom - 1,
                    });
                  }
                }}
              >
                -
              </div>
              <input
                type="text"
                id="bathroom"
                name="bathroom"
                min="0"
                value={PropertyDetailsData.Bathroom || 0}
                readOnly
              />
              <div
                className="increment button not-select-text"
                onClick={() => {
                  setPropertyDetailsData({
                    ...PropertyDetailsData,
                    Bathroom: PropertyDetailsData.Bathroom + 1,
                  });
                }}
              >
                +
              </div>
            </div>
          </div>
          <div className="field-group">
            <label htmlFor="balcony">Balconies*</label>
            <div className="counter">
              <div
                className="decrement button"
                onClick={() => {
                  if (PropertyDetailsData.Balcony > 0) {
                    setPropertyDetailsData({
                      ...PropertyDetailsData,
                      Balcony: PropertyDetailsData.Balcony - 1,
                    });
                  }
                }}
              >
                -
              </div>
              <input
                type="text"
                id="balcony"
                name="balcony"
                min="0"
                value={PropertyDetailsData.Balcony || 0}
                readOnly
              />
              <div
                className="increment button not-select-text"
                onClick={() => {
                  setPropertyDetailsData({
                    ...PropertyDetailsData,
                    Balcony: PropertyDetailsData.Balcony + 1,
                  });
                }}
              >
                +
              </div>
            </div>
          </div>
        </div>

        {/* Parking  */}
        <div className="parking-section-box">
          <div className="parking-section-box">
            <div className="Parking-counter">
              <label htmlFor="coveredParking">Covered Parking</label>
              <div className="counter">
                <div
                  className="decrement button"
                  onClick={() => {
                    if (PropertyDetailsData.Parking?.CoveredParking > 0) {
                      setPropertyDetailsData({
                        ...PropertyDetailsData,
                        Parking: {
                          ...PropertyDetailsData.Parking,
                          CoveredParking:
                            PropertyDetailsData.Parking?.CoveredParking - 1,
                        },
                      });
                    }
                  }}
                >
                  -
                </div>

                <input
                  type="text"
                  id="coveredParking"
                  name="coveredParking"
                  min="0"
                  value={PropertyDetailsData.Parking?.CoveredParking || 0}
                  readOnly
                />
                <div
                  className="increment button not-select-text"
                  onClick={() => {
                    setPropertyDetailsData({
                      ...PropertyDetailsData,
                      Parking: {
                        ...PropertyDetailsData.Parking,
                        CoveredParking:
                          PropertyDetailsData.Parking?.CoveredParking + 1,
                      },
                    });
                  }}
                >
                  +
                </div>
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="openParking">Open Parking</label>
              <div className="counter">
                <div
                  className="decrement button"
                  onClick={() => {
                    if (PropertyDetailsData.Parking?.OpenParking > 0) {
                      setPropertyDetailsData({
                        ...PropertyDetailsData,
                        Parking: {
                          ...PropertyDetailsData.Parking,
                          OpenParking:
                            PropertyDetailsData.Parking?.OpenParking - 1,
                        },
                      });
                    }
                  }}
                >
                  -
                </div>
                <input
                  type="text"
                  id="openParking"
                  name="openParking"
                  min="0"
                  value={PropertyDetailsData.Parking?.OpenParking || 0}
                  readOnly
                />
                <div
                  className="increment button not-select-text"
                  onClick={() => {
                    setPropertyDetailsData({
                      ...PropertyDetailsData,
                      Parking: {
                        ...PropertyDetailsData.Parking,
                        OpenParking:
                          PropertyDetailsData.Parking?.OpenParking + 1,
                      },
                    });
                  }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
