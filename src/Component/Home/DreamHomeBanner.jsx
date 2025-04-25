import React from "react";
import "./DreamHomeBanner.css"; // If you have custom styles for the banner




const DreamHomeBanner = () => {
  return (
    <div className="">
      <img
       loading="lazy"
        src="/img/Contactus.png"
        alt="Dream Home Banner"
        className="dream-home-banner-image"
      />

      
      {/* <div className="dream-home-banner-content">
        <h1>Your Dream Home Awaits</h1>
        <p>Find your perfect home with us today!</p>
        <button className="explore-button">Explore Now</button>
      </div> */}
    </div>
  );
};

export default DreamHomeBanner;
