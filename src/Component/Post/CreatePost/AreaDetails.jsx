import React, { useEffect,useImperativeHandle, forwardRef, useState  } from "react";

export default function AreaDetailsSection({
  AreaDetailsData,
  setAreaDetailsData,
  BasicDetailsData,
  AlertObj,
  Error,
}) {
  useEffect(() => {
    if (
      [
        "Apartment",
        "Independent/Builder Floor",
        // "1 RK/Studio Apartment",
        "Studio Apartment",
        "1 RK/PG",
        "Serviced Apartment",
      ].includes(BasicDetailsData.ApartmentType)
    ) {
      setTimeout(() => {
        setAreaDetailsData((prevData) => ({
          ...prevData,
          SuperBuiltUpArea: { ...prevData.SuperBuiltUpArea, unit: "sq.ft" },
          CarpetArea: { ...prevData.CarpetArea, unit: "sq.ft" },
          BuiltUpArea: { ...prevData.BuiltUpArea, unit: "sq.ft" },
        }));
      }, 0);
    }
    if (["Independent House/Villa"].includes(BasicDetailsData.ApartmentType)) {
      setTimeout(() => {
        setAreaDetailsData((prevData) => ({
          ...prevData,
          SuperBuiltUpArea: { ...prevData.SuperBuiltUpArea, unit: "sq.ft" },
          CarpetArea: { ...prevData.CarpetArea, unit: "sq.ft" },
          BuiltUpArea: { ...prevData.BuiltUpArea, unit: "sq.ft" },
          PlotArea: { ...prevData.PlotArea, unit: "sq.yard" },
        }));
      }, 0);
    }

    if (["Plot/Land"].includes(BasicDetailsData.ApartmentType)) {
      setTimeout(() => {
        setAreaDetailsData((prevData) => ({
          ...prevData,
          PlotSize: { ...prevData.PlotSize, unit: "sq.yard" },
        }));
      }, 0);
    }
  }, [BasicDetailsData.ApartmentType]);


//  const [amit ,setamit ] =useState(false)

//   const HandleAreaDerailsAlert=()=>{
//     if(!AreaDetailsData.PlotSize){
//       console.log("i am AM");
//       setamit(true)
//     }
//   }


  return (
    <>
      <p className="step-section-heading-p">
        Area Details <small>(At least one area type is mandatory.) </small>{" "}
      </p>

      {/* Plot Area  */}

      {BasicDetailsData.ApartmentType === "Plot/Land" && (
        <>
          <div className="form-group">
          {/* <p> {Error.PlotSize && "Plot Area Error"}</p> */}
            <label htmlFor="plotSize">Plot Size*</label>
             
            <div className={`unit-input  ${Error.PlotSize? 'inputShake shake' : ''}`}>
              <input
              
                type="text"
                id="plotSize"
                name="plotSize"
                required
                value={AreaDetailsData.PlotSize?.value || ""}
                onChange={(e) => {
                  const numericValue = String(e.target.value).replace(
                    /[^0-9]/g,
                    ""
                  );

                  setAreaDetailsData({
                    ...AreaDetailsData,
                    PlotSize: {
                      ...AreaDetailsData.PlotSize,
                      value: numericValue,
                    },
                  });
                }}
                placeholder={"Plot Size"}
              />
              <input
                type="text"
                readOnly
                className="unit"
                value={AreaDetailsData.PlotSize?.unit || ""}
              />
            </div>
          </div>
          <div className="form-group ">
            {console.log(Error)}
          {/* <p> {Error.PlotDimensions && "PlotDimensions Area Error"}</p> */}
            <label htmlFor="plot-Dimensons">Plot Dimensions*</label>
            <input
            className={`${Error.PlotDimensions? 'inputShake shake' : ''}`}
              id="plot-dimensions"
              required
              value={AreaDetailsData.PlotDimensions?.trimStart() || ""}
              onChange={(e) => {
                setAreaDetailsData({
                  ...AreaDetailsData,
                  PlotDimensions: e.target.value,
                });
              }}
            />
          </div>
        </>
      )}

      {BasicDetailsData.ApartmentType == "Independent House/Villa" && (
        <>
          {/* plot area  */}

          <div className="form-group">
            <label htmlFor="plotArea">Plot Area*</label>
            <div className="unit-input">
              <input
                type="text"
                id="plotArea"
                name="plotArea"
                required
                value={AreaDetailsData.PlotArea?.value || ""}
                onChange={(e) => {
                  const numericValue = String(e.target.value).replace(
                    /[^0-9]/g,
                    ""
                  );

                  setAreaDetailsData({
                    ...AreaDetailsData,
                    PlotArea: {
                      ...AreaDetailsData.PlotArea,
                      value: numericValue,
                    },
                  });
                }}
                placeholder={"Plot Area"}
              />
              <input
                type="text"
                readOnly
                className="unit"
                value={AreaDetailsData.PlotArea?.unit || ""}
              />
            </div>
          </div>
        </>
      )}

      {[
        "Independent House/Villa",
        "Apartment",
        "Independent/Builder Floor",
        // "1 RK/Studio Apartment",
        "Studio Apartment",
        "1 RK/PG",
        "Serviced Apartment",
      ].includes(BasicDetailsData.ApartmentType) && (
        <>
          {/* Super Built Up Area* */}
          <div className="form-group">
            <label htmlFor="super-built-up-area"> Super Built Up Area* </label>
            <div className={`unit-input ${Error.AreaDetailData? 'inputShake shake' : ''}`}>
              <input
               

                type="text"
                id="super-built-up-area"
                placeholder="Built Up Area"
                value={AreaDetailsData?.SuperBuiltUpArea?.value || ""}
                onChange={(e) => {
                  const numericValue = String(e.target.value).replace(
                    /[^0-9]/g,
                    ""
                  );

                  // eslint-disable-next-line

                  setAreaDetailsData({
                    ...AreaDetailsData,
                    SuperBuiltUpArea: {
                      ...AreaDetailsData.SuperBuiltUpArea,
                      value: numericValue,
                    },
                  });
                }}
              />

              <input
                type="text"
                readOnly
                className="unit"
                value={AreaDetailsData?.SuperBuiltUpArea?.unit || ""}
              />
            </div>
          </div>
          {/* Built Up Area */}
          <div className="form-group">
            <label htmlFor="built-up-area">Built Up Area</label>
            <div  className={`unit-input ${Error.AreaDetailData? 'inputShake shake' : ''}`}>
              <input
                type="text"
                id="built-up-area"
                placeholder="Built Up Area"
                value={AreaDetailsData?.BuiltUpArea?.value || ""}
                onChange={(e) => {
                  const numericValue = String(e.target.value).replace(
                    /[^0-9]/g,
                    ""
                  );

                  // eslint-disable-next-line

                  setAreaDetailsData({
                    ...AreaDetailsData,
                    BuiltUpArea: {
                      ...AreaDetailsData.BuiltUpArea,
                      value: numericValue,
                    },
                  });
                }}
              />
              <input
                type="text"
                readOnly
                className="unit"
                value={AreaDetailsData.BuiltUpArea?.unit || ""}
              />
            </div>
            {AlertObj.BuiltUpAreaAlert && (
              <div className="alert-in-area-section">
                {AlertObj.BuiltUpAreaAlert}
              </div>
            )}
          </div>
          {/* Carpet Area  */}
          <div className="form-group">
            <label htmlFor="carpetArea">Carpet Area</label>
            <div className={`unit-input ${Error.AreaDetailData? 'inputShake shake' : ''}`}>
              <input
                type="text"
                id="carpetArea"
                name="carpetArea"
                value={AreaDetailsData?.CarpetArea?.value || ""}
                onChange={(e) => {
                  const numericValue = String(e.target.value).replace(
                    /[^0-9]/g,
                    ""
                  );

                  // eslint-disable-next-line

                  setAreaDetailsData({
                    ...AreaDetailsData,
                    CarpetArea: {
                      ...AreaDetailsData.CarpetArea,
                      value: numericValue,
                    },
                  });
                }}
                placeholder="Carpet Area"
              />

              <input
                type="text"
                readOnly
                className="unit"
                value={AreaDetailsData?.CarpetArea?.unit || ""}
              />
            </div>

            {AlertObj.CarpetAreaAlert && (
              <div className="alert-in-area-section">
                {AlertObj.CarpetAreaAlert}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
