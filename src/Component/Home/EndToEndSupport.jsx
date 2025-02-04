import React from "react";
// tailwlind converted
const EndToEndSupport = () => {
  return (
    <>
      <div className="bg-[var(--main-lighter-clr)] w-[100%] max-480:w-[80%] max-480:px-[10px] my-[40px] py-4  mx-auto text-center rounded-2xl shadow-md">
        <h2 className="font-bold text-[24px]  text-[#333] mt-[10px]  underline-on-text">
          End-to-End <span style={{ color: "#0078d4" }}> Support </span>
        </h2>
      
      <div className="flex items-center justify-evenly my-[20px] bg--200 ">
        <div className="EndtoEnd-Res flex xs:flex gap-[20px] ">
          {/* Left Side Image */}
          <div className="max-480:flex max-480:mb-5 max-480:justify-center ">
            <img
              src="/img/EndToEndNewBuyer.svg"
              alt="Support illustration"
              className="w-[80%] ml-5"
            />
          </div>

          {/* Right Side Content */}
          <div className="px-[px] max-480:px-[15px] ">
            <ul className="pl-0  h-full leading-9">
              {[ 
                "Dedicated Relationship Manager",
                "Site Visit Assistance",
                "Home Loan",
                "Documentation",
                "Registration",
                "Society Transfer",
              ].map((feature, index) => (
                <li key={index} className="flex items-center justify-start mb-[10px] text-[17px]">
                  <img
                    src="/img/tick-purple.png" // replace with the path to your checkmark icon
                    alt="checkmark"
                    className="w-[20px] h-[20px] mr-[8px]"
                  />
                  <span className="feature-texttext-[#333] 
                   
                    max-480:text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="text-[#333] font-inter  text-[10px] font-medium leading-normal text-right w-[95%] p- " >Brokerage applicable</p>
      </div>
    </>
  );
};

export default EndToEndSupport;
