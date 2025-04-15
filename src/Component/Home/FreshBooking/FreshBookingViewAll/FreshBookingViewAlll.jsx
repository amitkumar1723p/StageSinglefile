import React, { useState } from 'react'
import { useLocation,Link } from 'react-router-dom';
import './FreshBookingViewAll2.css';
export default function FreshBookingViewAlll() {

  const [isViewAllButtonHovered, setIsViewAllButtonHovered] = useState(null);

const capturedData = useLocation();
const cardData = capturedData.state?.allCardData;
const HandleFreshbookingUrl = (projectName)=>{
    return projectName.split(" ").join("-").toLowerCase();
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "New Launch":
        return "status-newlaunch";
      case "Ready to Move":
        return "status-ready";
      case "Under Construction":
        return "status-underconstruction";
      case "Upcoming":
      return "status-upcomming";

    }
  };


  const [propertyType, setPropertyType] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log("Searching with parameters:", { propertyType, location, price, searchTerm });
    // Add your search functionality here
  };

  return (
   
 

//  <div style={{ width: '90%', maxWidth: '1300px', margin: 'auto', marginTop: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid black' }} className="w-sm-80">
//   <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }} className="d-flex justify-content-between py-2"> 
//     <div style={{ border: '1px solid black', width: '50%' }} className="d-none d-sm-block"></div>
//     <div style={{ border: '1px solid black', display: 'flex', justifyContent: 'space-between', width: '100%', borderRadius: '8px', overflow: 'hidden', height: '40px', minWidth: '20px' }} className="w-sm-45 d-flex">
//       <input style={{ width: '80%', height: '100%', marginLeft: '6px', border: 'none', outline: 'none' }} className="form-control" type="text" placeholder="Search Projekt Name" />
//       <button style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center', backgroundColor: '#037EDB', color: 'white', height: '100%', width: '100%', maxWidth: '100px', padding: '6px', border: 'none' }} className="d-flex align-items-center justify-content-center text-white">Search <img style={{ height: '22px', width: '22px' }} src="/img/postDetailsImg/freshbooking-search-lens.svg" alt="" /></button>
//     </div>
//   </div>
//   <div style={{ width: '100%', margin: 'auto', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between' }} className="d-flex flex-wrap">
//     {posts.map(posts => (
//       <div style={{ width: '100%', maxWidth: '420px', height: '320px', margin: 'auto', borderRadius: '8px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${posts.imgUrl})` }} className="d-flex flex-column">
//         <div style={{ height: '100%', width: '100%', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', transition: '0.3s' }} className="hover:bg-opacity-40 d-flex align-items-end">
//           <div style={{ width: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }} className="p-3 d-flex flex-column gap-2">
//             <div style={{ width: '100%', height: '50%', borderBottom: '2px solid #FFD700', paddingBottom: '5px', display: 'flex', flexDirection: 'column', gap: '5px' }} className="border-bottom border-warning pb-2">
//               <div style={{ width: '100%', height: '50%', color: '#FFD700' }} className="text-warning">₹ {posts.price}</div>
//               <div style={{ width: '100%', height: '50%', fontWeight: 'bold', color: 'white', fontSize: '18px' }} className="fw-bold text-white fs-5">{posts.projectName}</div>
//             </div>
//             <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'column', gap: '5px' }} className="d-flex flex-column gap-2">
//               <div style={{ width: '100%', height: '50%', color: 'white', fontWeight: '300', fontSize: '14px' }} className="text-light fw-light fs-6">{posts.location}</div>
//               <div style={{ width: '100%', height: '50%' }}>
//                 <button style={{ width: '100%', display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', padding: '8px', border: '1px solid #FFD700', borderRadius: '8px', color: 'white', transition: '0.3s', backgroundColor: 'transparent' }}
//                 className="d-flex align-items-center justify-content-center border border-warning rounded-2 text-white hover:text-warning hover:bg-dark hover:bg-opacity-50 active:bg-opacity-20">
//                   View More <img src="/img/postDetailsImg/solar_arrow-right-up-outline.svg" alt="" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>  



<div className=' fresh-booking-view-all2-container d-flex flex-column gap-2 '>

{/* <div className=' fresh-booking-view-alll-filter-container d-flex justify-content-between py-2' > 
    <div  className="fresh-booking-view-alll-filter d-flex align-items-center justify-content-between gap-2 w-50 ">
        <div> 
            <select className='p-2' style={{border:'1px solid rgba(0, 102, 204, 1)', borderRadius:'4px', minWidth:'150px'}}>  
            <option value="">Property Type</option>
            <option value="">Type 0</option>
            <option value="">Type 1</option>
            <option value="">Type 2</option>
            <option value="">Type 3</option>
            </select>
        </div>
        <div>
        <select className='p-2' style={{border:'1px solid  rgba(0, 102, 204, 1)', borderRadius:'4px',minWidth:'150px'}}>  
            <option value="">Location</option>
            <option value="">Location 0</option>
            <option value="">Location 1</option>
            <option value="">Location 2</option>
            <option value="">Location 3</option>
        </select>
        </div>
        <div>
        <select className='p-2' style={{border:'1px solid  rgba(0, 102, 204, 1)', borderRadius:'4px',minWidth:'150px'}}>  
            <option value="">Price</option>
            <option value="">Price 0</option>
            <option value="">Price 1</option>
            <option value="">Price 2</option>
            <option value="">Price 3</option>
        </select>
        </div>
       
    </div>
    <div  className="fresh-booking-view-alll-search-container d-flex justify-content-between overflow-hidden  ">
      <input  className=" fresh-booking-view-alll-input-field w-75" type="text" placeholder="Search Projekt Name" />
      <button className="fresh-booking-view-alll-search-button d-flex align-items-center justify-content-center text-white gap-1 w-100 p-2 "  >Search <img src="/img/freshbooking-search-lens.svg" alt="" /></button>
    </div>
</div> */}
 <div className="fresh-booking-view-all-container">
      <div className="fresh-booking-view-all-filter-group">
        <div className="fresh-booking-view-all-dropdown">
          <select 
            className="fresh-booking-view-all-select"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="" disabled selected>Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="commercial">Commercial</option>
          </select>
          <span className="fresh-booking-view-all-dropdown-icon">&#9662;</span>
        </div>

        <div className="fresh-booking-view-all-dropdown">
          <select 
            className="fresh-booking-view-all-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="" disabled selected>Locations</option>
            <option value="sector-1">Sector 1</option>
            <option value="sector-2">Sector 2</option>
            <option value="sector-3">Sector 3</option>
            <option value="downtown">Downtown</option>
          </select>
          <span className="fresh-booking-view-all-dropdown-icon">&#9662;</span>
        </div>

        <div className="fresh-booking-view-all-dropdown">
          <select 
            className="fresh-booking-view-all-select"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="" disabled selected>Price</option>
            <option value="0-50000">₹0 - ₹50,000</option>
            <option value="50000-100000">₹50,000 - ₹1,00,000</option>
            <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
            <option value="200000+">₹2,00,000+</option>
          </select>
          <span className="fresh-booking-view-all-dropdown-icon">&#9662;</span>
        </div>

        <div className="fresh-booking-view-all-search-wrapper">
          <input
            type="text"
            className="fresh-booking-view-all-search-input"
            placeholder="Search 'Sector-91 Gurgaon' society name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="fresh-booking-view-all-search-button"
            onClick={handleSearch}
          >
            Search <span className="fresh-booking-view-all-search-icon">&#128269;</span>
          </button>
        </div>
      </div>
    </div>

<div className='freshbooking-view-alll-main-container  w-100 m-auto pb-4'>
<div className={`freshbooking-view-alll-card-container m-auto`}  >
{cardData?.map((cardData,index) => (
      <div data-aos="zoom-in"  data-aos-duration="600" data-aos-once="false" className="fresh-booking-view-alll-card d-flex w-100 align-items-end overflow-hidden " style={{ backgroundSize: 'cover',boxShadow: '6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff', backgroundPosition: 'center', backgroundImage: `url(${cardData?.bannerImage?.url})`, position:'relative'}} >
        <div className='fresh-booking-view-alll-card-shadow d-flex w-100 h-100 align-items-end overflow-hidden '>
          <div className="fresh-booking-view-alll-card-content w-100 d-flex flex-column  gap-2 " style={{backgroundColor:'rgba(255, 255, 255, 1)', padding:'4px 12px 12px 12px', position:'absolute' }} >
            <div  className="fresh-booking-view-alll-card-upper-content d-flex flex-column gap-1 w-100 h-50  pb-2" >
              <div  className="fresh-booking-view-alll-card-price w-100 h-50 fs-5   overflow-hidden text-nowrap text-truncate" style={{ color: 'rgba(0, 102, 204, 1)' }} >₹ <span className='fw-bold fs-6'>{cardData?.projectBasicDetail?.minPrice} Cr</span> </div>
              <div  className="fresh-booking-view-alll-card-projectname w-100 g-50 fw-bold fs-5 overflow-hidden text-nowrap text-truncate" style={{color:'rgba(51, 51, 51, 1)'}}>{cardData?.projectBasicDetail?.projectName}</div>
              <div className="fresh-booking-view-alll-card-location w-100  fw-normal overflow-hidden text-nowrap text-truncate" style={{color:'rgba(51, 51, 51, 1)'}} >{cardData?.projectBasicDetail?.locality}, {cardData?.projectBasicDetail?.projectCity}</div>
              <div className="fresh-booking-view-alll-card-amanities w-100  overflow-hidden text-nowrap text-truncate  "  style={{ fontWeight: "600", fontSize:'14px',color:'rgba(51, 51, 51, 1)' }}>{cardData?.projectBasicDetail?.projectType} {cardData?.projectBasicDetail?.projectAdType}</div>
            </div>
            <div  className="d-flex flex-column gap-2 w-100 h-50" >
            <div  className={` fresh-booking-view-alll-status w-100  fw-light fs-6 overflow-hidden text-nowrap text-truncate  `} ><span  className={`${getStatusColor(cardData?.projectBasicDetail?.projectStatus)}`} >{cardData?.projectBasicDetail?.projectStatus}</span></div>
             
              <div className='w-100' >

                 <Link to={`/fresh-bookings/project-name/${HandleFreshbookingUrl(cardData?.projectBasicDetail?.projectName)}/${HandleFreshbookingUrl(cardData?.projectBasicDetail?.locality)}/${cardData?.projectBasicDetail?.projectCity}/${cardData._id}`}>
                 <button key={index}  onMouseEnter={() => setIsViewAllButtonHovered(index)} onMouseLeave={() => setIsViewAllButtonHovered(null)}  className="fresh-booking-view-alll-card-button w-100 d-flex align-items-center justify-content-center rounded-2 fs-6 " style={{ gap: '8px', padding: '8px', borderRadius: '8px' }}
               >
                  View More <img  src={isViewAllButtonHovered === index ? "/img/lucide_square-arrow-out-up-right.svg" : "/img/solar_arrow-right-up-outline.svg"} alt="viewMore" />
                </button>
                 </Link>
              
              </div>
            </div>
          </div>
          </div>
        
      </div>
    ))}
</div>

</div>

</div>


  )
}




