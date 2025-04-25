
import "./CreatePost.css"
import { useEffect } from "react";

export default function OtherDetails({
  OtherDetailsData,
  setOtherDetailsData,
  Error,
  filederror ,
  // eslint-disable-next-line
  BasicDetailsData,
}) {

  //   useEffect(() => {
  //     if (ConstructionDetailsData.TotalFloors) {
  //       let count = [];
  //       for (let i = 1; i <= ConstructionDetailsData.TotalFloors; i++) {
  //         count.push(i);
  //       }
  //       setFloorCount(count);
  //     } else {
  //       if (
  //         [
  //           "Apartment",
  //           "Independent/Builder Floor",
  //           "1 RK/Studio Apartment",
  //           "Serviced Apartment",
  //         ].includes(BasicDetailsData.ApartmentType)
  //       ) {
  //         setConstructionDetailsData({
  //           ...ConstructionDetailsData,
  //           PropertyOnFloor: "",
  //         });
  //       }

  //       setFloorCount([]);
  //     }
  //   }, [ConstructionDetailsData.TotalFloors]);

  const PropertyfacingArray = [
    "North",
    "South",
    "East",
    "West",
    "North-East",
    "North-West",
    "South-East",
    "South-West",
  ];

  const OverLookingViewArray = [
    "Park/Garden",
    "Club",
    "Pool",
    "Main Road",
    "Others",
  ];
  
  const transitionDuration = '0.3s'
  return (
    <>
      <div className="other-details-plot">


        <p className="Property-Details-heading"> Other Details </p>
        <div className="form-group">
          <label htmlFor="constructor-allowed"> Construction Allowed*</label>
          <input
           style={{transitionDuration}}
           className={` ${Error.ConstructionAllowed? 'inputShake shake' : ''}`}
            type="text"
            id="constructor-allowed"
            placeholder="eg., 3 Floors"
            required
            value={OtherDetailsData.ConstructionAllowed || ""}
            onChange={(e) => {
              setOtherDetailsData({
                ...OtherDetailsData,
                ConstructionAllowed: e.target.value,
              });
            }}
          />
        </div>

        {/* Plot Direction   */}

        <div className="fom-group">
          <p className="label">Plot Direction *</p>

          <div className="tab-box">
            {PropertyfacingArray.map((text, i) => {
              return (
                <div
                style={{transitionDuration}}
                  key={i}
                  className={`tab ${
                    OtherDetailsData.PlotDirection === text ? "select" : ""
                  }  ${Error.PlotDirection? 'inputShake shake' : ''} `}
                  onClick={() => {
                    setOtherDetailsData({
                      ...OtherDetailsData,
                      PlotDirection: text,
                    });
                  }}
                >
                  {text}
                  <img
                      loading="lazy"
                    alt=""
                    src={
                      OtherDetailsData.PlotDirection === text
                        ? "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/white-tick.svg"
                        : "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/plus-create.svg"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* PlotOver  Facing */}

        <div className="fom-group">
          <p className="label"> Plot Facing to*</p>

          <div className="tab-box">
            {OverLookingViewArray.map((text, i) => {
              return (
                <div
                style={{transitionDuration}}
                  key={i}
                  className={`tab ${
                    OtherDetailsData.PlotFacing === text ? "select" : ""
                  }  ${Error.PlotFacing? 'inputShake shake' : ''}`}
                  onClick={() => {
                    setOtherDetailsData({
                      ...OtherDetailsData,
                      PlotFacing: text,
                    });
                  }}
                >
                  {text}
                  <img
                      loading="lazy"
                    alt=""
                    src={
                      OtherDetailsData.PlotFacing === text
                        ? "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/white-tick.svg"
                        : "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/plus-create.svg"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Width of Front Road* only in mt */}

        {/* Front Rod Width  */}
        <div className="form-group">
          <label htmlFor="front-road-width">
            {" "}
            Width of Front Road* only in mtr
          </label>
          <input
           style={{transitionDuration}}
className={` ${Error.FrontRoadWidth? 'inputShake shake' : ''}`}
            type="text"
            id="front-road-width"
            placeholder="eg., 3 Floors"
            // required
            value={OtherDetailsData.FrontRoadWidth || ""}
            onChange={(e) => {
              setOtherDetailsData({
                ...OtherDetailsData,
                FrontRoadWidth: e.target.value,
              });
            }}
          />
        </div>
      </div>
    </>
  );
}
