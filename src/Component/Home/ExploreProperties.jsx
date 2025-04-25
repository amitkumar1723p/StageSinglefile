import React from "react";
import "./ExploreProperties.css"; // Import the CSS file for styling

const ExploreProperties = () => {
  return (
    <div className="explore-container"> 
      <div className="explore-content">
        <h2 className="explore-heading">Explore Our Residential Properties</h2>
        <p className="explore-description">
          Discover an exceptional selection of residential properties, each one
          carefully chosen just for you.
        </p>
        <p className="explore-details">
          At PropFuture, we offer a diverse range of residential options,
          including
          <span>
            
            Independent Villas, Independent Houses, Individual Floors,
            Apartments, and Land/Plots.
          </span>
          Whether you're seeking a luxury home, a spacious family house, or an
          investment opportunity, we provide tailored solutions to suit every
          lifestyle and need. Let us help you find the perfect property that
          aligns with your vision.
        </p>
        <button className="explore-button">
          Explore Residential Properties
        </button>
      </div>
      <div className="explore-images">
        <div className="explore-image-item">
          <img
           loading="lazy"
            src="/img/individualfloor.png"
            alt="Individual Floor"
            className="explore-image"
          />
          {/* <div className="image-text">Individual Floor</div> */}
        </div>
        <div className="explore-image-item">
          <img
           loading="lazy"
            src="/img/independnet.png"
            alt="Independent House"
            className="explore-image"
          />
          {/* <div className="image-text">Independent House</div> */}
        </div>
        <div className="explore-image-item">
          <img
           loading="lazy"
            src="/img/villa.png"
            alt="Independent Villa"
            className="explore-image"
          />
          {/* <div className="image-text">Independent Villa</div> */}
        </div>
        <div className="explore-image-item large">
          <img
           loading="lazy"
            src="/img/apartment.png"
            alt="Apartment"
            className="explore-image"
          />
          {/* <div className="image-text">Apartment</div> */}
        </div>
        <div className="explore-image-item large">
          <img
           loading="lazy"
            src="/img/land-plot.png"
            alt="Land/Plot"
            className="explore-image"
          />
          {/* <div className="image-text">Land/Plot</div> */}
        </div>
      </div>
    </div>
  );
};

export default ExploreProperties;
