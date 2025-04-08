import React from 'react'

export default function SingleFreshFooter({project, projectLogoContent}) {
  return (
    <div className=" bg-custom text-white Single-fresh-footer-container ">
    <div className="d-flex Single-fresh-booking-footer">
      <div className="col-md-4 text-md-left mb-4 mb-md-0 Single-fresh-booking-footer-details">
        <div className='mb-4'>
        <img src={`${projectLogoContent?.url}`} alt="" style={{width:"220px"}} /></div>
        <h3 className=" fw-bold mb-4">For an Enquiry <span className=""><img src="/img/for-enquiry.png" alt="" /></span></h3>
        <p className="mt-2  fw-medium" style={{fontSize:'23px'}}>   <img src="/img/hero-dialer.png" alt="dialer"  style={{ width: '20px', height: '20px'  }} /> Call : 7837840785</p>
        <p className="mt-2 fw-medium" style={{fontSize:'23px'}}> <img src="/img/hero-whatsapp.png" alt="whatsapp" style={{ width: '20px', height: '20px' }} /> Chat on WhatsApp</p>
      </div>
      <div className="col-md-4  text-md-left mb-4 mb-md-0">
        <h2 className="font-weight-bold  mb-4">{project?.projectName}</h2>
        <div className="d-flex text-justify">
          <div className="col-6">
            <ul className="list-unstyled Single-fresh-list-footer">
              <li>Home</li>
              <li>Amenities</li>
              <li>About</li>
              <li>Highlights</li>
              <li>Floor Plan</li>
            </ul>
          </div>
          <div className="col-6">
            <ul className="list-unstyled Single-fresh-list-footer">
              <li>Size & Price</li>
              <li>Location Map</li>
              <li>Gallery</li>
              <li>Site Map</li>
              <li>About Builder</li>
            </ul>
          </div>
        </div>
      </div>

      
      <div className="col-md-4">
      <form className="Single-fresh-footer-form  top-3 end-0 me-3 container rounded shadow-lg text-light" style={{ maxWidth: '600px', width: '90%'  , padding:'20px' , backgroundColor: 'white'}}>
          <h2 className="text-center mb-2" style={{ color: '#333333', fontSize: '15px'}}>Get Expert Advice and Information for</h2>
          <p className="text-center mb-4 fw-bold" style={{ color: '#333', fontSize: '17px'}}>{project?.projectName}</p>
          <div className="d-flex flex-column gap-2">
          <div className="position-relative">
        <img src="/img/Single-fresh-user.svg" alt=""  className='position-absolute top-50 start-0 translate-middle-y ms-2'/>
      <input type="text" className="Single-fresh-form-input border-2 ps-5 w-100" placeholder="Your Full Name" required />
    </div>
    <div className="position-relative">
     <img src="/img/Single-fresh-call.svg" alt=""  className='position-absolute top-50 start-0 translate-middle-y ms-2'/>
      <input type="tel" className="Single-fresh-form-input border-2 ps-5 w-100" placeholder="Your Number" required pattern="[0-9]{10}" title="Enter a valid 10-digit phone number" />
    </div>
    <textarea className="Single-fresh-form-input" id="message" placeholder="Write Message..."></textarea>
    <div className="position-relative">
    <button type="submit" className="btn w-100 fw-medium single-fresh-booking-footer-form-btn" >Submit</button>
    </div>
          </div>
        </form>
      </div>


    </div>
  </div>
  )
}
