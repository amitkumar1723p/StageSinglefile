import React, { useRef, useEffect, useState  } from 'react';

export default function SingleFreshBookingFloorPlan() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
 
  const floorPlans = [
    {
      id: 1,
      src: "/img/floor-plan-img1.jpg", 
      alt: "Floor Plan 1"
    },
    {
      id: 2,
      src: "/img/floor-plan-img1.jpg", 
      alt: "Floor Plan 2"
    },
    {
      id: 3,
      src: "/img/floor-plan-img1.jpg", 
      alt: "Floor Plan 3"
    },
    {
      id: 4,
      src: "/img/floor-plan-img1.jpg", 
      alt: "Floor Plan 4"
    },
    {
      id: 5,
      src: "/img/floor-plan-img1.jpg", 
      alt: "Floor Plan 5"
    }
  ];

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
                    <h2 className="fw-bold mb-3 Single-fresh-floor-plan-h2" style={{color: '#1D3557'}}>The DLF Primus Floor Plan</h2>
                    </div>
      <div className="container-fluid py-4 bg-light">
        <div className="position-relative">
          
          <button 
            className="btn btn-primary position-absolute start-0 top-50 translate-middle-y z-10 " 
            onClick={() => scroll('left')}
            style={{ zIndex: 10, background: 'none', border: 'none', padding: 0 }}
          >
            <img src="/img/left-arr.png" alt="Scroll Left" style={{ width: '55px', height: '45px' }} />
          </button>
          
     
          <div 
            ref={scrollRef} 
            className="d-flex overflow-auto pb-3 px-3" 
            style={{ 
              scrollBehavior: 'smooth',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
          >
            {floorPlans.map((plan, index) => (
              <div key={plan.id} className="col-12 col-md-8 col-lg-9 Single-Fresh-Floor-Plan " style={{  maxWidth: '900px' }}>
                <div className="card border-0 shadow-sm">
                  <img 
                     src={plan.src} 
                     className={`card-img-top floor-plan-image ${activeIndex === index ? 'zoomed' : ''}`} 
                     alt={plan.alt} 
                     data-index={index}
                     style={{ transition: 'transform 0.3s ease-in-out', transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)' }}
                  />
                </div>
              </div>
            ))}
          </div>
          
        
          <button 
            className="btn btn-primary position-absolute end-0 top-50 translate-middle-y z-10 " 
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