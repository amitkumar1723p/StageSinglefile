import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SingleFreshBookingFloorPlan({project , FloorPlanContent}) {
  const [zoomedImage, setZoomedImage] = useState(null);

  const scrollLeft = () => {
    document.querySelector('.single-fresh-gallery-container').scrollBy({
      left:400,
      behavior:'smooth'
    })
  };
  const scrollright = () => {
    document.querySelector('.single-fresh-gallery-container').scrollBy({
      left:-400,
      behavior:'smooth'
    })
  };

  return (
    <>
    <div className='Single-fresh-floor-plan-main'>
    <div className="m-auto" style={{ width: '90%' }}>
        <h3 data-aos="fade-up" data-aos-duration="1200" data-aos-once="false" className="mb-3 single-fresh-floor-plan-h3">Floor Plan</h3>
        <h2 data-aos="fade-up" data-aos-duration="1400" data-aos-once="false" className="fw-bold mb-3 single-fresh-floor-plan-h2" >
          The {project?.projectName || 'Project'} Floor Plan
        </h2>
      </div>
    <div data-aos="fade-up" data-aos-duration="1200" data-aos-once="false" className="single-fresh-carousel">
      <div className="single-fresh-gallery-container">
        {FloorPlanContent?.map((plan, index) => (
          <div key={index} className="single-fresh-gallery-item"
          >
            
            
            <img
              src={plan?.url}
              alt={plan?.alt}
              onClick={() => setZoomedImage(plan?.url)}
              className="single-fresh-gallery-image"
              loading="lazy"
            />
          </div>
        ))}
          <button
    className="single-fresh-button prev"
    onClick={scrollright}
    aria-label="Previous slide"
  >
    <ChevronLeft size={24} />
  </button>
  <button
    className="single-fresh-button next"
    onClick={scrollLeft}
    aria-label="Next slide"
  >
    <ChevronRight size={24} />
  </button>

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
    </div>
    </>
  );
}