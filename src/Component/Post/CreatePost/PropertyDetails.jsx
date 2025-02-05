import React, { useEffect, useState } from "react";

export default function PropertyDetailsSection({
  PropertyDetailsData,
  setPropertyDetailsData,
}) {
  const [bhkcount, setbhkcount] = useState([]);

  useEffect(() => {
    let bhknumber = [];
    for (let i = 1; i <= 15; i++) {
      bhknumber.push(i);
    }
    setbhkcount(bhknumber);

    setPropertyDetailsData((prevData) => ({
      ...prevData,
      OtherRoom: prevData.OtherRoom || [],
      Balcony: prevData.Balcony || 0,
      Bathroom: prevData.Bathroom || 0,
      Parking: prevData.Bathroom || 0,
      Parking: {
        CoveredParking: prevData.Parking?.CoveredParking || 0,
        OpenParking: prevData.Parking?.OpenParking || 0,
      },
    }));
  }, []);

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

      {/* Other Room Tab  */}
      <div className="fom-group">
        <p className="label parking-label">Other Room*</p>
        <div className="tab-box">
          {OtherRoomArray.map((text, i) => {
            return (
              <div
                key={i}
                className={`tab ${
                  PropertyDetailsData.OtherRoom?.includes(text) ? "select" : ""
                }
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
                type="number"
                id="bathroom"
                name="bathroom"
                min="0"
                value={PropertyDetailsData.Bathroom || 0}
                readOnly
              />
              <div
                className="increment button"
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
                type="number"
                id="balcony"
                name="balcony"
                min="0"
                value={PropertyDetailsData.Balcony || 0}
                readOnly
              />
              <div
                className="increment button"
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
              <label htmlFor="coveredParking">Cover Parking</label>
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
                  type="number"
                  id="coveredParking"
                  name="coveredParking"
                  min="0"
                  value={PropertyDetailsData.Parking?.CoveredParking || 0}
                  readOnly
                />
                <div
                  className="increment button"
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
                  type="number"
                  id="openParking"
                  name="openParking"
                  min="0"
                  value={PropertyDetailsData.Parking?.OpenParking || 0}
                  readOnly
                />
                <div
                  className="increment button"
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
