import React, { useState, useEffect } from 'react';

export default function SingleFreshBookingHero() {
  const [showForm, setShowForm] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);


  useEffect(() => {
    if (showForm) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [showForm]);

  return (
    <>
      <nav className="navbar navbar-expand-lg position-absolute bg-blur p-0" style={{ backgroundColor: '#00000066', top: '0px', width: '100%', zIndex: 1 }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="/img/dlf-logo.png" className='single-fresh-dlf-logo' alt="dlf" style={{ background: 'transparent' }} />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav d-flex justify-content-around gap-3">
              <li className="nav-item">
                <a className="nav-link active p-2 rounded text-light d-flex gap-2 justify-content-center align-items-center" href="#">
                  <img src="/img/hero-dialer.png" alt="dialer" style={{ width: '20px', height: '20px' }} />
                  Get a Call Back
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active p-2 rounded text-light d-flex gap-2 justify-content-center align-items-center" href="#">
                  <img src="/img/hero-whatsapp.png" alt="whatsapp" style={{ width: '20px', height: '20px' }} />
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    
      <div className="position-relative" style={{ height: '100vh', backgroundImage: 'url(/img/building9.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='single-fresh-hero-main-content'>
          <div className="col-lg-7 text-white position-absolute single-fresh-hero-content">
            <h4 className="text-uppercase mb-3 fw-light">Gurugram</h4>
            <h3 className="fw-medium mb-3 fs-1">DLF THE PRIMUS</h3>
            <p className="lead mb-4 fs-6 fw-normal">3BHK Apartment Sector 82A</p>
            <p className="lead fw-normal">Starting Price <span className='single-fresh-hero-start-price fw-bold'>₹ 5.7 Cr<sup>*</sup></span></p>
            <div className='Single-fresh-reserve-post-button'>
           
              {isSmallScreen && (
                <button className="Single-fresh-reserve-post-btn" onClick={handleOpenForm}>
                  <span className="Single-fresh-reserve-post-span">Reserve Your Post</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {!isSmallScreen && (
          <div className="position-absolute top-50 end-0 translate-middle-y pe-5">
            {FormComponent()}
          </div>
        )}

       
        {isSmallScreen && showForm && (
          <div className="d-flex justify-content-center align-items-center vh-100 position-fixed top-0 start-0 w-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1050 }}>
            <div className="position-relative">
              {FormComponent()}
              <button className="btn-close position-absolute top-0 end-0 m-2" onClick={handleCloseForm}></button>
            </div>
          </div>
        )}

        {/* Info Boxes */}
        <div className="container-fluid p-0 position-absolute bottom-0 start-0 end-0">
          <div className=" mx-0 bg-dark bg-opacity-25 text-white py-3 single-fresh-hero-icon">
            {[
              { icon: 'hero-flag.png', label: 'Total Land', value: '5.7 Acres' },
              { icon: 'hero-bridge.png', label: 'Total Tower', value: '2' },
              { icon: 'hero-building.png', label: 'Total Units', value: '280' },
              { icon: 'hero-rupee.png', label: 'Starting Price', value: '5.7 Cr*' }
            ].map((item, index) => (
              <div className="col-6 col-md-3 text-center mb-3 mb-md-0" key={index}>
                <img src={`/img/${item.icon}`} alt={item.label} className="img-fluid mb-2" style={{ maxWidth: '80px' }} />
                <div className="fw-normal mb-1 single-fresh-hero-label">{item.label}</div>
                <div className="fw-bold single-fresh-hero-value">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ✅ Extracted Form Component - Used in both Popup & Large Screen
const FormComponent = () => (
  <form className="Single-fresh-form rounded shadow-lg text-light"
    style={{
      width: "320px",
      backgroundColor: "white",
      overflowY: "auto",
      maxHeight: "90vh"
    }}>
    <h2 className="text-center mb-2 fw-medium" style={{ color: "black", fontSize: "17px" }}>Let’s Find Your Dream Home!</h2>
    <p className="text-center mb-4" style={{ color: "#333333", fontSize: "14px" }}>
      Please fill out the form below, our expert will get back to you soon.
    </p>

    <div className="d-flex flex-column gap-3">
      <div className="position-relative">
        <img src="/img/Single-fresh-user.svg" alt="" className="position-absolute top-50 start-0 translate-middle-y ms-2" />
        <input type="text" className="Single-fresh-form-input border-2 ps-5 w-100" placeholder="Your Full Name" required />
      </div>

      <div className="position-relative">
        <img src="/img/Single-main-email.svg" alt="" className="position-absolute top-50 start-0 translate-middle-y ms-2" />
        <input type="email" className="Single-fresh-form-input border-2 ps-5 w-100" placeholder="Your Email" required />
      </div>

      <div className="position-relative">
        <img src="/img/Single-fresh-call.svg" alt="" className="position-absolute top-50 start-0 translate-middle-y ms-2" />
        <input type="tel" className="Single-fresh-form-input border-2 ps-5 w-100" placeholder="Your Number" required pattern="[0-9]{10}" />
      </div>

      <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#F58220" }}>Reserve Your Spot</button>
    </div>
  </form>
);
