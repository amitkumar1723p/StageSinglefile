import React, { useState ,useEffect} from "react";

export default function SingleFreshBookingLocationMap({project ,
   siteMapContent , builderContent ,
    builderImage , loctionContent,
    sendDataToChild,projectLocation,
    LocationImageContent
  }) {



  const [selectedCategory, setSelectedCategory] = useState("conectivityLocation");

  const [activeState, setActiveState] = useState("");

useEffect(()=>{
sendDataToChild(selectedCategory)
},[selectedCategory])
// console.log(projectLocation,"kjdff")
// console.log(loctionContent,selectedCategory)
// console.log(projectLocation)
console.log(siteMapContent)
  return (
    <>
      <div className="container py-5">
         
        <div className="single-fresh-booking-locaitonmap-container ">
          <div className="col-md-6 mb-4">
          <h3 className=" mb-3 col Single-fresh-location-map-h3">Location Map</h3>
          <h2 className=" fw-bold  mb-2 Single-fresh-location-map-h2" style={{color: '#1D3557'}}>{project?.projectName}</h2>
          

          <div className="Single-fresh-info-section">
      {/* <div className="Single-fresh-map-buttons">
        <button onClick={() => setSelectedCategory("conectivityLocation")}> <img src="/img/single-fresh-map.svg" alt="" /> Connectivity</button>
        <button onClick={() => setSelectedCategory("hospitalsLocation")}> <img src="/img/single-fresh-map.svg" alt="" /> Hospitals</button>
        <button onClick={() => setSelectedCategory("schoolLocation")}> <img src="/img/single-fresh-map.svg" alt="" /> Schools</button>
        <button onClick={() => setSelectedCategory("shoppingLocation")}> <img src="/img/single-fresh-map.svg" alt="" /> Malls & Markets</button>
        <button onClick={() => setSelectedCategory("bussinessLocation")}> <img src="/img/single-fresh-map.svg" alt="" /> Office Spaces</button>
      </div> */}

      <div className="Single-fresh-map-buttons">
        <button onClick={() => setSelectedCategory("conectivityLocation")}> <img src="/img/single-fresh-map.svg" alt="" /> Connectivity</button>
        <button onClick={() => setSelectedCategory("hospitalsLocation")}> <img src="/img/single-fresh-map.svg" alt="" /> Hospitals</button>
        <button onClick={() => setSelectedCategory("schoolLocation")}> <img src="/img/single-fresh-map.svg" alt="" /> Schools</button>
        <button onClick={() => setSelectedCategory("shoppingLocation")}> <img src="/img/single-fresh-map.svg" alt="" /> Malls & Markets</button>
        <button onClick={() => setSelectedCategory("bussinessLocation")}> <img src="/img/single-fresh-map.svg" alt="" /> Office Spaces</button>
      </div>
      {/* {sendDataToChild.conectivityLocation== "conectivityLocation" && (
        <p>{conectivityLocation}</p>
      )} */}

      <hr></hr>
      <div className="info-content">
    {/* <h4>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h4> */}

    <ul className="list-unstyled Single-fresh-location-map-list">
       <li className="d-flex gap-2"> <img src="/img/tick-list.svg" alt="" /> {projectLocation} </li>
    </ul>
</div>
    </div>
          </div>
          <div className="freshbooking-location-image-container col-md-6 single-fresh-map-img">
            <img
              style={{ transform: "scale(1)" }}
              src={LocationImageContent?.url}
              className="img-fluid rounded shadow "
              alt="map img"
            />
          </div>
        </div>
      </div>

      <div className="container mt-4 mb-5 ">
        <h3 className="mb-3 Single-fresh-site-map-h3">Site Map </h3>
        <h2 className="fw-bold  mb-5" style={{color: '#1D3557'}}>
          Master Plan Of  {project?.projectName}
        </h2>
      </div>
      <div
        className="overflow-hidden"
        style={{ maxHeight: "500px", width: "80%", margin: "auto" }}
      >
        <img
          src={siteMapContent?.url}
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
                <div className="  ">
                  <div className="col-12 col-md-7  ">
                    <h3 className="text-dark  single-fresh-builder-h3">Builder</h3>
                    <h2 className="fw-bold  single-fresh-builder-h2" style={{color:'#1D3557'}}>
                      About {project?.projectName}
                    </h2>
                    
                  </div>
                  <div className="single-freshbooking-buildermap-container  w-100 justify-content-between">

                    <div className="single-freshbooking-builder-about d-flex align-items-center ">
                      <p className=" single-fresh-builder-p ">
                      {builderContent?.projectAboutBuilderContent}
                    </p>
                    </div>
            
                      <div
                      className="single-freshbooking-builder-image-container card rounded-4 shadow  overflow-hidden border-0 mx-auto mx-md-0"
                      style={{ maxWidth: "500px" }}
                    >
                      <img
                        src={builderImage?.url}
                        alt="DLF The Primus Building"
                        className="img-fluid w-auto h-100"
                        style={{objectFit:'cover'}}
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
