import React, { useEffect, useState } from "react";

export default function FloorDetails({
  FloorDetailsData,
  setFloorDetailsData,
  BasicDetailsData,
  Error,
}) {
  const [floorCount, setFloorCount] = useState([]);

  // useEffect(() => {
  //   const FloorDetailsDataCopy = { ...FloorDetailsData };
  //   if (FloorDetailsData.TotalFloors) {
  //     let count = [];
  //     for (let i = 1; i <= FloorDetailsData.TotalFloors; i++) {
  //       count.push(i);
  //     }
  //     setFloorCount(count);
  //   } else {
  //     if (
  //       [
  //         "Apartment",
  //         "Independent/Builder Floor",
  //         // "1 RK/Studio Apartment",
  //         "Studio Apartment",
  //         "1 RK/PG",
  //         "Serviced Apartment",
  //       ].includes(BasicDetailsData.ApartmentType)
  //     ) {
  //       // const FloorDetailsDataCopy = {...FloorDetailsData}

  //       // setFloorDetailsData({
  //       //   ...FloorDetailsData,
  //       //   PropertyOnFloor: "",
  //       // });

  //       FloorDetailsDataCopy.PropertyOnFloor = "";
  //     }

  //     setFloorCount([]);
  //   }
  //   if (
  //     !FloorDetailsDataCopy?.OverLookingView ||
  //     !Array.isArray(FloorDetailsDataCopy?.OverLookingView)
  //   ) {
  //     FloorDetailsDataCopy.OverLookingView = [];
  //   }
  //   setFloorDetailsData(FloorDetailsDataCopy);
  //   // eslint-disable-next-line
  // }, [FloorDetailsData.TotalFloors]);

  // useEffect(() => {
  //   setFloorDetailsData((prevData) => ({
  //     ...prevData,
  //     OverLookingView: prevData.OverLookingView || [],
  //   }));
  //   // eslint-disable-next-line
  // }, []);




  useEffect(() => {
    setFloorDetailsData((prevData) => {
      let updatedData = { ...prevData };
  
      if (!Array.isArray(updatedData.OverLookingView)) {
        updatedData.OverLookingView = [];
      }
  
      if (
        !prevData.TotalFloors &&
        ["Apartment", "Independent/Builder Floor", "Studio Apartment", "1 RK/PG", "Serviced Apartment"].includes(BasicDetailsData.ApartmentType)
      ) {
        updatedData.PropertyOnFloor = "";
      }
  
      return updatedData;
    });
  
    // Set floor count separately to avoid conflicts
    if (FloorDetailsData.TotalFloors) {
      setFloorCount(Array.from({ length: FloorDetailsData.TotalFloors }, (_, i) => i + 1));
    } else {
      setFloorCount([]);
    }
  }, [FloorDetailsData.TotalFloors, BasicDetailsData.ApartmentType]);
  
  
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

  return (
    <>
      <p className="Property-Details-heading">Floor Details</p>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="total-floors">Total Floors*</label>
          <input
            className={` ${Error.TotalFloors ? "inputShake shake" : ""}`}
            type="text"
            id="total-floors"
            required
            placeholder="Total Floors"
            value={FloorDetailsData.TotalFloors || ""}
            onChange={(e) => {
              const regex = /^[1-9][0-9]*$/;
              let test = regex.test(e.target.value);
              // eslint-disable-next-line
              if (e.target.value == "" || test) {
                if (e.target.value <= 50) {
                  setFloorDetailsData({
                    ...FloorDetailsData,
                    TotalFloors: e.target.value,
                  });
                }
              }
            }}
          />
        </div>

        {[
          "Apartment",
          "Independent/Builder Floor",
          // "1 RK/Studio Apartment",
          "Studio Apartment",
          "1 RK/PG",
          "Serviced Apartment",
        ].includes(BasicDetailsData.ApartmentType) && (
          <div className="form-group">
            
            <label htmlFor="floor">Property on Floor*</label>
            <select
              className={`date-time-lable ${
                Error.PropertyOnFloor ? "inputShake shake" : ""
              }`}
              id="floor"
              required
              value={FloorDetailsData.PropertyOnFloor || ""}
              onChange={(e) => {
                setFloorDetailsData({
                  ...FloorDetailsData,
                  PropertyOnFloor: e.target.value,
                });
              }}
            >
              <option value="">Select</option>
              {floorCount.length > 0 && (
                <>
                  {" "}
                  <option value="Basement"> Basement</option>
                  <option value="Lower Ground">Lower Ground</option>
                  <option value="Ground">Ground</option>
                </>
              )}

              {floorCount.map((e, i) => {
                return (
                  <option key={i} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>

      <div className="fom-group">
        <p className="Property-Details-heading">Property Direction *</p>

        <div className="tab-box">
          {PropertyfacingArray.map((text, i) => {
            return (
              <div
                key={i}
                className={`tab ${
                  FloorDetailsData.PropertyDirection === text ? "select" : ""
                } ${Error.PropertyDirection ? "inputShake shake" : ""} `}
                onClick={() => {
                  setFloorDetailsData({
                    ...FloorDetailsData,
                    PropertyDirection: text,
                  });
                }}
              >
                {text}
                <img
                  alt=""
                  src={
                    FloorDetailsData.PropertyDirection === text
                      ? "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/white-tick.svg"
                      : "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/plus-create.svg"
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Plot Facting  */}

      <div className="fom-group">
        <p className="label"> Over Looking View *</p>
        {/* View from Balcony */}
        <div className="tab-box">
          {/* {OverLookingViewArray.map((text, i) => {
            return (
              <div
                key={i}
                className={`tab ${
                  FloorDetailsData.OverLookingView === text ? "select" : ""
                }`}
                onClick={() => {
                  setFloorDetailsData({
                    ...FloorDetailsData,
                    OverLookingView: text,
                  });
                }}
              >
                {text}
                <img
                alt=""
                  src={
                    FloorDetailsData.OverLookingView === text
                      ? "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/white-tick.svg"
                      : "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/plus-create.svg"
                  }
                />
              </div>
            );
          })} */}

          {OverLookingViewArray.map((text, i) => {
            return (
              <div
                key={i}
                className={`tab ${
                  FloorDetailsData.OverLookingView?.includes(text)
                    ? "select"
                    : ""
                } ${Error.OverLookingView ? "inputShake shake" : ""}
      `}
                onClick={() => {
                  if (!FloorDetailsData.OverLookingView?.includes(text)) {
                    setFloorDetailsData({
                      ...FloorDetailsData,
                      OverLookingView: [
                        ...FloorDetailsData.OverLookingView,
                        text,
                      ],
                    });
                  }
                  if (FloorDetailsData.OverLookingView?.includes(text)) {
                    setFloorDetailsData({
                      ...FloorDetailsData,
                      OverLookingView: FloorDetailsData.OverLookingView?.filter(
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
                    FloorDetailsData.OverLookingView?.includes(text)
                      ? "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/white-tick.svg"
                      : "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/plus-create.svg"
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

{
  /* <div className="tab-box">
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
              ? "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/white-tick.svg"
              : "https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/plus-create.svg"
          }
        />
      </div>
    );
  }
)}
</div> */
}
