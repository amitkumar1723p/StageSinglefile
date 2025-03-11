import React, { useState } from "react";
import "./PropertySection.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Define our property categories with unique colors

const PropertySection = () => {
  // State to track which category is active
  const [activeCategory, setActiveCategory] = useState("trending");
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const scrollRight = () => {
    document.querySelector('.scroll-container').scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  };

  const { data: propertyByAdress, loading } = useSelector((store) => store.postByAddress)
  const scrollLeft = () => {
    document.querySelector('.scroll-container').scrollBy({
      left: -300,
      behavior: 'smooth'
    });
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
                <h2 className="property-section-h2">Find Your Dream Home Today!</h2>
                <h3 className="property-section-h3">Handpicked properties that match your needs – from trending to luxurious, all in one place.</h3>
              </div>
              <div className="property-btn">
                <button className="view-btn" onClick={() => navigate("/all-post")}>
                  <span className="view-btn-span">View All Properties <img src="/img/right-arrow.svg" alt="" /></span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          {/* <div className="filter-buttons">
            {propertyCategories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`filter-button ${isActive ? "active" : ""}`}
                  style={
                    isActive
                      ? {
                          backgroundColor: category.color,
                          borderColor: category.color,
                          color: "white",
                        }
                      : {}
                  }
                >
                  <span className="button-icon">{category.icon}</span>
                  <span className="button-span"> {category.label}</span>
                </button>
              );
            })}
          </div> */}
          <div className="filter-buttons">

            <button

              className={`filter-button `}

            >
              <span className="button-icon"><img src="/img/crown.svg" alt="Luxurious" /></span>
              <span className="button-span">new gurgaon</span>
            </button>

          </div>

          {/* Content section */}
          <div className="content-section">

            <div className={`category-content `}>
              <div className="container">
                <div className="scroll-container">
{
  loading ? (
    // Skeleton loader
    Array.from({ length: 4 }).map((_, index) => (
      <div className="property-section-card-skeleton" key={index}>
        <div className="property-section-card-image-skeleton"></div>
        <div className="property-section-card-content-skeleton">
          <div className="property-section-card-title-skeleton"></div>
          <div className="property-section-card-location-skeleton"></div>
          <div className="property-section-card-price-skeleton"></div>
          <div className="property-section-card-button-skeleton"></div>
        </div>
      </div>
    ))
  ) :
  <>
  
  {propertyByAdress?.properties?.map((property, index) => (
    <div className="property-cards" key={index}>
      <img
        src={property?.PropertyImages[0]?.url}
        // alt={property.altText}
        className="card-image"
      />
      <div className="card-content">
        <h3 className="card-title">{property?.PropertyDetails?.BHKType} BHK {property?.BasicDetails?.PropertyType} {property?.BasicDetails?.ApartmentType}</h3>
        <p className="card-location">{property?.LocationDetails?.Landmark} {property?.LocationDetails?.Locality}</p>
        <p className="card-price" > ₹{property?.PricingDetails?.ExpectedPrice || property?.PricingDetails?.ExpectedRent} |  {property?.AreaDetails?.BuiltUpArea?.value} {property?.AreaDetails?.BuiltUpArea?.unit}</p>


        <p className={`card-status ${property.statusColor}`}>{property?.BasicDetails?.PropertyStatus}</p>


        {
          property?.BasicDetails?.AvailableFrom && <p className={`card-status ${property.statusColor}`}>
            <span className="card-location">Avialiable from</span> {new Date(
              property?.BasicDetails?.AvailableFrom
            ).getDate()}-{new Date(
              property?.BasicDetails?.AvailableFrom
            ).getMonth() + 1
            }-{new Date(
              property?.BasicDetails?.AvailableFrom
            ).getFullYear()}</p>
        }


        <button onClick={
          () => {
            const link = `${property?.PropertyDetails?.BHKType ? `${property?.PropertyDetails?.BHKType} BHK` : ""} ${property?.BasicDetails?.ApartmentType} For ${property?.BasicDetails?.PropertyAdType} In ${property?.LocationDetails?.Landmark} ${property?.LocationDetails?.City}`


            navigate(
              `/post-detail/${link.toLowerCase()
                .replaceAll(" ", "-")
                .replace(",", "")
                .replaceAll("/", "-")}-${property?._id}`)

          }
        } className="card-button"><span className="view-details-text">View Details</span></button>

      </div>
    </div>
  ))}
  </>
}

                </div>
                <button className="scroll-button left" onClick={scrollLeft}>
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button className="scroll-button right" onClick={scrollRight}>
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
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