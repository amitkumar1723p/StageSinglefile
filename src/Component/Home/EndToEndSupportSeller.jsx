import React from "react";
//tailwind converted

const EndToEndSupportSeller = () => {
  return (
    <div className="bg-[var(--main-lighter-clr)] w-[80%] max-480:w-[100%] max-480:px-[10px] my-[40px] py-4  mx-auto text-center rounded-2xl shadow-md">
    <h2 className="font-bold text-[24px]  text-[#333] mt-[10px]  underline-on-text">
      End-to-End <span style={{ color: "#0078d4" }}> Support </span>
    </h2>
      <div className="flex items-center justify-center my-5 
        max-480:flex-col max-480:items-start max-480:justify-center max-480:my-5 max-480:mt-0">
        <div className="w-4/5 flex justify-center bg-[var(--main-lighter-clr)]
          max-480:flex-col max-480:h-auto max-480:w-full max-480:p-0.5">
          
          {/* Left Side Image */}
          <div className="w-2/5 flex justify-center
            max-480:w-full">
            <img
              src="/img/seller-to-seller.png"
              alt="Support illustration"
              className="w-4/5 h-auto
                
                max-480:w-[70%] max-480:mb-4 max-480:object-cover"
            />
          </div>

          {/* Right Side Content */}
          <div className="px-14  
            
            max-480:pl-0 max-480:text-left">
            <ul className="list-none pl-0 w-fit leading-10">
              {[
                "Property promotions and marketing",
                "Dedicated Relationship Manager",
                "Site Visit Assistance",
                "Real Time Notification For Price Offer",
                "Documentation",
                "Registration",
              ].map((feature, index) => (
                <li key={index} 
                  className="flex items-center
                    max-480:justify-start max-480:mb-3 max-480:text-sm">
                  <img
                    src="/img/tick-purple.png"
                    alt="checkmark"
                    className="w-5 h-5 mr-2.5
                      max-480:w-4 max-480:h-4 max-480:mr-2"
                  />
                  <span className="text-[#333] 
                   
                    max-480:text-sm">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="text-[#333] font-inter  text-[10px] font-medium leading-normal text-right w-[95%] p- " >Brokerage applicable</p>
    </div>
  );
};

export default EndToEndSupportSeller;