 

export default function ConstructionDetails({
  ConstructionDetailsData,
  setConstructionDetailsData,
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

  return (
    <>
      <div className="form-group">
        <label htmlFor="floors">Floor Allowed for Construction </label>
        <input
          type="number"
          id="floors"
          placeholder="No. of Floors"
          required
          value={ConstructionDetailsData.ConstructionAllowed || ""}
          onChange={(e) => {
            if (e.target.value.length <= 2) {
              setConstructionDetailsData({
                ...ConstructionDetailsData,
                ConstructionAllowed: e.target.value,
              });
            }
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
                key={i}
                className={`tab ${
                  ConstructionDetailsData.PlotDirection === text ? "select" : ""
                }`}
                onClick={() => {
                  setConstructionDetailsData({
                    ...ConstructionDetailsData,
                    PlotDirection: text,
                  });
                }}
              >
                {text}
                <img
                 alt=""
                  src={
                    
                    ConstructionDetailsData.PlotDirection === text
                      ? "/img/white-tick.svg"
                      : "/img/plus-create.svg"
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* PlotOverlooking */}

      <div className="fom-group">
        <p className="label"> Plot Overlooking to*</p>

        <div className="tab-box">
          {OverLookingViewArray.map((text, i) => {
            return (
              <div
                key={i}
                className={`tab ${
                  ConstructionDetailsData.PlotOverlooking === text
                    ? "select"
                    : ""
                }`}
                onClick={() => {
                  setConstructionDetailsData({
                    ...ConstructionDetailsData,
                    PlotOverlooking: text,
                  });
                }}
              >
                {text}
                <img
                alt=""
                  src={
                    ConstructionDetailsData.PlotOverlooking === text
                      ? "/img/white-tick.svg"
                      : "/img/plus-create.svg"
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
