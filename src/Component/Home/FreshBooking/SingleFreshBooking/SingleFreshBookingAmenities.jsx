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
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
 
    box-shadow:
    rgba(45, 35, 66, 0.2) 0 2px 4px,
    rgba(45, 35, 66, 0.15) 0 7px 13px -3px,
    #d6d6e7 0 -3px 0 inset;
  }
    .hover-effect:focus {
  box-shadow:
    #d6d6e7 0 0 0 1.5px inset,
    rgb(0, 0, 0) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px,
    #d6d6e7 0 -3px 0 inset;
}


 
  // .hover-effect:hover .amenity-icon {
  //   filter: brightness(10) invert(.5); /* Change SVG color to white */
  // }

  // .hover-effect:hover .amenity-text {
  //   color:rgba(153, 153, 153, 0.8) !important; /* Change text color to white */
  // }`}
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
        <div data-aos="flip-left" data-aos-duration="1800"  key={index} className=" single-fresh-booking-amenities-container d-flex " style={{width:'120px'}}>
          <div
            className="Single-fresh-amenities-content d-flex flex-column justify-content-between align-items-center text-center w-100 hover-effect "
            style={{
              height: "120px",
              padding: "10px",
              backgroundColor: "white",
              transition: "0.3s ease-in-out",
              cursor: "pointer",
            }}
          >
            <div className="icon-container">
              <img src={amenities[currentLogo] || ""} alt={item.name || ""} className="amenity-icon" style={{height:'30px', width:'auto'}} />
            </div>
            <p className="mt-2 mb-0 fw-medium  amenity-text text-black">{item.name || item}</p>
          </div>
        </div>
      );
    })}
</div>
</div>

  </>
  )
}