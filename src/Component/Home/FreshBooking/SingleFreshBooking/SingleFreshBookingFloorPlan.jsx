import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const SingleFreshBookingFloorPlan = ({project , FloorPlanContent}) => {
  // const images = [
  //   {
  //     url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
  //   },
  //   {
  //     url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
  //   },
  //   {
  //     url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
  //   },
  //   {
  //     url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e"
  //   }
  // ];
  const [zoomedImage, setZoomedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === FloorPlanContent?.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [FloorPlanContent?.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? FloorPlanContent.length - 1 : prevIndex - 1));
  };
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === FloorPlanContent.length - 1 ? 0 : prevIndex + 1));
  };
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
    <div className='Single-fresh-floor-plan-main'>
  <div className="m-auto" style={{width:'85%'}}>
                    <h3 className="mb-3 Single-fresh-floor-plan-h3">Floor Plan</h3>
                    <h2 className="fw-bold mb-3 Single-fresh-floor-plan-h2" style={{color: '#1D3557'}}>The {project?.projectName} Floor Plan</h2>
        </div>
    <div className="single-fresh-carousel">
    {FloorPlanContent?.map((plan, index) => (
      <div
        key={index}
        className="single-fresh-slide"
        style={{

          transform: `translateX(${(index - currentIndex) * 100}%)`,
          zIndex: index === currentIndex ? 1 : 0
        }}
      >
        <img
          src={plan?.url}
          alt={plan?.title}
          onClick={() => setZoomedImage(plan?.url)}
          className="single-fresh-image "
        />
        {/* <div className="single-fresh-content">
          <h2 className="single-fresh-title">{image.title}</h2>
          <p className="single-fresh-description">{image.description}</p>
        </div> */}
      </div>
    ))}

    <button className="single-fresh-button prev" >
      <ChevronLeft size={24} />
    </button>
    <button className="single-fresh-button next" >
      <ChevronRight size={24} />
    </button>

    <div className="single-fresh-nav">
      {FloorPlanContent?.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`single-fresh-dot ${currentIndex === index ? 'active' : ''}`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
  </div>
  {zoomedImage && (
        <div className="zoom-overlay">
          <div className="zoom-content">
            <img src={zoomedImage} alt="Zoomed" className="zoomed-image" />
            <button onClick={() => setZoomedImage(null)} className="close-zoom-button">
              ✕ 
            </button>
          </div>
        </div>
      )}
  </>
  );
};

export default SingleFreshBookingFloorPlan;