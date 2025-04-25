import React from 'react'

export default function SingleFreshBookingNewAmenities({project , amenitiesContent}) {


    const amenities = {
        GYM: "/img/FreshAmenities/Gym.jpeg", name: "Gym" ,
        SwimmingPool: "/img/FreshAmenities/swiiming_pool.jpeg", name: "Swimming Pool" ,
        KidsPlayArea: "/img/FreshAmenities/Kids_playarea.jpeg", name: "Kids Play Area" ,
        Park: "/img/FreshAmenities/park.jpeg", name: "park" ,
        VisitorParking: "/img/FreshAmenities/visitor_parking.jpeg", name: "Visitor Parking" ,
        IntercomFacility: "/img/FreshAmenities/IntercomFacility.jpeg", name: "Power" ,
        JoggingTrack: "/img/FreshAmenities/jogging_track.jpeg", name: "jogging" ,
        ClubHouse: "/img/FreshAmenities/Club_house.jpeg", name: "Club" ,
        WasteDisposal: "/img/FreshAmenities/Waste_disposal.png", name: "Parking" ,
        SecurityGuard: "/img/FreshAmenities/Security_guard.jpeg", name: "SecurityGuard" ,
        ConferenceRoom: "/img/FreshAmenities/Conference_room.jpeg", name: "Garden",
        Lift: "/img/FreshAmenities/Lift.jpeg", name: "Lift",
        CafeteriaFoodCourt:"/img/FreshAmenities/CafeteriaFoodCourt.jpeg", name: "food-court",
        CommunityCentre:"/img/FreshAmenities/Community_Center.jpeg", name: "community-center",
        MaintenanceStaff:"/img/FreshAmenities/Maintainance_Staff.jpeg", name: "staff",
        ATMs:"/img/FreshAmenities/ATMs.jpeg", name: "staff",
        Library:"/img/FreshAmenities/Library.jpeg", name: "staff",
        VisitorParking:"/img/FreshAmenities/Visitor_parking.jpeg", name: "staff",
        PipedGas:"/img/FreshAmenities/Piped_gas.jpeg", name: "staff",


       
      };
    


  return (
    <div className='w-100  ' >

      <div className='single-fresh-booking-amenities-container m-auto  ' id='Amenities' style={{width:'90%'}}>
      <div className='fresh-booking-new-amenities-headings '>
            <h2>Project Facilities</h2>
            <h2>{project?.projectName} Amenities</h2>
        </div>
        <div className='single-fresh-booking-amenities-card-container  d-flex flex-wrap  gap-3'>
        {Array.isArray(amenitiesContent) &&
    amenitiesContent.map((item, index) => {
      const currentImg = item.replace(/[\s/]+/g, "");


      return (
       <div className='fresh-booking-new-amenities-card' >
        <div className='fresh-booking-new-amenities-img-container'> 
          <img
                      loading="lazy" src={amenities[currentImg] || ""} alt={item.name || ""}  />
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
