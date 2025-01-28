import React from "react";
import { StoreDataInSession } from "../../../utils/SessionStorage";
export default function PlotAndLand({
  PlotAndLandFieldsData,
  setnext,
  setPlotAndLandFieldsData,
  update,
}) {
  const OpenSide = ["1", "2", "3", "3+"];
  const ConstructionDone = [true, false];
  const BoundaryWall = [true, false];

  const Unit = [
    "sq.ft.",
    "sq.yards",
    // "sq.m.",
    // "acres",
    // "marla ",
    // "cents",
    // "bigha",
    // "kottah",
    // "kanal",
    // "grounds",
    // "ares",
    // "biswa",
    // "guntha",
    // "aankadam",
    // "hectares",
    // "rood",
    // "chataks",
    // "perch",
  ];
  const PossessionOption = [
    "Within 3 Month",
    "Within 6 Month",
    "By 2025",
    "By 2026",
    "By 2026",
    "By 2026",
    "By 2026",
  ];

  const PostSubmitHandler = (e) => {
    e.preventDefault();

    if (
      PlotAndLandFieldsData.OpenSide === "" ||
      PlotAndLandFieldsData.ConstructionDone === "" ||
      PlotAndLandFieldsData.BoundaryWall === ""
    ) {
      alert("field is required");
    } else {
      setnext(3);
      if (!update) {
        StoreDataInSession("next", 3);
        StoreDataInSession("PlotAndLandFieldsData", PlotAndLandFieldsData);
      }
    }
  };

  return (
    <>
      <div className="property-details">
        <h2> Plot And Land Section </h2>
        <form id="property-form" onSubmit={PostSubmitHandler}>
          {/* Plot Area  */}
          <div className="form-group">
            <label htmlFor="plotArea">Plot Area</label>
            <div className="unit-input">
              <input
                type="number"
                id="plotArea"
                name="plotArea"
                required
                value={PlotAndLandFieldsData.PlotArea.value}
                onChange={(e) => {
                  setPlotAndLandFieldsData({
                    ...PlotAndLandFieldsData,
                    PlotArea: {
                      ...PlotAndLandFieldsData.PlotArea,
                      value: e.target.value,
                    },
                  });
                }}
                placeholder="Plot Area"
              />

              <select
                className="unit"
                required
                value={PlotAndLandFieldsData.PlotArea.unit.trim()}
                onChange={(e) => {
                  setPlotAndLandFieldsData({
                    ...PlotAndLandFieldsData,
                    PlotArea: {
                      ...PlotAndLandFieldsData.PlotArea,
                      unit: e.target.value.trim(),
                    },
                  });
                }}
              >
                <option value="">select unit</option>
                {Unit.map((e, i) => {
                  return (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* Property Dimensions */}
          <div>
            <p>Property Dimensions </p>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="plot-length">Length of plot(in Ft.)</label>
                <div className="unit-input">
                  <input
                    type="number"
                    id="plot-length"
                    name="plot-length"
                    required
                    value={
                      PlotAndLandFieldsData.PropertyDimensions.Length.value
                    }
                    onChange={(e) => {
                      setPlotAndLandFieldsData({
                        ...PlotAndLandFieldsData,
                        PropertyDimensions: {
                          ...PlotAndLandFieldsData.PropertyDimensions,
                          Length: {
                            ...PlotAndLandFieldsData.PropertyDimensions.Length,
                            value: e.target.value,
                          },
                        },
                      });
                    }}
                    placeholder="Length of plot"
                  />
                  <input
                    type="text"
                    value={PlotAndLandFieldsData.PropertyDimensions.Length.unit}
                    className="unit"
                    readOnly
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="plot-breadth">Breadth of Plot(in Ft.)</label>
                <div className="unit-input">
                  <input
                    type="number"
                    id="plot-breadth"
                    name="plot-breadth"
                    required
                    value={
                      PlotAndLandFieldsData.PropertyDimensions.Breadth.value
                    }
                    onChange={(e) => {
                      setPlotAndLandFieldsData({
                        ...PlotAndLandFieldsData,
                        PropertyDimensions: {
                          ...PlotAndLandFieldsData.PropertyDimensions,
                          Breadth: {
                            ...PlotAndLandFieldsData.PropertyDimensions.Breadth,
                            value: e.target.value,
                          },
                        },
                      });
                    }}
                    placeholder="Breadth of plot"
                  />
                  <input
                    type="text"
                    value={
                      PlotAndLandFieldsData.PropertyDimensions.Breadth.unit
                    }
                    className="unit"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Floor  */}
          {/* Other Room Tab  */}
          <div className="fom-group">
            <p className="label">No. of open side</p>
            <div className="tab-box">
              {OpenSide.map((e, i) => {
                return (
                  <div
                    key={i}
                    className={`tab ${
                      PlotAndLandFieldsData.OpenSide === e ? "select" : ""
                    }`}
                    onClick={(e) => {
                      setPlotAndLandFieldsData({
                        ...PlotAndLandFieldsData,
                        OpenSide: e.target.innerText,
                      });
                    }}
                  >
                    {e}
                  </div>
                );
              })}
            </div>
          </div>
          {/* Boundary Wall */}
          <div className="fom-group">
            <p className="label">
              is there a boundary wall around the property?*
            </p>

            <div className="tab-box">
              {BoundaryWall.map((e, i) => {
                return (
                  <div
                    key={i}
                    className={`tab ${
                      PlotAndLandFieldsData.BoundaryWall === e ? "select" : ""
                    }`}
                    onClick={(e) => {
                      setPlotAndLandFieldsData({
                        ...PlotAndLandFieldsData,
                        BoundaryWall:
                          e.target.innerText === "Yes" ? true : false,
                      });
                    }}
                  >
                    {e ? "Yes" : "No"}
                  </div>
                );
              })}
            </div>
          </div>
          {/*  Construction Done Yes aur No Tabs */}
          <div className="fom-group">
            <p className="label">Any construction done on this property ?*</p>

            <div className="tab-box">
              {ConstructionDone.map((e, i) => {
                return (
                  <div
                    key={i}
                    className={`tab ${
                      PlotAndLandFieldsData.ConstructionDone === e
                        ? "select"
                        : ""
                    }`}
                    onClick={(e) => {
                      if (e.target.innerText === "No") {
                        setPlotAndLandFieldsData({
                          ...PlotAndLandFieldsData,
                          ConstructionDone:
                            e.target.innerText === "Yes" ? true : false,
                          ConstructionDoneOption: update
                            ? PlotAndLandFieldsData.ConstructionDoneOption
                            : {
                                Shed: false,
                                Rooms: false,
                                Washroom: false,
                                Other: false,
                              },
                        });
                      } else {
                        setPlotAndLandFieldsData({
                          ...PlotAndLandFieldsData,
                          ConstructionDone:
                            e.target.innerText === "Yes" ? true : false,
                        });
                      }
                    }}
                  >
                    {e ? "Yes" : "No"}
                  </div>
                );
              })}
            </div>
          </div>
          {PlotAndLandFieldsData.ConstructionDone === true && (
            <div className="fom-group">
              <p className="label">Any construction done on this property ?*</p>

              {/* Shed  */}

              <div className="form-checkbox-group">
                <input
                  type="checkbox"
                  id="shed"
                  name="shed"
                  checked={PlotAndLandFieldsData.ConstructionDoneOption.Shed}
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      setPlotAndLandFieldsData({
                        ...PlotAndLandFieldsData,
                        ConstructionDoneOption: {
                          ...PlotAndLandFieldsData.ConstructionDoneOption,
                          Shed: true,
                        },
                      });
                    }
                    if (e.target.checked === false) {
                      setPlotAndLandFieldsData({
                        ...PlotAndLandFieldsData,
                        ConstructionDoneOption: {
                          ...PlotAndLandFieldsData.ConstructionDoneOption,
                          Shed: false,
                        },
                      });
                    }
                  }}
                />
                <label htmlFor="shed">Shed</label>
              </div>

              {/* Rooms  */}

              <div className="form-checkbox-group">
                <input
                  type="checkbox"
                  id="rooms"
                  name="rooms"
                  checked={PlotAndLandFieldsData.ConstructionDoneOption.Rooms}
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      setPlotAndLandFieldsData({
                        ...PlotAndLandFieldsData,
                        ConstructionDoneOption: {
                          ...PlotAndLandFieldsData.ConstructionDoneOption,
                          Rooms: true,
                        },
                      });
                    }
                    if (e.target.checked === false) {
                      setPlotAndLandFieldsData({
                        ...PlotAndLandFieldsData,
                        ConstructionDoneOption: {
                          ...PlotAndLandFieldsData.ConstructionDoneOption,
                          Rooms: false,
                        },
                      });
                    }
                  }}
                />
                <label htmlFor="rooms">Rooms</label>
              </div>

              {/* Washroom */}

              <div className="form-checkbox-group">
                <input
                  type="checkbox"
                  id="washroom"
                  name="washroom"
                  checked={
                    PlotAndLandFieldsData.ConstructionDoneOption.Washroom
                  }
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      setPlotAndLandFieldsData({
                        ...PlotAndLandFieldsData,
                        ConstructionDoneOption: {
                          ...PlotAndLandFieldsData.ConstructionDoneOption,
                          Washroom: true,
                        },
                      });
                    }
                    if (e.target.checked === false) {
                      setPlotAndLandFieldsData({
                        ...PlotAndLandFieldsData,
                        ConstructionDoneOption: {
                          ...PlotAndLandFieldsData.ConstructionDoneOption,
                          Washroom: false,
                        },
                      });
                    }
                  }}
                />
                <label htmlFor="washroom">Washroom</label>
              </div>

              {/* Other */}
              <div className="form-checkbox-group">
                <input
                  type="checkbox"
                  id="other"
                  name="other"
                  checked={PlotAndLandFieldsData.ConstructionDoneOption.Other}
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      setPlotAndLandFieldsData({
                        ...PlotAndLandFieldsData,
                        ConstructionDoneOption: {
                          ...PlotAndLandFieldsData.ConstructionDoneOption,
                          Other: true,
                        },
                      });
                    }
                    if (e.target.checked === false) {
                      setPlotAndLandFieldsData({
                        ...PlotAndLandFieldsData,
                        ConstructionDoneOption: {
                          ...PlotAndLandFieldsData.ConstructionDoneOption,
                          Other: false,
                        },
                      });
                    }
                  }}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
          )}
          {/* What type of construction has bee done ? */}
          <div
            className="button"
            onClick={() => {
              setnext(1);
              if (!update) {
                StoreDataInSession("next", 1);
              }
            }}
          >
            {" "}
            previous
          </div>{" "}
          <button type="submit"> next</button>
        </form>
      </div>
    </>
  );
}
