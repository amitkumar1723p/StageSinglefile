import React from "react";
import { useEffect } from "react";

export default function Amenities({
  AmenitiesDetailsData,
  setAmenitiesDetailsData,
  update,
  BasicDetailsData,
}) {
  const FurnishingOptions = ["Furnished", "Semi-Furnished", "Un-Furnished"];
  const YesNoArray = [true, false];
  const PowerBackUpArray = ["None", "Partial", "Full"];
  const SocietyAndBuildingfeature_And_ProjectAmmenities_Array = [
    "Club house",
    "Swimming Pool",
    "GYM",
    "Community Center",
    "Security Guard",
  ];
  const WaterSourceArray = ["Municipal corporation", "Borewell/Tank"];

  const ApartMentTypeArrayRemovePlotAndLand = [
    "Apartment",
    "Independent House/Villa",
    "1 RK/Studio Apartment",
    "Independent/Builder Floor",
    "Serviced Apartment",
  ];

  const OtherFeatureArray = ["Gated Property", "Corner Property"];
  useEffect(() => {
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
            TV: prevData.FurnishingOption?.TV || 0,
            Beds: prevData.FurnishingOption?.Beds || 0,
            Wardrobe: prevData.FurnishingOption?.Wardrobe || 0,
          }
        : AmenitiesDetailsData.Furnishing === "Un-Furnished" && update
        ? AmenitiesDetailsData.FurnishingOption
        : {},
      SocietyAndBuildingFeature: prevData.SocietyAndBuildingFeature || [],
      ProjectAmmenities: prevData.ProjectAmmenities || [],
      WaterSource: prevData.WaterSource || [],
      OtherFeature: prevData.OtherFeature || [],
    }));
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
                    }`}
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
                    <label htmlFor="light">Modular Kitchen</label>
                    <div className="row">
                      {YesNoArray.map((text, i) => {
                        return (
                          <div className="row" key={i}>
                            <input
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
                            <label htmlFor={`modular-kitchen-${i}`}>
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
                        className="increment button"
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
                        className="increment button"
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
                        className="increment button"
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
                        className="increment button"
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

                  {/* TV */}

                  <div className="field-group">
                    <label htmlFor="tv">TV*</label>
                    <div className="counter">
                      <div
                        className="decrement button"
                        onClick={() => {
                          if (AmenitiesDetailsData.FurnishingOption?.TV > 0) {
                            setAmenitiesDetailsData({
                              ...AmenitiesDetailsData,
                              FurnishingOption: {
                                ...AmenitiesDetailsData.FurnishingOption,
                                TV:
                                  AmenitiesDetailsData.FurnishingOption?.TV - 1,
                              },
                            });
                          }
                        }}
                      >
                        -
                      </div>
                      <input
                        type="number"
                        id="tv"
                        name="tv"
                        min="0"
                        value={AmenitiesDetailsData.FurnishingOption?.TV || 0}
                        readOnly
                      />
                      <div
                        className="increment button"
                        onClick={() => {
                          setAmenitiesDetailsData({
                            ...AmenitiesDetailsData,
                            FurnishingOption: {
                              ...AmenitiesDetailsData.FurnishingOption,
                              TV: AmenitiesDetailsData.FurnishingOption?.TV + 1,
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
                          if (AmenitiesDetailsData.FurnishingOption?.Beds > 0) {
                            setAmenitiesDetailsData({
                              ...AmenitiesDetailsData,
                              FurnishingOption: {
                                ...AmenitiesDetailsData.FurnishingOption,
                                Beds:
                                  AmenitiesDetailsData.FurnishingOption?.Beds -
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
                        id="beds"
                        name="beds"
                        min="0"
                        value={AmenitiesDetailsData.FurnishingOption?.Beds || 0}
                        readOnly
                      />
                      <div
                        className="increment button"
                        onClick={() => {
                          setAmenitiesDetailsData({
                            ...AmenitiesDetailsData,
                            FurnishingOption: {
                              ...AmenitiesDetailsData.FurnishingOption,
                              Beds:
                                AmenitiesDetailsData.FurnishingOption?.Beds + 1,
                            },
                          });
                        }}
                      >
                        +
                      </div>
                    </div>
                  </div>

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
                        className="increment button"
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
                      }
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
                }`}
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
                    `}
                onClick={(event) => {
                  if (!AmenitiesDetailsData.WaterSource?.includes(text)) {
                    setAmenitiesDetailsData({
                      ...AmenitiesDetailsData,
                      WaterSource: [...AmenitiesDetailsData.WaterSource, text],
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

      {/* plot and Land Fields  */}

      {BasicDetailsData.ApartmentType === "Plot/Land" && (
        <>
          {/* Society And Building feature   */}
          <div className="fom-group">
            <p className="label"> Project Ammenities*</p>
            <div className="tab-box">
              {SocietyAndBuildingfeature_And_ProjectAmmenities_Array.map(
                (text, i) => {
                  return (
                    <div
                      key={i}
                      className={`tab ${
                        AmenitiesDetailsData.ProjectAmmenities?.includes(text)
                          ? "select"
                          : ""
                      }
                    `}
                      onClick={() => {
                        if (
                          !AmenitiesDetailsData.ProjectAmmenities?.includes(
                            text
                          )
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

          <div>
            <h1>Other Feature</h1>

            <div className="row">
              {OtherFeatureArray.map((text, i) => {
                return (
                  <div key={i}>
                    <label htmlFor={`other-feature-${i}`}>{text}</label>
                    <input
                      type="checkbox"
                      name=""
                      id={`other-feature-${i}`}
                      //  checked={AmenitiesDetailsData.OtherFeature?.includes(
                      //   text
                      // )}
                      checked={true}
                      onChange={(event) => {
                        if (event.target.checked === false) {
                          alert("false");
                          // setAmenitiesDetailsData({
                          //   ...AmenitiesDetailsData,
                          //   OtherFeature: [
                          //     ...AmenitiesDetailsData.OtherFeature,
                          //     text,
                          //   ],
                          // });
                        }
                        if (event.target.checked === true) {
                          alert("true");
                          // setAmenitiesDetailsData({
                          //   ...AmenitiesDetailsData,
                          //   OtherFeature:
                          //     AmenitiesDetailsData.OtherFeature?.filter(
                          //       (item) => {
                          //         return item !== text;
                          //       }
                          //     ),
                          // });
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
