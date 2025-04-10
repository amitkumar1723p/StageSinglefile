import React from 'react'

export default function SingleFreshBookingNewAmenities({project , amenitiesContent}) {


    const amenities = {
        GYM: "/img/FreshAmenities/Gym.jpg", name: "Gym" ,
        SwimmingPool: "/img/FreshAmenities/swiiming_pool.png", name: "Swimming Pool" ,
        KidsPlayArea: "/img/FreshAmenities/Kids_playarea.jpg", name: "Kids Play Area" ,
        Park: "/img/FreshAmenities/park.jpg", name: "park" ,
        VisitorParking: "/img/FreshAmenities/visitor_parking.jpg", name: "Visitor Parking" ,
        IntercomFacility: "/img/FreshAmenities/", name: "Power" ,
        JoggingTrack: "/img/FreshAmenities/jogging_track.jpg", name: "jogging" ,
        ClubHouse: "/img/FreshAmenities/Club_house.jpg", name: "Club" ,
        WasteDisposal: "/img/FreshAmenities/", name: "Parking" ,
        SecurityGuard: "/img/FreshAmenities/Security_guard.png", name: "SecurityGuard" ,
        ConferenceRoom: "/img/FreshAmenities/Conference_room.jpg", name: "Garden",
        Lift: "/img/FreshAmenities/", name: "Lift",
        CafeteriaFoodCourt:"/img/FreshAmenities/", name: "food-court",
        CommunityCentre:"/img/FreshAmenities/Community_Center.png", name: "community-center",
        MaintenanceStaff:"/img/FreshAmenities/Maintainance_Staff.jpg", name: "staff",
        ATMs:"/img/FreshAmenities/ATMs.jpg", name: "staff",
        Library:"/img/FreshAmenities/Library.jpg", name: "staff",
        VisitorParking:"/img/FreshAmenities/Visitor_parking.jpg", name: "staff",
        PipedGas:"/img/FreshAmenities/Piped_gas.jpg", name: "staff",


       
      };
    


  return (
    <div className='w-100  ' >

      <div className='single-fresh-booking-amenities-container m-auto  ' style={{width:'90%'}}>
      <div className='fresh-booking-new-amenities-headings '>
            <h2>Project Facilities</h2>
            <h2>{project?.projectName} Amenities</h2>
        </div>
        <div className='single-fresh-booking-amenities-card-container  d-flex flex-wrap  gap-3'>
        {Array.isArray(amenitiesContent) &&
    amenitiesContent.map((item, index) => {
      const currentImg = item.replace(/\s+/g, ""); 

      return (
       <div className='fresh-booking-new-amenities-card' >
        <div className='fresh-booking-new-amenities-img-container'> 
          <img src={amenities[currentImg] || ""} alt={item.name || ""}  />
        </div>
        <div className='fresh-booking-new-amenities-name-container'>
        <p>{item}</p>
        </div>
       
       </div>
      );
    })}
        </div>
      </div>
       
     
    </div>
  )
}
