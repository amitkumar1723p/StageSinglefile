import React from 'react'
import { useState } from 'react';
import { Form, Button, Image } from "react-bootstrap";

export default function FreshBookingForm() {
    const projectType = ["Residential","Commercial" ]
    const projectAdType =["Apartment", "Residential Flats", "Plot/land", "WareHouse", "Villa", "Commercial", "Industrial", "Office Space", "Retail Space"]
    const otherRooms = ["Pooja Room","Study Room","Servent Room","Store Room"]
    const amanities = ["Club House","Swimming Pool","GYM","Community Centre","Security Guard","Maintenance Staff","Piped Gas","Visitor Parking","Lift","Park","Intercom Facility","Waste Disposal","Cafeteria/Food Court","Conference Room","Library","ATMs","Jogging Track","Kids Play Area"]
    const locationMap = ["Connectivity" ,"Hospital","Malls & Market","Office Spaces","Schools"]


    const [previewImage, setPreviewImage] = useState(null);
    const [cardImagePreview, setCardImagePriview] = useState(null);
    const [aboutProject, setAboutProject] = useState(null);
    const [handleProjectHighlight, setProjectHighLight] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [floorPlanUpload,setFloorPlanUpload] = useState ([]);
    const [sitePlan,setSitePlan] = useState(null);
    const [locationMapImage, setLocationMapImage] = useState(null);
    const [aboutBuidlder, setAboutBuilder] = useState(null);
    const [locationDetail, setLocationDetails] = useState("");
    const [locationDetailsList, setLocationDetailsList] = useState([]);


    


// -----------------------------------------------------------//
    const handleUploadImageLogo = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    const clearPreviewImage = () => {
      setPreviewImage(null);
    };
// -----------------------------------------------------------//

    const handleUploadCardImage = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCardImagePriview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    const clearCardImage = () => {
      setCardImagePriview(null);
    };
 // -----------------------------------------------------------//
   
 const handleAboutProject = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setAboutProject(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};
const clearAboutProjectImage = () => {
  setAboutProject(null);
};
// -----------------------------------------------------------//

   
const handleProjectHeighlight = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setProjectHighLight(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};
const clearProjecthighlight = () => {
  setProjectHighLight(null);
};

// -----------------------------------------------------------//

const handleGalleryImages = (event) => {
  const files = Array.from(event.target.files);
  const newImages = files.map((file) => URL.createObjectURL(file));
  setGalleryImages((prevImages) => [...prevImages, ...newImages]);
};

const handleDelete = (index) => {
  setGalleryImages(galleryImages.filter((_, i) => i !== index));
};

// -----------------------------------------------------------//

const handleFloorPlan = (event) => {
  const files = Array.from(event.target.files);
  const newImages = files.map((file) => URL.createObjectURL(file));
  setFloorPlanUpload((prevImages) => [...prevImages, ...newImages]);
};

const handleFloorPlanDelete = (index) => {
  setFloorPlanUpload(galleryImages.filter((_, i) => i !== index));
};


//---------------------------------------------------------------//
   
const handleSitePlanUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSitePlan(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};
const clearSitePlan = () => {
  setSitePlan(null);
};

//---------------------------------------------------------------//


const handleLocationMapImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setLocationMapImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};
const clearLocationMapImage = () => {
  setLocationMapImage(null);
};

const handleAddLocationDetails = () => {
  if (locationDetail.trim()) {
    setLocationDetailsList([...locationDetailsList, locationDetail]);
    setLocationDetails("");
  }
};


const handleRemove = (index) => {
  setLocationDetailsList(locationDetailsList.filter((_, i) => i !== index));
};

//---------------------------------------------------------------//

   
const handleAboutBuilder = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setAboutBuilder(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};
const clearAboutBuilder = () => {
  setAboutBuilder(null);
};

