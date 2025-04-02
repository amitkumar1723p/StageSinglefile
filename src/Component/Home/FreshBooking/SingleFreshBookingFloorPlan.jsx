import React, { useRef, useEffect, useState  } from 'react';

export default function SingleFreshBookingFloorPlan({project , FloorPlanContent}) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
 
 

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      if (direction === 'left') {
        current.scrollLeft -= 450;
      } else {
        current.scrollLeft += 450;
      }
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.6, root: scrollRef.current, rootMargin: "0px" }
    );

    const images = document.querySelectorAll(".floor-plan-image");
    images.forEach((img) => observer.observe(img));

    return () => {
      images.forEach((img) => observer.unobserve(img));
    };
  }, []);

  return (
    <>
    <div className="col-12 col-md-7 ps-md-5">
                    <h3 className="mb-3 Single-fresh-floor-plan-h3">Floor Plan</h3>
                    <h2 className="fw-bold mb-3 Single-fresh-floor-plan-h2" style={{color: '#1D3557'}}>The {project?.projectName} Floor Plan</h2>
                    </div>
                    <div className="container-fluid py-4 bg-light">
      <div className="position-relative">

        <button 
          className="btn btn-primary position-absolute start-0 top-50 translate-middle-y z-10"
          onClick={() => scroll('left')}
          style={{ zIndex: 10, background: 'none', border: 'none', padding: 0 }}
        >
          <img src="/img/left-arr.png" alt="Scroll Left" style={{ width: '55px', height: '45px' }} />
        </button>

        <div 
          ref={scrollRef}
          className="d-flex overflow-scroll pb-3 px-3 border"
          style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {FloorPlanContent?.map((FloorPlanContent, index) => (
            <div key={FloorPlanContent?.id} className=" Single-Fresh-Floor-Plan">
              <div className="card border-0 shadow-sm " >
                <img 
                  src={FloorPlanContent?.url} 
                  className={`card-img-top floor-plan-image w-auto h-100 ${activeIndex === index ? 'zoomed' : ''}`} 
                  alt={FloorPlanContent?.alt || 'Floor Plan'} 
                  onClick={() => setActiveIndex(index)}
                  style={{ transition: 'transform 0.3s ease-in-out',maxHeight:'400px', width:'auto', transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)' }}
                />
              </div>
            </div>
          ))}
        </div>

        <button 
          className="btn btn-primary position-absolute end-0 top-50 translate-middle-y z-10"
          onClick={() => scroll('right')}
          style={{ zIndex: 10, background: 'none', border: 'none', padding: 0 }}
        >
          <img src="/img/right-arr.png" alt="Scroll Right" style={{ width: '55px', height: '45px' }} />
        </button>
      </div>
    </div>
    </>
  );
}