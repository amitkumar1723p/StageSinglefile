import React from 'react'

export default function SingleFreshBookingBuilder({project, builderContent}) {


  return (
    
    <div className=" container single-fresh-booking-builder-container d-flex justify-content-between m-auto " style={{width:'90%'}}>
    <div className="single-fresh-booking-builder-text-container " >
      <div className='single-fresh-booking-builder-headings container' >
        <h2>Builder</h2>
        <h2 >About {project?.projectName} </h2>
      </div>
      <div  className='single-fresh-booking-about-builder container'>
        <p>{builderContent?.projectAboutBuilderContent}</p>
      </div>
    </div>
    <div  className="single-fresh-booking-builder-image-container">
        <img src={builderContent?.projectAboutBuilderImage?.url} alt={builderContent?.projectAboutBuilderImage?.name} />
    </div>


  </div>
  )
}
