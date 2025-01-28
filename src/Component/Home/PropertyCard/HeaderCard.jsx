import React, { useEffect, useState } from "react";
import "./HeaderCard.css";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const HeaderCard = () => {
  const { data, loading } = useSelector((state) => {
    return state.SingleProjectName;
  });
  const dispatch = useDispatch();
  const [HeaderCardData, setHeaderCardData] = useState(undefined);

  // eslint-disable-next-line
  const [querry, setquerry] = useSearchParams();

  // useEffect(() => {
  //   let projectname = { ProjectName: querry.get("Search").trim() };

  //   dispatch(GetSingleProjectNameDataAction(projectname));
  // }, []);

  useEffect(() => {
    if (data) {
      if (data.success === true) {
        setHeaderCardData(data.SingleProjectName);
      }
    }

    //  setHeaderCardData()
  }, [data]);

  return (
    <>
      {HeaderCardData && (
        <>
          <div className="header-card">
            <div className="header-card-gallery">
              <img
                src="/img/high-rise.jpg"
                alt="Tower-Image-1"
                className="header-card-gallery-image"
              />
              {/* <div className="header-img-box">
                  <img
                    src="/img/dlf2.jpg"
                    alt="Tower-Image-2"
                    className="header-card2-gallery-image"
                  />
                  <img
                    src="/img/dlf3.jpeg"
                    alt="Tower-Image-3"
                    className="header-card2-gallery-image"
                  />
                </div> */}
            </div>

            <div className="header-main-data">
              <div className="header-card-title-section">
                <h2 className="header-card-title">
                  {HeaderCardData["Project Name"]} 
                </h2>
                <p className="header-card-location">
                  {HeaderCardData["Sector"]}, {HeaderCardData["City"]}
                </p>
              </div>

              <div className="header-card-info-grid">
                <div className="header-card-info-item">
                  <p className="header-card-info-label">Project Status </p>
                  <p className="header-card-info-value">
                    {HeaderCardData["Project Status"]}
                  </p>
                </div>
                <div className="header-card-info-item">
                  <p className="header-card-info-label">Project Type </p>
                  <p className="header-card-info-value">
                    {HeaderCardData["Segment"]}
                  </p>
                </div>

                <div className="header-card-info-item">
                  <p className="header-card-info-label">Configuration</p>
                  <p className="header-card-info-value">
                    {HeaderCardData["Apartment Type"]}
                  </p>
                </div>

                <div className="header-card-info-item">
                  <p className="header-card-info-label">Total Tower</p>
                  <p className="header-card-info-value">
                    {HeaderCardData["Total Tower"]}
                  </p>
                </div>
                <div className="header-card-info-item">
                  <p className="header-card-info-label">Total Land Area</p>
                  <p className="header-card-info-value">
                    {HeaderCardData["Total Land Area"]}
                  </p>
                </div>
                <div className="header-card-info-item">
                  <p className="header-card-info-label"> Total Units</p>
                  <p className="header-card-info-value">
                    {" "}
                    {HeaderCardData["Total Units"]}
                  </p>
                </div>
                {/* <div className="header-card-info-item">
                    <p className="header-card-info-label">Tower Floor</p>
                    <p className="header-card-info-value">22 Floor</p>
                  </div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HeaderCard;
