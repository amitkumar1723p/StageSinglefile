import React from 'react'

export default function SingleFreshBookingBuilder({project, builderContent}) {


  return (
    
    <div className="container single-fresh-booking-builder-container d-flex justify-content-between m-auto " style={{width:'90%'}}>
    <div className="single-fresh-booking-builder-text-container " >
      <div className='single-fresh-booking-builder-headings ' >
        <h2 data-aos="fade-right"  data-aos-duration="1200"  data-aos-once="false">Builder</h2>
        <h2 data-aos="fade-right"  data-aos-duration="1500"  data-aos-once="false">About {project?.projectName} </h2>
      </div>
      <div data-aos="fade-right"  data-aos-duration="1500"  data-aos-once="false" className='single-fresh-booking-about-builder'>
        <p>{builderContent?.projectAboutBuilderContent}</p>
      </div>
    </div>
    <div data-aos="fade-left"  data-aos-once="false" className="single-fresh-booking-builder-image-container">
        <img src={builderContent?.projectAboutBuilderImage?.url} alt={builderContent?.projectAboutBuilderImage?.name} />
    </div>


  </div>
  )
}
``