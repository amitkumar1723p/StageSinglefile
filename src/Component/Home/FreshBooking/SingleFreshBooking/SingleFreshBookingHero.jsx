import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SingleFreshBookingForm from "./SingleFreshBookingForm";

export default function SingleFreshBookingHero({ project, projectPrice , projectBannerImage , projectLogoContent }) {
  const [showForm, setShowForm] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const heroData = [
    {
      icon: "hero-flag.svg",
      label: "Total Land",
      value: project?.totalLandArea,
    },
    {
      icon: "hero-bridge.svg",
      label: "Total Tower",
      value: project?.towerNumber,
    },
    {
      icon: "hero-building.svg",
      label: "Total Units",
      value: project?.totalUnit,
    },
    // {
    //   icon: "hero-building.png",
    //   label: "Payment Plan",
    //   value: project?.projectPaymentPlan,
    // },
    {
      icon: "hero-rupee.svg",
      label: "Starting Price",
      value: project?.minPrice,
    },
  ];
  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);
  const imageUrl = projectBannerImage?.name;
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
    

      {/* {projectPriceSize?.map((item,index)=>{return <span>{item?.type}</span>})} */}
      <div
       data-aos="zoom-out"  data-aos-duration="1250" data-aos-once="true"
        className="position-relative"
        style={{
          height: "100vh",
          backgroundImage: `url(${projectBannerImage?.url || "/img/default-banner.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-100 h-100  single-fresh-hero-conainer-main">
          <nav
        className="navbar single-fresh-navbar navbar-expand-lg position-relative z-3  p-0"
      >
        <div className="container-fluid ">
          <div className="navbar-brand Single-fresh-logo-a ">
            <img
              onClick={() => {
                navigate("/");

                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              src={projectLogoContent?.url}
              className="single-fresh-logo "
              alt={project?.projectName}
              style={{ background: "transparent", mixBlendMode:'multiply' }}
            />
          </div>
          <button
            className="navbar-toggler"
            style={{}}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav d-flex justify-content-around gap-3">
              <li  className="nav-item">
                <a
                  className="nav-link active p-2 rounded text-light d-flex gap-2 justify-content-center align-items-center"  style={{fontSize:'18px'}}
                  href="#"
                >
                  <img
                    src="/img/hero-dialer.png"
                    alt="dialer"
                    style={{ width: "20px", height: "20px" }}
                  />
                <span className="single-fresh-hero-dialer-text"> Get a Call Back</span> 
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active p-2 rounded text-light d-flex gap-2 justify-content-center align-items-center" style={{fontSize:'18px'}}
                  href="#"
                >
                  <img
                    src="/img/hero-whatsapp.png"
                    alt="whatsapp"
                    style={{ width: "20px", height: "20px" }}
                  />
                 <span className="single-fresh-hero-whatsapp-text"> Chat on WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

<div className="single-fresh-hero-main-content">
          <div className="col-lg-7  text-white position-absolute single-fresh-hero-content">
            <p data-aos="fade-right"  data-aos-duration="1800" data-aos-once="true" className="text-uppercase custom-underline-in-freshbooking-hero">{project?.projectCity}</p>
            <p data-aos="fade-right"  data-aos-duration="1200" data-aos-once="true"  className="">{project?.projectName}</p>
            <p data-aos="fade-right"  data-aos-duration="1400" data-aos-once="true"  className=" "> {" "}{ project?.projectAdType}  { project?.locality}</p>
            <p data-aos="fade-right"  data-aos-duration="1800" data-aos-once="true"  className=" "> Possessions : <span className="">{project?.possessionStatus?.slice(0, 4)}</span> </p>
            <p data-aos="fade-right"  data-aos-duration="2000" data-aos-once="true"  className=" "> Starting
              <span className="text-decoration-underline">{" "}Price{" "}</span>
              <span className="single-fresh-hero-start-price ms-1">{" "}₹ {project?.minPrice} Cr<sup>*</sup></span>
            </p>
            <div className="Single-fresh-reserve-post-button">
              {isSmallScreen && (
                <button
                  className="Single-fresh-reserve-post-btn"
                  onClick={handleOpenForm}
                >
                  <span className="Single-fresh-reserve-post-span">
                    Reserve Your Post
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {!isSmallScreen && (
          <div className="position-absolute top-50 end-0 translate-middle-y pe-5">
            {/* {SingleFreshBookingForm} */}
            <SingleFreshBookingForm />
          </div>
        )}

        {isSmallScreen && showForm && (
          <div
            className="d-flex justify-content-center align-items-center vh-100 position-fixed top-0 start-0 w-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 50 }}
          >
            <div className="position-relative">
               <SingleFreshBookingForm />
              {/* {SingleFreshBookingForm} */}
              <button
                className="btn-close position-absolute top-0 end-0 m-2"
                onClick={handleCloseForm}
              ></button>
            </div>
          </div>
        )}

        {/* Info Boxes */}
        <div  data-aos="flip-up"  data-aos-duration="1200" data-aos-once="true"  className="container-fluid p-0 position-absolute bottom-0 start-0 end-0">
  <div className="single-fresh-hero-icon mx-0 mt-4"    >
    {heroData.map((item, index) => (
      <div className=" single-fresh-booking-info-boxes text-center p-1 mb-md-0" style={{ }} key={index}>
        <img
          src={`/img/${item.icon}`}
          alt={item.label}
          className="img-fluid mb-2 Single-fresh-info-box-icon"
          style={{ maxWidth: "80px" }}
        />
        <div className="fw-normal mb-1 single-fresh-hero-label">{item.label}</div>
        <div className="fw-bold single-fresh-hero-value">{item.value} {item.value == project?.minPrice ? "Cr*" : ""}{item.value == project?.totalLandArea ? "Acres":''}</div>
      </div>
    ))}
  </div>
</div>
</div>
       
      </div>
    </>
  );
}

// // ✅ Extracted Form Component - Used in both Popup & Large Screen
// const FormComponent = () => (
  
//   <form
//     className="Single-fresh-form rounded shadow-lg text-light overflow-hidden"
//   >
//     <h2
//      data-aos="fade-left"  data-aos-duration="1200" data-aos-once="true"
//       className="Single-fresh-form-h2   text-center mb-2 fw-medium"
    
//     >
//       Let’s Find Your Dream Home!
//     </h2>
//     <p
//      data-aos="fade-left"  data-aos-duration="1400" data-aos-once="true"
//       className="Single-fresh-form-p  text-center mb-4"
     
//     >
//       Please fill out the form below, our expert will get back to you soon.
//     </p>

//     <div className="d-flex flex-column ">
//       <div
//        data-aos="fade-left"  data-aos-duration="1100" data-aos-once="true" 
//        className="position-relative">
        
// <div className="form__group field">
  
//   <img
//     src="/img/mdi_user.svg"
//     alt="user-icon"
//     className="form__icon"
//   />
//   <input
//     type="text"
//     className="form__field"
//     placeholder="Enter Your Name" // must be a non-empty string!
//     id="name"
//     required
//   />
//   <label htmlFor="name" className="form__label">Your Name</label>
// </div>
//       </div>

//       <div
//        data-aos="fade-left"  data-aos-duration="1300" data-aos-once="true"
//        className="position-relative">
//      <div className="form__group field">
  
//   <img
//     src="/img/ic_baseline-email.svg"
//     alt="user-icon"
//     className="form__icon"
//   />
//   <input
//     type="text"
//     className="form__field"
//     placeholder="Enter Your Email" // must be a non-empty string!
//     id="email"
//     required
//   />
//   <label htmlFor="email" className="form__label">Your Email</label>
// </div>
//       </div>

//       <div
//        data-aos="fade-left"  data-aos-duration="1500" data-aos-once="true"
//        className="position-relative">
//        <div className="form__group field">
  
//   <img
//     src="/img/ic_baseline-phone.svg"
//     alt="user-icon"
//     className="form__icon"
//   />
//   <input
//     type="number"
//     className="form__field"
//     placeholder="Enter Your Number" // must be a non-empty string!
//     id="number"
//     required
//   />
//   <label htmlFor="number" className="form__label">Your Number</label>
// </div>
//       </div>

//       <button
//        data-aos="fade-left"  data-aos-duration="1700" data-aos-once="true"
//         type="submit"
//         className="Single-fresh-form-btn btn w-100 "
      
//       >
//         Reserve Your Spot
//       </button>
//     </div>
//   </form>
// );
