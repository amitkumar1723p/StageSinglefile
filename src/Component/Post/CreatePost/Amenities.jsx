import React from "react";
import { useEffect } from "react";
import OtherDetails from "./OtherDetails";

export default function Amenities({
  AmenitiesDetailsData,
  setAmenitiesDetailsData,
  update,
  BasicDetailsData,
  Error,
}) {
  const FurnishingOptions = ["Furnished", "Semi-Furnished", "Un-Furnished"];
  const YesNoArray = [true, false];
  const PowerBackUpArray = ["None", "Partial", "Full"];
  const SocietyAndBuildingfeature_And_ProjectAmmenities_Array = [
    "Club House",
    "Swimming Pool",
    "GYM",
    "Community Centre",
    "Security Guard",
    "Maintenance Staff",
    "Piped Gas",
    "Visitor Parking",
    "Lift",
    "Park",
    "Intercom Facility",
    "Waste Disposal",
    "Cafeteria/Food Court",
    "Conference Room",
    "Library",
    "ATMs",
    "Jogging Track",
    "Kids Play Area",
  ];
  const WaterSourceArray = ["Municipal corporation", "Borewell/Tank"];

  const ApartMentTypeArrayRemovePlotAndLand = [
    "Apartment",
    "Independent House/Villa",
    // "1 RK/Studio Apartment",
    "Studio Apartment",
    "1 RK/PG",
    "Independent/Builder Floor",
    "Serviced Apartment",
  ];

  const OtherFeatureArray = ["Gated Property", "Corner Property"];

  //  Plot And Land Amenities

  let ProjectAmmenitiesArray = [
    "Club House",
    "Swimming Pool",
    "GYM",
    "Community Centre",
    "Security Guard",
  ];

  useEffect(() => {
    if (BasicDetailsData.ApartmentType == "Plot/Land") {
      setTimeout(() => {
        setAmenitiesDetailsData((prevData) => ({
          ...prevData,
          ProjectAmmenities: prevData.ProjectAmmenities || [],
          WaterSource: prevData.WaterSource || [],
          OtherFeature: prevData.OtherFeature || [],
        }));
      }, 0);
    } else {
      setTimeout(() => {
        setAmenitiesDetailsData((prevData) => ({
          ...prevData,
          FurnishingOption: ["Furnished", "Semi-Furnished"].includes(
            AmenitiesDetailsData.Furnishing
          )
            ? {
                ...prevData.FurnishingOption,
                Light: prevData.FurnishingOption?.Light || 0,
                Fans: prevData.FurnishingOption?.Fans || 0,
                Geyser: prevData.FurnishingOption?.Geyser || 0,
                AC: prevData.FurnishingOption?.AC || 0,
                TV:
                  AmenitiesDetailsData.Furnishing == "Furnished"
                    ? prevData.FurnishingOption?.TV || 0
                    : undefined,
                Beds:
                  AmenitiesDetailsData.Furnishing == "Furnished"
                    ? prevData.FurnishingOption?.Beds || 0
                    : undefined,
                Wardrobe: prevData.FurnishingOption?.Wardrobe || 0,
              }
            : AmenitiesDetailsData.Furnishing === "Un-Furnished" && update
            ? AmenitiesDetailsData.FurnishingOption
            : {},
          SocietyAndBuildingFeature: prevData.SocietyAndBuildingFeature || [],
          WaterSource:
            BasicDetailsData.PropertyStatus != "Under Construction"
              ? prevData.WaterSource || []
              : undefined,
        }));
      }, 0);
    }

    // eslint-disable-next-line
  }, [AmenitiesDetailsData.Furnishing]);

  return (
    <>
      {ApartMentTypeArrayRemovePlotAndLand.includes(
        BasicDetailsData.ApartmentType
      ) && (
        <>
          {" "}
          <div className="fom-group">
            <p className="label">Furnishing*</p>

            <div className="tab-box">
              {FurnishingOptions.map((text, i) => {
                return (
                  <div
                    key={i}
                    className={`tab ${
                      AmenitiesDetailsData.Furnishing === text ? "select" : ""
                    }    ${Error.Furnishing? 'inputShake shake' : ''}`}
                    onClick={() => {
                      if (text === "Un-Furnished") {
                        setAmenitiesDetailsData({
                          ...AmenitiesDetailsData,
                          Furnishing: text,

                          // FurnishingOption: update
                          //   ? AmenitiesDetailsData.FurnishingOption
                          //   : {},
                        });
                      } else {
                        setAmenitiesDetailsData({
                          ...AmenitiesDetailsData,
                          Furnishing: text,
                        });
                      }
                    }}
                  >
                    {text}{" "}
                    <img
                      alt=""
                      src={
                        AmenitiesDetailsData.Furnishing === text
                          ? "/img/white-tick.svg"
                          : "/img/plus-create.svg"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* Furnishing Box Tab Option  */}
          {["Furnished", "Semi-Furnished"].includes(
            AmenitiesDetailsData.Furnishing
          ) && (
            <>
              {" "}
              <div className="Furnishing-box">
                {/* count Value  */}
                <div className="row ">
                  {/* ModularKitchen */}

                  <div className="field-group">
                    <label
                   
                     htmlFor="light">Modular Kitchen</label>
                    <div className="row">
                      {YesNoArray.map((text, i) => {
                        return (
                          <div className="row" key={i}>
                            <input
                             className={` ${Error.ModularKitchen? ' shake' : ''}`}
                              type="radio"
                              id={`modular-kitchen-${i}`}
                              name="modular-kitchen"
                              value={text}
                              required
                              checked={
                                AmenitiesDetailsData.FurnishingOption
                                  ?.ModularKitchen === text
                              }
                              onChange={() => {
                                setAmenitiesDetailsData({
                                  ...AmenitiesDetailsData,
                                  FurnishingOption: {
                                    ...AmenitiesDetailsData.FurnishingOption,
                                    ModularKitchen: text,
                                  },
                                });
                              }}
                            />
                            <label
                             className={` ${Error.ModularKitchen? ' shake' : ''}`}
                             htmlFor={`modular-kitchen-${i}`}>
                              {text === true ? "Yes" : "No"}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Light */}
                  <div className="field-group">
                    <label htmlFor="light">Light*</label>
                    <div className="counter">
                      <div
                        className="decrement button"
                        onClick={() => {
                          if (
                            AmenitiesDetailsData.FurnishingOption?.Light > 0
                          ) {
                            setAmenitiesDetailsData({
                              ...AmenitiesDetailsData,
                              FurnishingOption: {
                                ...AmenitiesDetailsData.FurnishingOption,
                                Light:
                                  AmenitiesDetailsData.FurnishingOption?.Light -
                                  1,
                              },
                            });
                          }
                        }}
                      >
                        -
                      </div>
                      <input
                        type="number"
                        id="light"
                        name="light"
                        min="0"
                        value={
                          AmenitiesDetailsData.FurnishingOption?.Light || 0
                        }
                        readOnly
                      />
                      <div
                        className="increment button not-select-text"
                        onClick={() => {
                          setAmenitiesDetailsData({
                            ...AmenitiesDetailsData,
                            FurnishingOption: {
                              ...AmenitiesDetailsData.FurnishingOption,
                              Light:
                                AmenitiesDetailsData.FurnishingOption?.Light +
                                1,
                            },
                          });
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>

                  {/* Fans */}

                  <div className="field-group">
                    <label htmlFor="fans">Fans*</label>
                    <div className="counter">
                      <div
                        className="decrement button"
                        onClick={() => {
                          if (AmenitiesDetailsData.FurnishingOption?.Fans > 0) {
                            setAmenitiesDetailsData({
                              ...AmenitiesDetailsData,
                              FurnishingOption: {
                                ...AmenitiesDetailsData.FurnishingOption,
                                Fans:
                                  AmenitiesDetailsData.FurnishingOption?.Fans -
                                  1,
                              },
                            });
                          }
                        }}
                      >
                        -
                      </div>
                      <input
                        type="number"
                        id="fans"
                        name="fans"
                        min="0"
                        value={AmenitiesDetailsData.FurnishingOption?.Fans || 0}
                        readOnly
                      />
                      <div
                        className="increment button not-select-text"
                        onClick={() => {
                          setAmenitiesDetailsData({
                            ...AmenitiesDetailsData,
                            FurnishingOption: {
                              ...AmenitiesDetailsData.FurnishingOption,
                              Fans:
                                AmenitiesDetailsData.FurnishingOption?.Fans + 1,
                            },
                          });
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>

                  {/* Geyser */}

                  <div className="field-group">
                    <label htmlFor="geyser">Geyser*</label>
                    <div className="counter">
                      <div
                        className="decrement button"
                        onClick={() => {
                          if (
                            AmenitiesDetailsData.FurnishingOption?.Geyser > 0
                          ) {
                            setAmenitiesDetailsData({
                              ...AmenitiesDetailsData,
                              FurnishingOption: {
                                ...AmenitiesDetailsData.FurnishingOption,
                                Geyser:
                                  AmenitiesDetailsData.FurnishingOption
                                    ?.Geyser - 1,
                              },
                            });
                          }
                        }}
                      >
                        -
                      </div>
                      <input
                        type="number"
                        id="geyser"
                        name="geyser"
                        min="0"
                        value={
                          AmenitiesDetailsData.FurnishingOption?.Geyser || 0
                        }
                        readOnly
                      />
                      <div
                        className="increment button not-select-text"
                        onClick={() => {
                          setAmenitiesDetailsData({
                            ...AmenitiesDetailsData,
                            FurnishingOption: {
                              ...AmenitiesDetailsData.FurnishingOption,
                              Geyser:
                                AmenitiesDetailsData.FurnishingOption?.Geyser +
                                1,
                            },
                          });
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>

                  {/* AC */}

                  <div className="field-group">
                    <label htmlFor="ac">AC*</label>
                    <div className="counter">
                      <div
                        className="decrement button"
                        onClick={() => {
                          if (AmenitiesDetailsData.FurnishingOption?.AC > 0) {
                            setAmenitiesDetailsData({
                              ...AmenitiesDetailsData,
                              FurnishingOption: {
                                ...AmenitiesDetailsData.FurnishingOption,
                                AC:
                                  AmenitiesDetailsData.FurnishingOption?.AC - 1,
                              },
                            });
                          }
                        }}
                      >
                        -
                      </div>
                      <input
                        type="number"
                        id="ac"
                        name="ac"
                        min="0"
                        value={AmenitiesDetailsData.FurnishingOption?.AC || 0}
                        readOnly
                      />
                      <div
                        className="increment button not-select-text"
                        onClick={() => {
                          setAmenitiesDetailsData({
                            ...AmenitiesDetailsData,
                            FurnishingOption: {
                              ...AmenitiesDetailsData.FurnishingOption,
                              AC: AmenitiesDetailsData.FurnishingOption?.AC + 1,
                            },
                          });
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>

                  {AmenitiesDetailsData.Furnishing == "Furnished" && (
                    <>
                      {" "}
                      {/* TV */}
                      <div className="field-group">
                        <label htmlFor="tv">TV*</label>
                        <div className="counter">
                          <div
                            className="decrement button"
                            onClick={() => {
                              if (
                                AmenitiesDetailsData.FurnishingOption?.TV > 0
                              ) {
                                setAmenitiesDetailsData({
                                  ...AmenitiesDetailsData,
                                  FurnishingOption: {
                                    ...AmenitiesDetailsData.FurnishingOption,
                                    TV:
                                      AmenitiesDetailsData.FurnishingOption
                                        ?.TV - 1,
                                  },
                                });
                              }
                            }}
                          >
                            -
                          </div>
                          <input
                            type="text"
                            id="tv"
                            name="tv"
                            min="0"
                            value={
                              AmenitiesDetailsData.FurnishingOption?.TV || 0
                            }
                            readOnly
                          />
                          <div
                            className="increment button not-select-text"
                            onClick={() => {
                              setAmenitiesDetailsData({
                                ...AmenitiesDetailsData,
                                FurnishingOption: {
                                  ...AmenitiesDetailsData.FurnishingOption,
                                  TV:
                                    AmenitiesDetailsData.FurnishingOption?.TV +
                                    1,
                                },
                              });
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                      {/* Beds */}
                      <div className="field-group">
                        <label htmlFor="beds">Beds*</label>
                        <div className="counter">
                          <div
                            className="decrement button"
                            onClick={() => {
                              if (
                                AmenitiesDetailsData.FurnishingOption?.Beds > 0
                              ) {
                                setAmenitiesDetailsData({
                                  ...AmenitiesDetailsData,
                                  FurnishingOption: {
                                    ...AmenitiesDetailsData.FurnishingOption,
                                    Beds:
                                      AmenitiesDetailsData.FurnishingOption
                                        ?.Beds - 1,
                                  },
                                });
                              }
                            }}
                          >
                            -
                          </div>
                          <input
                            type="text"
                            id="beds"
                            name="beds"
                            min="0"
                            value={
                              AmenitiesDetailsData.FurnishingOption?.Beds || 0
                            }
                            readOnly
                          />
                          <div
                            className="increment button not-select-text"
                            onClick={() => {
                              setAmenitiesDetailsData({
                                ...AmenitiesDetailsData,
                                FurnishingOption: {
                                  ...AmenitiesDetailsData.FurnishingOption,
                                  Beds:
                                    AmenitiesDetailsData.FurnishingOption
                                      ?.Beds + 1,
                                },
                              });
                            }}
                          >
                            +
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Wardrobe */}

                  <div className="field-group">
                    <label htmlFor="wardrobe">Wardrobe*</label>
                    <div className="counter">
                      <div
                        className="decrement button"
                        onClick={() => {
                          if (
                            AmenitiesDetailsData.FurnishingOption?.Wardrobe > 0
                          ) {
                            setAmenitiesDetailsData({
                              ...AmenitiesDetailsData,
                              FurnishingOption: {
                                ...AmenitiesDetailsData.FurnishingOption,
                                Wardrobe:
                                  AmenitiesDetailsData.FurnishingOption
                                    ?.Wardrobe - 1,
                              },
                            });
                          }
                        }}
                      >
                        -
                      </div>
                      <input
                        type="number"
                        id="wardrobe"
                        name="wardrobe"
                        min="0"
                        value={
                          AmenitiesDetailsData.FurnishingOption?.Wardrobe || 0
                        }
                        readOnly
                      />
                      <div
                        className="increment button not-select-text"
                        onClick={() => {
                          setAmenitiesDetailsData({
                            ...AmenitiesDetailsData,
                            FurnishingOption: {
                              ...AmenitiesDetailsData.FurnishingOption,
                              Wardrobe:
                                AmenitiesDetailsData.FurnishingOption
                                  ?.Wardrobe + 1,
                            },
                          });
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>

                  {/* Washroom  */}
                </div>
              </div>
            </>
          )}{" "}
          {/* Society And Building feature   */}
          <div className="fom-group">
            <p className="label"> Society / Property feature *</p>
            <div className="tab-box">
              {SocietyAndBuildingfeature_And_ProjectAmmenities_Array.map(
                (text, i) => {
                  return (
                    <div
                      key={i}
                      className={`tab ${
                        AmenitiesDetailsData.SocietyAndBuildingFeature?.includes(
                          text
                        )
                          ? "select"
                          : ""
                      } ${Error.SocietyAndBuildingFeature? 'inputShake shake' : ''}
                    `}
                      onClick={() => {
                        if (
                          !AmenitiesDetailsData.SocietyAndBuildingFeature?.includes(
                            text
                          )
                        ) {
                          setAmenitiesDetailsData({
                            ...AmenitiesDetailsData,
                            SocietyAndBuildingFeature: [
                              ...AmenitiesDetailsData.SocietyAndBuildingFeature,
                              text,
                            ],
                          });
                        }
                        if (
                          AmenitiesDetailsData.SocietyAndBuildingFeature?.includes(
                            text
                          )
                        ) {
                          setAmenitiesDetailsData({
                            ...AmenitiesDetailsData,
                            SocietyAndBuildingFeature:
                              AmenitiesDetailsData.SocietyAndBuildingFeature?.filter(
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
                        alt=""
                        src={
                          AmenitiesDetailsData.SocietyAndBuildingFeature?.includes(
                            text
                          )
                            ? "/img/white-tick.svg"
                            : "/img/plus-create.svg"
                        }
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
      {/* Furnishing Tab  */}

      {/* Power Back up */}
      <div className="fom-group">
        <p className="label">Power Back up*</p>
        <div className="tab-box">
          {PowerBackUpArray.map((text, i) => {
            return (
              <div
                key={i}
                className={`tab ${
                  AmenitiesDetailsData.PowerBackUp === text ? "select" : ""
                }  ${Error.PowerBackUp? 'inputShake shake' : ''}`}
                onClick={() => {
                  setAmenitiesDetailsData({
                    ...AmenitiesDetailsData,
                    PowerBackUp: text,
                  });
                }}
              >
                {text}{" "}
                <img
                  alt=""
                  src={
                    AmenitiesDetailsData.PowerBackUp === text
                      ? "/img/white-tick.svg"
                      : "/img/plus-create.svg"
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Water Source  */}
      {BasicDetailsData.PropertyStatus != "Under Construction" && (
        <div className="fom-group">
          <p className="label"> Water Source *</p>
          <div className="tab-box">
            {WaterSourceArray.map((text, i) => {
              return (
                <div
                  key={i}
              className={`tab ${
                  AmenitiesDetailsData.WaterSource?.includes(text)
                    ? "select"
                    : ""
                }
                    ${Error.WaterSource? 'inputShake shake' : ''} `}
               
                  onClick={(event) => {
                    if (!AmenitiesDetailsData.WaterSource?.includes(text)) {
                      setAmenitiesDetailsData({
                        ...AmenitiesDetailsData,
                        WaterSource: [
                          ...AmenitiesDetailsData.WaterSource,
                          text,
                        ],
                      });
                    }
                    if (AmenitiesDetailsData.WaterSource.includes(text)) {
                      setAmenitiesDetailsData({
                        ...AmenitiesDetailsData,
                        WaterSource: AmenitiesDetailsData.WaterSource?.filter(
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
                    alt=""
                    src={
                      AmenitiesDetailsData.WaterSource?.includes(text)
                        ? "/img/white-tick.svg"
                        : "/img/plus-create.svg"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* plot and Land Fields  */}

      {BasicDetailsData.ApartmentType === "Plot/Land" && (
        <>
          <div className="fom-group">
            <p className="label"> Project Ammenities*</p>
            <div className="tab-box">
              {ProjectAmmenitiesArray.map((text, i) => {
                return (
                  <div
                    key={i}
                    className={`tab ${
                      AmenitiesDetailsData.ProjectAmmenities?.includes(text)
                        ? "select"
                        : ""
                    }  ${Error.ProjectAmmenities? 'inputShake shake' : ''}
                    `}
                    onClick={() => {
                      if (
                        !AmenitiesDetailsData.ProjectAmmenities?.includes(text)
                      ) {
                        setAmenitiesDetailsData({
                          ...AmenitiesDetailsData,
                          ProjectAmmenities: [
                            ...AmenitiesDetailsData.ProjectAmmenities,
                            text,
                          ],
                        });
                      }
                      if (
                        AmenitiesDetailsData.ProjectAmmenities?.includes(text)
                      ) {
                        setAmenitiesDetailsData({
                          ...AmenitiesDetailsData,
                          ProjectAmmenities:
                            AmenitiesDetailsData.ProjectAmmenities?.filter(
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
                      alt="tick"
                      src={
                        AmenitiesDetailsData.ProjectAmmenities?.includes(text)
                          ? "/img/white-tick.svg"
                          : "/img/plus-create.svg"
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="label">Other Feature*</p>

            <div className="row">
              {OtherFeatureArray.map((text, i) => {
                return (
                  <div key={i}>
                    <label
                    className={` ${Error.OtherFeature? ' shake' : ''}`}
                     htmlFor={`other-feature-${i}`}>{text}</label>
                    <input
                    className={` ${Error.OtherFeature? ' shake' : ''}`}
                      type="checkbox"
                      name=""
                      id={`other-feature-${i}`}
                      checked={
                        AmenitiesDetailsData?.OtherFeature?.includes(text)
                          ? true
                          : false
                      }
                      onChange={(event) => {
                        if (event.target.checked === false) {
                          setAmenitiesDetailsData({
                            ...AmenitiesDetailsData,

                            OtherFeature:
                              AmenitiesDetailsData?.OtherFeature?.filter(
                                (item) => {
                                  return item !== text;
                                }
                              ),
                          });
                        }
                        if (event.target.checked === true) {
                          setAmenitiesDetailsData({
                            ...AmenitiesDetailsData,

                            OtherFeature: [
                              ...AmenitiesDetailsData?.OtherFeature,

                              text,
                            ],
                          });
                        }
                      }}
                    />
                  </div>
                );
              })}{" "}
            </div>
          </div>
        </>
      )}
    </>
  );
}
