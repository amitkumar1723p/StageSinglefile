import React from 'react';
import "./SingleFreshBooking.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState , useEffect } from 'react'
export default function SingleFreshBookingAboutProject({projectHightlight , projectContent , project}) {

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true, // whether animation should happen only once
    });
  }, []);
  return (
    <>
    <div className='about-project-container'>
      {/* <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row align-items-center bg-light position-relative overflow-hidden" style={{ minHeight: '600px' }}>
            
              <div className="position-absolute w-100 h-100" style={{
                background: 'url("/img/pattern-bg.png")',
                zIndex: 0
              }}></div>

   
              <div className="single-fresh-curved-section position-absolute rounded-start d-sm-block"></div>

              <div className="container position-relative" style={{ zIndex: 2 }}>
                <div className="row align-items-center">
                
                  <div className="col-12 col-md-5 mb-4 mb-md-0">
                    <div className="card rounded-4 shadow overflow-hidden border-0 mx-auto mx-md-0" style={{ maxWidth: '500px' }}>
                      <img
                        src="/img/building12.jpg"
                        alt="DLF The Primus Building"
                        className="img-fluid"
                      />
                    </div>
                  </div>

     
                  <div className="col-12 col-md-7 ps-md-5">
                    <h3 className="text-dark mb-3" style={{fontSize: '21px'}}>About The Project</h3>
                    <h2 className=" fw-bold mb-4" style={{color: '#1D3557'}}>DLF The Primus</h2>
                    <p className="text-muted">
                      Trust is not bestowed easily but results from consistent
                      adherence to promises and a dedication to excellence. SS Group,
                      the foremost real estate developer in Gurugram with nearly three
                      decades of steadfast commitment, enjoys an impressive history
                      of successfully executing residential and commercial projects
                      within the city. This accomplishment stems from financial
                      acumen, engineering proficiency, and innovative design. Our
                      company ethos prioritizes the creation of people-centric
                      developments while also upholding environmental responsibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className='main-about-project-container ' style={{width:'100%', margin:'30px auto' , display:'flex' , justifyContent:"end", minHeight:'500px'}}>
        <div className='about-project-img'>
        
        </div>
        <div className='about-project-text-section border ' style={{ position:'relative' , width:'75%' , display:'flex' , justifyContent:"end" , borderRadius:'90px 0px 0px 90px', backgroundColor:'#bde4ff'}}>
        <img style={{ position:'absolute ' ,width:'500px', height:'auto ', left: '-230px',
    top:' 60px' , transform:'scale(0.95)' 
       }}
                        src="/img/building12.jpg"
                        alt="DLF The Primus Building"
                        className="img-fluid rounded-4"
                      />

                      <div className='' style={{width:'70%' , padding: '80px'}}>
                      <h3 className="text-dark mb-3" style={{fontSize: '22px'}} >About The Project</h3>
                    <h2 className=" fw-bold mb-4" style={{color: '#1D3557'}}>DLF The Primus</h2>
                    <p className="text-muted">
                      Trust is not bestowed easily but results from consistent
                      adherence to promises and a dedication to excellence. SS Group,
                      the foremost real estate developer in Gurugram with nearly three
                      decades of steadfast commitment, enjoys an impressive history
                      of successfully executing residential and commercial projects
                      within the city. This accomplishment stems from financial
                      acumen, engineering proficiency, and innovative design. Our
                      company ethos prioritizes the creation of people-centric
                      developments while also upholding environmental responsibility.
                    </p>
                      </div>
        
        </div>
      </div> */}

<div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row align-items-center bg-light position-relative overflow-hidden" style={{ minHeight: '600px' }}>
        
              <div className="position-absolute w-100 h-100" style={{
                background: 'url("/img/pattern-bg.png")',
                zIndex: 0
              }}></div>

            
              <div className="single-fresh-curved-section position-absolute" ></div>

           
              <div className="container position-relative" style={{ zIndex: 2 }}>
                <div className=" align-items-top Single-fresh-about-project-main">
               
                  <div className="col-12 col-md-5 mb-4 mb-md-0 mt-2 singel-fresh-about-project-img">
                    <div className=" Single-fresh-booking-about-img-main card rounded-4 shadow overflow-hidden border-0 mx-auto mx-md-0" >
                  <img  style={{width:'auto', height:'100%', objectFit:'cover'}} src= {projectHightlight?.url} alt="" />
                    </div>
                  </div>

                
                  <div className="col-12 col-md-7 ps-md-5 ">
                    <h3 className="text-dark mb-3 Single-fresh-about-project-h3" > About Project</h3>
                    <h2 className=" fw-bold mb-4 Single-fresh-about-project-h2" style={{color: '#1D3557'}}>{project?.projectName}</h2>
                    <p className="text-muted Single-fresh-about-project-p">
                    {projectContent}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


{/* --------------------------Highlights--------------------------------------------------------- */}
      <div className="container-fluid p-0"  >
        <div className="row g-0">
          <div className="col-12">
            <div className="d-flex flex-column flex-md-row align-items-center bg-light position-relative overflow-hidden" style={{ minHeight: '600px' }}>
        
              <div className="position-absolute w-100 h-100"    style={{
                background: 'url("/img/pattern-bg.png")',
                zIndex: 0
              }}></div>

            
              <div className="single-fresh-curved-section position-absolute" ></div>

           
              <div className="container position-relative" style={{ zIndex: 2 }}>
                <div className=" align-items-top Single-fresh-Highlight-main">
               
                  <div className="col-12 col-md-5 mb-4 mb-md-0">
                    <div className=" Single-fresh-booking-about-img-main  card rounded-4 shadow overflow-hidden border-0 mx-auto mx-md-0">
                      <img 
                        src= {projectHightlight?.url}
                        alt= {project?.projectName} 
                        className="img-fluid"
                        style={{width:'auto', height:'100%', objectFit:'cover'}}
                      />
                    </div>
                  </div>

                
                  <div className="col-12 col-md-7 ps-md-5">
                    <h3 className="text-dark mb-3 Single-fresh-highlights-h3" >Highlights</h3>
                    <h2 className=" fw-bold mb-4 Single-fresh-highlights-h2" style={{color: '#1D3557'}}>{project?.projectName}</h2>
                    <ul className="list-unstyled lh-base d-flex flex-column gap-3 Single-fresh-highlight-list">
                    {projectContent}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     </div>
    </>
  );
}