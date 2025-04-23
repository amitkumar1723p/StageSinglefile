import React, { useEffect, useState } from "react";
import "./PropertySection.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import PricingDetails from "../Post/CreatePost/PricingDetails";
import { getPostsByAddress } from "../../Action/postAction";

// Define our property categories with unique colors

const PropertySection = () => {
  // State to track which category is active
  const handleRippleEffect = (e) => {
    const button = e.currentTarget;
    if (button.querySelector(".ripple")) return; // Prevent multiple ripples

    const ripple = document.createElement("span");
    const size = Math.max(button.offsetWidth, button.offsetHeight);
    const rect = button.getBoundingClientRect();

    ripple.classList.add("ripple");
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };
  const [todisplay, settodisplay] = useState();
  const [filterdData, setFilterdData] = useState([]);
  const [areas, setAreas] = useState(0);
  // const [loading,setLoading]=useState(false);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: allProperties, loading } = useSelector(
    (store) => store.postByAddress
  );
  const navigate = useNavigate();
  const scrollRight = () => {
    document.querySelector(".scroll-container").scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };
  // useEffect(() => {
  //   console.log(allProperties)
  //   if(!allProperties){
  //     dispatch(getPostsByAddress());
  //   }
  // }, []);

  useEffect(() => {
    if (allProperties?.properties?.length > 0) {
      // Step 1: Filter only 'Sale' properties
      const saleProperties = allProperties?.properties.filter(
        (post) => post?.BasicDetails?.PropertyAdType === "Sale"
      );

      // Step 2: Create a formatted result combining Landmark and City
      const formattedResults = saleProperties.map((post) => {
        const { LocationDetails } = post;
        return {
          area: `${LocationDetails?.Landmark}, ${LocationDetails?.City}`,
          post,
        };
      });

      // Step 3: Group by the area (Landmark, City combination)
      const groupedByArea = formattedResults.reduce((acc, { area, post }) => {
        if (!acc[area]) {
          acc[area] = [];
        }
        acc[area].push(post);
        return acc;
      }, {});

      // Step 4: Create an object with the area as the key and an array of properties for each area
      const result = Object.keys(groupedByArea).map((area) => ({
        areaName: area,
        properties: groupedByArea[area],
      }));

      // Step 5: Sort by number of properties in descending order
      result.sort((a, b) => b.properties.length - a.properties.length);
      // console.log(result)
      // Step 6: Set the filtered and sorted data
      setFilterdData(result);

      // Step 7: Set the first (largest) area as default display, if available
      if (result.length > 0) {
        settodisplay(result[0]);
      }
    }
  }, [allProperties]);

  // const { data: propertyByAdress, loading } = useSelector((store) => store.postByAddress)

  const scrollLeft = () => {
    document.querySelector(".scroll-container").scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollAreaRight = () => {
    document.querySelector(".filter-buttons").scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  const scrollAreaLeft = () => {
    document.querySelector(".filter-buttons").scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  // console.log(propertyByAdress)
  const formatReservePrice = (price) => {
    if (!price) {
      return;
    }
    if (price >= 10000000) {
      const value = Math.floor(price / 100000) / 100;
      return `₹ ${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)} Cr`;
    } else if (price >= 100000) {
      const value = Math.floor(price / 1000) / 100;
      return `₹ ${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)} L`;
    } else if (price >= 1000) {
      const value = Math.floor(price / 10) / 100;
      return `₹ ${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)} K`;
    } else {
      return `₹ ${price.toFixed(2)}`;
    }
  };
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <div className="Property-section-main-container">
        <div className="property-filter-container">
          <div className="property-section-container">
            <div className="property-heading-btn">
              <div className="property-heading">
                <h2 className="property-section-h2">
                  Find Your Dream Home Today!
                </h2>
                <h3 className="property-section-h3">
                  Handpicked properties that match your needs – from trending to
                  luxurious, all in one place.
                </h3>
              </div>
              <div className="property-btn">
                <button
                  className="view-btn"
                  onClick={() => navigate("/all-post/Sale")}
                >
                  <span className="view-btn-span">
                    View All Properties{" "}
                    <img src="/img/right-arrow.svg" alt="" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="area-buttons">
            <button
              className="scroll-button-area left"
              onClick={scrollAreaLeft}
            >
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <div className="filter-buttons">
              {filterdData?.map((area, ind) => {
                return (
                  <>
                    <button
                      key={ind}
                      onClick={() => {
                        settodisplay(filterdData[ind]);
                        setAreas(ind);
                      }}
                      className={`filter-button ${
                        areas === ind ? "chooesd-area" : ""
                      } `}
                    >
                      <span className="button-span">{area.areaName}</span>
                    </button>
                  </>
                );
              })}
            </div>

            <button
              className="scroll-button-area right"
              onClick={scrollAreaRight}
            >
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Content section */}
          <div className="content-section">
            <div className={`category-content `}>
              <div className="container">
                <div className="scroll-container">
                  {loading ? (
                    // Skeleton loader
                    Array.from({ length: 4 }).map((_, index) => (
                      <div
                        className="property-section-card-skeleton"
                        key={index}
                      >
                        <div className="property-section-card-image-skeleton"></div>
                        <div className="property-section-card-content-skeleton">
                          <div className="property-section-card-title-skeleton"></div>
                          <div className="property-section-card-location-skeleton"></div>
                          <div className="property-section-card-price-skeleton"></div>
                          <div className="property-section-card-button-skeleton"></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      {todisplay?.properties?.map((property, index) => {
                        return (
                          property?.BasicDetails?.PropertyAdType === "Sale" && (
                            <div className="property-cards" key={index}>
                              <img
                                src={property?.PropertyImages[0]?.url}
                                // alt={property.altText}
                                className="card-image"
                              />
                              <div className="card-content">
                                <h2 className="card-title-projectname">
                                  {property?.LocationDetails?.ProjectName}
                                </h2>
                                <h3 className="card-title property-truncate-text">
                                  {property?.PropertyDetails?.BHKType} BHK{" "}
                                  {property?.BasicDetails?.PropertyType}{" "}
                                  {property?.BasicDetails?.ApartmentType}
                                </h3>
                                <p className="card-location">
                                  {property?.LocationDetails?.Landmark}{" "}
                                  {property?.LocationDetails?.Locality}
                                </p>
                                <p className="card-price">
                                  {" "}
                                  {formatReservePrice(
                                    property?.PricingDetails?.ExpectedPrice
                                  ) ||
                                    formatReservePrice(
                                      property?.PricingDetails?.ExpectedRent
                                    )}{" "}
                                  |{" "}
                                  <span className="property-section-sqft">
                                    {String(
                                      property?.PricingDetails?.PricePerSqFt ||
                                        property?.PricingDetails?.PricePerSqYd
                                    ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}

                                    {property?.AreaDetails?.BuiltUpArea?.unit ||
                                      " Sq yard"}
                                  </span>
                                </p>

                                <p className={`card-status   `}>
                                  Status :{" "}
                                  <span
                                    className={`card-status ${
                                      property?.BasicDetails?.PropertyStatus ===
                                      "Ready to move"
                                        ? "property-section-status"
                                        : "property-section-nodata"
                                    }  `}
                                  >
                                    {property?.BasicDetails?.PropertyStatus}{" "}
                                    {property?.BasicDetails?.PropertyStatus !==
                                      "Ready to move" && (
                                      <>
                                        {
                                          property?.BasicDetails
                                            ?.CurrentPropertyStatus
                                        }
                                      </>
                                    )}{" "}
                                  </span>{" "}
                                </p>

                                {property?.BasicDetails?.AvailableFrom && (
                                  <p
                                    className={`card-status ${property.statusColor}`}
                                  >
                                    <span className="card-location">
                                      Avialiable from
                                    </span>{" "}
                                    {new Date(
                                      property?.BasicDetails?.AvailableFrom
                                    ).getDate()}
                                    -
                                    {new Date(
                                      property?.BasicDetails?.AvailableFrom
                                    ).getMonth() + 1}
                                    -
                                    {new Date(
                                      property?.BasicDetails?.AvailableFrom
                                    ).getFullYear()}
                                  </p>
                                )}

                                <button
                                  // onMouseEnter={handleRippleEffect}
                                  onClick={() => {
                                    const link = `${
                                      property?.PropertyDetails?.BHKType
                                        ? `${property?.PropertyDetails?.BHKType} BHK`
                                        : ""
                                    } ${
                                      property?.BasicDetails?.ApartmentType
                                    } For ${
                                      property?.BasicDetails?.PropertyAdType
                                    } In ${
                                      property?.LocationDetails?.Landmark
                                    } ${property?.LocationDetails?.City}`;

                                    navigate(
                                      `/post-detail/${link
                                        .toLowerCase()
                                        .replaceAll(" ", "-")
                                        .replace(",", "")
                                        .replaceAll("/", "-")}-${property?._id}`
                                    );
                                  }}
                                  className="card-button btn-ripple"
                                >
                                  <span className="view-details-text">
                                    View Details
                                  </span>
                                </button>
                              </div>
                            </div>
                          )
                        );
                      })}
                    </>
                  )}
                </div>

                <button className="scroll-button left" onClick={scrollLeft}>
                  <svg
                    className="icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
                <button className="scroll-button right" onClick={scrollRight}>
                  <svg
                    className="icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertySection;
