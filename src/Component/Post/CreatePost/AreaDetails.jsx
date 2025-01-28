import React from "react";

export default function AreaDetailsSection({
  AreaDetailsData,
  setAreaDetailsData,
  BasicDetailsData,
  AlertObj,
}) {
  const Unit = [
    "sq.ft.",
    // "sq.yards",
    // "sq.m.",
    // "acres",
    // "marla ",
    // "cents",
    // "bigha ",
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
  return (
    <>
    <p className="step-section-heading-p">Area Details <small>(At least one area type is mandatory.) </small> </p>
      {[
        "Apartment",
        "Independent/Builder Floor",
        "1 RK/Studio Apartment",
        "Serviced Apartment",
      ].includes(BasicDetailsData.ApartmentType) && (
        <>
          {" "}
          {/* Super Built Up Area* */}
          <div className="form-group">
            <label htmlFor="super-built-up-area"> Super Built Up Area*</label>
            <div className="unit-input">
              <input
                type="text"
                id="super-built-up-area"
                placeholder="Built Up Area"
                value={AreaDetailsData.SuperBuiltUpArea?.value || ""}
                onChange={(e) => {
                  const regex = /^[1-9][0-9]*$/;
                  let test = regex.test(e.target.value);

                  // eslint-disable-next-line
                  if (e.target.value == "" || test) {
                    setAreaDetailsData({
                      ...AreaDetailsData,
                      SuperBuiltUpArea: {
                        ...AreaDetailsData.SuperBuiltUpArea,
                        value: e.target.value,
                      },
                    });
                  }
                }}
              />

              <select
                className="unit"
                value={AreaDetailsData.SuperBuiltUpArea?.unit?.trim() || ""}
                onChange={(e) => {
                  setAreaDetailsData({
                    ...AreaDetailsData,
                    SuperBuiltUpArea: {
                      ...AreaDetailsData.SuperBuiltUpArea,
                      unit: e.target.value.trim(),
                    },
                    CarpetArea: {
                      ...AreaDetailsData.CarpetArea,
                      unit: e.target.value.trim(),
                    },
                    BuiltUpArea: {
                      ...AreaDetailsData.BuiltUpArea,
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
          {/* Built Up Area */}
          <div className="form-group">
            <label htmlFor="built-up-area">Built Up Area</label>
            <div className="unit-input">
              <input
                type="text"
                id="built-up-area"
                placeholder="Built Up Area"
                value={AreaDetailsData.BuiltUpArea?.value || ""}
                onChange={(e) => {
                  const regex = /^[1-9][0-9]*$/;
                  let test = regex.test(e.target.value);

                  // eslint-disable-next-line
                  if (e.target.value == "" || test) {
                    setAreaDetailsData({
                      ...AreaDetailsData,
                      BuiltUpArea: {
                        ...AreaDetailsData.BuiltUpArea,
                        value: e.target.value,
                      },
                    });
                  }
                }}
              />

              <>
                {" "}
                <select
                  className="unit"
                  value={AreaDetailsData.BuiltUpArea?.unit?.trim() || ""}
                  onChange={(e) => {
                    setAreaDetailsData({
                      ...AreaDetailsData,
                      BuiltUpArea: {
                        ...AreaDetailsData.BuiltUpArea,
                        unit: e.target.value.trim(),
                      },

                      CarpetArea: {
                        ...AreaDetailsData.CarpetArea,
                        unit: e.target.value.trim(),
                      },

                      SuperBuiltUpArea: {
                        ...AreaDetailsData.SuperBuiltUpArea,
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
              </>
              {/* // )} */}
            </div>
            {AlertObj.BuiltUpAreaAlert && (
              <div className="alert-in-area-section">{AlertObj.BuiltUpAreaAlert}</div>
            )}
          </div>
          {/* Carpet Area  */}
          <div className="form-group">
            <label htmlFor="carpetArea">Carpet Area</label>
            <div className="unit-input">
              <input
                type="text"
                id="carpetArea"
                name="carpetArea"
                value={AreaDetailsData.CarpetArea?.value || ""}
                onChange={(e) => {
                  const regex = /^[1-9][0-9]*$/;

                  let test = regex.test(e.target.value);

                  // eslint-disable-next-line
                  if (e.target.value == "" || test) {
                    setAreaDetailsData({
                      ...AreaDetailsData,
                      CarpetArea: {
                        ...AreaDetailsData.CarpetArea,
                        value: e.target.value,
                      },
                    });
                  }
                }}
                placeholder="Carpet Area"
              />

              <>
                <select
                  className="unit"
                  value={AreaDetailsData.CarpetArea?.unit?.trim() || ""}
                  onChange={(e) => {
                    setAreaDetailsData({
                      ...AreaDetailsData,
                      CarpetArea: {
                        ...AreaDetailsData.CarpetArea,
                        unit: e.target.value.trim(),
                      },

                      SuperBuiltUpArea: {
                        ...AreaDetailsData.SuperBuiltUpArea,
                        unit: e.target.value.trim(),
                      },

                      BuiltUpArea: {
                        ...AreaDetailsData.BuiltUpArea,
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
                </select>{" "}
              </>
            </div>

            {AlertObj.CarpetAreaAlert && <div className="alert-in-area-section">{AlertObj.CarpetAreaAlert}</div>}
          </div>
        </>
      )}

      {/* Plot Area  */}

      {["Independent House/Villa", "Plot/Land"].includes(
        BasicDetailsData.ApartmentType
      ) && (
        <>
          <div className="form-group">
            <label htmlFor="plotArea">Plot Area</label>
            <div className="unit-input">
              <input
                type="number"
                id="plotArea"
                name="plotArea"
                required
                value={AreaDetailsData.PlotArea?.value || ""}
                onChange={(e) => {
                  setAreaDetailsData({
                    ...AreaDetailsData,
                    PlotArea: {
                      ...AreaDetailsData.PlotArea,
                      value: e.target.value,
                    },
                  });
                }}
                placeholder="Plot Area"
              />
              <select
                className="unit"
                required
                value={AreaDetailsData.PlotArea?.unit?.trim()}
                onChange={(e) => {
                  setAreaDetailsData({
                    ...AreaDetailsData,
                    PlotArea: {
                      ...AreaDetailsData.PlotArea,
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

          {BasicDetailsData.ApartmentType === "Plot/Land" && (
            <div className="form-group">
              <label htmlFor="plot-Dimensons">Plot Dimensions*</label>

              <input
                id="flooring-type"
                required
                value={AreaDetailsData.PlotDimensions || ""}
                readOnly
                // onChange={(e) => {
                //   setPropertyDetailsData({
                //     ...PropertyDetailsData,
                //     FlooringType: e.target.value,
                //   });
                // }}
              />
            </div>
          )}
        </>
      )}

      {/* {["Plot/Land"].includes(BasicDetailsData.ApartmentType) && (
        <>
          <div className="form-group">
            <label htmlFor="plotSize">Plot Size*</label>
            <div className="unit-input">
              <input
                type="number"
                id="plotSize"
                name="plotSize"
                required
                value={AreaDetailsData.PlotSize?.value || ""}
                onChange={(e) => {
                  setAreaDetailsData({
                    ...AreaDetailsData,
                    PlotSize: {
                      ...AreaDetailsData.PlotSize,
                      value: e.target.value,
                    },
                  });
                }}
                placeholder="Plot Size"
              />
              <select
                className="unit"
                required
                value={AreaDetailsData.PlotSize?.unit?.trim()}
                onChange={(e) => {
                  setAreaDetailsData({
                    ...AreaDetailsData,
                    PlotSize: {
                      ...AreaDetailsData.PlotSize,
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
        </>
      )} */}
    </>
  );
}
