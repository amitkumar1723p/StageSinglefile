import React from "react";
import "./FutureAsist.css";

const FutureAsist = () => {
  return (
    <div className="assistance-banner flex items-center bg-white px-3 py-4 w-[80%] text-white mx-auto my-10 rounded-lg shadow-[0px_0px_16px_0px_#c5dff3]">
      {/* Left Side - Image */}
      <div className="assistance-banner-image">
        <img
          src="/img/futher-assistance.svg"
          alt="Assistance"
          className="assistance-banner-img"
        />
      </div>

      {/* Right Side - Text and Button */}
      <div className="assistance-banner-content pl-[40px] flex flex-col justify-between gap-[10px] flex-[2]">
        <p className="brand-name-propertydekho247 bg-[var(--main-lighter-clr)] w-fit p-1 rounded-[10px] text-sm text-[#333]">PropertyDekho247</p>
        <h2 className="assistance-banner-title text-[#333] text-[20px] not-italic font-semibold leading-[32px] tracking-[0.5px] uppercase">Need Further Assistance?</h2>
        <p className="assistance-banner-text text-[#333] text-sm font-normal leading-[24px] capitalize">
          Get expert guidance on listing, pricing, and selling your property.
          Our support team is here to ensure a smooth and successful sales
          experience.
        </p>
        <div className="assistance-banner-actions flex gap-[10px] items-center">
          <button
            className="assistance-banner-button flex items-center gap-[5px] bg-[var(--main-light-clr)] text-white border-0 px-3 py-2 rounded-md cursor-pointer text-base font-bold  hover:opacity-80"
            onClick={() => {
              window.open(
                "https://wa.me/7837840785?text=Hello%20Propfuture%20AI%20Technologies,%20I%20would%20like%20to%20know%20more%20about%20the%20opportunity.",
                "_blank"
              );
            }}
          >
            <img className="icon-btn w-[20px]" src="/img/whatapp.png" alt="whatsapp" />
           Whatsapp
          </button>

          <span className="assistance-banner-or text-[var(--main-light-clr)] text-base font-bold">Or</span>
          <button
          onClick={()=>{alert("no response !")}} 
          className="assistance-banner-phone bg-white border-[#037EDB] text-blue-600 border-2  px-3 py-2 rounded text-base font-bold ">+91 783-784-0785</button>
        </div>
      </div>
    </div>
  );
};

export default FutureAsist;
