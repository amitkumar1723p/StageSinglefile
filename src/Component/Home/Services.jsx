import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <>
      <div className="services-main-box bg-[var(--main-lighter-clr)] p-[20px] ">
        <div className="heading-for-service text-center mt-[50px]">
          <div className="heading-line-container">
            
            <h3 className=" underline-on-text text-[32px] m-0 text-[#333] text-center">
              What We <span className="text-[var(--main-light-clr)]">Offer</span>
            </h3>
         
          </div>
          <p className="text-base m-[5px_0px_20px_0px] text-[#333]">Steps Into Your New Home: A Simple Guide!</p>
        </div>
        <div className="services-container  flex justify-around p-[20px] ">
          <div className="service-item flex flex-col justify-center items-center">
            <img
              src="/img/property-management.png"
              alt="Property Management"
              className="service-icon w-[58px] h-[58px] mb-[24px]"
            />
            <p className="service-text text-[#333] uppercase text-center text-base font-semibold leading-normal tracking-[0.32px]">
              PROPERTY <br /> MANAGEMENT
            </p>
          </div>
          <div className="service-item flex flex-col justify-center items-center">
            <img
              src="/img/ResaleServices.png"
              alt="Sale Services"
              className="service-icon w-[58px] h-[58px] mb-[24px]"
            />
            <p className="service-text text-[#333] uppercase text-center text-base font-semibold leading-normal tracking-[0.32px]">
              REsale <br /> SERVICES
            </p>
          </div>
          <div className="service-item flex flex-col justify-center items-center ">
            <img
              src="/img/Rental.png"
              alt="Rental Services"
              className="service-icon w-[58px] h-[58px] mb-[24px]"
            />
            <p className="service-text text-[#333] uppercase text-center text-base font-semibold leading-normal tracking-[0.32px]">
              RENTAL <br /> SERVICES
            </p>
          </div>
          <div className="service-item flex flex-col justify-center items-center">
            <img
              src="/img/NRI.png"
              alt="NRI Property Management"
              className="service-icon w-[58px] h-[58px] mb-[24px]"
            />
            <p className="service-text text-[#333] uppercase text-center text-base font-semibold leading-normal tracking-[0.32px]">
              NRI PROPERTY <br /> MANAGEMENT
            </p>
          </div>
          <div className="service-item flex flex-col justify-center items-center">
            <img
               src="/img/LegalCon.png"
              alt="Legal Consultation"
              className="service-icon w-[58px] h-[58px] mb-[24px]"
            />
            <p className="service-text text-[#333] uppercase text-center text-base font-semibold leading-normal tracking-[0.32px]">
              LEGAL <br /> documentation
            </p>
          </div>
          <div className="service-item flex flex-col justify-center items-center items-center">
            <img
              src="/img/Loan.png"
              alt="Loan Assistance"
              className="service-icon w-[58px] h-[58px] mb-[24px]"
            />
            <p className="service-text text-[#333] uppercase text-center text-base font-semibold leading-normal tracking-[0.32px]">
              LOAN <br /> ASSISTANCE
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
