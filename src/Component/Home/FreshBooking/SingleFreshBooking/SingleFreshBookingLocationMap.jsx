import React, { useState ,useEffect} from "react";

export default function SingleFreshBookingLocationMap({project ,
   siteMapContent , builderContent ,
    builderImage , loctionContent,
    sendDataToChild,projectLocation,
    LocationImageContent
  }) {
   const [zoomedImage, setZoomedImage] = useState(null);

// console.log(projectLocation,"jk")

  const [selectedCategory, setSelectedCategory] = useState("conectivityLocation");

  const [activeState, setActiveState] = useState("");

useEffect(()=>{
  if (sendDataToChild) {
    sendDataToChild(selectedCategory);
  }
}, [selectedCategory, sendDataToChild]);


// const locationItems = projectLocation && projectLocation[selectedCategory] ? projectLocation[selectedCategory] : [];
// console.log(projectLocation,"kjdff")
// console.log(loctionContent,selectedCategory)
// console.log(projectLocation)
// console.log(siteMapContent)
  return (
    <>
    <div className="container py-5">
        <div className="single-fresh-booking-locationmap-container">
          <div className="col-md-6 mb-4">
            <h3 className="mb-3 col Single-fresh-location-map-h3">Location Map</h3>
            <h2 className="fw-bold mb-2 Single-fresh-location-map-h2" >{project?.projectName}</h2>

            <div className="Single-fresh-info-section">
              <div className="Single-fresh-map-buttons">
              <button 
                  className={`custom-button ${selectedCategory === "conectivityLocation" ? "active" : ""}` } 
                  onClick={() => setSelectedCategory("conectivityLocation")}
                >
                  <img src="/img/single-fresh-map.svg" alt="arrow-svg" /> Connectivity
                </button>
                <button 
                  className={`custom-button ${selectedCategory === "hospitalsLocation" ? "active" : ""}`}
                  onClick={() => setSelectedCategory("hospitalsLocation")}
                >
                  <img src="/img/single-fresh-map.svg" alt="arrow-svg" /> Hospitals
                </button>
                <button 
                  className={`custom-button ${selectedCategory === "schoolLocation" ? "active" : ""}`}
                  onClick={() => setSelectedCategory("schoolLocation")}
                >
                  <img src="/img/single-fresh-map.svg" alt="arrow-svg" /> Schools
                </button>
                <button 
                  className={`custom-button ${selectedCategory === "shoppingLocation" ? "active" : ""}`}
                  onClick={() => setSelectedCategory("shoppingLocation")}
                >
                  <img src="/img/single-fresh-map.svg" alt="arrow-svg" /> Malls & Markets
                </button>
                <button 
                  className={`custom-button ${selectedCategory === "bussinessLocation" ? "active" : ""}`}
                  onClick={() => setSelectedCategory("bussinessLocation")}
                >
                  <img src="/img/single-fresh-map.svg" alt="arrow-svg" /> Office Spaces
                </button>
              </div>

              <hr />
              <div className="info-content">
             {projectLocation && projectLocation.length > 0 && Array.isArray(projectLocation[0]) && (
  <ul className="list-unstyled Single-fresh-location-map-list">
    {projectLocation[0].map((item, index) => (
      <li className="d-flex gap-2" key={index} style={{lineHeight: '26px', marginBottom: '20px'}}>
        <img src="/img/tick-list.svg" alt="tick-svg"    style={{height: 'fitcontent'}}/>
        {item}
      </li>
    ))}
  </ul>
)}
              </div>
            </div>
          </div>
          <div className="freshbooking-location-image-container col-md-6 single-fresh-map-img">
            <img
              // style={{ transform: "scale(0.7)" }}
              src={LocationImageContent?.url}
              onClick={() => setZoomedImage(LocationImageContent?.url)}
              className="img-fluid rounded shadow" style={{height: '100%' , cursor: 'pointer'}}
              alt="map img"
            />
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
      <div className="single-fresh-booking-sitemap-container w-100  m-auto" style={{backgroundColor:'#F7F7F7'}}>

      <div className="container mt-2 mb-2 ">
        <h3 className="mb-1 Single-fresh-site-map-h3">Site Map </h3>
        <h2 className="fw-bold  mb-5 Single-fresh-site-map-h2" >
          Master Plan Of  {project?.projectName}
        </h2>
      </div>
      <div
        className="overflow-hidden d-flex align-items-center justify-content-center"
        style={{  width: "90%", margin: "auto", boxShadow: '0px 0px 20px #8f8f8f',borderRadius: '15px' }}
      >
        <img
          src={siteMapContent?.url}
          alt="site map"
        
          className="img-fluid w-100 h-100 rounded shadow"
          style={{ objectFit: "cover" }}
        />
      </div>

      </div>



      {/* <div className="container-fluid p-0">
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
                 
                  <div className="single-freshbooking-buildermap-container  w-100 justify-content-between">

                    <div className="single-freshbooking-builder-about  ">
                    <h3 className="text-dark  single-fresh-builder-h3">Builder</h3>
                    <h2 className="fw-bold  single-fresh-builder-h2" style={{color:'#1D3557'}}>
                      About {project?.projectName}
                    </h2>
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
      </div> */}
    </>
  );
}
