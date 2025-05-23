import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <>
      <div className="services-main-box">
        <div className="heading-for-service">
          <div className="heading-line-container">
            
            <h3 className="underline-on-text">
              What We <span>Offer</span>
            </h3>
         
          </div>
          <p>Steps Into Your New Home: A Simple Guide!</p>
        </div>
        <div className="services-container">
          <div className="service-item">
            <img
              loading="lazy"
              src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/property-management.png"
              alt="Property Management"
              className="service-icon"
            />
            <p className="service-text">
              PROPERTY <br /> MANAGEMENT
            </p>
          </div>
          <div className="service-item">
            <img
              loading="lazy"
              src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/ResaleServices.png"
              alt="Sale Services"
              className="service-icon"
            />
            <p className="service-text">
              REsale <br /> SERVICES
            </p>
          </div>
          <div className="service-item">
            <img
              loading="lazy"
              src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/RentServices.svg"
              alt="Rental Services"
              className="service-icon"
            />
            <p className="service-text">
              RENTAL <br /> SERVICES
            </p>
          </div>
          <div className="service-item">
            <img
              loading="lazy"
              src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/NRI.png"
              alt="NRI Property Management"
              className="service-icon"
            />
            <p className="service-text">
              NRI PROPERTY <br /> MANAGEMENT
            </p>
          </div>
          <div className="service-item">
            <img
              loading="lazy"
               src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/LegalCon.png"
              alt="Legal Consultation"
              className="service-icon"
            />
            <p className="service-text">
              LEGAL <br /> documentation
            </p>
          </div>
          <div className="service-item">
            <img
              loading="lazy"
              src="https://propertydekho247bucket.s3.ap-south-1.amazonaws.com/Static-Img/Icons/Loan.png"
              alt="Loan Assistance"
              className="service-icon"
            />
            <p className="service-text">
              LOAN <br /> ASSISTANCE
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
