import React from 'react'
import { useState } from 'react'
export default function SingleFreshBookingAmenities({project , amenitiesContent}) {

    
  // const amenities = {
  //    GYM: "/img/dumbel-amenities.png", name: "Gymnasium" ,
  //    icon: "/img/swimmer-amenities.png", name: "Swimming Pool" ,
  //    icon: "/img/teddy-amenities.png", name: "Kids Play Area" ,
  //    icon: "/img/lotus-amenities.png", name: "Garden" ,
  //    icon: "/img/car-amenities.png", name: "Parking" ,
  //    icon: "/img/power-amenities.png", name: "Power" ,
  //    icon: "/img/bar-amenities.png", name: "Club" ,
  //    icon: "/img/lotus-amenities.png", name: "Garden" ,
  //    icon: "/img/car-amenities.png", name: "Parking" ,
  //    icon: "/img/power-amenities.png", name: "Power" ,
  //    icon: "/img/bar-amenities.png", name: "Club" ,
  //    icon: "/img/lotus-amenities.png", name: "Garden" 
  // };
  const amenities = {
    GYM: "/img/dumbel-amenities.png", name: "Gymnasium" ,
    SwimmingPool: "/img/swimmer-amenities.png", name: "Swimming Pool" ,
    KidsPlayArea: "/img/teddy-amenities.png", name: "Kids Play Area" ,
    Park: "/img/lotus-amenities.png", name: "Garden" ,
    VisitorParking: "/img/car-amenities.png", name: "Parking" ,
    IntercomFacility: "/img/power-amenities.png", name: "Power" ,
    JoggingTrack: "/img/bar-amenities.png", name: "Club" ,
    ClubHouse: "/img/lotus-amenities.png", name: "Garden" ,
    WasteDisposal: "/img/car-amenities.png", name: "Parking" ,
    SecurityGuard: "/img/bar-amenities.png", name: "Club" ,
    ConferenceRoom: "/img/lotus-amenities.png", name: "Garden" 
  };

  return (
  <>

  <style>
  {`.hover-effect {
    background-color: #1D3557;
    padding: 15px;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    border-left: 4px solid #1D3557;
    border-bottom: 4px solid #1D3557;
    border-bottom-left-radius: 12px;   
    border-bottom-right-radius: 0 !important; 
  }

  .hover-effect:hover {
    background-color:rgb(6, 59, 111) !important; /* Change background to blue */
    padding: 20px !important; /* Increase padding */
    border-radius: 12px !important; /* Adjust rounding */
  }

  .hover-effect:hover .amenity-icon {
    filter: brightness(0) invert(1); /* Change SVG color to white */
  }

  .hover-effect:hover .amenity-text {
    color: white !important; /* Change text color to white */
  }`}
  </style>
  <div className="container mt-5 mb-5">
  <h3 className="mb-3 Single-fresh-facilities">Project Facilities</h3>
  <h3 className="fw-bold mb-3 Single-fresh-amenities" style={{ color: '#1D3557' }}>
    {project?.projectName} Amenities
  </h3>
  <div className=" mt-4 mb-4 g-4 single-fresh-booking-amenities">
  {Array.isArray(amenitiesContent) &&
    amenitiesContent.map((item, index) => {
      const currentLogo = item.replace(/\s+/g, ""); 

      return (
        <div key={index} className=" d-flex " style={{width:'140px'}}>
          <div
            className="d-flex flex-column justify-content-between align-items-center text-center w-100 hover-effect Single-fresh-amenities-content"
            style={{
              height: "140px",
              padding: "20px",
              backgroundColor: "white",
              transition: "0.3s ease-in-out",
              cursor: "pointer",
            }}
          >
            <div className="icon-container">
              <img src={amenities[currentLogo] || ""} alt={item.name || ""} className="amenity-icon" style={{height:'30px', width:'auto'}} />
            </div>
            <p className="mt-2 mb-0 fw-medium amenity-text text-black">{item.name || item}</p>
          </div>
        </div>
      );
    })}
</div>
</div>

  </>
  )
}