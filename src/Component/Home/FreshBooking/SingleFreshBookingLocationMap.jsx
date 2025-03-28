import React from "react";

export default function SingleFreshBookingLocationMap() {
  return (
    <>
      <div className="container py-5">
        
       
        <div className="row">
          <div className="col-md-6 mb-4">
          <h3 className=" mb-3 col Single-fresh-location-map-h3">Location Map</h3>
          <h2 className=" fw-bold  mb-5 Single-fresh-location-map-h2" style={{color: '#1D3557'}}>The DLF Primus</h2>
          
            <div className="">
              <ul className="list-unstyled d-flex flex-column gap-4 Single-fresh-location-map-list">
                <li className="d-flex  Single-fresh-location-map-li">
                  {" "}
                  <img src="/img/tick-list.svg" alt="tick" sizes="" srcSet="" />
                  Near to the Popular Schools, Hospitals and Shopping Malls
                </li>
                <li className="d-flex Single-fresh-location-map-li">
                  {" "}
                  <img src="/img/tick-list.svg" alt="tick" sizes="" srcSet="" />8 km
                  Distance from Rajiv Chowk Medicity
                </li>
                <li className="d-flex Single-fresh-location-map-li">
                  {" "}
                  <img src="/img/tick-list.svg" alt="tick" sizes="" srcSet="" />
                  25 km Distance from IGI Airport
                </li>
                <li className="d-flex  Single-fresh-location-map-li">
                  {" "}
                  <img src="/img/tick-list.svg" alt="tick" sizes="" srcSet="" />
                  Strategically loacted in Sector 82, Gurgaon
                </li>
                <li className="d-flex Single-fresh-location-map-li">
                  {" "}
                  <img src="/img/tick-list.svg" alt="tick" sizes="" srcSet="" />
                  Close Proximity to the Proposed Metro Station
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 single-fresh-map-img">
            <img
              style={{ transform: "scale(1)" }}
              src="/img/property-map.jpg"
              className="img-fluid rounded shadow"
              alt="map img"
            />
          </div>
        </div>
      </div>

      <div className="container mt-4 mb-5 ">
        <h3 className="mb-3 Single-fresh-site-map-h3">Site Map </h3>
        <h2 className="fw-bold  mb-5" style={{color: '#1D3557'}}>
          Master Plan Of DLF Primus
        </h2>
      </div>
      <div
        className="overflow-hidden"
        style={{ height: "500px", width: "80%", margin: "auto" }}
      >
        <img
          src="/img/site-map.png"
          alt="site map"
          className="img-fluid w-100 h-100 rounded shadow"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-12">
            <div
              className="d-flex flex-column flex-md-row align-items-center  position-relative overflow-hidden"
              style={{ minHeight: "600px" }}
            >
             
              <div
                className="position-absolute w-100 h-100"
              ></div>

       
            

             
              <div
                className="container position-relative"
                style={{ zIndex: 2 }}
              >
                <div className="row ">
                 

           
                  <div className="col-12 col-md-7 ps-md-5 ">
                    <h3 className="text-dark  single-fresh-builder-h3">Builder</h3>
                    <h2 className="fw-bold mb-4 single-fresh-builder-h2" style={{color:'#1D3557'}}>
                      About DLF The Primus
                    </h2>
                    <p className=" single-fresh-builder-p">
                      At DLF, we take pride in our uncompromising integrity in
                      customer engagement and quality assurance, and throughout
                      our 75-year legacy, we have made it our core mission to
                      provide real-estate development, management, and
                      investment services of the highest calibre.
                    </p>
                  </div>

                  <div className="col-12 col-md-5 mb-4 mb-md-0">
                    <div
                      className="card rounded-4 shadow overflow-hidden border-0 mx-auto mx-md-0"
                      style={{ maxWidth: "500px" }}
                    >
                      <img
                        src="/img/builder-discussion.png"
                        alt="DLF The Primus Building"
                        className="img-fluid"
                      />
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