//---------------------------------------------------------------//

   



  return (
    <div className='d-flex flex-column gap-3  mx-auto' style={{width:'80%'}}>
         <div className=' text-center'> <h2 className='fs-4' style={{ color: "rgba(84, 84, 84, 1)" }}>Fresh Booking</h2></div>


{/* ------------------------------------------  Project Details Start  ------------------------------------------------ */}   

         <div className=' rounded-3 d-flex flex-column gap-3 p-3' style={{boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)"}}>
             <h2 className='fs-5' style={{ color: "rgba(84, 84, 84, 1) " }}>Project Details</h2>
             <div className='d-flex flex-column gap-2'>
            
                <div className=' p-2'>
                <p style={{ color: "#16315F" ,fontSize:'14px' }}>Property Segment*</p>
                <div className='d-flex flex-wrap'>
                {projectType.map((item,index) => {
                    return (
                    <button className='p-2 m-2 d-flex gap-2 rounded-2 bg-white' style={{ border: "2px solid rgba(198, 230, 255, 1)" }} >
                        {item}
                        <img  style={{ height: "18px", width: "auto" }} src='/img/plus-create.svg'></img>
                   </button>
                );
                })}</div>
                </div>
                <div className='d-flex flex-wrap gap-4 p-2 ' >
                    <div className='freshbooking-ProjectName '>
                        <p style={{ color: "#16315F",fontSize:'14px' }}>Project Name*</p>
                        <select className=' rounded-1 p-2'  style={{ border: "1px solid rgba(198, 230, 255, 1)" }} name="" id="">
                            <option >Project Name</option>
                            <option>One</option>
                            <option>Two</option>
                            <option>Three</option>
                        </select>
                    </div>
                    <div>
                    <p style={{ color: "#16315F",fontSize:'14px' }}>BHK Type*</p>
                        <select className=' rounded-1 p-2'  style={{ border: "1px solid rgba(198, 230, 255, 1)" }} name="" id="">
                            <option >Select BHK Type</option>
                            <option>One</option>
                            <option>Two</option>
                            <option>Three</option>
                        </select>
                    </div>
                    <div>
                        <p style={{ color: "#16315F",fontSize:'14px' }}>Sector*</p>
                        <input className=' rounded-1 p-2'  style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type="text" placeholder='e.g sector 86' />
                    </div>
                    <div>
                        <p style={{ color: "#16315F" ,fontSize:'14px' }}>City*</p>
                        <input className='rounded-1 p-2'  style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type="text" placeholder='e.g Titan' />
                    </div>
                </div>
                <div className='d-flex flex-wrap gap-4  p-2'>
                    <div>
                        <p style={{ color: "#16315F" ,fontSize:'14px' }}>Phone Number*</p>
                        <input className=' rounded-1 p-2'  style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' placeholder='e.g 9634755090'/>
                    </div>
                    <div>
                    <p style={{ color: "#16315F" ,fontSize:'14px' }}>Possession Status*</p>
                    <input className='  rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' placeholder='e.g 9'/>
                    </div>
                    <div>
                    <p style={{ color: "#16315F" ,fontSize:'14px' }}>Payment Plan*</p>
                    <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone'/>
                    </div>
                    <div>
                    <p style={{ color: "#16315F" ,fontSize:'14px' }}>RERA Id*</p>
                    <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone'  placeholder='e.g abcd123'/>
                    </div>
                </div>
                <div className=' p-2'>
                    <p style={{ color: "#16315F" ,fontSize:'14px'}}>Property Type*</p>
                    <div className='d-flex flex-wrap justify-center align-content-center'>
                    {projectAdType.map((item,index) => {
                    return (
                    <button className='p-2 m-2 d-flex gap-2 rounded-2 bg-white'style={{ border: "2px solid rgba(198, 230, 255, 1)" }} >
                        {item}
                        <img style={{ height: "18px", width: "auto" }} src='/img/plus-create.svg'></img>
                   </button>
                );
                })}
                </div>
                </div>
                <div className='d-flex flex-wrap gap-4  p-2'>
                    <div>
                        <p style={{ color: "#16315F",fontSize:'14px' }}>Total Land*</p>
                        <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }}  type='text'  placeholder='e.g 100 acres'/>
                    </div>
                    <div>
                    <p style={{ color: "#16315F" ,fontSize:'14px' }}>Total Tower*</p>
                    <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='e.g 1024 towers'/>
                    </div>
                    <div>
                    <p style={{ color: "#16315F",fontSize:'14px'}}>Total Units*</p>
                    <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='e.g 500'/>
                    </div>
                    <div>
                    <p style={{ color: "#16315F" ,fontSize:'14px'}}>Starting Price*</p>
                    <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='e.g 100 Cr'/>
                    </div>
                </div>


                    <div className="container mt-4">
                     <div className="d-flex justify-content-between" style={{gap:'20px'}}>
    
          <div className="mb-3" style={{width:'50%'}}>
            <label htmlFor="imageUpload" className="form-label fw-bold">Upload Image Logo*</label>
            
            <div className="position-relative ">
              <div
                style={{
                  borderWidth: '2px',
                  borderStyle: 'dashed',
                  borderColor: '#cce5ff',
                  borderRadius: '0.25rem',
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer',
                  minHeight: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',

                }}
              >
                <div style={{ color: '#6c757d' }}>
                  <i className="bi bi-upload fs-2"></i>
                </div>
                
                <div style={{ fontSize: '14px', color: '#0d6efd', marginTop: '0.5rem' }}>
                  Drag and drop or click to choose file
                </div>
                
                <div style={{ fontSize: '12px', color: '#6c757d', display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                  <i className="bi bi-info-circle me-1"></i>
                  Supported Format: JPEG, PNG, SVG
                </div>
                
                <input
                  type="file"
                  id="imageUpload"
                  className="position-absolute top-0 border start-0 w-100 h-100 opacity-0"
                  style={{ cursor: 'pointer' }}
                  accept=".jpg,.jpeg,.png,.svg"
                  onChange={handleUploadImageLogo}
                />
              </div>
            </div>
          </div>
       
        
        <div className="col-md-4">
          <div
            className="border rounded position-relative"
            style={{
              backgroundColor: '#e9ecef',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="img-fluid"
                style={{ maxHeight: '180px' }}
              />
            ) : (
              <img
                src="/img/PreviewImg.svg"
                alt="Preview"
             
                style={{ maxHeight: '180px' }}
              />
            )}
            
            {previewImage && (
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                style={{ backgroundColor: '#6c757d' }}
                aria-label="Close"
                onClick={ clearPreviewImage}
              ></button>
            )}
          </div>
        </div>
      </div>
    </div>


                    <div className="container mt-4">
      <div className="d-flex justify-content-between" style={{gap:'20px'}}>
    
          <div className="mb-3 " style={{width:'50%'}}>
            <label htmlFor="imageUpload" className="form-label fw-bold">Upload Card Image*</label>
            
            <div className="position-relative ">
              <div
                style={{
                  borderWidth: '2px',
                  borderStyle: 'dashed',
                  borderColor: '#cce5ff',
                  borderRadius: '0.25rem',
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer',
                  minHeight: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',

                }}
              >
                <div style={{ color: '#6c757d' }}>
                  <i className="bi bi-upload fs-2"></i>
                </div>
                
                <div style={{ fontSize: '14px', color: '#0d6efd', marginTop: '0.5rem' }}>
                  Drag and drop or click to choose file
                </div>
                
                <div style={{ fontSize: '12px', color: '#6c757d', display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                  <i className="bi bi-info-circle me-1"></i>
                  Supported Format: JPEG, PNG, SVG
                </div>
                
                <input
                  type="file"
                  id="imageUpload"
                  className="position-absolute border top-0 start-0 w-100 h-100 opacity-0"
                  style={{ cursor: 'pointer' }}
                  accept=".jpg,.jpeg,.png,.svg"
                  onChange={handleUploadCardImage}
                />
              </div>
            </div>
          </div>
       
        
        <div className="col-md-4">
          <div
            className="border rounded position-relative"
            style={{
              backgroundColor: '#e9ecef',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
             
            {cardImagePreview ? (
              <img
                src={cardImagePreview}
                alt="Preview"
                className="img-fluid"
                style={{ maxHeight: '180px' }}
              />
            ) : (
              <img
                src="/img/PreviewImg.svg"
                alt="Preview"
             
                style={{ maxHeight: '180px' }}
              />
            )}
            
            {cardImagePreview && (
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                style={{ backgroundColor: '#6c757d' }}
                aria-label="Close"
                onClick={clearCardImage}
              ></button>
            )}
          </div>
        </div>
      </div>
    </div>
                </div>

             </div>
{/* ------------------------------------------  Project Details end  ------------------------------------------------ */}   




{/* ------------------------------------------  About Project Start  ------------------------------------------------ */}   
             <div className=' rounded-3 d-flex flex-column gap-3 p-3'  style={{boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)"}}>
              <div >
                <h2  className='fs-5' style={{ color: "#16315F",fontSize:'14px' }} >About project</h2>
              </div>

              <div className='d-flex  gap-5'>

                <div>
                  <div>
                  <p style={{ color: "#16315F" ,fontSize:'14px'}}>Title*</p>
                  <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='About the project'/>
                  </div>
                  <div>
                  <p style={{ color: "#16315F" ,fontSize:'14px'}}>Project Description</p>
                  <textarea className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)", minHeight:'150px', minWidth:'250px', resize: "none"  }} type='text' placeholder='Project Description*'/>
                  </div>
              
                </div>

                <div  className="container mt-4">
                <div className="d-flex justify-content-between" style={{gap:'20px'}}>
    
          <div className="mb-3 " style={{width:'50%'}}>
            <label htmlFor="imageUpload" className="form-label fw-bold">Upload Card Image*</label>
            
            <div className="position-relative ">
              <div
                style={{
                  borderWidth: '2px',
                  borderStyle: 'dashed',
                  borderColor: '#cce5ff',
                  borderRadius: '0.25rem',
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer',
                  minHeight: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',

                }}
              >
                <div style={{ color: '#6c757d' }}>
                  <i className="bi bi-upload fs-2"></i>
                </div>
                
                <div style={{ fontSize: '14px', color: '#0d6efd', marginTop: '0.5rem' }}>
                  Drag and drop or click to choose file
                </div>
                
                <div style={{ fontSize: '12px', color: '#6c757d', display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                  <i className="bi bi-info-circle me-1"></i>
                  Supported Format: JPEG, PNG, SVG
                </div>
                
                <input
                  type="file"
                  id="imageUpload"
                  className="position-absolute border top-0 start-0 w-100 h-100 opacity-0"
                  style={{ cursor: 'pointer' }}
                  accept=".jpg,.jpeg,.png,.svg"
                  onChange={handleAboutProject}
                />
              </div>
            </div>
          </div>
       
        
        <div className="col-md-4">
          <div
            className="border rounded position-relative"
            style={{
              backgroundColor: '#e9ecef',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {aboutProject ? (
              <img
                src={aboutProject}
                alt="Preview"
                className="img-fluid"
                style={{ maxHeight: '180px' }}
              />
            ) : (
              <img
                src="/img/PreviewImg.svg"
                alt="Preview"
             
                style={{ maxHeight: '180px' }}
              />
            )}
            
            {aboutProject && (
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                style={{ backgroundColor: '#6c757d' }}
                aria-label="Close"
                onClick={clearAboutProjectImage}
              ></button>
            )}
          </div>
        </div>
      </div>
                </div>

      
              </div>
             </div>
{/* ------------------------------------------  About Project End  ------------------------------------------------ */} 




{/* ------------------------------------------ Project heighlights Start  ------------------------------------------------ */} 

             <div className=' rounded-3 d-flex flex-column gap-3 p-3'  style={{boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)"}}>
              <div >
                <h2  className='fs-5' style={{ color: "#16315F",fontSize:'14px' }} >project Heighlights</h2>
              </div>

              <div className='d-flex gap-5'>

                <div>
                  <div>
                  <p style={{ color: "#16315F" ,fontSize:'14px'}}>Title*</p>
                  <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='About the project'/>
                  </div>
                  <div>
                  <p style={{ color: "#16315F" ,fontSize:'14px'}}>Project Description</p>
                  <textarea className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)", minHeight:'150px', minWidth:'250px', resize: "none"  }} type='text'/>
                  </div>
              
                </div>

                <div  className="container mt-4">
                <div className="d-flex justify-content-between" >
    
          <div className="mb-3 " style={{width:'50%'}}>
            <label htmlFor="imageUpload" className="form-label fw-bold">Upload Card Image*</label>
            
            <div className="position-relative ">
              <div
                style={{
                  borderWidth: '2px',
                  borderStyle: 'dashed',
                  borderColor: '#cce5ff',
                  borderRadius: '0.25rem',
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer',
                  minHeight: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',

                }}
              >
                <div style={{ color: '#6c757d' }}>
                  <i className="bi bi-upload fs-2"></i>
                </div>
                
                <div style={{ fontSize: '14px', color: '#0d6efd', marginTop: '0.5rem' }}>
                  Drag and drop or click to choose file
                </div>
                
                <div style={{ fontSize: '12px', color: '#6c757d', display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                  <i className="bi bi-info-circle me-1"></i>
                  Supported Format: JPEG, PNG, SVG
                </div>
                
                <input
                  type="file"
                  id="imageUpload"
                  className="position-absolute border top-0 start-0 w-100 h-100 opacity-0"
                  style={{ cursor: 'pointer' }}
                  accept=".jpg,.jpeg,.png,.svg"
                  onChange={handleProjectHeighlight}
                />
              </div>
            </div>
          </div>
       
        
        <div className="col-md-4">
          <div
            className="border rounded position-relative"
            style={{
              backgroundColor: '#e9ecef',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {handleProjectHighlight ? (
              <img
                src={handleProjectHighlight}
                alt="Preview"
                className="img-fluid"
                style={{ maxHeight: '180px' }}
              />
            ) : (
              <img
              src="/img/PreviewImg.svg"
              alt="Preview"
           
              style={{ maxHeight: '180px' }}
            />
            )}
            
            {handleProjectHighlight && (
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                style={{ backgroundColor: '#6c757d' }}
                aria-label="Close"
                onClick={clearProjecthighlight}
              ></button>
            )}
          </div>
        </div>
      </div>
                </div>

      
              </div>
             </div>
{/* ------------------------------------------ Project heighlights End  ------------------------------------------------ */} 




{/* ------------------------------------------  Pricing Details Start  ------------------------------------------------ */}

             <div className=' rounded-3 d-flex flex-column gap-3 p-3'  style={{boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)"}}>
             <div >
                <h2  className='fs-5' style={{ color: "#16315F",fontSize:'14px' }}>Pricing Details</h2>
              </div>

              <div className='d-flex  flex-wrap gap-4  p-2'>
              <div>
                        <p style={{ color: "#16315F" ,fontSize:'14px' }}>Unit Type*</p>
                        <select className=' rounded-1 p-2'  style={{ border: "1px solid rgba(198, 230, 255, 1)" }} name="" id="">
                            <option >Select</option>
                            <option>One</option>
                            <option>Two</option>
                            <option>Three</option>
                        </select>
                    </div>
                    <div>
                    <p style={{ color: "#16315F" ,fontSize:'14px' }}>Unit Size*</p>
                    <input className='  rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' placeholder='e.g 9'/>
                    </div>
                    <div>
                    <p style={{ color: "#16315F" ,fontSize:'14px' }}>Unit Price*</p>
                    <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone'/>
                    </div>
              </div>

              <div>
              <p style={{ color: "#16315F" ,fontSize:'14px' }}>Other Rooms (optional)</p>

              <div className='d-flex flex-wrap justify-center align-content-center'>
                {otherRooms.map((item,index) => {
                  return (
                  <button className='p-2 m-2 d-flex gap-2 rounded-2 bg-white'style={{ border: "2px solid rgba(198, 230, 255, 1)" }} >
                    {item}
                    <img style={{ height: "18px", width: "auto" }} src='/img/plus-create.svg'></img>
                    </button>);})}
                    
                    
                </div>
              </div>
             </div>
{/* ------------------------------------------  Pricing Details Start  ------------------------------------------------ */}




{/* ------------------------------------------  Gallery Image Upload Start  ------------------------------------------------ */} 

<div className="rounded-3 d-flex flex-column gap-3 p-3 "   style={{boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)"}}>
      <h2  className='fs-5' style={{ color: "#16315F",fontSize:'14px'}}>Gallery Image Upload</h2>
      <div className=" position-relative p-4 text-center rounded" style={{
                  borderWidth: '2px',
                  borderStyle: 'dashed',
                  borderColor: '#cce5ff',
                  borderRadius: '0.25rem',
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer',
                  minHeight: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  width:"50%",
                  margin:"0 auto",
                }}>
        <input className='position-absolute border top-0 start-0 w-100 h-100 opacity-0' type="file" multiple accept="image/jpeg, image/png, image/svg+xml" onChange={handleGalleryImages} id="file-upload" />
        <label htmlFor="file-upload" className="d-block">
          <div className="text-center">
            <i className="bi bi-upload" style={{ fontSize: "2rem" }}></i>
            <p className="text-primary" style={{ cursor: "pointer" }}>Drag and drop or click to choose file</p>
            <small>Supported Format: JPEG, PNG, SVG</small>
          </div>
        </label>

     

      </div>
      <div className='w-100 d-flex ' style={{minHeight:'215px' }} >
      {galleryImages.length > 0 && (
        <div className="p-4 d-flex flex-wrap gap-3" >
          {galleryImages.map((src, index) => (
            <div key={index} className="position-relative" style={{ width: "150px" }}>
              <div className="border rounded p-2 bg-light position-relative">
                <img src={src} alt="Preview" className="img-fluid rounded" style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                style={{ backgroundColor: '#6c757d' }}
                aria-label="Close"
                  onClick={() => handleDelete(index)}
                >
                 
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      
    
    </div>
{/* ------------------------------------------  Gallery Image Upload End  ------------------------------------------------ */} 




{/* ------------------------------------------ Amenities Start  ------------------------------------------------ */} 

<div className=' rounded-3 d-flex flex-column gap-3 p-3'  style={{boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)"}}>
             <div >
                <h2  className='fs-5' style={{ color: "#16315F",fontSize:'14px' }}>Amenities</h2>
              </div>

              <div className='d-flex  flex-wrap gap-4  p-2'>
              <div>
                    <p style={{ color: "#16315F" ,fontSize:'14px' }}>Facilities*</p>
                    <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone'/>
                    </div>
              </div>

              <div>
            

              <div className='d-flex flex-wrap justify-center align-content-center'>
                {amanities.map((item,index) => {
                  return (
                  <button className='p-2 m-2 d-flex gap-2 rounded-2 bg-white'style={{ border: "2px solid rgba(198, 230, 255, 1)" }} >
                    {item}
                    <img style={{ height: "18px", width: "auto" }} src='/img/plus-create.svg'></img>
                    </button>);})}
                    
                    
                </div>
              </div>
             </div>
{/* ------------------------------------------ Amenities End  ------------------------------------------------ */} 




{/* ------------------------------------------ Floor Plan Upload Start  ------------------------------------------------ */} 

<div className="rounded-3 d-flex flex-column gap-3 p-3 "   style={{boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)"}}>
<h2  className='fs-5' style={{ color: "#16315F",fontSize:'14px'}}>Floor Plan Upload</h2>

      <div className='d-flex justify-content-between'>
      <div>
                    <p style={{ color: "#16315F" ,fontSize:'14px' }}>Title*</p>
                    <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" , Width:'250px' }} type='phone' placeholder='e.g 40BHK 12345SQFT'/>
                    </div>

      <div className=" position-relative p-4 text-center rounded" style={{
                  borderWidth: '2px',
                  borderStyle: 'dashed',
                  borderColor: '#cce5ff',
                  borderRadius: '0.25rem',
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer',
                  minHeight: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  width:"50%",
                  
                }}>
        <input className='position-absolute border top-0 start-0 w-100 h-100 opacity-0' type="file" multiple accept="image/jpeg, image/png, image/svg+xml" onChange={ handleFloorPlan} id="file-upload" />
        <label htmlFor="file-upload" className="d-block">
          <div className="text-center">
            <i className="bi bi-upload" style={{ fontSize: "2rem" }}></i>
            <p className="text-primary" style={{ cursor: "pointer" }}>Drag and drop or click to choose file</p>
            <small>Supported Format: JPEG, PNG, SVG</small>
          </div>
        </label>

     

      </div>
      </div>
     
      <div className='w-100 d-flex ' style={{minHeight:'215px' }} >
      {floorPlanUpload.length > 0 && (
        <div className="p-4 d-flex flex-wrap gap-3" >
          {floorPlanUpload.map((src, index) => (
            <div key={index} className="position-relative" style={{ width: "150px" }}>
              <div className="border rounded p-2 bg-light position-relative">
                <img src={src} alt="Preview" className="img-fluid rounded" style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                style={{ backgroundColor: '#6c757d' }}
                aria-label="Close"
                  onClick={() =>handleFloorPlanDelete(index)}
                >
                 
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      
    
    </div>
{/* ------------------------------------------  Floor Plan Upload End  ------------------------------------------------ */} 





{/* ------------------------------------------ Location Map Start  ------------------------------------------------ */} 
<div  className="rounded-3 d-flex flex-column gap-3 p-3 "   style={{boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)"}}>
               <div >
                <h2  className='fs-5' style={{ color: "#16315F",fontSize:'14px' }} >Location Map</h2>
              </div>

              <div className='d-flex flex-wrap'>
                {locationMap.map((item,index) => {
                    return (
                    <button className='p-2 m-2 d-flex gap-2 rounded-2 bg-white' style={{ border: "2px solid rgba(198, 230, 255, 1)" }} >
                        {item}
                        
                   </button>
                );
                })}</div>

                <div className='d-flex gap-3'>
                    <div>
                    <p style={{ color: "#16315F" ,fontSize:'14px' }}>select Category</p>
                    <input className='  rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='e.g Connectivity'/>
                    </div>
                    <div>
                    <p style={{ color: "#16315F" ,fontSize:'14px' }}>Location Details</p>
                    <input 
                    className=' rounded-1 p-2'
                     style={{ border: "1px solid rgba(198, 230, 255, 1)", width:'280px' }}  value={locationDetail}
                     onChange={(e) => setLocationDetails(e.target.value)}
                     type='text' 
                     placeholder='e.g Near to SPR'/>
                    </div>
                    <button  onClick={handleAddLocationDetails}  className='  ' style={{padding:'5px 35px 5px 35px'}}>Add</button>
                    
                </div>
                <div>
                <ul className="list-disc pl-5">
        {locationDetailsList.map((item, index) => (
          <li key={index} className="border-b p-2 list-unstyled " style={{fontSize:'12px', color:"#666"}} > 
            {item}
            <button className="mx-2 px-1" onClick={() => handleRemove(index)}>
              ❌
            </button>
          </li>

          
        ))}
      </ul>
                </div>

                <div  className="container mt-4 ">
                <div className="d-flex justify-content-between w-75">
    
          <div className="mb-3 " style={{width:'50%'}}>
            <label htmlFor="imageUpload" className="form-label fw-bold">Upload Card Image*</label>
            
            <div className="position-relative ">
              <div
                style={{
                  borderWidth: '2px',
                  borderStyle: 'dashed',
                  borderColor: '#cce5ff',
                  borderRadius: '0.25rem',
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer',
                  minHeight: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',

                }}
              >
                <div style={{ color: '#6c757d' }}>
                  <i className="bi bi-upload fs-2"></i>
                </div>
                
                <div style={{ fontSize: '14px', color: '#0d6efd', marginTop: '0.5rem' }}>
                  Drag and drop or click to choose file
                </div>
                
                <div style={{ fontSize: '12px', color: '#6c757d', display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                  <i className="bi bi-info-circle me-1"></i>
                  Supported Format: JPEG, PNG, SVG
                </div>
                
                <input
                  type="file"
                  id="imageUpload"
                  className="position-absolute border top-0 start-0 w-100 h-100 opacity-0"
                  style={{ cursor: 'pointer' }}
                  accept=".jpg,.jpeg,.png,.svg"
                  onChange={handleLocationMapImage}
                />
              </div>
            </div>
          </div>
       
        
        <div className="col-md-4">
          <div
            className="border rounded position-relative"
            style={{
              backgroundColor: '#e9ecef',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {locationMapImage ? (
              <img
                src={locationMapImage}
                alt="Preview"
                className="img-fluid"
                style={{ maxHeight: '180px' }}
              />
            ) : (
              <i className="bi bi-image fs-1 text-secondary"></i>
            )}
            
            {locationMapImage && (
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                style={{ backgroundColor: '#6c757d' }}
                aria-label="Close"
                onClick={clearLocationMapImage}
              ></button>
            )}
          </div>
        </div>
      </div>
                </div>


</div>
{/* ------------------------------------------ Location Map End  ------------------------------------------------ */} 



        

{/* ------------------------------------------ Site Plan Upload Start ------------------------------------------------ */} 
<div className=' rounded-3 d-flex flex-column gap-3 p-3'  style={{boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)"}}>
              <div >
                <h2  className='fs-5' style={{ color: "#16315F",fontSize:'14px' }} >Site Plan Upload</h2>
              </div>

              <div className='d-flex  gap-5'>

                <div>
                  <div>
                  <p style={{ color: "#16315F" ,fontSize:'14px'}}>Title*</p>
                  <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='e.g SiteMap'/>
                  </div>
                
              
                </div>

                <div  className="container mt-4">
                <div className="d-flex justify-content-between" style={{gap:'20px'}}>
    
          <div className="mb-3 " style={{width:'50%'}}>
            <label htmlFor="imageUpload" className="form-label fw-bold">Upload Card Image*</label>
            
            <div className="position-relative ">
              <div
                style={{
                  borderWidth: '2px',
                  borderStyle: 'dashed',
                  borderColor: '#cce5ff',
                  borderRadius: '0.25rem',
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer',
                  minHeight: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',

                }}
              >
                <div style={{ color: '#6c757d' }}>
                  <i className="bi bi-upload fs-2"></i>
                </div>
                
                <div style={{ fontSize: '14px', color: '#0d6efd', marginTop: '0.5rem' }}>
                  Drag and drop or click to choose file
                </div>
                
                <div style={{ fontSize: '12px', color: '#6c757d', display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                  <i className="bi bi-info-circle me-1"></i>
                  Supported Format: JPEG, PNG, SVG
                </div>
                
                <input
                  type="file"
                  id="imageUpload"
                  className="position-absolute border top-0 start-0 w-100 h-100 opacity-0"
                  style={{ cursor: 'pointer' }}
                  accept=".jpg,.jpeg,.png,.svg"
                  onChange={handleSitePlanUpload}
                />
              </div>
            </div>
          </div>
       
        
        <div className="col-md-4">
          <div
            className="border rounded position-relative"
            style={{
              backgroundColor: '#e9ecef',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {sitePlan ? (
              <img
                src={sitePlan}
                alt="Preview"
                className="img-fluid"
                style={{ maxHeight: '180px' }}
              />
            ) : (
              <i className="bi bi-image fs-1 text-secondary"></i>
            )}
            
            {sitePlan && (
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                style={{ backgroundColor: '#6c757d' }}
                aria-label="Close"
                onClick={clearSitePlan}
              ></button>
            )}
          </div>
        </div>
      </div>
                </div>

      
              </div>
             </div>
{/* ------------------------------------------ Site Plan Upload End  ------------------------------------------------ */} 





{/* ------------------------------------------ About Builder Start ------------------------------------------------ */} 
<div className=' rounded-3 d-flex flex-column gap-3 p-3'  style={{boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)"}}>
              <div >
                <h2  className='fs-5' style={{ color: "#16315F",fontSize:'14px' }} >About Builder</h2>
              </div>

              <div className='d-flex  gap-5'>

                <div>
                  <div>
                  <p style={{ color: "#16315F" ,fontSize:'14px'}}>Title*</p>
                  <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='About the project'/>
                  </div>
                
                  <div>
                  <p style={{ color: "#16315F" ,fontSize:'14px'}}>Project Description</p>
                  <textarea className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)", minHeight:'150px', minWidth:'250px', resize: "none"  }} type='text'/>
                  </div>
                </div>

                <div  className="container mt-4">
                <div className="d-flex justify-content-between" style={{gap:'20px'}}>
    
          <div className="mb-3 " style={{width:'50%'}}>
            <label htmlFor="imageUpload" className="form-label fw-bold">Upload Card Image*</label>
            
            <div className="position-relative ">
              <div
                style={{
                  borderWidth: '2px',
                  borderStyle: 'dashed',
                  borderColor: '#cce5ff',
                  borderRadius: '0.25rem',
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer',
                  minHeight: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.5rem',

                }}
              >
                <div style={{ color: '#6c757d' }}>
                  <i className="bi bi-upload fs-2"></i>
                </div>
                
                <div style={{ fontSize: '14px', color: '#0d6efd', marginTop: '0.5rem' }}>
                  Drag and drop or click to choose file
                </div>
                
                <div style={{ fontSize: '12px', color: '#6c757d', display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
                  <i className="bi bi-info-circle me-1"></i>
                  Supported Format: JPEG, PNG, SVG
                </div>
                
                <input
                  type="file"
                  id="imageUpload"
                  className="position-absolute border top-0 start-0 w-100 h-100 opacity-0"
                  style={{ cursor: 'pointer' }}
                  accept=".jpg,.jpeg,.png,.svg"
                  onChange={handleAboutBuilder}
                />
              </div>
            </div>
          </div>
       
        
        <div className="col-md-4">
          <div
            className="border rounded position-relative"
            style={{
              backgroundColor: '#e9ecef',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {aboutBuidlder ? (
              <img
                src={aboutBuidlder}
                alt="Preview"
                className="img-fluid"
                style={{ maxHeight: '180px' }}
              />
            ) : (
              <i className="bi bi-image fs-1 text-secondary"></i>
            )}
            
            {aboutBuidlder && (
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                style={{ backgroundColor: '#6c757d' }}
                aria-label="Close"
                onClick={clearAboutBuilder}
              ></button>
            )}
          </div>
        </div>
      </div>
                </div>

      
              </div>
             </div>
{/* ------------------------------------------ About Builder End  ------------------------------------------------ */} 


         </div>

  )
}


