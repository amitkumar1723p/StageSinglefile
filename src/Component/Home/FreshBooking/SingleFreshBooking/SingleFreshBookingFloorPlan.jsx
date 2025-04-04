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
    <div className="m-auto" style={{width:'85%'}}>
                    <h3 className="mb-3 Single-fresh-floor-plan-h3">Floor Plan</h3>
                    <h2 className="fw-bold mb-3 Single-fresh-floor-plan-h2" style={{color: '#1D3557'}}>The {project?.projectName} Floor Plan</h2>
                    </div>
                    <div className="container-fluid  py-4 bg-light" style={{width:'90%'}}>

                      <div className=' d-flex justify-content-between'>
                      <button 
          className="btn btn-primary   "
          onClick={() => scroll('left')}
          style={{ zIndex: 10, background: 'none', border: 'none', padding: 0 }}
        >
          <img src="/img/left-arr.png" alt="Scroll Left" style={{ width: '55px', height: '45px' }} />
        </button>
        <button 
          className="btn btn-primary  "
          onClick={() => scroll('right')}
          style={{ zIndex: 10, background: 'none', border: 'none', padding: 0 }}
        >
          <img src="/img/right-arr.png" alt="Scroll Right" style={{ width: '55px', height: '45px' }} />
        </button>
                      </div>

        

        <div 
          ref={scrollRef}
          className="d-flex overflow-scroll pb-3 px-3"
          style={{ scrollBehavior: 'smooth', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {FloorPlanContent?.map((FloorPlanContent, index) => (
            <div key={FloorPlanContent?.id} className=" Single-Fresh-Floor-Plan">
              <div className="card border-0 shadow-sm d-flex flex-column gap-2" >
                <img 
                  src={FloorPlanContent?.url} 
                  className={`card-img-top floor-plan-image w-auto h-100 ${activeIndex === index ? 'zoomed' : ''}`} 
                  alt={FloorPlanContent?.alt || 'Floor Plan'} 
                 
                  style={{ transition: 'transform 0.3s ease-in-out',height:'100%',maxHeight:'500px', width:'auto'}}
                />
              </div>
            </div>
          ))}
        </div>

        

    </div>
    </>
  );
}