import React from 'react'
import  { useEffect,useState } from 'react'
import {useNavigate ,Link}  from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAllFreshProjectAction } from '../../../../Action/freshProjectAction';

export default function SingleFreshBookingViewMore() {

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
      const scrollFreshBookingLeft = ()=>{
        document.querySelector('.fresh-booking-home-card-container').scrollBy({
          left: -400,
          behavior: 'smooth'
        });
      }
      const scrollFreshBookingRight = ()=>{
        document.querySelector('.fresh-booking-home-card-container').scrollBy({
          left: 400,
          behavior: 'smooth'
        });
      }
       const navigate = useNavigate();

    
     
  return (
       <div className='freshbooking-home-main-container d-flex flex-column gap-4'>
         <div className='d-md-flex justify-content-between m-auto ' style={{width:'99%'}}>
           <div className='mb-2' >
             <h2 className='' style={{ fontWeight:'700', color:'rgba(51, 51, 51, 1)'}}>Discover Your Perfect Home!</h2>
             <p className='fw-normal ' style={{ color:'rgba(51, 51, 51, 1)'}}>Exclusive new property launches, tailored to your lifestyle – from modern to luxurious, all in one place.</p>
           </div>
           <div className=' ' style={{minWidth:'202px'}}>
           <button className=" d-flex justify-content-center align-content-center gap-2   "  onClick={()=>{navigate('/fresh-bookings', { state: {allCardData:allFreshBookingCard} } )}} style={{padding:'10px 16px', borderRadius:'100px',backgroundColor:'white' , border:'1px solid #afb8c0 '}} >
                     <span className="fs-6 fw-semibold lh-base " style={{color:'var(--main-light-clr)'}} ><p>View All Properties<img src="/img/right-arrow.svg" alt="" /> </p> </span>
            </button>
           </div>
         </div>
         <div className='fresh-booking-card-and-button-container d-flex justify-content-between align-items-center position-relative'>
           <div className='d-flex d-none justify-content-center  position-absolute'style={{left:'0px',top:'100px', zIndex:'3'}}>
             <button onClick={scrollFreshBookingLeft} className='bg-white border-0 d-flex justify-content-center align-items-center' style={{borderRadius:'100%',boxShadow:' 0 2px 8px #0000001a', width:'35px', height:'35px',boxShadow:'#000 0px 2px 8px' }}>
             <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
             </svg>
             </button>
           </div>
           <div className='fresh-booking-home-card-container d-flex overflow-scroll ' style={{width:'100%' , margin:'0 auto', scrollbarWidth:'none'}}>
   
             {allFreshBookingCard.length>0?( 
                   allFreshBookingCard.map(cardData => (

                    
                     <div className="fresh-booking-home-card d-flex align-items-end overflow-hidden " style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${cardData?.bannerImage?.url})`, position:'relative'}} >
                
                <div className='fresh-booking-home-card-shadow '>
                <div className="fresh-booking-home-card-content w-100 d-flex flex-column  gap-2 " style={{ padding:'8px 12px 12px 12px', position:'absolute' }} >
                       <div  className="fresh-booking-home-card-upper-content d-flex flex-column  w-100 h-50  pb-2" >
                         <div className="fresh-booking-home-card-price w-100 h-50  fw-bold overflow-hidden text-nowrap text-truncate " style={{ color: 'rgba(245, 130, 32, 1)' }} >₹ {cardData?.projectBasicDetail?.minPrice} Cr</div>
                         <div  className="fresh-booking-home-card-projectname w-100 g-50 overflow-hidden text-nowrap text-truncate "style={{ height:'fitContent'}}><span>{cardData?.projectBasicDetail?.projectName}</span></div>
                         <div className="fresh-booking-home-card-location w-100  fw-normal overflow-hidden text-nowrap text-truncate" style={{color:'rgba(255, 255, 255, 1)'}} >{cardData?.projectBasicDetail?.locality}, {cardData?.projectBasicDetail?.projectCity}</div>
                         <div className="fresh-booking-home-card-amanities w-100 text-light  overflow-hidden text-nowrap text-truncate "  style={{ fontWeight: "600", fontSize:'14px' }}>{cardData?.projectBasicDetail?.projectType} {cardData?.projectBasicDetail?.projectAdType}</div>
                       </div>
                       <div  className="d-flex flex-column gap-2 w-100 h-50" >
                       <div  className={`fresh-booking-status w-100 fw-light fs-6 `} >Status: <span className={`${getStatusColor(cardData?.projectBasicDetail?.projectStatus)}`} >{cardData?.projectBasicDetail?.projectStatus}</span></div>
                        
                         <div className='w-100 ' >
                         <a href={`/fresh-bookings/project-name/${HandleFreshbookingUrl(cardData?.projectBasicDetail?.projectName)}/${HandleFreshbookingUrl(cardData?.projectBasicDetail?.locality)}/${cardData?.projectBasicDetail?.projectCity}/${cardData._id}`}>
                           <button  className="fresh-booking-card-button w-100 d-flex align-items-center justify-content-center rounded-2 fs-6 " style={{ gap: '8px', padding: '4px', border: '1px solid rgba(245, 130, 32, 1)', borderRadius: '8px' }}
                          >
                             View More <img src="/img/solar_arrow-right-up-outline.svg" alt="logo" />
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
   
          
           <button  onClick={scrollFreshBookingRight} className=' border-0 bg-white d-flex justify-content-center align-items-center' style={{borderRadius:'100%',boxShadow:' 0 2px 8px #0000001a', width:'35px', height:'35px' ,boxShadow:'#000 0px 2px 8px'  }}>
             <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
             </svg>
           </button>
         
            
           </div>
         </div>
       </div>
  )
}
