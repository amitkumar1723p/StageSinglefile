import React, { useState } from "react";
import "./PropertySection.css";
import { useNavigate } from "react-router-dom";

// Define our property categories with unique colors
const propertyCategories = [
  {
    id: "trending",
    label: "Trending Properties",
    icon: <img src="/img/fire.svg" alt="Trending" />,
    content: "Discover our most viewed and popular properties this week.",
    color: "#ff2323", // red
    properties: [
      {
        title: "3 BHK Apartment",
        location: "DLF The Primus, Sector 82, Gurgaon",
        price: "₹1.3 Cr | 1700 Sq Ft",
        status: "Ready to Move",
        statusColor: "green",
        imageUrl: "https://storage.googleapis.com/a1aa/image/qYWDGAOUOeOdLr7nJlE9ZKR8iBPXeCJ56AmevOwQnT4.jpg",
        altText: "Living room with modern furniture and staircase"
      },
      {
        title: "4 BHK Apartment",
        location: "Tata Primanti, Sector 72, Gurgaon",
        price: "₹2.8 Cr | 2400 Sq Ft",
        status: "Vacant",
        statusColor: "red",
        imageUrl: "https://storage.googleapis.com/a1aa/image/3zRX_NMk0ayNzFl4-2ld9Rh0Srt2_tqrK8weoae3lP8.jpg",
        altText: "Modern dining area with white furniture"
      },
      {
        title: "4 BHK Villa",
        location: "M3M Golf Estate, Sector 65, Gurgaon",
        price: "₹2.5 Cr | 2500 Sq Ft",
        status: "Vacant",
        statusColor: "red",
        imageUrl: "https://storage.googleapis.com/a1aa/image/PprD21uf9uIxHSJTkie3gik4T4DzfCWMTbwJDlkEMJU.jpg",
        altText: "Spacious kitchen with white cabinets"
      },
      {
        title: "2 BHK Builder Floor",
        location: "Godrej Meridian, Sector 106, Gurgaon",
        price: "₹85 Lakh | 1200 Sq Ft",
        status: "Under Construction",
        statusColor: "yellow",
        imageUrl: "https://storage.googleapis.com/a1aa/image/4_9KkSqeXQ_AGruEA0ooGdn7vo6eAWOiAyDC92AHJhk.jpg",
        altText: "Cozy living room with green plants"
      },
      {
        title: "2 BHK Builder Floor",
        location: "Godrej Meridian, Sector 106, Gurgaon",
        price: "₹85 Lakh | 1200 Sq Ft",
        status: "Under Construction",
        statusColor: "yellow",
        imageUrl: "https://storage.googleapis.com/a1aa/image/EUDO7sDr5xklzx9nJb42qmWdWQ5wdqZ-jA-oPu_oJok.jpg",
        altText: "Cozy living room with green plants"
      }
    ]
  },
  {
    id: "hot",
    label: "Hot Properties",
    icon: <img src="/img/star.svg" alt="Hot" />,
    content: "New listings that are getting a lot of attention from buyers.",
    color: "#ff7f00", // orange
    properties: []
  },
  {
    id: "recommended",
    label: "Recommended Properties",
    icon: <img src="/img/thumb-up.svg" alt="Recommended" />,
    content: "Properties we think you'll love based on your preferences.",
    color: "#39c22e", // Green
    properties: []
  },
  {
    id: "affordable",
    label: "Affordable Properties",
    icon: <img src="/img/rupee.svg" alt="Affordable" />,
    content: "Great value properties that won't break your budget.",
    color: "#2196F3", // Blue
    properties: []
  },
  {
    id: "luxurious",
    label: "Luxurious Property",
    icon: <img src="/img/crown.svg" alt="Luxurious" />,
    content: "Premium properties with high-end finishes and amenities.",
    color: "#d247ea", // Purple
    properties: []
  }
];

const PropertySection = () => {
  // State to track which category is active
  const [activeCategory, setActiveCategory] = useState("trending");
  const navigate = useNavigate();
  const scrollRight = () => {
    document.querySelector('.scroll-container').scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  };

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
                <button className="view-btn" onClick={()=>navigate("/all-post")}>
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
            {propertyCategories.map((category) => (
              <div
                key={category.id}
                className={`category-content ${activeCategory === category.id ? "visible" : "hidden"}`}
              >
                <div className="container">
                  <div className="scroll-container">
                    {category.properties.map((property, index) => (
                      <div className="property-cards" key={index}>
                        <img
                          src={property.imageUrl}
                          alt={property.altText}
                          className="card-image"
                        />
                        <div className="card-content">
                          <h3 className="card-title">{property.title}</h3>
                          <p className="card-location">{property.location}</p>
                          <p className="card-price" >{property.price}</p>
                          <p className={`card-status ${property.statusColor}`}>{property.status}</p>
                          <button className="card-button"><span className="view-details-text">View Details</span></button>
                        </div>
                      </div>
                    ))}
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertySection;