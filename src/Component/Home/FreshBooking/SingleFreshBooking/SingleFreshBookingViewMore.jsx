import React from 'react'
import  { useEffect,useState } from 'react'
import {useNavigate ,Link}  from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAllFreshProjectAction } from '../../../../Action/freshProjectAction';

export default function SingleFreshBookingViewMore(builderContent) {
   const [isViewAllButtonHovered, setIsViewAllButtonHovered] = useState(null);

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

      const HandleFreshbookingUrl = (projectName)=>{
        return projectName?.split(" ").join("-").toLowerCase();
      }
      
    const dispatch=useDispatch()

    const { data:allFreshProjectData } = useSelector((state) => {
      return state.allFreshProjectData;
    });
    const allFreshBookingCard = allFreshProjectData?.projectData ||  [] ;
  
    useEffect(()=>{
  dispatch(getAllFreshProjectAction())
    },[])



      useEffect(()=>{
    dispatch(getAllFreshProjectAction())
      },[])
      const scrollFreshBookingViewMoreLeft = ()=>{
        document.querySelector('.fresh-booking-view-more-card-container').scrollBy({
          left: -300,
          behavior: 'smooth'
        });
      }
      const scrollFreshBookingViewMoreRight = ()=>{
        document.querySelector('.fresh-booking-view-more-card-container').scrollBy({
          left: 300,
          behavior: 'smooth'
        });
      }
       const navigate = useNavigate();

  console.log(builderContent?.projectAboutBuilderName, "saurabh")
     
  return (
       <div className='freshbooking-view-more-main-container d-flex flex-column gap-4'>
         <div className='d-md-flex justify-content-between m-auto ' style={{width:'90%'}}>
           <div className='fresh-booking-view-more-headings d-flex flex-column ' >
             <h2 className='fs-4 fw-medium' style={{ color:'rgba(51, 51, 51, 1)'}}>View More</h2>
            <h2 style={{color:'rgba(0, 102, 204, 1)' , fontWeight:'700', fontSize:'32px'}}>
              {builderContent?.projectAboutBuilderName}
               Other Properties</h2>
           </div>
           <div className=' d-none d-md-flex justify-content-end  align-items-end gap-4 ' style={{minWidth:'202px'}}>
          <div className='' >
          <button onClick={scrollFreshBookingViewMoreLeft} className='bg-white  d-flex justify-content-center align-items-center ' style={{borderRadius:'2px',border:'2px solid rgba(0, 102, 204, 1)', width:'35px', height:'35px'}}>
             <svg className="icon "  style={{color:'rgba(0, 102, 204, 1)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
             </svg>
             </button>
          </div>
          <div className=''>
          <button  onClick={scrollFreshBookingViewMoreRight} className=' bg-white d-flex justify-content-center align-items-center' style={{borderRadius:'2px',border:'2px solid rgba(0, 102, 204, 1)', width:'35px', height:'35px'   }}>
             <svg className="icon" style={{color:'rgba(0, 102, 204, 1)'}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
             </svg>
           </button>
          </div>
           </div>
         </div>
         <div className='fresh-booking-card-and-button-container d-flex justify-content-between align-items-center position-relative'>
           <div className='d-flex d-none justify-content-center  position-absolute'style={{left:'0px',top:'100px', zIndex:'3'}}>
            
           </div>
           <div className='fresh-booking-view-more-card-container d-flex overflow-scroll ' style={{width:'100%' , margin:'0 auto', scrollbarWidth:'none'}}>
   
             {allFreshBookingCard.length>0?( 
                   allFreshBookingCard.map((cardData,index) => (

                    
                  <div className="fresh-booking-view-more-card d-flex w-100 align-items-end overflow-hidden " style={{ backgroundSize: 'cover',boxShadow: 'rgb(197, 197, 197) 6px 6px 12px, rgb(255, 255, 255) -6px -6px 12px', backgroundPosition: 'center', backgroundImage: `url(${cardData?.bannerImage?.url})`, position:'relative'}} >
                          <div className='fresh-booking-view-more-card-shadow d-flex w-100 align-items-end overflow-hidden '>
                            <div className="fresh-booking-view-more-card-content w-100 d-flex flex-column  gap-2 " style={{backgroundColor:'rgba(255, 255, 255, 1)', padding:'4px 12px 12px 12px', position:'absolute' }} >
                              <div  className="fresh-booking-view-more-card-upper-content d-flex flex-column gap-1 w-100 h-50  pb-2" >
                                <div className="fresh-booking-view-more-card-price w-100 h-50 fs-5   overflow-hidden text-nowrap text-truncate" style={{ color: 'rgba(0, 102, 204, 1)' }} >₹ <span className='fw-bold fs-6'>{cardData?.projectBasicDetail?.minPrice} Cr</span> </div>
                                <div  className="fresh-booking-view-more-card-projectname w-100 g-50 fw-bold fs-5 overflow-hidden text-nowrap text-truncate" style={{color:'rgba(51, 51, 51, 1)'}}>{cardData?.projectBasicDetail?.projectName}</div>
                                <div className="fresh-booking-view-more-card-location w-100  fw-normal overflow-hidden text-nowrap text-truncate" style={{color:'rgba(51, 51, 51, 1)'}} >{cardData?.projectBasicDetail?.locality}, {cardData?.projectBasicDetail?.projectCity}</div>
                                <div className="fresh-booking-view-more-card-amanities w-100  overflow-hidden text-nowrap text-truncate  "  style={{ fontWeight: "600", fontSize:'14px',color:'rgba(51, 51, 51, 1)' }}>{cardData?.projectBasicDetail?.projectType} {cardData?.projectBasicDetail?.projectAdType}</div>
                              </div>
                              <div  className="d-flex flex-column gap-2 w-100 h-50" >
                              <div  className={` fresh-booking-view-more-status w-100  fw-light fs-6 overflow-hidden text-nowrap text-truncate  `} ><span  className={`${getStatusColor(cardData?.projectBasicDetail?.projectStatus)}`} >{cardData?.projectBasicDetail?.projectStatus}</span></div>
                               
                                <div className='w-100' >
                  
                                   <a href={`/fresh-bookings/project-name/${HandleFreshbookingUrl(cardData?.projectBasicDetail?.projectName)}/${HandleFreshbookingUrl(cardData?.projectBasicDetail?.locality)}/${cardData?.projectBasicDetail?.projectCity}/${cardData._id}`}>
                                   <button key={index}  onMouseEnter={() => setIsViewAllButtonHovered(index)} onMouseLeave={() => setIsViewAllButtonHovered(null)}  className="fresh-booking-view-more-card-button w-100 d-flex align-items-center justify-content-center rounded-2 fs-6 " style={{ gap: '8px', padding: '8px', borderRadius: '8px' }}
                                 >
                                    View More <img  src={isViewAllButtonHovered === index ? "/img/lucide_square-arrow-out-up-right.svg" : "/img/solar_arrow-right-up-outline.svg"} alt="viewMore" />
                                  </button>
                                   </a>
                                
                                </div>
                              </div>
                            </div>
                            </div>
                          
                        </div>
             
            ))
             ):(<p>Ruko jra sabar kro</p>)}
   
         
           </div>
           <div className='d-flex d-none justify-content-center  position-absolute' style={{right:'0px',top:'100px', zIndex:'3'}}>
   
          
          
         
            
           </div>
         </div>
       </div>
  )
}
