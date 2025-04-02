import React from 'react'
import { useState } from 'react';
import { Form, Button, Image } from "react-bootstrap";
import { createfreshProjectAction } from '../../../Action/freshProjectAction';
import { useDispatch } from 'react-redux';
import './FreshBookingForm.css'

export default function FreshBookingForm() {
    const dispatch = useDispatch()

  
    const [inputValue, setInputValue] = useState("");
    const [items, setItems] = useState([]);

    const handleAddProjectHighlights = () => {
      if (inputValue.trim() !== "") {
        setItems([...items, inputValue]);
        setInputValue(""); // Clear input field after adding
        
      }
    };
    const handleDeleteProjectHighlight = (index) => {
        setItems(items.filter((_, i) => i !== index)); // Remove item at the given index
      };
    const projectType = ["Residential", "Commercial"]

    const projectAdTypeResidential = ["Apartment", "Residential Flats", "Plot/land", "Villa", "Farm House", "Independent Floors"]
    const projectAdTypeCommercial = ["WareHouse", "Office", "Plot/land", "Retail Space"]
    const otherRooms = ["Pooja Room", "Study Room", "Servent Room", "Store Room"]
    const amanities = ["Club House", "Swimming Pool", "GYM", "Community Centre", "Security Guard", "Maintenance Staff", "Piped Gas", "Visitor Parking", "Lift", "Park", "Intercom Facility", "Waste Disposal", "Cafeteria/Food Court", "Conference Room", "Library", "ATMs", "Jogging Track", "Kids Play Area"]
    const locationMap = ["shoppingLocation", "conectivityLocation", "hospitalsLocation", "bussinessLocation", "schoolLocation"]


    const [previewImage, setPreviewImage] = useState(null);
    const [cardImagePreview, setCardImagePriview] = useState(null);
    const [aboutProject, setAboutProject] = useState(null);
    const [handleProjectHighlight, setProjectHighLight] = useState(null);

    const [galleryImages, setGalleryImages] = useState([]);
    const [floorPlanUpload, setFloorPlanUpload] = useState([]);
    const [sitePlan, setSitePlan] = useState(null);
    const [locationMapImage, setLocationMapImage] = useState(null);
    const [aboutBuidlder, setAboutBuilder] = useState(null);
    const [locationDetail, setLocationDetails] = useState("");
    const [locationDetailsList, setLocationDetailsList] = useState([]);
    const [locationKey, setLocationKey] = useState()




    // -----------------------------------------------------------//
    const handleUploadImageLogo = (event) => {
        const file = event.target.files[0];

        //  setFromData({...formData,projectLogoImage:{projectLogoImage:file}})
        if (file) {

            setFromData({
                ...formData,
                projectLogoImage: file
            });

            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const clearPreviewImage = () => {
        setPreviewImage(null);
        console.log(formData)
        setFromData({});
    };

    // -----------------------------------------------------------//

    const handleUploadCardImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFromData({
                ...formData,
                bannerImage: file
            });
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
            setFromData({ ...formData, projectAboutBuilderImage: file  })

            const reader = new FileReader();
            reader.onload = (e) => {
                setAboutProject(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const clearAboutProjectImage = () => {
        setAboutProject(null);
        setFromData({ ...formData, projectAboutBuilder: { ...formData.projectAboutBuilder, projectAboutBuilderImage: undefined } })
    };
    // -----------------------------------------------------------//


    const handleProjectHeighlight = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFromData({ ...formData,  hightlightImage: file  })
            const reader = new FileReader();
            reader.onload = (e) => {
                setProjectHighLight(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const clearProjecthighlight = () => {
        setProjectHighLight(null);
        setFromData({ ...formData, projectHightlight: { ...formData.projectHightlight, hightlightImage: undefined } })
    };

    // -----------------------------------------------------------//

    const handleGalleryImages = (event) => {
        const files = Array.from(event.target.files);

        const newImages = files.map((file) => URL.createObjectURL(file));
        const copyObject = { ...formData };

        files.map((item) => {

            if (!copyObject.projectGallery) {
                copyObject.projectGallery = [item]
            } else {
                copyObject.projectGallery.push(item)
            }

        })

        setFromData(copyObject)
        setGalleryImages((prevImages) => [...prevImages, ...newImages]);

    };

    const handleDelete = (index) => {
        setGalleryImages(galleryImages.filter((_, i) => i !== index));
        const updateGallery = [...formData.projectGallery]
        updateGallery.splice(index, 1)
        setFromData({ ...formData, projectGallery: updateGallery })
    };

    // -----------------------------------------------------------//

    const handleFloorPlan = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        const copyObject = { ...formData };

        files.map((item) => {

            if (!copyObject.projectFloorplan) {
                copyObject.projectFloorplan = [item]
            } else {
                copyObject.projectFloorplan.push(item)
            }

        })

        setFromData(copyObject)
        setFloorPlanUpload((prevImages) => [...prevImages, ...newImages]);
    };

    const handleFloorPlanDelete = (index) => {

        setFloorPlanUpload(floorPlanUpload.filter((_, i) => i !== index));
        const updatedFloorPlan = [...formData.projectFloorplan]
        updatedFloorPlan.splice(index, 1)
        setFromData({ ...formData, projectFloorplan: updatedFloorPlan })
    };


    //---------------------------------------------------------------//

    const handleSitePlanUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFromData({ ...formData, projectSitemap: file })
            const reader = new FileReader();
            reader.onload = (e) => {
                setSitePlan(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const clearSitePlan = () => {
        setSitePlan(null);
        setFromData({ ...formData, projectSitemap: undefined })
    };

    //---------------------------------------------------------------//


    const handleLocationMapImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFromData({
                ...formData,
               locationImage: file 
            });
            const reader = new FileReader();
            reader.onload = (e) => {
                setLocationMapImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const clearLocationMapImage = () => {
        setLocationMapImage(null);
        setFromData({
            ...formData,
            projectLocation: { ...formData.projectLocation, locationImage: undefined }
        });
    };


    const handleAddLocationDetails = () => {
        // console.log(locationDetail)
        if (locationDetail.trim()) {
            let key = locationKey;

            setLocationDetailsList([...locationDetailsList, locationDetail]);


            setFromData({ ...formData, projectLocation: { ...(formData.projectLocation || []), [key]: [...(formData.projectLocation?.[key] || []), [key] = locationDetail] } })
            setLocationDetails("");
        }
    };


    const handleRemove = (index) => {
        // setLocationDetailsList(locationDetailsList.filter((_, i) => i !== index));

        const updatedLocation = [...formData.projectLocation?.[locationKey]];
        updatedLocation.splice(index, 1)
        setFromData({ ...formData, projectLocation: { ...formData.projectLocation, [locationKey]: updatedLocation } })
    };

    //---------------------------------------------------------------//


    //--------------------------------------------------------project size and price-----//
    const [formData, setFromData] = useState({})


    const [projectSize, setProjectSize] = useState({})
    const handleAddProjectSize = () => {
        const copyObject = { ...formData };

        // Check if projectPriceSize exists, otherwise initialize it as an empty array

        if (projectSize?.type) {
            if (!copyObject.projectPriceSize) {
                copyObject.projectPriceSize = [projectSize];
            } else {
                copyObject.projectPriceSize.push(projectSize);
            }
        }

        // Update the form state
        setProjectSize({});
        setFromData(copyObject);
    };
    const handleAddProjectSizeRemove = (index) => {

        const updatedArray = [...formData?.projectPriceSize]
        updatedArray.splice(index, 1)
        setFromData({ ...formData, projectPriceSize: updatedArray })
    }

    // console.log(formData,"helo")

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    
    //     dispatch(createfreshProjectAction(formData));
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    
    //     const formDataNew = new FormData(e.target);
    
     
    //     // Add other basic details as needed...
    // console.log(formData.projectLogoImage)
    //     // Append files
    //     if (formData.projectLogoImage) {
    //         formDataNew.append('projectLogoImage', formData.projectLogoImage[0]);
    //     }
    //     if (formData.bannerImage) {
    //         formDataNew.append('bannerImage', formData.bannerImage);
    //     }
    //     if (formData.projectGallery) {
    //         formData.projectGallery.forEach((file) => {
    //             formDataNew.append('projectGallery', file);
    //         });
    //     }
    //     if (formData.projectFloorplan) {
    //         formData.projectFloorplan.forEach((file) => {
    //             formDataNew.append('projectFloorplan', file);
    //         });
    //     }
    //     if (formData.projectSitemap) {
    //         formDataNew.append('projectSitemap', formData.projectSitemap);
    //     }
    //     if (formData.locationImage) {
    //         formDataNew.append('locationImage', formData.locationImage);
    //     }
    //     if (formData.projectAboutBuilderImage) {
    //         formDataNew.append('projectAboutBuilderImage', formData.projectAboutBuilderImage);
    //     }
    //     if (formData.hightlightImage) {
    //         formDataNew.append('hightlightImage', formData.hightlightImage);
    //     }
   
    //     // Add other fields as needed...
    
    //     // Dispatch the action
    //     dispatch(createfreshProjectAction(formDataNew));
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formDataNew = new FormData(e.target);
    
        // Append basic details
        formDataNew.append('projectBasicDetail', JSON.stringify(formData.projectBasicDetail) );
     
        // Append files
        if (formData.projectLogoImage) {
            formDataNew.append('projectLogoImage', formData.projectLogoImage);
        }
        if (formData.bannerImage) {
            formDataNew.append('bannerImage', formData.bannerImage);
        }
        if (formData.projectGallery) {
            formData.projectGallery.forEach((file) => {
                formDataNew.append('projectGallery', file);
            });
        }
        if (formData.projectFloorplan) {
            formData.projectFloorplan.forEach((file) => {
                formDataNew.append('projectFloorplan', file);
            });
        }
        if (formData.projectSitemap) {
            formDataNew.append('projectSitemap', formData.projectSitemap);
        }
          // Append project BuilderImage
        if (formData.projectAboutBuilderImage) {
            formDataNew.append('projectAboutBuilderImage', formData.projectAboutBuilderImage);
        }
        if (formData.projectAboutBuilder) {
            formDataNew.append('projectAboutBuilder',JSON.stringify( formData.projectAboutBuilder));
        }
       // Append project hightlightImage
        if (formData.hightlightImage) {
            formDataNew.append('hightlightImage', formData.hightlightImage);
        }
      
        if (formData.projectHightlight) {
            formDataNew.append('projectHightlight',JSON.stringify( formData.projectHightlight));
        }


        if (formData.locationImage) {
            formDataNew.append('locationImage', formData.locationImage);
        }
    
    
    
        // Append project amenities
        if (formData.projectAmenities) {
            formData.projectAmenities.forEach((amenity) => {
                formDataNew.append('projectAmenities', amenity);
            });
        }
        if (formData?.projectLocation) {
            Object.keys(formData.projectLocation).forEach((key) => {
                const locationDetails = formData?.projectLocation[key];
                
                // Check if locationDetails is an array before calling forEach
                if (Array.isArray(locationDetails)) {
                    locationDetails.forEach((locationDetail) => {
                        formDataNew.append(`projectLocation[${key}]`, locationDetail);
                    });
                } else if (locationDetails) {
                    // If it's not an array but exists, append it as a single value
                    formDataNew.append(`projectLocation[${key}]`, locationDetails);
                }
            });
        }
    
        // Append project price size
        if (formData.projectPriceSize) {
            formData.projectPriceSize.forEach((size) => {
                formDataNew.append('projectPriceSize[]', JSON.stringify(size)); // Use JSON.stringify if you want to send as an object
            });
        }
    
        // Append project meta
        if(formData.projectMeta){
            formDataNew.append(  "projectMeta",JSON.stringify(formData.projectMeta))
        }
         // Append project meta
         if(formData.projectManagerContact){
            formDataNew.append(  "projectManagerContact",JSON.stringify(formData.projectManagerContact))
        }
        // Dispatch the action
        dispatch(createfreshProjectAction(formDataNew));
    };
 
    return (

        <div className='freshbooking-main-container d-flex flex-column gap-3  my-3 mx-auto' >
            <div className=' text-center'> <h2 className='fs-4' style={{ color: "rgba(84, 84, 84, 1)" }}>Fresh Booking</h2></div>

            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                {/* ------------------------------------------  Project Details Start  ------------------------------------------------ */}

                <div className=' rounded-3 d-flex flex-column gap-3 p-3' style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <h2 className='fs-5' style={{ color: "rgba(84, 84, 84, 1) " }}>Project Details</h2>
                    <div className='d-flex flex-column gap-2'>

                        <div className=' p-2'>
                            <p style={{ color: "#16315F", fontSize: '14px' }}>Property Segment*</p>
                            <div className='d-flex flex-wrap'>
                                {projectType.map((item, index) => {
                                    return (
                                        <div key={index} onClick={() => {
                                            setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, projectType: item, projectAdType: '' } })

                                        }} className={`project-details-button p-2 m-2 d-flex align-items-center gap-2 rounded-2 bg-white ${formData.projectBasicDetail?.projectType === item ? "select " : ""}`} style={{ cursor: "pointer",outline:formData.projectBasicDetail?.projectType === item ? "2px solid #1877f2" : "2px solid rgb(198, 230, 255)"       }} >
                                            <p style={{fontSize:'14px'}}>{item}</p>
                                            <img style={{ width: "15px" }} src={`${formData.projectBasicDetail?.projectType === item ? "/img/white-tick.svg" : "/img/plus-create.svg"}`  }></img>
                                        </div>
                                    );
                                })}</div>
                        </div>

                        <div className='d-flex flex-wrap gap-4 p-2 ' >
                            <div className='freshbooking-ProjectName '>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Project Name*</p>

                                <input type="text"
                                    onChange={(e) =>  { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, projectName: e.target.value } }) }}
                                    name="projectName" id="" className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} placeholder='e.g DLF Corporate Greens' />

                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Project Status*</p>
                                <select className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} name="projectStatus" id="" value={formData?.projectBasicDetail?.projectStatus?.trimStart() || ""} onChange={(e) => setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, projectStatus: e.target.value } })
                                }>
                                    <option value={""}>Select Project Status</option>
                                    <option value={"Ready to Move"}>Ready to Move</option>
                                    <option value={"Under Construction"}>Under Construction</option>
                                    <option value={"New Launch"}>New Launch</option>
                                    <option value={"Upcoming"}>Upcoming</option>

                                </select>

                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Locality*</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type="text" placeholder='e.g Sector 74A'
                                    onChange={(e) => setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, locality: e.target.value } })} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>City*</p>
                                <input className='rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type="text" placeholder='e.g Gurugram'
                                    onChange={(e) => setFromData({
                                        ...formData, projectBasicDetail: {
                                            ...formData.projectBasicDetail, projectCity: e.target.value
                                        }
                                    })} />
                            </div>
                        </div>
                        <div className='d-flex flex-wrap gap-4  p-2'>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Minimum Price (In CR)*</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' placeholder='e.g 2.6' required onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, minPrice: e.target.value } }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Maximum Price (In CR)*</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' placeholder='e.g 5.7' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, maxPrice: e.target.value } }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Possession Year</p>
                                <input className='  rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' placeholder='e.g 2077' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, possessionStatus: e.target.value } }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Payment Plan</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' placeholder='e.g  50|50  30|70' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, projectPaymentPlan: e.target.value } }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>RERA Id (optional)</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' placeholder='e.g abcd123' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, projectReraId: e.target.value } }) }} />
                            </div>
                        </div>

                        <div className='d-flex flex-wrap gap-4  p-2'>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Total Land (In Acres)*</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='e.g 8' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, totalLandArea: e.target.value } }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Total Tower*</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='e.g 4' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, towerNumber: e.target.value } }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Total Units*</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='e.g 340' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, totalUnit: e.target.value } }) }} />
                            </div>

                        </div>

                        <div className=' p-2'>
                            <p style={{ color: "#16315F", fontSize: '14px' }}>Property Type*</p>
                            <div className='d-flex flex-wrap justify-center align-content-center'>
                                {formData.projectBasicDetail?.projectType === "Residential" ?
                                    <>
                                        {projectAdTypeResidential.map((item, index) => {
                                            return (
                                                <div key={index} className={`p-2 m-2 d-flex gap-2 rounded-2 bg-white  ${formData?.projectBasicDetail?.projectAdType === item ? "select" : ""}`}  style={{ cursor: "pointer",outline:formData.projectBasicDetail?.projectAdType === item ? "2px solid #1877f2" : "2px solid rgb(198, 230, 255)"       }}
                                                    onClick={() => setFromData({
                                                        ...formData
                                                        , projectBasicDetail: { ...formData.projectBasicDetail, projectAdType: item }
                                                    })} >
                                                    <p style={{fontSize:'14px'}}>{item}</p>
                                                    <img style={{ width: "15px" }} src={`${formData.projectBasicDetail?.projectAdType === item ? "/img/white-tick.svg" : "/img/plus-create.svg"}`  } ></img>
                                                </div>
                                            );
                                        })}
                                    </> :
                                    <>
                                        {projectAdTypeCommercial.map((item, index) => {
                                            return (
                                                <div key={index} className={`p-2 m-2 d-flex gap-2 rounded-2 bg-white  ${formData?.projectBasicDetail?.projectAdType === item ? "select" : ""}`} style={{ cursor: "pointer",outline:formData.projectBasicDetail?.projectAdType === item ? "2px solid #1877f2" : "2px solid rgb(198, 230, 255)" }}
                                                 onClick={() => setFromData({
                                                    ...formData
                                                    , projectBasicDetail: { ...formData.projectBasicDetail, projectAdType: item }
                                                })} >
                                                    <p style={{fontSize:'14px'}}>{item}</p>
                                                    <img style={{ width: '15px' }}  src={`${formData.projectBasicDetail?.projectAdType === item ? "/img/white-tick.svg" : "/img/plus-create.svg"}`  } ></img>
                                                </div>
                                            );
                                        })}
                                    </>
                                }
                            </div>
                        </div>

                        <div className="container mt-4">
                            <div className="upload-image-container d-flex  justify-content-between">

                                <div className="upload-image-dragdrop-container w-100">
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
                                                //   value={formData?.projectLogoImage} 
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
                                            height: '188px',
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
                                            <div
                                                type="div"
                                                className="btn-close position-absolute top-0 end-0 m-2"
                                                style={{ backgroundColor: '#6c757d' }}
                                                aria-label="Close"
                                                onClick={clearPreviewImage}
                                            ></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="container mt-4">
                            <div className="upload-image-container d-flex justify-content-between" >

                                <div className="upload-image-dragdrop-container w-100 ">
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
                                            height: '188px',
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
                                            <div
                                                type="div"
                                                className="btn-close position-absolute top-0 end-0 m-2"
                                                style={{ backgroundColor: '#6c757d' }}
                                                aria-label="Close"
                                                onClick={clearCardImage}
                                            ></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* ------------------------------------------  Project Details end  ------------------------------------------------ */}




                {/* ------------------------------------------ Project About Start  ------------------------------------------------ */}

                <div className=' rounded-3 d-flex flex-column gap-3 p-3' style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <div >
                        <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }} >About Project</h2>
                    </div>

                    <div className='freshbooking-project-highlight-main-coctainer d-flex gap-2 justify-content-between'>

                        <div className='freshbooking-projekt-highlight-container'>

                            <div className='freshbooking-highlights-description'>
                                <p className="mb-2" style={{ color: "#16315F", fontSize: '14px' }}>Project Description</p>
                                <textarea placeholder="Enter your message here..." className=' rounded-1 w-100 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)", minHeight: '155px', resize: "none" }} type='text' onChange={(e) => { setFromData({ ...formData, projectHightlight: { ...formData.projectHightlight, hightlightContent: e.target.value } }) }} />
                            </div>

                        </div>

                       
                            <div className="freshbooking-highlight-image-upload-container d-flex justify-content-between gap-4" >

                                <div className="upload-image-dragdrop-container mb-3 " >
                                    <label htmlFor="imageUpload" className="form-label fw-bold">Upload Highlights Image*</label>

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


                                <div className="upload-image-container col-md-4">
                                    <div
                                        className="border rounded position-relative"
                                        style={{
                                            backgroundColor: '#e9ecef',
                                            height: '188px',
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
                                            <div
                                                type="div"
                                                className="btn-close position-absolute top-0 end-0 m-2"
                                                style={{ backgroundColor: '#6c757d' }}
                                                aria-label="Close"
                                                onClick={clearProjecthighlight}
                                            ></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        


                    </div>
                </div>
                {/* ------------------------------------------ Project About End  ------------------------------------------------ */}





                {/* ------------------------------------------ Project highlights Start  ------------------------------------------------ */}

                <div className=' rounded-3 d-flex flex-column gap-3 p-3' style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <div >
                        <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }} >Project Highlights</h2>
                    </div>

                    <div className='freshbooking-project-highlight-main-coctainer d-flex gap-2 justify-content-between'>

                        <div className='freshbooking-projekt-highlight-container'>

                            <div className='freshbooking-highlights-description'>
                                <p className="mb-2" style={{ color: "#16315F", fontSize: '14px' }}>Add Highlight</p>
                                <div className='d-flex gap-2'>
                                <input type="text" className=' rounded-1 p-2'
                                style={{ border: "1px solid rgba(198, 230, 255, 1)", width: '220px' }} placeholder="Enter item..." value={inputValue} onChange={(e) => setInputValue(e.target.value)}/> 
                            <div className=" " onClick={handleAddProjectHighlights}>Add</div>
                                </div>
                            </div>
                            <div>
                            <ul className="mt-3 list-group">
        {items.map((item, index) => (
          <li key={index} className="list-group-item">
            {item}
            <div type="button" className="" onClick={() => handleDeleteProjectHighlight(index)}>
              X
            </div>
            </li>
        ))}
      </ul>

                            </div>

                        </div>

                       
                            <div className="freshbooking-highlight-image-upload-container d-flex justify-content-between gap-4" >

                                <div className="upload-image-dragdrop-container mb-3 " >
                                    <label htmlFor="imageUpload" className="form-label fw-bold">Upload Highlights Image*</label>

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


                                <div className="upload-image-container col-md-4">
                                    <div
                                        className="border rounded position-relative"
                                        style={{
                                            backgroundColor: '#e9ecef',
                                            height: '188px',
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
                                            <div
                                                type="div"
                                                className="btn-close position-absolute top-0 end-0 m-2"
                                                style={{ backgroundColor: '#6c757d' }}
                                                aria-label="Close"
                                                onClick={clearProjecthighlight}
                                            ></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        


                    </div>
                </div>
                {/* ------------------------------------------ Project highlights End  ------------------------------------------------ */}






                {/* ------------------------------------------  Pricing Details Start  ------------------------------------------------ */}

                <div className=' rounded-3 d-flex flex-column gap-3 p-3' style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <div >
                        <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }}>Project Price && Size</h2>
                    </div>

                    <div className='d-flex  flex-wrap gap-4  p-2'>
                        <div >
                            <p style={{ color: "#16315F", fontSize: '14px' }}>Unit Type*</p>
                            <select className=' rounded-1 w-100 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)", minWidth:'220px', fontSize:'14px' }} name="" id=""
                                //    onChange={(e)=>setProjectSize([{type:e.target.value}])}  
                                value={projectSize?.type || ""}
                                onChange={(e) => setProjectSize({ ...projectSize, type: e.target.value })}
                            >
                                <option >Select Unit Type*</option>
                                <option>1 BHK</option>
                                <option>2 BHK</option>
                                <option>2 BHK + Servent</option>
                                <option>3 BHK</option>
                                <option>3 BHK + Servent</option>
                                <option>4 BHK</option>
                                <option>4 BHK + Servent</option>
                            </select>
                        </div>
                        <div>
                            <p style={{ color: "#16315F", fontSize: '14px' }}>Unit Size*</p>
                            <input className='  rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)", minWidth:'220px' }} type='phone' placeholder='e.g 9' value={projectSize?.size || ''} onChange={(e) => setProjectSize({ ...projectSize, size: e.target.value })} />
                        </div>
                        <div>
                            <p style={{ color: "#16315F", fontSize: '14px' }}>Unit Price*</p>
                            <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" , minWidth:'220px'}} type='phone'
                                value={projectSize?.price || ''} onChange={(e) => setProjectSize({ ...projectSize, price: e.target.value })} />
                        </div>
                        <div className='freshbooking-pricing-details-add-button mt-auto border text-center align-content-center' style={{ minWidth:'150px', cursor:'pointer ', height:'fit-content'}} onClick={handleAddProjectSize}>Add</div>
                    </div>

                    <div>
                        <p style={{ color: "#16315F", fontSize: '14px' }}>Other Rooms (optional)</p>

                        <div className='d-flex flex-wrap justify-center align-content-center'>
                            {formData?.projectPriceSize?.map((item, index) => {
                                return (
                                    <div key={index} className='p-2 m-2 d-flex gap-2 rounded-2 text-white' style={{ backgroundColor:'#1877f2', fontSize:'14px' }}>
                                        {item.type}{item.size ?  " | " :" " }{item.size}{ item.price ? " | ":''}{item.price} <div className='freshbooking-optional-room-remover' style={{cursor:'pointer'}} onClick={() => handleAddProjectSizeRemove(index)} > <img style={{ height: "22px", width: "auto" }} src='/img/icons8-wrong.svg'></img></div>
                                      
                                    </div>);

                            })}


                        </div>
                    </div>
                </div>
                {/* ------------------------------------------  Pricing Details Start  ------------------------------------------------ */}





                {/* ------------------------------------------  Gallery Image Upload Start  ------------------------------------------------ */}

                <div className="rounded-3 d-flex flex-column gap-3 p-3 " style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }}>Gallery Image Upload</h2>
                    <div className=" freshbooking-gallery-image-section position-relative m-auto p-4 text-center rounded d-flex flex-column align-items-center justify-content-center" style={{
                        cursor: 'pointer',
                        minHeight: '160px',
                        flexDirection: 'column',
                        padding: '1.5rem',
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
                    <div className='freshbooking-gallery-image-viewer w-100 d-flex' >
                        {galleryImages.length > 0 && (
                            <div className="p-4 d-flex flex-wrap gap-3" >
                                {galleryImages.map((src, index) => (
                                    <div key={index} className="position-relative" style={{ width: "150px" }}>
                                        <div className="border rounded p-2 bg-light position-relative">
                                            <img src={src} alt="Preview" className="img-fluid rounded" style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                                            <div
                                                type="div"
                                                className="btn-close position-absolute top-0 end-0 m-2"
                                                style={{ backgroundColor: '#6c757d' }}
                                                aria-label="Close"
                                                onClick={() => handleDelete(index)}
                                            >

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                </div>
                {/* ------------------------------------------  Gallery Image Upload End  ------------------------------------------------ */}




                {/* ------------------------------------------ Amenities Start  ------------------------------------------------ */}

                <div className=' rounded-3 d-flex flex-column gap-3 p-3' style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <div >
                        <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }}>Amenities</h2>
                    </div>

                    {/* <div className='d-flex  flex-wrap gap-4  p-2'>
                        <div>
                            <p style={{ color: "#16315F", fontSize: '14px' }}>Facilities*</p>
                            <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' />
                        </div>
                    </div> */}

                    <div>


                        <div className='d-flex flex-wrap justify-center align-content-center'>
                            {amanities?.map((item, index) => {
                                return (

                                    <div key={index} className={`p-2 m-2 d-flex gap-2 rounded-2 bg-white ${formData?.projectAmenities && formData?.projectAmenities.includes(item) ? "select" : ""}`} style={{ cursor: "pointer",fontSize:'14px',outline:formData?.projectAmenities?.includes(item) ? "2px solid #1877f2" : "2px solid rgb(198, 230, 255)"}}
                                        onClick={() => {


                                            if (!formData?.projectAmenities?.includes(item)) {
                                                setFromData({
                                                    ...formData,
                                                    projectAmenities: [...formData?.projectAmenities || [], item]
                                                })
                                            }
                                            if (formData?.projectAmenities?.includes(item)) {
                                                setFromData({
                                                    ...formData,
                                                    projectAmenities: formData?.projectAmenities?.filter((arrayitem) => {
                                                        return arrayitem !== item;
                                                    })
                                                })
                                            }

                                        }

                                        }>
                                        {item}
                                        <img style={{ width: "15px" }} src={`${formData?.projectAmenities?.includes(item) ? "/img/white-tick.svg" : "/img/plus-create.svg"}`}></img>
                                    </div>


                                );
                            })}


                        </div>
                    </div>
                </div>
                {/* ------------------------------------------ Amenities End  ------------------------------------------------ */}





                {/* ------------------------------------------ Floor Plan Upload Start  ------------------------------------------------ */}

                <div className="rounded-3 d-flex flex-column gap-3 p-3 " style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }}>Floor Plan Upload</h2>

                    <div className='d-flex justify-content-between w-100'>


                        <div className=" freshbooking-floor-plan-image-upload position-relative p-4 text-center rounded m-auto" style={{
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
                            
                            


                        }}>
                            <input className='position-absolute border top-0 start-0 w-100 h-100 opacity-0' type="file" multiple accept="image/jpeg, image/png, image/svg+xml" onChange={handleFloorPlan} id="file-upload" />
                            <label htmlFor="file-upload" className="d-block">
                                <div className="text-center">
                                    <i className="bi bi-upload" style={{ fontSize: "2rem" }}></i>
                                    <p className="text-primary" style={{ cursor: "pointer" }}>Drag and drop or click to choose file</p>
                                    <small>Supported Format: JPEG, PNG, SVG</small>
                                </div>
                            </label>



                        </div>
                    </div>

                    <div className='w-100 d-flex ' >
                        {floorPlanUpload.length > 0 && (
                            <div className="p-4 d-flex flex-wrap gap-3" >
                                {floorPlanUpload?.map((src, index) => (
                                    <div key={index} className="position-relative" style={{ width: "150px" }}>
                                        <div className="border rounded p-2 bg-light position-relative">
                                            <img src={src} alt="Preview" className="img-fluid rounded" style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                                            <div
                                                type="div"
                                                className="btn-close position-absolute top-0 end-0 m-2"
                                                style={{ backgroundColor: '#6c757d' }}
                                                aria-label="Close"
                                                onClick={() => handleFloorPlanDelete(index)}
                                            >

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                </div>

                {/* ------------------------------------------  Floor Plan Upload End  ------------------------------------------------ */}





                {/* ------------------------------------------ Location Map Start  ------------------------------------------------ */}
                <div className="rounded-3 d-flex flex-column gap-3 p-3 " style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <div >
                        <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }} >Location Map</h2>
                    </div>

                    <div className='d-flex flex-wrap'>
                
                    {/* {formData?.projectLocation?.[locationKey]?.length >0? "yes":'no'} */}
                    
                        {locationMap.map((item, index) => {
                            return (
                            
                                <div key={index} className={`p-2 m-2 d-flex gap-2 rounded-2 bg-white  ${locationKey === item ? "select" : ""}`} style={{outline:locationKey === item ? "2px solid #1877f2" : "2px solid rgb(198, 230, 255)",fontSize:'14px' , cursor:'pointer' }}
                                    onClick={() => setLocationKey(item)} >
                                    {/* {item} */}
                                  
                                   <div style={{position:'relative'}}>
                                
                                   {item.split("Location")} {formData?.projectLocation?.[item]?.length>0 && <span style={{position:'absolute', top:'-15px', fontSize:'8px'}} className='border bg-danger rounded-circle px-1 text-white' >{formData?.projectLocation?.[item]?.length}</span>}
                                    </div> 
                                    
                                </div>
                            );
                        })}</div>

                    <div className='freshbooking-loaction-details-add-field d-flex gap-4'>

                        <div>
                            <p style={{ color: "#16315F", fontSize: '14px' }}>{locationKey?.split("Location")} Location Details</p>
                            <input
                                className=' rounded-1 p-2'
                                style={{ border: "1px solid rgba(198, 230, 255, 1)", width: '220px' }} value={locationDetail}
                                onChange={(e) => setLocationDetails(e.target.value)}
                                type='text'
                                placeholder='e.g Near to SPR' />
                        </div>
                        <div onClick={handleAddLocationDetails} className='freshbooking-location-map-add-button border text-center align-content-center mt-auto ' style={{ padding: '6px 35px 6px 35px', maxWidth:'120px',height:'fit-content' }}>Add</div>

                    </div>
                    <div>
                        <ul className="list-disc d-flex flex-wrap pl-5">
                            {formData?.projectLocation?.[locationKey]?.map((item, index) => (
                                <li key={index} className=" border rounded-pill py-2 px-3 m-1 list-unstyled text-white" style={{ fontSize: '14px',maxWidth:'100%' , width:'fit-content', backgroundColor:'#1877f2' }} >
                                     {item}
                                    <span className="ml-2 px-1 " style={{cursor:'pointer'}} onClick={() => handleRemove(index)}>
                                        <img style={{width:'15px', height:'auto' }} src="/img/icons8-wrong-60.png" alt="" />
                                    </span>
                                </li>
                                


                            ))}
                        </ul>
                    </div>

                    <div className="container mt-4 ">
                        <div className=" freshbooking-location-map-image-upload-container  d-flex justify-content-between w-100 ">

                            <div className="upload-image-dragdrop-container mb-3 ">
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


                            <div className="upload-image-container col-md-4">
                                <div
                                    className="border rounded position-relative"
                                    style={{
                                        backgroundColor: '#e9ecef',
                                        height: '188px',
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
                                    
                                            <img
                                                src="/img/PreviewImg.svg"
                                                alt="Preview"

                                                style={{ maxHeight: '180px' }}/>
                                    )}

                                    {locationMapImage && (
                                        <div
                                            type="div"
                                            className="btn-close position-absolute top-0 end-0 m-2"
                                            style={{ backgroundColor: '#6c757d' }}
                                            aria-label="Close"
                                            onClick={clearLocationMapImage}
                                        ></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                {/* ------------------------------------------ Location Map End  ------------------------------------------------ */}






                {/* ------------------------------------------ Site Plan Upload Start ------------------------------------------------ */}
                <div className=' rounded-3 d-flex flex-column gap-3 p-3' style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <div >
                        <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }} >Site Plan Upload</h2>
                    </div>

                    <div className='d-flex'>

                        <div className="container mt-4">
                            <div className="freshbooking-site-plan-image-upload-container w-100 d-flex justify-content-between" >

                                <div className="upload-image-dragdrop-container mb-3 ">
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


                                <div className="upload-image-container col-md-4">
                                    <div
                                        className="border rounded position-relative"
                                        style={{
                                            backgroundColor: '#e9ecef',
                                            height: '188px',
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
                                        ) :  (
                                    
                                            <img
                                                src="/img/PreviewImg.svg"
                                                alt="Preview"

                                                style={{ maxHeight: '180px' }}/>
                                    )}

                                        {sitePlan && (
                                            <div
                                                type="div"
                                                className="btn-close position-absolute top-0 end-0 m-2"
                                                style={{ backgroundColor: '#6c757d' }}
                                                aria-label="Close"
                                                onClick={clearSitePlan}
                                            ></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                {/* ------------------------------------------ Site Plan Upload End  ------------------------------------------------ */}





                {/* ------------------------------------------  About Builder Start  ------------------------------------------------ */}
                <div className=' rounded-3 d-flex flex-column gap-3 p-3' style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <div >
                        <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }} >About Project Builder</h2>
                    </div>

                    <div className='freshbooking-about-project-data-container d-flex  gap-5'>

                        <div className='w-100 d-flex flex-column gap-3'>
                            <div className=' d-flex flex-column gap-1'>
                                <p style={{ color: "#16315F", fontSize: '14px' }}> Project Builder Name*</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder=' Project Builder Name*' onChange={(e) => { setFromData({ ...formData, projectAboutBuilder: { ...formData.projectAboutBuilder, projectAboutBuilderName: e.target.value } }) }} />
                            </div>
                            <div className='d-flex flex-column gap-1'>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Project Builder Description*</p>
                                <textarea className=' rounded-1 p-2 w-100' style={{ border: "1px solid rgba(198, 230, 255, 1)", minHeight: '120px', resize: "none" }} type='text' placeholder='Project Builder Description*' onChange={(e) => { setFromData({ ...formData, projectAboutBuilder: { ...formData.projectAboutBuilder, projectAboutBuilderContent: e.target.value } }) }} />
                            </div>

                        </div>

                        <div className="container mt-4">
                            <div className="freshbooking-about-project-image-upload-container d-flex justify-content-between" >

                                <div className="upload-image-dragdrop-container mb-3 ">
                                    <label htmlFor="imageUpload" className="form-label fw-bold">Upload Card Image*</label>

                                    <div className="upload-image-dragdrop-container position-relative ">
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
                                        className="upload-image-container border rounded position-relative"
                                        style={{
                                            backgroundColor: '#e9ecef',
                                            height: '188px',
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
                                            <div
                                                type="div"
                                                className="btn-close position-absolute top-0 end-0 m-2"
                                                style={{ backgroundColor: '#6c757d' }}
                                                aria-label="Close"
                                                onClick={clearAboutProjectImage}
                                            ></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                {/* ------------------------------------------  About Builder End  ------------------------------------------------ */}





                {/* ------------------------------------------  About SEO Start  ------------------------------------------------ */}
                <div className=' rounded-3 d-flex flex-column gap-3 p-3 mb-3' style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <div >
                        <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }} >SEO Detail</h2>
                    </div>

                    <div className=' d-flex flex-column gap-3 '>

                        <div className='freshbooking-about-seo-container d-flex gap-3 flex-wrap'>
                            <div className='freshbooking-project-meta-title-container d-flex flex-column gap-2 '>
                                <p style={{ color: "#16315F", fontSize: '14px' }}> Project Meta Title*</p>
                                <input className=' rounded-1 p-3' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder=' Project Builder Name'
                                    onChange={(e) => { setFromData({ ...formData, projectMeta: { ...formData.projectMeta, projectTitle: e.target.value } }) }} />
                            </div>
                            <div className='freshbooking-project-manager-contact-container d-flex flex-column gap-2 '>
                                <p style={{ color: "#16315F", fontSize: '14px' }}> Project Manager Contact*</p>
                                <input 
                                    className=' rounded-1 p-3' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type="text" placeholder=' Project Manager Contact'
                                    onChange={(e) => { setFromData({ ...formData, projectManagerContact: e.target.value.trim() }) }} />
                            </div>
                           


                        </div>
                        <div className='freshbooking-project-meta-description-container  d-flex flex-column gap-2 '>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Project Meta Description*</p>
                                <textarea className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)",minHeight:'120px',width:'100%',maxWidth:'500px',  resize: "none" }} type='text' placeholder='Project Meta Description'
                                    onChange={(e) => { setFromData({ ...formData, projectMeta: { ...formData.projectMeta, projectDescripation: e.target.value } }) }} />
                            </div>



                    </div>
                </div>
                {/* ------------------------------------------  About SEO End  ------------------------------------------------ */}


                <button className=' my-4 mx-auto py-2 px-5 border fs-5 rounded-3 text-white' style={{backgroundColor:'#1877f2'}} type='submit'>submit</button>
            </form>
        </div>
    )
}


