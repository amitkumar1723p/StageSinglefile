import React from 'react'
import { useState } from 'react';
import { Form, Button, Image } from "react-bootstrap";
import { createfreshProjectAction } from '../../../Action/freshProjectAction';
import { useDispatch } from 'react-redux';
export default function FreshBookingForm() {
    // const
    const dispatch = useDispatch()

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

        setFromData({
            ...formData, projectLogoImage: undefined
        });
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

        <div className='d-flex flex-column gap-3  mx-auto' style={{ width: '80%' }}>
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

                                        }} className={`p-2 m-2 d-flex gap-2 rounded-2 bg-white ${formData.projectBasicDetail?.projectType === item ? "select" : ""}`} style={{ border: "2px solid rgba(198, 230, 255, 1)" }} >
                                            {item}
                                            <img style={{ height: "18px", width: "auto" }} src='/img/plus-create.svg'></img>
                                        </div>
                                    );
                                })}</div>
                        </div>

                        <div className='d-flex flex-wrap gap-4 p-2 ' >
                            <div className='freshbooking-ProjectName '>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Project Name*</p>

                                <input type="text"
                                    onChange={(e) =>  { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, projectName: e.target.value } }) }}
                                    name="projectName" id="" className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} placeholder='Project Name' />

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
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type="text" placeholder='e.g sector 86'
                                    onChange={(e) => setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, locality: e.target.value } })} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>City*</p>
                                <input className='rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type="text" placeholder='e.g Titan'
                                    onChange={(e) => setFromData({
                                        ...formData, projectBasicDetail: {
                                            ...formData.projectBasicDetail, projectCity: e.target.value
                                        }
                                    })} />
                            </div>
                        </div>
                        <div className='d-flex flex-wrap gap-4  p-2'>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Minimum Price*</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='Number' placeholder='e.g 9634755090' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, minPrice: e.target.value } }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Maximum Price*</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' placeholder='e.g 9634755090' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, maxPrice: e.target.value } }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Possession Year (optional)</p>
                                <input className='  rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' placeholder='e.g 9' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, possessionStatus: e.target.value } }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Payment Plan</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, projectPaymentPlan: e.target.value } }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>RERA Id (optional)</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' placeholder='e.g abcd123' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, projectReraId: e.target.value } }) }} />
                            </div>
                        </div>

                        <div className='d-flex flex-wrap gap-4  p-2'>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Total Land*</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='e.g 100 acres' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, totalLandArea: e.target.value } }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Total Tower*</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='e.g 1024 towers' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, towerNumber: e.target.value } }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Total Units*</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder='e.g 500' onChange={(e) => { setFromData({ ...formData, projectBasicDetail: { ...formData.projectBasicDetail, totalUnit: e.target.value } }) }} />
                            </div>

                        </div>

                        <div className=' p-2'>
                            <p style={{ color: "#16315F", fontSize: '14px' }}>Property Type*</p>
                            <div className='d-flex flex-wrap justify-center align-content-center'>
                                {formData.projectBasicDetail?.projectType === "Residential" ?
                                    <>
                                        {projectAdTypeResidential.map((item, index) => {
                                            return (
                                                <div key={index} className={`p-2 m-2 d-flex gap-2 rounded-2 bg-white  ${formData?.projectBasicDetail?.projectAdType === item ? "select" : ""}`} style={{ border: "2px solid rgba(198, 230, 255, 1)" }}
                                                    onClick={() => setFromData({
                                                        ...formData
                                                        , projectBasicDetail: { ...formData.projectBasicDetail, projectAdType: item }
                                                    })} >
                                                    {item}
                                                    <img style={{ height: "18px", width: "auto" }} src='/img/plus-create.svg'></img>
                                                </div>
                                            );
                                        })}
                                    </> :
                                    <>
                                        {projectAdTypeCommercial.map((item, index) => {
                                            return (
                                                <div key={index} className='p-2 m-2 d-flex gap-2 rounded-2 bg-white' style={{ border: "2px solid rgba(198, 230, 255, 1)" }} onClick={() => setFromData({
                                                    ...formData
                                                    , projectBasicDetail: { ...formData.projectBasicDetail, projectAdType: item }
                                                })} >
                                                    {item}
                                                    <img style={{ height: "18px", width: "auto" }} src='/img/plus-create.svg'></img>
                                                </div>
                                            );
                                        })}
                                    </>
                                }
                            </div>
                        </div>

                        <div className="container mt-4">
                            <div className="d-flex justify-content-between" style={{ gap: '20px' }}>

                                <div className="mb-3" style={{ width: '50%' }}>
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
                            <div className="d-flex justify-content-between" style={{ gap: '20px' }}>

                                <div className="mb-3 " style={{ width: '50%' }}>
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









                {/* ------------------------------------------ Project heighlights Start  ------------------------------------------------ */}

                <div className=' rounded-3 d-flex flex-column gap-3 p-3' style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <div >
                        <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }} >Project Heighlights</h2>
                    </div>

                    <div className='d-flex gap-5'>

                        <div style={{ width: '70%' }}>

                            <div>
                                <p className="mb-2" style={{ color: "#16315F", fontSize: '14px' }}>Heighlights Description</p>
                                <textarea className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)", minHeight: '155px', minWidth: '650px', resize: "none" }} type='text' onChange={(e) => { setFromData({ ...formData, projectHightlight: { ...formData.projectHightlight, hightlightContent: e.target.value } }) }} />
                            </div>

                        </div>

                        <div className="container ">
                            <div className="d-flex justify-content-between" >

                                <div className="mb-3 " >
                                    <label htmlFor="imageUpload" className="form-label fw-bold">Upload Heighlights Image*</label>

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
                </div>
                {/* ------------------------------------------ Project heighlights End  ------------------------------------------------ */}




                {/* ------------------------------------------  Pricing Details Start  ------------------------------------------------ */}

                <div className=' rounded-3 d-flex flex-column gap-3 p-3' style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <div >
                        <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }}>Project Price && Size</h2>
                    </div>

                    <div className='d-flex  flex-wrap gap-4  p-2'>
                        <div >
                            <p style={{ color: "#16315F", fontSize: '14px' }}>Unit Type*</p>
                            <select className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} name="" id=""
                                //    onChange={(e)=>setProjectSize([{type:e.target.value}])}  
                                value={projectSize?.type || ""}
                                onChange={(e) => setProjectSize({ ...projectSize, type: e.target.value })}

                            >
                                <option >Select Unit Type*</option>
                                <option>1-BHK</option>
                                <option>2-BHK</option>
                                <option>2-BHK + Servent</option>
                                <option>3-BHK</option>
                                <option>3-BHK + Servent</option>
                                <option>4-BHK</option>
                                <option>4-BHK + Servent</option>
                            </select>
                        </div>
                        <div>
                            <p style={{ color: "#16315F", fontSize: '14px' }}>Unit Size*</p>
                            <input className='  rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' placeholder='e.g 9' value={projectSize?.size || ''} onChange={(e) => setProjectSize({ ...projectSize, size: e.target.value })} />
                        </div>
                        <div>
                            <p style={{ color: "#16315F", fontSize: '14px' }}>Unit Price*</p>
                            <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone'
                                value={projectSize?.price || ''} onChange={(e) => setProjectSize({ ...projectSize, price: e.target.value })} />
                        </div>
                        <div className='px-5 py-0' onClick={handleAddProjectSize}>Add</div>
                    </div>

                    <div>
                        <p style={{ color: "#16315F", fontSize: '14px' }}>Other Rooms (optional)</p>

                        <div className='d-flex flex-wrap justify-center align-content-center'>
                            {formData?.projectPriceSize?.map((item, index) => {
                                return (
                                    <div key={index} className='p-2 m-2 d-flex gap-2 rounded-2 bg-white' style={{ border: "2px solid rgba(198, 230, 255, 1)" }}>
                                        {item.type}-{item.size}-{item.price}  <div onClick={() => handleAddProjectSizeRemove(index)} >***</div>
                                        <img style={{ height: "18px", width: "auto" }} src='/img/plus-create.svg'></img>
                                    </div>);

                            })}


                        </div>
                    </div>
                </div>
                {/* ------------------------------------------  Pricing Details Start  ------------------------------------------------ */}




                {/* ------------------------------------------  Gallery Image Upload Start  ------------------------------------------------ */}

                <div className="rounded-3 d-flex flex-column gap-3 p-3 " style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }}>Gallery Image Upload</h2>
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
                        width: "50%",
                        margin: "0 auto",
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
                    <div className='w-100 d-flex ' style={{ minHeight: '215px' }} >
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

                    <div className='d-flex  flex-wrap gap-4  p-2'>
                        <div>
                            <p style={{ color: "#16315F", fontSize: '14px' }}>Facilities*</p>
                            <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='phone' />
                        </div>
                    </div>

                    <div>


                        <div className='d-flex flex-wrap justify-center align-content-center'>
                            {amanities?.map((item, index) => {
                                return (

                                    <div key={index} className={`p-2 m-2 d-flex gap-2 rounded-2 bg-white  ${formData?.projectAmenities && formData?.projectAmenities.includes(item) ? "select" : ""}`} style={{ border: "2px solid rgba(198, 230, 255, 1)" }}
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
                                        <img style={{ height: "18px", width: "auto" }} src='/img/plus-create.svg'></img>
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

                    <div className='d-flex justify-content-between'>


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
                            width: "50%",

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

                    <div className='w-100 d-flex ' style={{ minHeight: '215px' }} >
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
                        {locationMap.map((item, index) => {
                            return (
                                <div key={index} className={`p-2 m-2 d-flex gap-2 rounded-2 bg-white  ${locationKey === item ? "select" : ""}`} style={{ border: "2px solid rgba(198, 230, 255, 1)" }}
                                    onClick={() => setLocationKey(item)} >
                                    {/* {item} */}
                                    {item.split("Location")}
                                </div>
                            );
                        })}</div>

                    <div className='d-flex gap-3'>

                        <div>
                            <p style={{ color: "#16315F", fontSize: '14px' }}>{locationKey?.split("Location")} Location Details</p>
                            <input
                                className=' rounded-1 p-2'
                                style={{ border: "1px solid rgba(198, 230, 255, 1)", width: '280px' }} value={locationDetail}
                                onChange={(e) => setLocationDetails(e.target.value.trim())}
                                type='text'
                                placeholder='e.g Near to SPR' />
                        </div>
                        <div onClick={handleAddLocationDetails} className='  ' style={{ padding: '5px 35px 5px 35px' }}>Add</div>

                    </div>
                    <div>
                        <ul className="list-disc pl-5">
                            {formData?.projectLocation?.[locationKey]?.map((item, index) => (
                                <li key={index} className="border-b p-2 list-unstyled " style={{ fontSize: '12px', color: "#666" }} >
                                    {locationKey.split("Location")} :  {item}
                                    <div className="mx-2 px-1" onClick={() => handleRemove(index)}>
                                        ❌
                                    </div>
                                </li>


                            ))}
                        </ul>
                    </div>

                    <div className="container mt-4 ">
                        <div className="d-flex justify-content-between w-75">

                            <div className="mb-3 " style={{ width: '50%' }}>
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

                    <div className='d-flex  gap-5'>

                        <div>



                        </div>

                        <div className="container mt-4">
                            <div className="d-flex justify-content-between" style={{ gap: '20px' }}>

                                <div className="mb-3 " style={{ width: '50%' }}>
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





                {/* ------------------------------------------  About Project Start  ------------------------------------------------ */}
                <div className=' rounded-3 d-flex flex-column gap-3 p-3' style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <div >
                        <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }} >About Project Builder</h2>
                    </div>

                    <div className='d-flex  gap-5'>

                        <div style={{ width: '80%' }}>
                            <div className='mb-2'>
                                <p style={{ color: "#16315F", fontSize: '14px' }}> Project Builder Name*</p>
                                <input className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder=' Project Builder Name*' onChange={(e) => { setFromData({ ...formData, projectAboutBuilder: { ...formData.projectAboutBuilder, projectAboutBuilderName: e.target.value } }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Project Builder Description*</p>
                                <textarea className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)", minHeight: '120px', minWidth: '600px', resize: "none" }} type='text' placeholder='Project Builder Description*' onChange={(e) => { setFromData({ ...formData, projectAboutBuilder: { ...formData.projectAboutBuilder, projectAboutBuilderContent: e.target.value } }) }} />
                            </div>

                        </div>

                        <div className="container mt-4">
                            <div className="d-flex justify-content-between" style={{ gap: '20px' }}>

                                <div className="mb-3 " style={{ width: '70%' }}>
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
                {/* ------------------------------------------  About Project End  ------------------------------------------------ */}

                {/* ------------------------------------------  About SEO Start  ------------------------------------------------ */}
                <div className=' rounded-3 d-flex flex-column gap-3 p-3 mb-5' style={{ boxShadow: "0px 0px 10px rgba(198, 221, 238, 1)" }}>
                    <div >
                        <h2 className='fs-5' style={{ color: "#16315F", fontSize: '14px' }} >SEO Detail</h2>
                    </div>

                    <div className='  gap-5'>

                        <div className='d-flex'>
                            <div className='mb-2 '>
                                <p style={{ color: "#16315F", fontSize: '14px' }}> Project Meta Title</p>
                                <input className=' rounded-1 p-3' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type='text' placeholder=' Project Builder Name*'
                                    onChange={(e) => { setFromData({ ...formData, projectMeta: { ...formData.projectMeta, projectTitle: e.target.value } }) }} />
                            </div>
                            <div className='mb-2 px-2'>
                                <p style={{ color: "#16315F", fontSize: '14px' }}> Project Manager Contact</p>
                                <input 
                                    className=' rounded-1 p-3' style={{ border: "1px solid rgba(198, 230, 255, 1)" }} type="text" placeholder=' Project Manager Contact*'
                                    onChange={(e) => { setFromData({ ...formData, projectManagerContact: e.target.value.trim() }) }} />
                            </div>
                            <div>
                                <p style={{ color: "#16315F", fontSize: '14px' }}>Project Meta Description</p>
                                <textarea className=' rounded-1 p-2' style={{ border: "1px solid rgba(198, 230, 255, 1)", minWidth: '700px', resize: "none" }} type='text' placeholder='Project Builder Description*'
                                    onChange={(e) => { setFromData({ ...formData, projectMeta: { ...formData.projectMeta, projectDescripation: e.target.value } }) }} />
                            </div>


                        </div>



                    </div>
                </div>
                {/* ------------------------------------------  About Project End  ------------------------------------------------ */}


                <button type='submit'>sumit</button>
            </form>
        </div>
    )
}


