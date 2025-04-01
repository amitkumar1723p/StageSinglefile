import React from 'react'
import { useLocation,Link } from 'react-router-dom';
import './FreshBookingPost.css';
export default function FreshBookingPost() {

const capturedData = useLocation();
const cardData = capturedData.state?.allCardData;
const HandleFreshbookingUrl = (projectName)=>{
    return projectName.split(" ").join("-").toLowerCase();
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "New Launch":
        return "text-warning "; 
      case "Ready to Move":
        return "text-success fw-medium"; 
      case "Under Construction":
        return "text-danger fw-medium"; 
      default:
        return "text-white"; 
    }
  };



console.log(cardData)

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



<div className=' fresh-booking-post-container d-flex flex-column gap-4'>

<div className=' fresh-booking-post-search-filter-container d-flex justify-content-between py-2'> 
    <div  className="fresh-booking-filter d-flex align-items-center justify-content-between gap-2 w-50 ">
        <div> 
            <select className='p-2' style={{border:'1px solid  rgba(29, 53, 87, 1)', borderRadius:'4px', minWidth:'150px'}}>  
            <option value="">Property Type</option>
            <option value="">Type 0</option>
            <option value="">Type 1</option>
            <option value="">Type 2</option>
            <option value="">Type 3</option>
            </select>
        </div>
        <div>
        <select className='p-2' style={{border:'1px solid  rgba(29, 53, 87, 1)', borderRadius:'4px',minWidth:'150px'}}>  
            <option value="">Location</option>
            <option value="">Location 0</option>
            <option value="">Location 1</option>
            <option value="">Location 2</option>
            <option value="">Location 3</option>
        </select>
        </div>
        <div>
        <select className='p-2' style={{border:'1px solid  rgba(29, 53, 87, 1)', borderRadius:'4px',minWidth:'150px'}}>  
            <option value="">Price</option>
            <option value="">Price 0</option>
            <option value="">Price 1</option>
            <option value="">Price 2</option>
            <option value="">Price 3</option>
        </select>
        </div>
       
    </div>
    <div  className="fresh-booking-post-search-container d-flex justify-content-between overflow-hidden  ">
      <input  className=" fresh-booking-input-field w-75" type="text" placeholder="Search Projekt Name" />
      <button className="fresh-booking-search-button d-flex align-items-center justify-content-center text-white gap-1 w-100 p-2 "  >Search <img src="/img/freshbooking-search-lens.svg" alt="" /></button>
    </div>
</div>

<div className={`fresh-booking-card-container`}  >
{cardData.map(cardData => (
      <div className="fresh-booking-card d-flex w-100 align-items-end overflow-hidden " style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${cardData?.bannerImage?.url})`, position:'relative'}} >
        <div className='fresh-booking-home-card-shadow d-flex w-100 align-items-end overflow-hidden '>
          <div className="fresh-booking-card-content w-100 d-flex flex-column  gap-2 " style={{backgroundColor:'rgb(29, 53, 87)', padding:'8px 12px 12px 12px', position:'absolute' }} >
            <div  className="fresh-booking-card-upper-content d-flex flex-column gap-1 w-100 h-50  pb-2" >
              <div className="fresh-booking-card-price w-100 h-50 fs-6  fw-bold  overflow-hidden text-nowrap text-truncate" style={{ color: 'rgba(245, 130, 32, 1)' }} >₹ {cardData?.projectBasicDetail?.minPrice} Cr</div>
              <div  className="fresh-booking-card-projectname w-100 g-50 fw-bold text-white fs-5 overflow-hidden text-nowrap text-truncate">{cardData?.projectBasicDetail?.projectName}</div>
              <div className="fresh-booking-card-location w-100  fw-normal overflow-hidden text-nowrap text-truncate" style={{color:'rgba(255, 255, 255, 1)'}} >{cardData?.projectBasicDetail?.locality}, {cardData?.projectBasicDetail?.projectCity}</div>
              <div className="fresh-booking-card-amanities w-100 text-light overflow-hidden text-nowrap text-truncate  "  style={{ fontWeight: "600", fontSize:'14px' }}>{cardData?.projectBasicDetail?.projectType} {cardData?.projectBasicDetail?.projectAdType}</div>
            </div>
            <div  className="d-flex flex-column gap-2 w-100 h-50" >
            <div  className={` fresh-booking-status w-100  fw-light fs-6 overflow-hidden text-nowrap text-truncate  `} >Status: <span  className={`${getStatusColor(cardData?.projectBasicDetail?.projectStatus)}`} >{cardData?.projectBasicDetail?.projectStatus}</span></div>
             
              <div className='w-100' >

                 <Link to={`/fresh-bookings/project-name/${HandleFreshbookingUrl(cardData?.projectBasicDetail?.projectName)}/${HandleFreshbookingUrl(cardData?.projectBasicDetail?.locality)}/${cardData?.projectBasicDetail?.projectCity}/${cardData._id}`}>
                 <button  className="fresh-booking-card-button w-100 d-flex align-items-center justify-content-center rounded-2 fs-6 " style={{ gap: '8px', padding: '4px', border: '1px solid rgba(245, 130, 32, 1)', borderRadius: '8px' }}
               >
                  View More <img src="/img/solar_arrow-right-up-outline.svg" alt="logo" />
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


  )
}




