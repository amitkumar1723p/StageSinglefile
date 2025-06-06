import React, { useEffect,useState, useRef } from 'react'
import {useNavigate ,Link}  from 'react-router-dom';
import './FreshBookingHome.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFreshProjectAction } from '../../../../Action/freshProjectAction';
import { LuOrigami } from 'react-icons/lu';



export default function FreshBookingHome(){

  const [isHovered, setIsHovered] = useState(false);


  const getStatusColor = (status) => {
    switch (status) {
      case "New Launch":
        return "text-white "; 
      case "Ready to Move":
        return "text-white "; 
      case "Under Construction":
        return "text-white"; 
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
dispatch(getAllFreshProjectAction({RouteType:"UserRoutes"}))
  },[])


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     document.querySelector('.fresh-booking-home-card-container')?.scrollBy({
  //       right: 30,
  //       behavior: 'smooth',
  //     });
  //   }, 20); // runs every 2 seconds
  
  //   return () => clearInterval(interval); 
  // }, []);


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


      // useEffect(() => {
      //   const container = document.querySelector(".fresh-booking-home-card-container");
    
      //   const interval = setInterval(() => {
      //     if (container) {
      //       container.scrollBy({
      //         left: 300, // scroll 400px to the right
      //         behavior: "smooth"
      //       });
      //     }
      //   }, 3000); // every 2 seconds
    
      //   return () => clearInterval(interval); // cleanup
      // }, []);
    
      const containerRef = useRef(null);

     
      useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
      
        let scrollAmount = 0;
        let animationFrameId;
        let delayTimer;
        let isHovered = false;
        let scrollSpeed = 1; // current speed
        let targetSpeed = 1; // desired speed
        const easing = 0.5; // controls smoothness
      
        const scroll = () => {
          // Ease towards the target speed
          scrollSpeed += (targetSpeed - scrollSpeed) * easing;
      
          container.scrollLeft += scrollSpeed;
          scrollAmount += scrollSpeed;
      
          if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0;
            scrollAmount = 0;
          }
      
          animationFrameId = requestAnimationFrame(scroll);
        };
      
        const handleMouseEnter = () => {
          targetSpeed = 0.2; // smoothly slow down to stop
        };
      
        const handleMouseLeave = () => {
          targetSpeed = 1; // smoothly resume
        };
      
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
      
        delayTimer = setTimeout(() => {
          scroll(); // Start scrolling after delay
        }, 1500);
      
        return () => {
          clearTimeout(delayTimer);
          cancelAnimationFrame(animationFrameId);
          container.removeEventListener('mouseenter', handleMouseEnter);
          container.removeEventListener('mouseleave', handleMouseLeave);
        };
      }, []);
    
      // useEffect(() => {
      //   const container = containerRef.current;
      //   if (!container) return;
      
      //   let scrollAmount = 0;
      //   let animationFrameId;
      //   let delayTimer;
      
      //   const scroll = () => {
      //     container.scrollLeft += 1;
      //     scrollAmount += 0.1;
      
      //     if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
      //       container.scrollLeft = 0;
      //       scrollAmount = 0;
      //     }
      
      //     animationFrameId = requestAnimationFrame(scroll);
      //   };
      
      //   // Delay scroll start by 3 seconds
      //   delayTimer = setTimeout(() => {
      //     scroll(); // Start scrolling after delay
      //   }, 1500);
      
      //   return () => {
      //     clearTimeout(delayTimer); // Clear delay timer if component unmounts
      //     cancelAnimationFrame(animationFrameId); // Stop animation
      //   };
      // }, []);
      
        
        
    

  return (

    <div   className='freshbooking-home-main-container d-flex flex-column '>
      <div className='fresh-booking-home-upper-container d-md-flex justify-content-between m-auto ' >
        <div className='fresh-booking-home-headings mb-2' >
          <h2 className='' style={{ fontWeight:'700', color:'rgba(51, 51, 51, 1)'}}>Discover Your Perfect Home!</h2>
          <p className='fw-normal' style={{ color:'rgba(51, 51, 51, 1)'}}>Exclusive new property launches, tailored to your lifestyle – from modern to luxurious, all in one place.</p>
        </div>
        <div className='freshbooking-home-button-container d-flex align-items-center ' >
        <button onClick={()=>{navigate('/fresh-bookings', { state: {allCardData:allFreshBookingCard} } )}} class="freshbooking-home-button fresh-booking-view-more-more">
  <span class="fresh-booking-button-circle" aria-hidden="true">
  <span class="icon arrow"></span>
  </span>
  <span class="fresh-booking-button-text">View All Properties</span>
</button>
        </div>
      </div>
      <div className='fresh-booking-card-and-button-container d-flex justify-content-between align-items-center position-relative'>
        <div className='d-flex  justify-content-center  position-absolute'style={{left:'0px',top:'100px', zIndex:'3'}}>
          <button onClick={scrollFreshBookingLeft} className='bg-white d-none border-0 d-flex justify-content-center align-items-center' style={{borderRadius:'100%',boxShadow:' 0 2px 8px #0000001a', width:'35px', height:'35px',boxShadow:'#000 0px 2px 8px' }}>
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          </button>
        </div>
        <div  ref={containerRef} className='fresh-booking-home-card-container d-flex overflow-scroll ' style={{width:'100%' , margin:'0 auto', scrollbarWidth:'none'}}>

          {allFreshBookingCard.length>0?( 
                allFreshBookingCard.map(cardData => (
                  <div  className="fresh-booking-home-card d-flex align-items-end overflow-hidden " style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: `url(${cardData?.bannerImage?.url})`, position:'relative'}} >
             
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
                      <Link to={`/fresh-bookings/project-name/${HandleFreshbookingUrl(cardData?.projectBasicDetail?.projectName)}/${HandleFreshbookingUrl(cardData?.projectBasicDetail?.locality)}/${cardData?.projectBasicDetail?.projectCity}/${cardData._id}`}>
                        <button  className="fresh-booking-card-button w-100 d-flex align-items-center text-white justify-content-center rounded-2 fs-6  " style={{ gap: '8px', padding: '4px',backgroundColor:'#0b0b0b4d', border: '1px solid rgba(245, 130, 32, 1)', borderRadius: '8px' }}
                       >
                          View More <img
                      loading="lazy" src="/img/Vector-arrow-top-right.svg" alt="logo" />
                        </button>
                        </Link>
                      </div>
                    </div>
                  </div>
             </div>
               
                
              </div>
          
         ))
          ):(<p>Loading</p>)}

      
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
    
    // <div>
    //   {allFreshBookingCard.projectData.map((cardData)=>(
    //     <p>{cardData?.projectBasicDetail?.projectName}</p>
    //   ))}
    // </div>
  )
}

